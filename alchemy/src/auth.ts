import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { AsyncMutex } from "./util/mutex.ts";

export type Credentials =
  | Credentials.OAuth
  | Credentials.APIKey
  | Credentials.APIToken;

export namespace Credentials {
  export interface OAuth {
    type: "oauth";
    access: string;
    refresh: string;
    expires: number;
    scopes: string[];
  }

  export interface APIKey {
    type: "api-key";
    apiKey: string;
    apiEmail: string;
  }

  export interface APIToken {
    type: "api-token";
    apiToken: string;
  }

  /**
   * Returns true if the given credentials are OAuth and have expired.
   */
  export const isOAuthExpired = (
    credentials: Credentials,
    leeway = 10 * 1000,
  ): credentials is Credentials.OAuth => {
    return (
      credentials.type === "oauth" && credentials.expires < Date.now() + leeway
    );
  };
}

export interface Profile {
  metadata: {
    id: string;
    name: string;
  };
  credentials: Credentials;
}

export namespace Profile {
  const FILE_PATH = path.join(os.homedir(), ".alchemy", "auth.json");

  interface Input {
    provider: string;
    profile: string;
  }

  /**
   * Get a profile by provider and profile name.
   */
  export const get = async (input: Input) => {
    const data = await list();
    return data[input.provider]?.[input.profile];
  };

  /**
   * Set a profile by provider and profile name.
   */
  export const set = async (input: Input, profile: Profile) => {
    await update((data) => {
      data[input.provider] = {
        ...(data[input.provider] ?? {}),
        [input.profile]: profile,
      };
    });
  };

  /**
   * Delete a profile by provider and profile name.
   */
  export const del = async (input: Input) => {
    await update((data) => {
      delete data[input.provider]?.[input.profile];
      if (Object.keys(data[input.provider] ?? {}).length === 0) {
        delete data[input.provider];
      }
    });
  };

  interface Data {
    [provider: string]: Record<string, Profile>;
  }

  /**
   * List all profiles.
   */
  export const list = async (): Promise<Data> => {
    try {
      const content = await fs.readFile(FILE_PATH, "utf-8");
      return JSON.parse(content);
    } catch {
      return {};
    }
  };

  const mutex = new AsyncMutex(); // prevents race conditions when writing to the file

  /**
   * Update the profile data.
   */
  const update = async (updater: (data: Data) => void) => {
    await mutex.lock(async () => {
      const data = await list();
      updater(data);
      await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
      await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
      await fs.chmod(FILE_PATH, 0o600); // 0o600 means only the current user can read/write
    });
  };
}
