import { alchemy } from "../alchemy.ts";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { logger } from "../util/logger.ts";
import { lowercaseId } from "../util/nanoid.ts";
import { PlanetScaleApi } from "./api.ts";
import type { Branch } from "./branch.ts";
import type { Database } from "./database.ts";

/**
 * Properties for creating or updating a PlanetScale Branch
 */
export interface PasswordProps {
  /**
   * The name of the password
   */
  name: string;

  /**
   * The organization ID where the password will be created
   * Required when using string database name, optional when using Database resource
   */
  organizationId?: string;

  /**
   * The database where the password will be created
   * Can be either a database name (string) or Database resource
   */
  database: string | Database;

  /**
   * The branch where the password will be created
   * Can be either a branch name (string) or Branch resource
   * Defaults to "main" if not provided
   */
  branch?: string | Branch;

  /**
   * PlanetScale API token (overrides environment variable)
   */
  apiKey?: Secret;

  /**
   * The password
   */
  role: "reader" | "writer" | "admin" | "readwriter";

  /**
   * Whether the password is for a read replica
   */
  replica?: boolean;

  /**
   * The TTL of the password in seconds
   */
  ttl?: number;

  /**
   * The CIDRs of the password
   */
  cidrs?: string[];
}

/**
 * Represents a PlanetScale Branch
 */
export interface Password
  extends Resource<"planetscale::Password">,
    PasswordProps {
  /**
   * The unique identifier for the password
   */
  id: string;

  /**
   * The timestamp when the password expires (ISO 8601 format)
   */
  expiresAt: string;

  /**
   * The host URL for database connection
   */
  host: string;

  /**
   * The username for database authentication
   */
  username: string;

  /**
   * The encrypted password for database authentication
   */
  password: Secret<string>;

  /**
   * The name slug for the password
   */
  nameSlug: string;
}

/**
 * Create and manage database passwords for PlanetScale branches. Database passwords provide secure access to your database with specific roles and permissions.
 *
 * @example
 * ## Basic Reader Password
 *
 * Create a read-only password for a database branch:
 *
 * ```ts
 * import { Password } from "alchemy/planetscale";
 *
 * const readerPassword = await Password("app-reader", {
 *   name: "app-reader",
 *   organizationId: "my-org",
 *   database: "my-app-db",
 *   branch: "main",
 *   role: "reader"
 * });
 *
 * // Access connection details
 * console.log(`Host: ${readerPassword.password.host}`);
 * console.log(`Username: ${readerPassword.password.username}`);
 * console.log(`Password: ${readerPassword.password.password.unencrypted}`);
 * ```
 *
 * @example
 * ## Writer Password with TTL
 *
 * Create a writer password that expires after 24 hours:
 *
 * ```ts
 * import { Password } from "alchemy/planetscale";
 *
 * const writerPassword = await Password("app-writer", {
 *   name: "app-writer",
 *   organizationId: "my-org",
 *   database: "my-app-db",
 *   branch: "development",
 *   role: "writer",
 *   ttl: 86400 // 24 hours in seconds
 * });
 *
 * // Password will expire at the specified time
 * console.log(`Expires at: ${writerPassword.expiresAt}`);
 * ```
 *
 * @example
 * ## Admin Password with IP Restrictions
 *
 * Create an admin password that only allows connections from specific IP addresses:
 *
 * ```ts
 * import { Password } from "alchemy/planetscale";
 *
 * const adminPassword = await Password("admin-access", {
 *   name: "admin-access",
 *   organizationId: "my-org",
 *   database: "my-app-db",
 *   branch: "main",
 *   role: "admin",
 *   cidrs: ["203.0.113.0/24", "198.51.100.0/24"],
 *   ttl: 3600 // 1 hour
 * });
 * ```
 *
 * @example
 * ## Database Password with Custom API Key
 *
 * Create a password using a specific API key instead of the default environment variable:
 *
 * ```ts
 * import { Password } from "alchemy/planetscale";
 *
 * const password = await Password("custom-auth", {
 *   name: "custom-auth",
 *   organizationId: "my-org",
 *   database: "my-app-db",
 *   branch: "main",
 *   role: "readwriter",
 *   apiKey: alchemy.secret(process.env.CUSTOM_PLANETSCALE_TOKEN)
 * });
 * ```
 *
 * @example
 * ## Read Replica Password
 *
 * Create a password for accessing a read replica:
 *
 * ```ts
 * import { Password } from "alchemy/planetscale";
 *
 * const replicaPassword = await Password("replica-reader", {
 *   name: "replica-reader",
 *   organizationId: "my-org",
 *   database: "my-app-db",
 *   branch: "main",
 *   role: "reader",
 *   replica: true
 * });
 *
 * @example
 * ## Using Database Resource Instance
 *
 * Create a password using a Database resource instead of string:
 *
 * ```ts
 * import { Database, Password } from "alchemy/planetscale";
 *
 * const database = await Database("my-db", {
 *   name: "my-app-db",
 *   organizationId: "my-org",
 *   clusterSize: "PS_10"
 * });
 *
 * const password = await Password("db-reader", {
 *   name: "db-reader",
 *   database: database, // Using Database resource
 *   role: "reader"
 * });
 * ```
 *
 * @example
 * ## Using Both Database and Branch Resources
 *
 * Create a password using both Database and Branch resources:
 *
 * ```ts
 * import { Database, Branch, Password } from "alchemy/planetscale";
 *
 * const database = await Database("my-db", {
 *   name: "my-app-db",
 *   organizationId: "my-org",
 *   clusterSize: "PS_10"
 * });
 *
 * const branch = await Branch("feature-branch", {
 *   name: "feature-branch",
 *   organizationId: "my-org",
 *   databaseName: "my-app-db",
 *   parentBranch: "main",
 *   isProduction: false
 * });
 *
 * const password = await Password("feature-writer", {
 *   name: "feature-writer",
 *   database: database, // Using Database resource
 *   branch: branch, // Using Branch resource
 *   role: "writer"
 * });
 * ```
 * ```
 */
