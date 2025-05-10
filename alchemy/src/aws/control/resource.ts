import type { Context } from "../../context";
import { registerDeletionHandler, Resource } from "../../resource";
import { createCloudControlClient } from "./client";

/**
 * Properties for creating or updating a Cloud Control resource
 */
export interface CloudControlResourceProps {
  /**
   * The type name of the resource (e.g. AWS::S3::Bucket)
   */
  typeName: string;

  /**
   * The desired state of the resource
   */
  desiredState: Record<string, any>;

  /**
   * Optional AWS region
   * @default AWS_REGION environment variable
   */
  region?: string;

  /**
   * AWS access key ID (overrides environment variable)
   */
  accessKeyId?: string;

  /**
   * AWS secret access key (overrides environment variable)
   */
  secretAccessKey?: string;

  /**
   * AWS session token for temporary credentials
   */
  sessionToken?: string;
}

/**
 * Output returned after Cloud Control resource creation/update
 */
export interface CloudControlResource
  extends Resource<"aws::CloudControlResource">,
    CloudControlResourceProps {
  /**
   * The identifier of the resource
   */
  id: string;

  /**
   * Time at which the resource was created
   */
  createdAt: number;
}

interface CloudControlResourceInfo {
  identifier: string;
  typeName: string;
  properties: Record<string, any>;
}

interface CloudControlError {
  code?: string;
  message?: string;
}

// Register wildcard deletion handler for AWS::* pattern
registerDeletionHandler(
  "AWS::*",
  async function (this: Context<any>, pattern: string) {
    const client = createCloudControlClient();

    // Extract service name from pattern (e.g. "AWS::S3::*" -> "S3")
    const serviceName = pattern.split("::")[1];

    try {
      // List all resources of the service type
      const resources = await client.listResources(`AWS::${serviceName}::*`);

      // Delete each resource and track operations
      const deletionPromises = (
        resources.resources as CloudControlResourceInfo[]
      ).map(async (resource) => {
        try {
          console.log(
            `Deleting resource ${resource.identifier} (${resource.typeName})`
          );

          const response = await client.deleteResource(
            resource.typeName,
            resource.identifier
          );

          // Wait for deletion to complete
          const result = await response;

          if (result.status === "FAILED") {
            console.error(
              `Failed to delete resource ${resource.identifier}: ${result.message}`
            );
          } else {
            console.log(`Successfully deleted resource ${resource.identifier}`);
          }
        } catch (error: unknown) {
          const cloudError = error as CloudControlError;
          if (cloudError.code === "ResourceNotFoundException") {
            // Resource already deleted, not an error
            console.log(`Resource ${resource.identifier} already deleted`);
          } else {
            console.error(
              `Error deleting resource ${resource.identifier}:`,
              error
            );
          }
        }
      });

      // Wait for all deletions to complete
      await Promise.allSettled(deletionPromises);
    } catch (error: unknown) {
      const cloudError = error as CloudControlError;
      if (cloudError.code === "ResourceNotFoundException") {
        // No resources found, not an error
        console.log(`No resources found matching pattern ${pattern}`);
      } else {
        console.error(`Error listing resources for pattern ${pattern}:`, error);
      }
    }
  }
);

// Cache for memoizing resource handlers
const resourceHandlers: Record<string, any> = {};

/**
 * Creates a memoized Resource handler for a CloudFormation resource type
 *
 * @param typeName CloudFormation resource type (e.g., "AWS::S3::Bucket")
 * @returns A memoized Resource handler for the specified type
 */
