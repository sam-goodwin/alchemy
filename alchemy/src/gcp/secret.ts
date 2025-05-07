import type { Context } from "../context";
import { Resource as BaseResource, Resource } from "../resource";
import type { Secret as AlchemySecret } from "../secret";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { GrpcStatus } from "./grpc-status";

// Helper function to avoid dependency
const isObject = (object: any) => {
  return object != null && typeof object === "object";
};

const isDeepEqual = (object1: any, object2: any) => {
  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);

  if (objKeys1.length !== objKeys2.length) return false;

  for (var key of objKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    const areObjects = isObject(value1) && isObject(value2);

    if (
      (areObjects && !isDeepEqual(value1, value2)) ||
      (!areObjects && value1 !== value2)
    ) {
      return false;
    }
  }
  return true;
};

// Helper function to determine the type of replication ('automatic' or 'userManaged')
function getReplicationType(
  replication: SecretProps["replication"] | undefined | null,
): "automatic" | "userManaged" {
  if (!replication) {
    return "automatic"; // Default to automatic if null or undefined
  }
  if ("userManaged" in replication && replication.userManaged) {
    // Check key and ensure value is not null/undefined
    return "userManaged";
  }
  return "automatic"; // Assume automatic otherwise
}

// Helper function to compare userManaged replica locations (order-independent)
function compareUserManagedReplicas(
  repA: SecretProps["replication"] | undefined | null,
  repB: SecretProps["replication"] | undefined | null,
): boolean {
  const typeA = getReplicationType(repA);
  const typeB = getReplicationType(repB);

  // If types are different, they are not equal in this context
  if (typeA !== typeB) return false;
  // If not userManaged, we don't compare replicas here
  if (typeA !== "userManaged") return true; // Types are the same and not userManaged

  // Extract, sort, and compare replica locations
  const locationsA =
    (
      repA as { userManaged: { replicas: { location: string }[] } }
    )?.userManaged?.replicas
      ?.map((r) => r.location)
      .sort() || [];
  const locationsB =
    (
      repB as { userManaged: { replicas: { location: string }[] } }
    )?.userManaged?.replicas
      ?.map((r) => r.location)
      .sort() || [];

  return isDeepEqual(locationsA, locationsB);
}

/**
 * Properties for creating or updating a Google Cloud Secret Manager Secret.
 */
export interface SecretProps {
  /**
   * The secret data. This should be wrapped in `alchemy.secret()`.
   * Changing this value will add a new version to the secret during update.
   */
  secretValue: AlchemySecret;

  /**
   * Labels to apply to the secret.
   * @example { env: "production", team: "backend" }
   */
  labels?: Record<string, string>;

  /**
   * Replication policy for the secret. Defaults to automatic.
   * Use 'userManaged' for user-managed replication.
   * @default { automatic: {} }
   */
  replication?:
    | {
        automatic:
          | {}
          | { customerManagedEncryption?: { kmsKeyName?: string | null } };
      }
    | {
        userManaged: {
          replicas: {
            location: string;
            customerManagedEncryption?: { kmsKeyName?: string | null };
          }[];
        };
      };
}

/**
 * Output returned after Google Cloud Secret creation/update.
 * Extends the base Resource interface to include standard Alchemy properties.
 */
export interface Secret
  extends BaseResource<"google-cloud::Secret">,
    Omit<SecretProps, "secretValue"> {
  /**
   * The resource name of the secret in the format `projects/$project/secrets/$secret`.
   */
  name: string;

  /**
   * The resource name of the latest version of the secret,
   * format: `projects/$project/secrets/$secret/versions/latest` or specific version `projects/$project/secrets/$secret/versions/$version`.
   */
  latestVersionName: string;

  /**
   * The time at which the secret was created. Formatted as a timestamp.
   * Note: The client library returns google.protobuf.Timestamp objects.
   * We'll convert it to ISO string for consistency.
   */
  createTime: string; // ISO 8601 format string

  /**
   * The replication policy configured for the secret, reflecting the actual state from GCP.
   */
  replication?: SecretProps["replication"]; // Reflect the actual type

  /**
   * The replication status of the secret. Only populated if replication is set.
   */
  replicationStatus?: any; // Structure depends on replication policy
}

