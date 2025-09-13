import {
  cancel,
  group,
  intro,
  isCancel,
  log,
  note,
  outro,
  select,
  text,
} from "@clack/prompts";
import open from "open";
import pc from "picocolors";
import z from "zod";
import { Profile, type Credentials } from "../../src/auth.ts";
import { CloudflareAuth } from "../../src/cloudflare/auth.ts";
import { listCloudflareAccounts } from "../../src/cloudflare/user.ts";
import { ExitSignal, loggedProcedure, t } from "../trpc.ts";

const schema = {
  provider: z
    .enum(["cloudflare"])
    .meta({ positional: true })
    .describe("the provider to login to"),
  method: z
    .enum(["oauth", "token", "api-key"])
    .describe("the method to login with"),
  profile: z.string().describe("the profile to login to").meta({ alias: "p" }),
};

// wrap procedure to improve error handling
// TODO(john): use this pattern for other procedures
const authProcedure = loggedProcedure.use(async (opts) => {
  const result = await opts.next();
  if (result.ok) return result;
  if (result.error.cause instanceof ExitSignal) return result;
  log.error(pc.red("An unexpected error occurred."));
  log.error(
    result.error.message
      .split("\n")
      .map((line) => pc.gray(`  ${line}`))
      .join("\n"),
  );
  cancel();
  throw new ExitSignal(1);
});

export const auth = t.router({
  list: authProcedure
    .input(
      z.object({
        provider: schema.provider.optional(),
      }),
    )
    .meta({
      description: "list logged in accounts",
      aliases: { command: ["ls"] },
    })
    .mutation(async ({ input }) => {
      logIntroBreadcrumbs(["Auth", "List"]);
      const list = await Profile.list();
      const filtered = input.provider
        ? { [input.provider]: list[input.provider] }
        : list;
      if (Object.keys(filtered).length === 0) {
        outro(
          pc.red(
            `No accounts found${input.provider ? ` for provider "${input.provider}"` : ""}. Use \`alchemy auth login\` to login.`,
          ),
        );
        return;
      }
      for (const [provider, profiles] of Object.entries(list)) {
        if (input.provider && input.provider !== provider) {
          continue;
        }
        const string = Object.entries(profiles)
          .map(
            ([name, profile]) =>
              `${pc.reset(pc.bold(name))}: ${pc.dim(profile.metadata.name)} ${pc.dim(`(${profile.metadata.id})`)} ${pc.dim(`(${profile.credentials.type})`)}`,
          )
          .join("\n");
        note(string, pc.bold(provider));
      }
      outro(
        pc.dim(
          "Use `alchemy auth login` to login or `alchemy auth logout` to logout.",
        ),
      );
    }),

  login: authProcedure
    .meta({
      description: "login to a provider",
    })
    .input(
      z.object({
        provider: schema.provider.optional(),
        method: schema.method.optional(),
        profile: schema.profile.optional(),
      }),
    )
    .mutation(async (ctx) => {
      logIntroBreadcrumbs(["Auth", "Login"]);

      const input = {
        // TODO: handle other providers
        provider: ctx.input.provider ?? "cloudflare",
        method:
          ctx.input.method ??
          (await withCancel(
            select({
              message: `Select a login method for ${pc.bold(ctx.input.provider ?? "Cloudflare")}`,
              options: [
                { label: "OAuth", value: "oauth", hint: "Recommended" },
                { label: "Token", value: "token" },
                { label: "API Key", value: "api-key", hint: "Legacy" },
              ],
              initialValue: "oauth" as const,
            }),
          )),
        profile:
          // TODO: should we
          // - prompt for this by default, or no?
          // - slightly improve the UX (e.g. "would you like to set a profile name")?
          // - warn if the profile already exists?
          ctx.input.profile ??
          (await withCancel(
            text({
              message: "Enter a profile name",
              defaultValue: "default",
            }),
          )),
      };
      const credentials = await promptForCredentials(input.method);
      const account = await promptForCloudflareAccount(credentials);
      await Profile.set(
        {
          provider: input.provider,
          profile: input.profile,
        },
        {
          metadata: {
            id: account.id,
            name: account.name,
          },
          credentials,
        },
      );
      outro(
        `✅ Signed in to ${input.provider} as ${pc.bold(account.name)} ${pc.dim(`(${account.id})`)}`,
      );
    }),

  logout: authProcedure
    .meta({
      description: "log out from a provider",
    })
    .input(
      z.object({
        provider: schema.provider.optional(),
        profile: schema.profile.optional(),
      }),
    )
    .mutation(async (ctx) => {
      logIntroBreadcrumbs(["Auth", "Logout"]);
      const list = await Profile.list();
      if (Object.keys(list).length === 0) {
        outro(pc.red("No accounts found. Use `alchemy auth login` to login."));
        return;
      }
      const provider =
        ctx.input.provider ??
        (await withCancel(
          select({
            message: "Select a provider",
            options: Object.keys(list).map((provider) => ({
              label: provider,
              value: provider,
            })),
          }),
        ));
      if (!list[provider]) {
        outro(pc.red(`No accounts found for provider "${provider}".`));
        return;
      }
      const profile =
        ctx.input.profile ??
        (await withCancel(
          select({
            message: "Select a profile",
            options: Object.entries(list[provider]).map(([profile, value]) => ({
              label: profile,
              value: profile,
              hint: `${value.metadata.name} (${value.metadata.id}) - ${value.credentials.type}`,
            })),
          }),
        ));
      const value = list[provider][profile];
      if (!value) {
        outro(
          pc.red(
            `No account found for provider "${provider}" and profile "${profile}".`,
          ),
        );
        return;
      }
      // TODO: handle other providers
      if (value.credentials.type === "oauth") {
        await CloudflareAuth.client.revoke(value.credentials);
      }
      await Profile.del({ provider, profile });
      outro(`✅ Signed out from ${provider} as ${pc.bold(profile)}`);
    }),
});

