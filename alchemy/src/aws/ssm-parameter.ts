import { Effect } from "effect";
import { type Secret, isSecret } from "../secret.ts";
import { logger } from "../util/logger.ts";
import { createAwsClient } from "./client.ts";
import { EffectResource } from "./effect-resource.ts";

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
export const SSMParameter = EffectResource<SSMParameter, SSMParameterProps>(
  "ssm::Parameter",
  function* (_id, props) {
    const client = yield* createAwsClient({ service: "ssm" });

    if (this.phase === "delete") {
      yield* client
        .postJson("/", {
          Action: "DeleteParameter",
          Name: props.name,
          Version: "2014-11-06",
        })
        .pipe(Effect.catchAll(() => Effect.unit));

      return yield* this.destroy();
    }

    const parameterType = props.type || "String";

    // Extract the actual value and handle type-specific conversions
    const parameterValue = isSecret(props.value)
      ? props.value.unencrypted
      : Array.isArray(props.value)
        ? props.value.join(",")
        : props.value;

    // Helper to create tags with alchemy defaults
    const createTags = () => [
      ...Object.entries(props.tags || {}).map(([Key, Value]) => ({
        Key,
        Value,
      })),
      { Key: "alchemy_stage", Value: this.stage },
      { Key: "alchemy_resource", Value: this.id },
    ];

    // Helper to create base parameter params
    const createBaseParams = (overwrite: boolean) => {
      const params: Record<string, any> = {
        Action: "PutParameter",
        Name: props.name,
        Value: parameterValue,
        Type: parameterType,
        Overwrite: overwrite,
        Version: "2014-11-06",
      };

      if (props.description) params.Description = props.description;
      if (props.keyId) params.KeyId = props.keyId;
      if (props.tier) params.Tier = props.tier;
      if (props.policies) params.Policies = props.policies;
      if (props.dataType) params.DataType = props.dataType;

      return params;
    };

    // Try to create parameter with tags first
    const createWithTags = Effect.gen(function* () {
      const tags = createTags();
      const putParams = createBaseParams(false);

      // Add tags to parameters
      tags.forEach((tag, index) => {
        putParams[`Tags.member.${index + 1}.Key`] = tag.Key;
        putParams[`Tags.member.${index + 1}.Value`] = tag.Value;
      });

      yield* client.postJson("/", putParams);
    });

    // Update existing parameter and tags separately
    const updateExisting = Effect.gen(function* () {
      const updateParams = createBaseParams(true);
      yield* client.postJson("/", updateParams);

      // Update tags separately for existing parameters
      const tags = createTags();
      const tagParams: Record<string, any> = {
        Action: "AddTagsToResource",
        ResourceType: "Parameter",
        ResourceId: props.name,
        Version: "2014-11-06",
      };

      tags.forEach((tag, index) => {
        tagParams[`Tags.member.${index + 1}.Key`] = tag.Key;
        tagParams[`Tags.member.${index + 1}.Value`] = tag.Value;
      });

      yield* client.postJson("/", tagParams);
    });

    // Try create first, fallback to update if already exists
    yield* createWithTags.pipe(
      Effect.catchSome((error) => {
        if (
          error._tag === "AwsError" &&
          error.message.includes("AlreadyExists")
        ) {
          return updateExisting;
        }
        return Effect.fail(error);
      }),
    );

    // Get the updated parameter
    const parameter = yield* client
      .postJson<{ Parameter: any }>("/", {
        Action: "GetParameter",
        Name: props.name,
        WithDecryption: true,
        Version: "2014-11-06",
      })
      .pipe(
        Effect.catchAll((error) => {
          return Effect.sync(() =>
            logger.error(
              `Error creating/updating parameter ${props.name}:`,
              error,
            ),
          ).pipe(Effect.flatMap(() => Effect.fail(error)));
        }),
      );

    if (!parameter?.Parameter) {
      yield* Effect.fail(
        new Error(`Failed to create or update parameter ${props.name}`),
      );
    }

    return this({
      ...props,
      arn: parameter.Parameter.ARN,
      version: parameter.Parameter.Version,
      lastModifiedDate: new Date(parameter.Parameter.LastModifiedDate),
      name: parameter.Parameter.Name ?? props.name,
      value: props.value,
      type: parameter.Parameter.Type ?? parameterType,
    } as SSMParameter);
  },
);
