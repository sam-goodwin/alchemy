import {
  AddTagsToResourceCommand,
  DeleteParameterCommand,
  GetParameterCommand,
  ParameterAlreadyExists,
  ParameterNotFound,
  PutParameterCommand,
  SSMClient,
  type Tag,
} from "@aws-sdk/client-ssm";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { type Secret, isSecret } from "../secret.ts";
import { ignore } from "../util/ignore.ts";
import { logger } from "../util/logger.ts";

/**
 * Base properties shared by all SSM Parameter types
 */
interface SSMParameterBaseProps {
  /**
   * Name of the parameter
   */
  name: string;

  /**
   * Description of the parameter's purpose
   */
  description?: string;

  /**
   * KMS Key ID for SecureString parameters
   * If not specified, uses the default KMS key for SSM
   */
  keyId?: string;

  /**
   * Parameter tier (Standard or Advanced)
   * Default: "Standard"
   */
  tier?: "Standard" | "Advanced";

  /**
   * Policies to apply to the parameter (JSON string)
   */
  policies?: string;

  /**
   * Data type for String parameters
   */
  dataType?: "text" | "aws:ec2:image";

  /**
   * Resource tags for the parameter
   */
  tags?: Record<string, string>;
}

/**
 * Properties for creating or updating an SSM Parameter
 */
export type SSMParameterProps =
  | (SSMParameterBaseProps & {
      /**
       * Type of parameter - SecureString for encrypted values
       */
      type: "SecureString";
      /**
       * Secret value that will be encrypted in AWS SSM and in alchemy state files
       */
      value: Secret;
    })
  | (SSMParameterBaseProps & {
      /**
       * Type of parameter - StringList for arrays of strings
       */
      type: "StringList";
      /**
       * Array of strings that will be stored as comma-separated values
       */
      value: string[];
    })
  | (SSMParameterBaseProps & {
      /**
       * Type of parameter - String for plain text values
       * Default: "String"
       */
      type?: "String";
      /**
       * Plain text value of the parameter
       */
      value: string;
    });

/**
 * Output returned after SSM Parameter creation/update
 */
export type SSMParameter = Resource<"ssm::Parameter"> & {
  /**
   * ARN of the parameter
   */
  arn: string;

  /**
   * Version of the parameter
   */
  version: number;

  /**
   * Last modified date
   */
  lastModifiedDate: Date;
} & SSMParameterProps;

/**
 * AWS SSM Parameter Store Parameter Resource
 *
 * Creates and manages SSM parameters with support for different parameter types,
 * encryption, and automatic tag management. Uses discriminated union types to
 * ensure SecureString parameters always use Secret values and StringList uses arrays.
 *
 * @example
 * // Create a basic string parameter
 * const basicParam = await SSMParameter("app-config", {
 *   name: "/myapp/config/database-url",
 *   value: "postgresql://localhost:5432/myapp",
 *   description: "Database connection URL",
 *   tags: {
 *     Environment: "production",
 *     Application: "myapp"
 *   }
 * });
 *
 * @example
 * // Create a secure string parameter for secrets
 * const secretParam = await SSMParameter("app-secret", {
 *   name: "/myapp/secrets/api-key",
 *   value: alchemy.secret("super-secret-api-key"),
 *   type: "SecureString",
 *   description: "Third-party API key",
 *   tags: {
 *     Environment: "production",
 *     Secret: "true"
 *   }
 * });
 *
 * @example
 * // Create a parameter with custom KMS key
 * const encryptedParam = await SSMParameter("encrypted-config", {
 *   name: "/myapp/config/encrypted",
 *   value: alchemy.secret("sensitive-configuration-data"),
 *   type: "SecureString",
 *   keyId: "alias/myapp-kms-key",
 *   description: "Encrypted configuration data",
 *   tier: "Advanced",
 *   tags: {
 *     Environment: "production",
 *     Encrypted: "true"
 *   }
 * });
 *
 * @example
 * // Create a string list parameter
 * const listParam = await SSMParameter("server-list", {
 *   name: "/myapp/config/servers",
 *   value: ["server1.example.com", "server2.example.com", "server3.example.com"],
 *   type: "StringList",
 *   description: "List of application servers",
 *   tags: {
 *     Environment: "production",
 *     Type: "configuration"
 *   }
 * });
 */