export const Password = Resource(
  "planetscale::Password",
  async function (
    this: Context<Password>,
    _id: string,
    props: PasswordProps,
  ): Promise<Password> {
    const apiKey =
      props.apiKey?.unencrypted || process.env.PLANETSCALE_API_TOKEN;
    if (!apiKey) {
      throw new Error("PLANETSCALE_API_TOKEN environment variable is required");
    }
    const nameSlug = this.isReplacement
      ? lowercaseId()
      : (this.output?.nameSlug ?? lowercaseId());
    const name = `${props.name.toLowerCase()}-${nameSlug}`;

    const api = new PlanetScaleApi({ apiKey });
    const branchName =
      props.branch == null
        ? "main"
        : typeof props.branch === "string"
          ? props.branch
          : props.branch.name;
    const databaseName =
      typeof props.database === "string" ? props.database : props.database.name;

    if (this.phase === "delete") {
      try {
        if (this.output?.name) {
          const response = await api.delete(
            `/organizations/${props.organizationId}/databases/${databaseName}/branches/${branchName}/passwords/${this.output.id}`,
          );

          if (!response.ok && response.status !== 404) {
            throw new Error(
              `Failed to delete branch: ${response.statusText} ${await response.text()}`,
            );
          }
        }
      } catch (error) {
        logger.error("Error deleting password:", error);
        throw error;
      }
      return this.destroy();
    }
    if (this.phase === "update") {
      if (
        this.output?.name === name &&
        ((this.output?.cidrs === undefined && props.cidrs === undefined) ||
          (Array.isArray(this.output?.cidrs) &&
            Array.isArray(props.cidrs) &&
            this.output.cidrs.length === props.cidrs.length &&
            this.output.cidrs.every((cidr, i) => cidr === props.cidrs![i])))
      ) {
        return await this.replace();
      }
      const updateResponse = await api.patch(
        `/organizations/${props.organizationId}/databases/${databaseName}/branches/${branchName}/passwords/${this.output.id}`,
        {
          name,
          cidrs: props.cidrs,
        },
      );

      if (!updateResponse.ok) {
        throw new Error(
          `Failed to update password: ${updateResponse.statusText} ${await updateResponse.text()}`,
        );
      }

      return this({
        ...this.output,
        ...props,
      });
    }

    try {
      const createResponse = await api.post(
        `/organizations/${props.organizationId}/databases/${databaseName}/branches/${branchName}/passwords`,
        {
          name,
          role: props.role,
          replica: props.replica,
          ttl: props.ttl,
          cidrs: props.cidrs,
        },
      );

      if (!createResponse.ok) {
        throw new Error(
          `Failed to create password: ${createResponse.statusText} ${await createResponse.text()}`,
        );
      }

      const data = await createResponse.json<any>();

      return this({
        id: data.id,
        expiresAt: data.expires_at,
        host: data.access_host_url,
        username: data.username,
        password: alchemy.secret(data.plain_text),
        nameSlug,
        ...props,
        name: `${props.name}-${nameSlug}`,
      });
    } catch (error) {
      logger.error("Error managing password:", error);
      throw error;
    }
  },
);
