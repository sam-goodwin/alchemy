import crypto from "node:crypto";
import path from "node:path";

import type {
  LambdaFunctionURLEvent,
  LambdaFunctionURLResult,
} from "aws-lambda";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Schedule from "effect/Schedule";

import {
  allow,
  App,
  type Allow,
  type AttachAction,
  type Binding,
  type BindingAction,
  type Policy,
  type Resource,
  type Provider as ResourceProvider,
  type Statement,
  type TagInstance,
} from "@alchemy.run/effect";
import type { Context as LambdaContext } from "aws-lambda";
import {
  Lambda as LambdaClient,
  type CreateFunctionUrlConfigRequest,
  type UpdateFunctionUrlConfigRequest,
} from "itty-aws/lambda";
import { AccountID } from "./account.ts";
import type { Tag as ArnTag } from "./arn.ts";
import { bundle } from "./bundle.ts";
import { createAWSServiceClientLayer } from "./client.ts";
import * as IAM from "./iam.ts";
import { Region } from "./region.ts";
import { zipCode } from "./zip.ts";

export type Type = typeof Type;
export const Type = "AWS::Lambda::Function";

type Props = {
  url?: boolean;
  functionName?: string;
};

type Attributes<ID extends string, _P extends Props> = {
  type: Type;
  id: ID;
  functionName: string;
  functionArn: string;
  functionUrl: string | undefined;
  roleName: string;
  roleArn: string;
  code: {
    hash: string;
  };
};

export type Branded<T> = string & { __brand: T };

export type FunctionArn = Branded<"AWS::Lambda::Function.FunctionArn">;

export type Arn<Self> = ArnTag<Self, FunctionArn>;

export type Function<
  ID extends string = string,
  P extends Props = Props,
> = Resource<Type, ID, P, Attributes<ID, P>, typeof FunctionProvider>;

export type Handler = (event: any, ctx: any) => Effect.Effect<any, any, any>;

export const Function = <ID extends string, P extends Props>(
  id: ID,
  props: P,
) =>
  Object.assign(
    Context.Tag(id)() as Context.TagClass<P, ID, Attributes<ID, P>>,
    {
      kind: "Resource",
      type: Type,
      id,
      props,
      provider: FunctionProvider,
      // phantom
      attributes: undefined! as Attributes<ID, P>,
      serve<Self, Err, Req>(
        this: Self,
        handler: (
          event: LambdaFunctionURLEvent,
          context: LambdaContext,
        ) => Effect.Effect<LambdaFunctionURLResult, Err, Req>,
      ) {
        const iae = Effect.gen(function* () {
          return handler;
        });
        return Object.assign(iae, {
          self: this,
        }) as Serve<Self, Err, Req>;
      },
    } as const,
  );

export type Serve<Self, Err, Req> = Effect.Effect<
  (
    request: LambdaFunctionURLEvent,
    context: LambdaContext,
  ) => Effect.Effect<LambdaFunctionURLResult, Err, Req>,
  Err,
  Req
> & {
  self: Self;
};

export const make = <F extends Resource, Req>(
  impl: Effect.Effect<Handler, any, Req> & {
    self: F;
  },
  {
    policy,
    main,
    handler,
  }: {
    policy: NoInfer<Policy<Extract<Req, Statement>>>;
    main: string;
    handler?: string;
  },
) => {
  const eff = Effect.gen(function* () {
    const self = impl.self;
    return {
      ...(Object.fromEntries(
        policy.statements.map((statement) => [
          statement.resource.id,
          statement.resource,
        ]),
      ) as {
        [id in Extract<Req, Statement>["resource"]["id"]]: Extract<
          Extract<Req, Statement>["resource"],
          { id: id }
        >;
      }),
      [self.id]: {
        type: "bound",
        resource: self,
        bindings: policy.statements,
        // TODO(sam): this should be passed to an Effect that interacts with the Provider
        // @ts-expect-error
        props: {
          ...self.props,
          main,
          handler,
        },
      } satisfies Binding<F, Extract<Req, Statement>>,
    };
  });

  const clss: any = class {};
  Object.assign(clss, eff);
  clss.pipe = eff.pipe.bind(eff);
  return clss as any as Effect.Effect<
    {
      [id in F["id"]]: F extends Function
        ? Binding<F, Extract<Req, Statement>>
        : F;
    } & {
      [id in Exclude<
        Extract<Req, Statement>["resource"]["id"],
        F["id"]
      >]: Extract<Extract<Req, Statement>["resource"], { id: id }>;
    },
    never,
    | FunctionProvider
    | TagInstance<Extract<Req, Statement>["resource"]["provider"]>
  > & {
    new (_: never): {};
  };
};