export function createResourceType(typeName: string) {
  // Return cached handler if it exists
  if (resourceHandlers[typeName]) {
    return resourceHandlers[typeName];
  }

  // Create a new handler
  const handler = Resource(
    typeName,
    async function (this: Context<any>, id: string, props: any): Promise<any> {
      // Initialize the Cloud Control API client
      const client = createCloudControlClient();

      if (this.phase === "delete") {
        try {
          if (this.output?.id) {
            await client.deleteResource(typeName, this.output.id);
          }
        } catch (error: any) {
          // Check if the error indicates the resource was already gone
          // Check code or name depending on how aws4fetch surfaces it
          if (
            error.code === "ResourceNotFoundException" ||
            error.name === "ResourceNotFoundException"
          ) {
            console.log(
              `Resource ${typeName} with ID ${this.output?.id} already deleted.`
            );
          } else {
            // For all other errors, log and re-throw
            console.error(
              `Error deleting resource ${typeName} with ID ${this.output?.id}:`,
              error
            );
            throw error; // Re-throw the error
          }
        }
        return this.destroy();
      }

      try {
        let response;

        if (this.phase === "update" && this.output?.id) {
          // For updates, we need to create a JSON Patch document
          const patchDocument = {
            desiredState: props,
          };

          response = await client.updateResource(
            typeName,
            this.output.id,
            patchDocument
          );

          // Poll for completion
          const result = await response;

          if (result.status === "FAILED") {
            throw new Error(`Failed to update ${typeName}: ${result.message}`);
          }

          // Get the current state after update
          const currentState = await client.getResource(
            typeName,
            this.output.id
          );
          return this({
            id: this.output.id,
            ...currentState,
          });
        } else {
          // Create new resource
          response = await client.createResource(typeName, props);

          // Poll for completion
          const result = await response;

          if (result.status === "FAILED") {
            throw new Error(`Failed to create ${typeName}: ${result.message}`);
          }

          // Get the created resource state
          const currentState = await client.getResource(
            typeName,
            result.identifier!
          );
          return this({
            id: result.identifier!,
            ...currentState,
          });
        }
      } catch (error) {
        console.error(`Error in ${this.phase} phase for ${typeName}:`, error);
        throw error;
      }
    }
  );

  // Cache and return the handler
  resourceHandlers[typeName] = handler;
  return handler;
}

/**
 * AWS Cloud Control Resource (Generic Handler)
 *
 * This exported resource provides a generic way to manage any AWS resource
 * supported by the Cloud Control API by explicitly passing the `typeName`.
 * It is intended for direct use when the specific resource type might not be
 * known at compile time or when not using the typed Proxy interface.
 *
 * For the strongly-typed Proxy interface (e.g., `AWS.S3.Bucket(...)`), Alchemy
 * uses internal handlers generated by the `createResourceType` factory function.
 *
 * Creates and manages AWS resources using the Cloud Control API.
 *
 * @example
 * // Create an S3 bucket
 * const bucket = await CloudControlResource("my-bucket", {
 *   typeName: "AWS::S3::Bucket",
 *   desiredState: {
 *     BucketName: "my-unique-bucket-name",
 *     VersioningConfiguration: {
 *       Status: "Enabled"
 *     }
 *   }
 * });
 *
 * @example
 * // Create a DynamoDB table
 * const table = await CloudControlResource("users-table", {
 *   typeName: "AWS::DynamoDB::Table",
 *   desiredState: {
 *     TableName: "users",
 *     AttributeDefinitions: [
 *       {
 *         AttributeName: "id",
 *         AttributeType: "S"
 *       }
 *     ],
 *     KeySchema: [
 *       {
 *         AttributeName: "id",
 *         KeyType: "HASH"
 *       }
 *     ],
 *     ProvisionedThroughput: {
 *       ReadCapacityUnits: 5,
 *       WriteCapacityUnits: 5
 *     }
 *   }
 * });
 */
export const CloudControlResource = Resource(
  "aws::CloudControlResource",
  async function (
    this: Context<CloudControlResource>,
    id: string,
    props: CloudControlResourceProps
  ): Promise<CloudControlResource> {
    const client = createCloudControlClient({
      region: props.region,
      accessKeyId: props.accessKeyId,
      secretAccessKey: props.secretAccessKey,
      sessionToken: props.sessionToken,
    });

    if (this.phase === "delete") {
      if (this.output?.id) {
        try {
          await client.deleteResource(props.typeName, this.output.id);
        } catch (error) {
          // Log but don't throw on cleanup errors
          console.error(`Error deleting resource ${id}:`, error);
        }
      }
      return this.destroy();
    }

    let response;
    if (this.phase === "update" && this.output?.id) {
      // Update existing resource
      response = await client.updateResource(
        props.typeName,
        this.output.id,
        props.desiredState
      );
    } else {
      // Create new resource
      response = await client.createResource(
        props.typeName,
        props.desiredState
      );
    }

    if (response.status === "FAILED") {
      throw new Error(
        `Failed to ${this.phase} resource ${id}: ${response.message}`
      );
    }

    return this({
      ...props,
      id: response.identifier!,
      createdAt: Date.now(),
    });
  }
);