/**
 * Prompts the user to enter credentials for a given method.
 */
const promptForCredentials = async (
  method: "oauth" | "token" | "api-key",
): Promise<Credentials> => {
  switch (method) {
    case "oauth": {
      // TODO(john): prompt for scopes and figure out sane defaults
      const authorization = CloudflareAuth.client.authorize(
        CloudflareAuth.ALL_SCOPES,
      );
      log.step(
        [
          "Opening browser to authorize...",
          "",
          pc.gray(
            "If you are not automatically redirected, please open the following URL in your browser:",
          ),
          authorization.url,
        ].join("\n"),
      );
      await open(authorization.url);
      return await CloudflareAuth.client.callback(authorization);
    }
    case "token": {
      const apiToken = await withCancel(
        text({
          message: "Enter API token",
        }),
      );
      return {
        type: "api-token",
        apiToken,
      };
    }
    case "api-key": {
      const { apiKey, apiEmail } = await group(
        {
          apiKey: () =>
            text({
              message: "Enter API key",
            }),
          apiEmail: () =>
            text({
              message: "Enter API email",
            }),
        },
        {
          onCancel: () => {
            cancel(pc.red("Operation cancelled."));
            throw new ExitSignal(0);
          },
        },
      );
      return {
        type: "api-key",
        apiKey,
        apiEmail,
      };
    }
  }
};

/**
 * Lists Cloudflare accounts and prompts the user to select one.
 */
const promptForCloudflareAccount = async (credentials: Credentials) => {
  const accounts = await listCloudflareAccounts(
    CloudflareAuth.formatHeaders(credentials),
  );
  return await withCancel(
    select({
      message: "Select an account",
      options: accounts.map((account) => ({
        label: account.name,
        value: { id: account.id, name: account.name },
        hint: account.id,
      })),
    }),
  );
};

const logIntroBreadcrumbs = (items: string[]) => {
  console.log(); // empty line for spacing
  intro(items.map(pc.bold).join(pc.dim(" > ")));
};

/**
 * Handles the Clack prompt cancellation signal.
 */
const withCancel = async <T>(promise: Promise<T | symbol>): Promise<T> => {
  const result = await promise;
  if (isCancel(result)) {
    cancel(pc.red("Operation cancelled."));
    throw new ExitSignal(0);
  }
  return result;
};