export class FunctionClient extends Context.Tag("AWS::Lambda::Function.Client")<
  FunctionClient,
  LambdaClient
>() {}

export const client = createAWSServiceClientLayer<
  typeof FunctionClient,
  LambdaClient
>(FunctionClient, LambdaClient);

export interface FunctionProviderProps extends Props {
  /**
   * The main file to use for the function.
   */
  main: string;
  /**
   * The handler to use for the function.
   * @default "default"
   */
  handler?: string;
}

export class FunctionProvider extends Context.Tag("AWS::Lambda::Function")<
  FunctionProvider,
  ResourceProvider<
    Type,
    FunctionProviderProps,
    Attributes<string, Props>,
    Bindable
  >
>() {}

export const provider = Layer.effect(
  FunctionProvider,
  Effect.gen(function* () {
    const lambda = yield* FunctionClient;
    const iam = yield* IAM.IAMClient;
    const accountId = yield* AccountID;
    const region = yield* Region;
    const app = yield* App;
    // const assets = yield* Assets;

    const createFunctionName = (id: string) =>
      `${app.name}-${app.stage}-${id}-${region}`;
    const createRoleName = (id: string) =>
      `${app.name}-${app.stage}-${id}-${region}`;
    const createPolicyName = (id: string) =>
      `${app.name}-${app.stage}-${id}-${region}`;

    const attachBindings = Effect.fn(function* ({
      roleName,
      policyName,
      functionArn,
      functionName,
      bindings,
    }: {
      roleName: string;
      policyName: string;
      functionArn: string;
      functionName: string;
      bindings: BindingAction.Materialized<BindingAction<Bindable>>[];
    }) {
      let env: Record<string, string> = {};
      const policyStatements: IAM.PolicyStatement[] = [];

      for (const binding of bindings) {
        const upstream = binding.attributes;
        if (binding.action === "attach") {
          const bound = yield* binding.stmt.bind(
            {
              functionArn,
              functionName,
              env,
            },
            binding,
            upstream,
          );
          env = { ...env, ...(bound?.env ?? {}) };
          policyStatements.push(...(bound?.policyStatements ?? []));
        } else if (binding.action === "detach") {
          // no-op: PutRolePolicy will remove the removed statements
        }
      }

      yield* iam.putRolePolicy({
        RoleName: roleName,
        PolicyName: policyName,
        PolicyDocument: JSON.stringify({
          Version: "2012-10-17",
          Statement: policyStatements,
        } satisfies IAM.PolicyDocument),
      });

      return env;
    });

    const createRole = Effect.fn(function* ({
      id,
      roleName,
    }: {
      id: string;
      roleName: string;
    }) {
      const role = yield* iam
        .createRole({
          RoleName: roleName,
          AssumeRolePolicyDocument: JSON.stringify({
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: {
                  Service: "lambda.amazonaws.com",
                },
                Action: "sts:AssumeRole",
              },
            ],
          }),
          Tags: createTagsList(id),
        })
        .pipe(
          Effect.catchTag("EntityAlreadyExistsException", () =>
            iam
              .getRole({
                RoleName: roleName,
              })
              .pipe(
                Effect.filterOrFail(
                  (role) => validateTagList(tagged(id), role.Role?.Tags),
                  () =>
                    new Error(`Role ${roleName} exists but has incorrect tags`),
                ),
              ),
          ),
        );

      yield* iam.attachRolePolicy({
        RoleName: roleName,
        PolicyArn:
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
      });

      return role;
    });

    const bundleCode = Effect.fn(function* (props: FunctionProviderProps) {
      const handler = props.handler ?? "default";
      let file = path.relative(process.cwd(), props.main);
      if (!file.startsWith(".")) {
        file = `./${file}`;
      }
      const code = yield* bundle({
        // entryPoints: [props.main],
        // we use a virtual entry point so that
        stdin: {
          contents: `import { ${handler} as handler } from "${file}";\nexport default handler;`,
          resolveDir: process.cwd(),
          loader: "ts",
          sourcefile: "__index.ts",
        },
        bundle: true,
        format: "esm",
        platform: "node",
        target: "node22",
        sourcemap: true,
        treeShaking: true,
        write: false,
      });
      return code;
    });

    const hashCode = (code: Uint8Array<ArrayBufferLike>) =>
      Effect.sync(() => crypto.createHash("sha256").update(code).digest("hex"));

    const validateTagList = (
      expectedTags: Record<string, string>,
      tags: { Key: string; Value: string }[] | undefined,
    ) => {
      return Object.entries(expectedTags).every(([key, value]) =>
        tags?.some((tag) => tag.Key === key && tag.Value === value),
      );
    };

    const validateTags = (
      expectedTags: Record<string, string>,
      tags: Record<string, string> | undefined,
    ) => {
      return Object.entries(expectedTags).every(
        ([key, value]) => tags?.[key] === value,
      );
    };

    const createTagsList = (id: string) =>
      Object.entries(tagged(id)).map(([Key, Value]) => ({
        Key,
        Value,
      }));

    const tagged = (id: string) => ({
      "alchemy::app": app.name,
      "alchemy::stage": app.stage,
      "alchemy::id": id,
    });

    const createOrUpdateFunction = Effect.fn(function* ({
      id,
      news,
      roleArn,
      code,
      env,
      functionName,
    }: {
      id: string;
      news: FunctionProviderProps;
      roleArn: string;
      code: Uint8Array<ArrayBufferLike>;
      env: Record<string, string>;
      functionName: string;
    }) {
      yield* lambda
        .createFunction({
          FunctionName: functionName,
          Handler: `index.${news.handler ?? "default"}`,
          Role: roleArn,
          Code: {
            // TODO(sam): upload to assets
            ZipFile: yield* zipCode(code),
          },
          Runtime: "nodejs22.x",
          Environment: {
            Variables: env,
          },
          Tags: tagged(id),
        })
        .pipe(
          Effect.retry({
            while: (e) =>
              e.name === "InvalidParameterValueException" &&
              e.message?.includes("cannot be assumed by Lambda"),
            schedule: Schedule.exponential(10),
          }),
          Effect.catchTag("ResourceConflictException", () =>
            lambda
              .getFunction({
                FunctionName: functionName,
              })
              .pipe(
                Effect.flatMap((f) =>
                  // if it exists and contains these tags, we will assume it was created by alchemy
                  // but state was lost, so if it exists, let's adopt it
                  validateTags(tagged(id), f.Tags)
                    ? Effect.succeed(f.Configuration!)
                    : Effect.fail(
                        new Error("Function tags do not match expected values"),
                      ),
                ),
              ),
          ),
        );
    });

    const createOrUpdateFunctionUrl = Effect.fn(function* ({
      functionName,
      url,
      oldUrl,
    }: {
      functionName: string;
      url: Props["url"];
      oldUrl?: Props["url"];
    }) {
      if (url) {
        const config = {
          FunctionName: functionName,
          AuthType: "NONE", // | AWS_IAM
          // Cors: {
          //   AllowCredentials: true,
          //   AllowHeaders: ["*"],
          //   AllowMethods: ["*"],
          //   AllowOrigins: ["*"],
          //   ExposeHeaders: ["*"],
          //   MaxAge: 86400,
          // },
          InvokeMode: "BUFFERED", // | RESPONSE_STREAM
          // Qualifier: "$LATEST"
        } satisfies
          | CreateFunctionUrlConfigRequest
          | UpdateFunctionUrlConfigRequest;
        const response = yield* lambda
          .createFunctionUrlConfig(config)
          .pipe(
            Effect.catchTag("ResourceConflictException", () =>
              lambda.updateFunctionUrlConfig(config),
            ),
          );
        return response.FunctionUrl;
      } else if (oldUrl) {
        yield* lambda
          .deleteFunctionUrlConfig({
            FunctionName: functionName,
          })
          .pipe(
            Effect.catchTag("ResourceNotFoundException", () => Effect.void),
          );
      }
      return undefined;
    });

    return {
      type: Type,
      read: Effect.fn(function* ({ id, output }) {
        if (output) {
          // example: refresh the function URL from the API
          return {
            ...output,
            functionUrl: yield* lambda
              .getFunctionUrlConfig({
                FunctionName: createFunctionName(id),
              })
              .pipe(
                Effect.map((f) => f.FunctionUrl),
                Effect.catchTag("ResourceNotFoundException", () =>
                  Effect.succeed(undefined),
                ),
              ),
          } satisfies Attributes<string, Props>;
        }
        return output;
      }),
      diff: Effect.fn(function* ({ id, olds, news, output }) {
        if (
          output.functionName !== (news.functionName ?? createFunctionName(id))
        ) {
          // function name changed
          return { action: "replace" };
        }
        if (olds.url !== news.url) {
          // url changed
          return { action: "replace" };
        }
        const bundle = yield* bundleCode(news);
        const code = bundle.outputFiles?.[0].contents!;
        if (output.code.hash !== (yield* hashCode(code))) {
          // code changed
          return { action: "update" };
        }
        return { action: "noop" };
      }),
      create: Effect.fn(function* ({ id, news, bindings }) {
        const roleName = createRoleName(id);
        const policyName = createPolicyName(id);
        // const policyArn = `arn:aws:iam::${accountId}:policy/${policyName}`;
        const functionName = news.functionName ?? createFunctionName(id);
        const functionArn = `arn:aws:lambda:${region}:${accountId}:function:${functionName}`;

        const role = yield* createRole({ id, roleName });

        const env = yield* attachBindings({
          roleName,
          policyName,
          functionArn,
          functionName,
          bindings,
        });

        const bundle = yield* bundleCode(news);

        const code = bundle.outputFiles?.[0].contents!;

        yield* createOrUpdateFunction({
          id,
          news,
          roleArn: role.Role.Arn,
          // TODO(sam): upload to assets
          code,
          env,
          functionName,
        });

        const functionUrl = yield* createOrUpdateFunctionUrl({
          functionName,
          url: news.url,
        });

        return {
          id,
          type: "AWS::Lambda::Function",
          functionArn,
          functionName,
          functionUrl: functionUrl as any,
          roleName,
          roleArn: role.Role.Arn,
          code: {
            hash: yield* hashCode(code),
          },
        } satisfies Attributes<string, Props>;
      }),
      update: Effect.fn(function* ({ id, news, olds, bindings, output }) {
        const roleName = createRoleName(id);
        const policyName = createPolicyName(id);
        const functionName = news.functionName ?? createFunctionName(id);
        const functionArn = `arn:aws:lambda:${region}:${accountId}:function:${functionName}`;

        const env = yield* attachBindings({
          roleName,
          policyName,
          functionArn,
          functionName,
          bindings,
        });

        const code = yield* bundleCode(news);

        yield* createOrUpdateFunction({
          id,
          news,
          roleArn: output.roleArn,
          // TODO(sam): upload to assets
          code: code.outputFiles?.[0].contents!,
          env,
          functionName,
        });

        const functionUrl = yield* createOrUpdateFunctionUrl({
          functionName,
          url: news.url,
          oldUrl: olds.url,
        });

        return {
          ...output,
          functionArn,
          functionName,
          functionUrl: functionUrl as any,
          roleName,
          roleArn: output.roleArn,
          code: {
            hash: yield* hashCode(code.outputFiles?.[0].contents!),
          },
        } satisfies Attributes<string, Props>;
      }),
      delete: Effect.fn(function* ({ output }) {
        yield* iam
          .listRolePolicies({
            RoleName: output.roleName,
          })
          .pipe(
            Effect.flatMap((policies) =>
              Effect.all(
                (policies.PolicyNames ?? []).map((policyName) =>
                  iam.deleteRolePolicy({
                    RoleName: output.roleName,
                    PolicyName: policyName,
                  }),
                ),
              ),
            ),
          );

        yield* iam
          .listAttachedRolePolicies({
            RoleName: output.roleName,
          })
          .pipe(
            Effect.flatMap((policies) =>
              Effect.all(
                (policies.AttachedPolicies ?? []).map((policy) =>
                  iam
                    .detachRolePolicy({
                      RoleName: output.roleName,
                      PolicyArn: policy.PolicyArn!,
                    })
                    .pipe(
                      Effect.catchTag(
                        "NoSuchEntityException",
                        () => Effect.void,
                      ),
                    ),
                ),
              ),
            ),
          );

        yield* lambda
          .deleteFunction({
            FunctionName: output.functionName,
          })
          .pipe(
            Effect.catchTag("ResourceNotFoundException", () => Effect.void),
          );

        yield* iam
          .deleteRole({
            RoleName: output.roleName,
          })
          .pipe(Effect.catchTag("NoSuchEntityException", () => Effect.void));
        return null as any;
      }),
    } satisfies ResourceProvider<
      Type,
      FunctionProviderProps,
      Attributes<string, Props>,
      Bindable
    >;
  }),
);

export type InvokeFunction<F extends Function> = Allow<
  "lambda:InvokeFunction",
  F
>;

// TODO(sam): implement
export declare const InvokeFunction: <F extends Function>(
  func: F,
) => InvokeFunction<F>;

export const invoke = <F extends Function>(func: F, input: any) =>
  Effect.gen(function* () {
    const lambda = yield* FunctionClient;
    const functionArn = process.env[`${func.id}-functionArn`]!;
    yield* allow<InvokeFunction<F>>();
    return yield* lambda.invoke({
      FunctionName: functionArn,
      InvocationType: "RequestResponse",
      Payload: JSON.stringify(input),
    });
  });

export const toHandler = (effect: Effect.Effect<Handler, any, Statement>) =>
  null;

export type Bindable<S extends Statement = Statement> = S & {
  bind(
    func: {
      functionArn: string;
      functionName: string;
      env: Record<string, string>;
    },
    stmt: AttachAction<S>,
    resource: S["resource"]["attributes"],
  ): Effect.Effect<{
    env?: Record<string, string>;
    policyStatements?: IAM.PolicyStatement[];
  } | void>;
};