// Helper function to convert protobuf Timestamp to ISO string
function timestampToISO(timestamp: any): string {
  if (
    !timestamp ||
    typeof timestamp.seconds !== "number" ||
    typeof timestamp.nanos !== "number"
  ) {
    return new Date().toISOString(); // Fallback or handle error
  }
  const millis =
    timestamp.seconds * 1000 + Math.floor(timestamp.nanos / 1000000);
  return new Date(millis).toISOString();
}

/**
 * Represents a secret stored in Google Cloud Secret Manager using the official client library.
 */
export const Secret = Resource(
  "google-cloud::Secret",
  async function (
    this: Context<Secret>,
    secretId: string, // This is the short ID provided by the user
    props: SecretProps,
  ): Promise<Secret> {
    // Instantiate the official client
    // By default, it uses Application Default Credentials (ADC)
    // See: https://cloud.google.com/docs/authentication/provide-credentials-adc
    const client = new SecretManagerServiceClient();

    // --- Get Project ID from the client library ---
    // Note: This might require an async call in some auth scenarios,
    // but often works synchronously if ADC is configured via env var.
    // For simplicity, assuming it's readily available or handle async if needed.
    const projectId =
      process.env.GOOGLE_CLOUD_PROJECT ||
      process.env.GOOGLE_PROJECT_ID ||
      (await client.getProjectId());

    if (!projectId) {
      throw new Error(
        "Google Cloud Project ID could not be determined. Set GOOGLE_CLOUD_PROJECT or ensure ADC is configured correctly.",
      );
    }

    const parentPath = `projects/${projectId}`;
    // Construct the expected full secret name (used for get/delete/update)
    const secretName = `projects/${projectId}/secrets/${secretId}`;

    // --- Delete Phase ---
    if (this.phase === "delete") {
      try {
        await client.deleteSecret({ name: secretName });
      } catch (error: any) {
        // Check if the error is "NOT_FOUND" (already deleted)
        if (error.code !== GrpcStatus.NOT_FOUND) {
          throw new Error(
            `Failed to delete secret ${secretName}: ${error.message}`,
          );
        }
      }
      // Return the destroyed state
      return this.destroy();
    }

    // --- Create or Update Phase ---
    try {
      let currentSecret: any; // To store the state fetched/created/updated from GCP
      let latestVersionNameResult: string | undefined | null =
        this.output?.latestVersionName; // Keep previous version unless updated
      let isCreate = this.phase !== "update" || !this.output?.name;

      // Get the plain secret value
      const secretValueString = props.secretValue.unencrypted;

      if (isCreate) {
        // --- Create Phase ---
        try {
          const [createdSecret] = await client.createSecret({
            parent: parentPath,
            secretId: secretId,
            secret: {
              replication: props.replication || { automatic: {} },
              labels: props.labels || {},
            },
          });
          currentSecret = createdSecret;
          // Add the initial version after creating the secret container
          const [version] = await client.addSecretVersion({
            parent: currentSecret.name!, // Use name from created secret response
            payload: {
              // Client library expects Uint8Array or base64 string for data
              data: Buffer.from(secretValueString),
            },
          });
          latestVersionNameResult = version.name;
        } catch (error: any) {
          // Handle conflict (already exists) - try to fetch and treat as update/import
          if (error.code === GrpcStatus.ALREADY_EXISTS) {
            try {
              const [existingSecret] = await client.getSecret({
                name: secretName,
              });
              currentSecret = existingSecret;
              // Proceed to add version (potentially update labels if needed)
              const [version] = await client.addSecretVersion({
                parent: currentSecret.name!,
                payload: { data: Buffer.from(secretValueString) },
              });
              latestVersionNameResult = version.name;
            } catch (getOrAddVersionError: any) {
              throw new Error(
                `Failed to import existing secret ${secretName}: ${getOrAddVersionError.message}`,
              );
            }
          } else {
            throw new Error(
              `Failed to create secret ${secretId}: ${error.message}`,
            );
          }
        }
      } else {
        // --- Update Phase ---
        // Use the name from the previous state
        const existingSecretName = this.output!.name;
        currentSecret = this.output; // Start with previous state
        const currentReplication = this.output?.replication;
        const desiredReplication = props.replication;
        const currentReplicationType = getReplicationType(currentReplication);
        const desiredReplicationType = getReplicationType(desiredReplication);

        // Check if the fundamental type changed (automatic vs userManaged)
        if (currentReplicationType !== desiredReplicationType) {
          throw new Error(
            `Replication policy type for secret ${existingSecretName} cannot be changed after creation.`,
          );
        }

        // If both are userManaged, check if the replica locations changed
        if (
          currentReplicationType === "userManaged" &&
          !compareUserManagedReplicas(currentReplication, desiredReplication)
        ) {
          console.error(
            `Attempted to change user-managed replica locations for secret ${existingSecretName}, which is not allowed.`,
          );
          throw new Error(
            `User-managed replica locations for secret ${existingSecretName} cannot be changed after creation.`,
          );
        }

        // Compare labels - client library requires explicit updateMask
        let needsLabelUpdate = false;
        if (props.labels !== undefined) {
          // Basic check: update if labels prop exists. Better: deep compare props.labels vs this.output.labels
          needsLabelUpdate = true; // Assuming update if labels are provided
        }

        if (needsLabelUpdate) {
          try {
            const [updatedSecret] = await client.updateSecret({
              secret: {
                name: existingSecretName,
                labels: props.labels || {}, // Send current labels
              },
              updateMask: { paths: ["labels"] }, // Specify only labels should be updated
            });
            currentSecret = updatedSecret; // Update local state with result
          } catch (error: any) {
            throw new Error(
              `Failed to update secret labels for ${existingSecretName}: ${error.message}`,
            );
          }
        } else {
          const [fetchedSecret] = await client.getSecret({
            name: existingSecretName,
          });
          currentSecret = fetchedSecret;
        }

        try {
          const [version] = await client.addSecretVersion({
            parent: existingSecretName,
            payload: {
              data: Buffer.from(secretValueString),
            },
          });
          latestVersionNameResult = version.name;
        } catch (error: any) {
          throw new Error(
            `Failed to add version to secret ${existingSecretName}: ${error.message}`,
          );
        }
      }

      // --- Construct Final Output ---
      // Ensure currentSecret has the latest data after create/update/fetch
      if (!currentSecret || !currentSecret.name) {
        // If update didn't fetch, get the final state
        if (this.phase === "update" && this.output?.name) {
          const [finalSecretState] = await client.getSecret({
            name: this.output.name,
          });
          currentSecret = finalSecretState;
        } else {
          throw new Error(
            "Internal error: Secret state could not be determined after operation.",
          );
        }
      }

      let finalReplicationObject: SecretProps["replication"] | undefined;
      const sourceReplication = currentSecret.replication; // The object from GCP client

      if (sourceReplication) {
        // Check if it's userManaged and has the userManaged key
        if (
          "userManaged" in sourceReplication &&
          sourceReplication.userManaged
        ) {
          finalReplicationObject = {
            userManaged: sourceReplication.userManaged, // Copy only the userManaged part
          };
          // Check if it's automatic and has the automatic key
        } else if (
          "automatic" in sourceReplication &&
          sourceReplication.automatic
        ) {
          finalReplicationObject = {
            automatic: sourceReplication.automatic, // Copy only the automatic part
          };
        } else {
          // Handle cases where replication object exists but doesn't match expected keys
          console.warn(
            "Received unexpected replication structure:",
            JSON.stringify(sourceReplication),
          );
          finalReplicationObject = { automatic: {} };
        }
      } else {
        finalReplicationObject = { automatic: {} };
      }

      const finalOutput = {
        name: currentSecret.name!,
        labels: currentSecret.labels || {}, // Use labels from the fetched/updated secret
        replication: finalReplicationObject, // Use replication info from GCP
        // Convert timestamp from GCP format (protobuf Timestamp) to ISO string
        createTime: timestampToISO(currentSecret.createTime),
        latestVersionName: latestVersionNameResult!, // Should be set by this point
        replicationStatus: (currentSecret.replication as any)?.status, // Example if status exists
      };

      // Call the context function `this()` with the final state object.
      return this(finalOutput);
    } catch (error: any) {
      // Re-throw the error to ensure the Alchemy operation fails
      throw error;
    }
  },
);