export const SSMParameter = Resource(
  "ssm::Parameter",
  async function (
    this: Context<SSMParameter>,
    _id: string,
    props: SSMParameterProps,
  ): Promise<SSMParameter> {
    const client = new SSMClient({
      endpoint: process.env.AWS_ENDPOINT,
    });

    if (this.phase === "delete") {
      try {
        await ignore(ParameterNotFound.name, () =>
          client.send(
            new DeleteParameterCommand({
              Name: props.name,
            }),
          ),
        );
      } catch (error: any) {
        if (!(error instanceof ParameterNotFound)) {
          throw error;
        }
      }

      return this.destroy();
    }

    const parameterType = props.type || "String";

    // Extract the actual value and handle type-specific conversions
    let parameterValue: string;
    if (isSecret(props.value)) {
      parameterValue = props.value.unencrypted;
    } else if (Array.isArray(props.value)) {
      // Convert string array to comma-separated string for StringList
      parameterValue = props.value.join(",");
    } else {
      parameterValue = props.value;
    }

    try {
      // First, try to create the parameter without overwrite to include tags
      try {
        await client.send(
          new PutParameterCommand({
            Name: props.name,
            Value: parameterValue,
            Type: parameterType,
            Description: props.description,
            KeyId: props.keyId,
            Tier: props.tier,
            Policies: props.policies,
            DataType: props.dataType,
            Overwrite: false, // Don't overwrite, include tags
            Tags: [
              ...Object.entries(props.tags || {}).map(([Key, Value]) => ({
                Key,
                Value,
              })),
              {
                Key: "alchemy_stage",
                Value: this.stage,
              },
              {
                Key: "alchemy_resource",
                Value: this.id,
              },
            ],
          }),
        );
      } catch (error: any) {
        // If parameter already exists, update it with overwrite (no tags in this call)
        if (error instanceof ParameterAlreadyExists) {
          await client.send(
            new PutParameterCommand({
              Name: props.name,
              Value: parameterValue,
              Type: parameterType,
              Description: props.description,
              KeyId: props.keyId,
              Tier: props.tier,
              Policies: props.policies,
              DataType: props.dataType,
              Overwrite: true, // Overwrite existing, no tags
            }),
          );

          // Update tags separately for existing parameters
          const tags: Tag[] = [
            ...Object.entries(props.tags || {}).map(([Key, Value]) => ({
              Key,
              Value,
            })),
            {
              Key: "alchemy_stage",
              Value: this.stage,
            },
            {
              Key: "alchemy_resource",
              Value: this.id,
            },
          ];

          await client.send(
            new AddTagsToResourceCommand({
              ResourceType: "Parameter",
              ResourceId: props.name,
              Tags: tags,
            }),
          );
        } else {
          throw error;
        }
      }

      // Get the updated parameter
      const parameter = await client.send(
        new GetParameterCommand({
          Name: props.name,
          WithDecryption: true,
        }),
      );

      if (!parameter?.Parameter) {
        throw new Error(`Failed to create or update parameter ${props.name}`);
      }

      return this({
        ...props,
        arn: parameter.Parameter.ARN!,
        version: parameter.Parameter.Version!,
        lastModifiedDate: parameter.Parameter.LastModifiedDate!,
        name: parameter.Parameter.Name ?? props.name,
        value: props.value,
        type: (parameter.Parameter.Type as any) ?? parameterType,
      } as SSMParameter);
    } catch (error: any) {
      logger.error(`Error creating/updating parameter ${props.name}:`, error);
      throw error;
    }
  },
);
