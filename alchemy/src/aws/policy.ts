import {
  CreatePolicyCommand,
  CreatePolicyVersionCommand,
  DeletePolicyCommand,
  DeletePolicyVersionCommand,
  GetPolicyCommand,
  GetPolicyVersionCommand,
  IAMClient,
  ListPolicyVersionsCommand,
  NoSuchEntityException,
} from "@aws-sdk/client-iam";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { retry } from "./retry.ts";

/**
 * Type of effect for a policy statement
 */
export type Effect = "Allow" | "Deny";

/**
 * A single statement within an IAM policy document
 */
export interface PolicyStatement {
  /**
   * Optional identifier for the statement
   */
  Sid?: string;

  /**
   * Whether to allow or deny the specified actions
   */
  Effect: Effect;

  /**
   * Actions that the policy allows or denies
   */
  Action: string | string[];

  /**
   * Resources that the policy applies to
   */
  Resource?: string | string[];

  /**
   * Additional conditions for when the policy applies
   */
  Condition?: Record<string, Record<string, string | string[]>>;

  /**
   * AWS principals that the policy applies to
   */
  Principal?: Record<string, string | string[]>;

  /**
   * AWS principals that the policy explicitly does not apply to
   */
  NotPrincipal?: Record<string, string | string[]>;

  /**
   * Actions that are explicitly not included in this statement
   */
  NotAction?: string | string[];

  /**
   * Resources that are explicitly not included in this statement
   */
  NotResource?: string | string[];
}

/**
 * An IAM policy document containing one or more statements
 */
export interface PolicyDocument {
  /**
   * Policy language version (must be "2012-10-17")
   */
  Version: "2012-10-17";

  /**
   * List of policy statements
   */
  Statement: PolicyStatement[];
}

/**
 * Properties for creating or updating an IAM policy
 */
export interface PolicyProps {
  /**
   * Name of the policy
   */
  policyName: string;

  /**
   * Policy document defining the permissions
   */
  document: PolicyDocument;

  /**
   * Optional description of the policy's purpose
   */
  description?: string;

  /**
   * Optional path prefix for the policy
   */
  path?: string;

  /**
   * Optional resource tags
   */
  tags?: Record<string, string>;
}

/**
 * Output returned after IAM policy creation/update
 */
export interface Policy extends Resource<"iam::Policy">, PolicyProps {
  /**
   * ARN of the policy
   */
  arn: string;

  /**
   * ID of the default policy version
   */
  defaultVersionId: string;

  /**
   * Number of entities the policy is attached to
   */
  attachmentCount: number;

  /**
   * When the policy was created
   */
  createDate: Date;

  /**
   * When the policy was last updated
   */
  updateDate: Date;

  /**
   * Whether the policy can be attached to IAM users/roles
   */
  isAttachable: boolean;
}

/**
 * AWS IAM Policy Resource
 *
 * Creates and manages IAM policies that define permissions for AWS services and resources.
 * Supports automatic versioning and updates when policy content changes.
 *
 * @example
 * // Create a basic S3 bucket access policy
 * const s3Policy = await Policy("bucket-access", {
 *   policyName: "s3-bucket-access",
 *   document: {
 *     Version: "2012-10-17",
 *     Statement: [{
 *       Effect: "Allow",
 *       Action: [
 *         "s3:GetObject",
 *         "s3:PutObject"
 *       ],
 *       Resource: `${bucket.arn}/*`
 *     }]
 *   }
 * });
 *
 * @example
 * // Create a policy with multiple statements and conditions
 * const apiPolicy = await Policy("api-access", {
 *   policyName: "api-gateway-access",
 *   document: {
 *     Version: "2012-10-17",
 *     Statement: [
 *       {
 *         Sid: "InvokeAPI",
 *         Effect: "Allow",
 *         Action: "execute-api:Invoke",
 *         Resource: `${api.executionArn}/*`,
 *         Condition: {
 *           StringEquals: {
 *             "aws:SourceVpc": vpc.id
 *           }
 *         }
 *       },
 *       {
 *         Sid: "ReadLogs",
 *         Effect: "Allow",
 *         Action: [
 *           "logs:GetLogEvents",
 *           "logs:FilterLogEvents"
 *         ],
 *         Resource: `${api.logGroupArn}:*`
 *       }
 *     ]
 *   },
 *   description: "Allows invoking API Gateway endpoints and reading logs",
 *   tags: {
 *     Service: "API Gateway",
 *     Environment: "production"
 *   }
 * });
 *
 * @example
 * // Create a policy that denies access based on tags
 * const denyPolicy = await Policy("deny-production", {
 *   policyName: "deny-production-access",
 *   document: {
 *     Version: "2012-10-17",
 *     Statement: [{
 *       Effect: "Deny",
 *       Action: "*",
 *       Resource: "*",
 *       Condition: {
 *         StringEquals: {
 *           "aws:ResourceTag/Environment": "production"
 *         }
 *       }
 *     }]
 *   }
 * });
 */
export const Policy = Resource(
  "iam::Policy",
  async function (
    this: Context<Policy>,
    _id: string,
    props: PolicyProps,
  ): Promise<Policy> {
    const client = new IAMClient({
      endpoint: process.env.AWS_ENDPOINT,
    });
    const policyArn = `arn:aws:iam::${process.env.AWS_ACCOUNT_ID}:policy${props.path || "/"}${props.policyName}`;

    if (this.phase === "delete") {
      try {
        // List and delete all non-default versions first
        const versions = await retry(() =>
          client.send(
            new ListPolicyVersionsCommand({
              PolicyArn: policyArn,
            }),
          ),
        );

        for (const version of versions.Versions || []) {
          if (!version.IsDefaultVersion) {
            await retry(() =>
              client.send(
                new DeletePolicyVersionCommand({
                  PolicyArn: policyArn,
                  VersionId: version.VersionId,
                }),
              ),
            );
          }
        }

        // Delete the policy
        await retry(() =>
          client.send(
            new DeletePolicyCommand({
              PolicyArn: policyArn,
            }),
          ),
        );
      } catch (error: any) {
        if (error.name !== NoSuchEntityException.name) {
          throw error;
        }
      }
      return this.destroy();
    }
    try {
      // Check if policy exists
      const existingPolicy = await retry(() =>
        client.send(
          new GetPolicyCommand({
            PolicyArn: policyArn,
          }),
        ),
      );

      // Get current policy version
      const currentVersion = await retry(() =>
        client.send(
          new GetPolicyVersionCommand({
            PolicyArn: policyArn,
            VersionId: existingPolicy.Policy!.DefaultVersionId!,
          }),
        ),
      );

      const currentDocument = JSON.parse(
        decodeURIComponent(currentVersion.PolicyVersion!.Document!),
      );

      // If policy document changed, create new version
      if (JSON.stringify(currentDocument) !== JSON.stringify(props.document)) {
        // List versions to check if we need to delete old ones
        const versions = await retry(() =>
          client.send(
            new ListPolicyVersionsCommand({
              PolicyArn: policyArn,
            }),
          ),
        );

        // Delete oldest version if we have 5 versions (maximum allowed)
        if (versions.Versions?.length === 5) {
          const oldestVersion = versions.Versions.sort(
            (a, b) => a.CreateDate!.getTime() - b.CreateDate!.getTime(),
          )[0];

          if (!oldestVersion.IsDefaultVersion) {
            await retry(() =>
              client.send(
                new DeletePolicyVersionCommand({
                  PolicyArn: policyArn,
                  VersionId: oldestVersion.VersionId!,
                }),
              ),
            );
          }
        }

        // Create new version
        await retry(() =>
          client.send(
            new CreatePolicyVersionCommand({
              PolicyArn: policyArn,
              PolicyDocument: JSON.stringify(props.document),
              SetAsDefault: true,
            }),
          ),
        );
      }

      const policy = await retry(() =>
        client.send(
          new GetPolicyCommand({
            PolicyArn: policyArn,
          }),
        ),
      );

      return this({
        ...props,
        arn: policy.Policy!.Arn!,
        defaultVersionId: policy.Policy!.DefaultVersionId!,
        attachmentCount: policy.Policy!.AttachmentCount!,
        createDate: policy.Policy!.CreateDate!,
        updateDate: policy.Policy!.UpdateDate!,
        isAttachable: policy.Policy!.IsAttachable!,
      });
    } catch (error: any) {
      if (error.name === "NoSuchEntity") {
        // Create new policy
        const newPolicy = await retry(() =>
          client.send(
            new CreatePolicyCommand({
              PolicyName: props.policyName,
              PolicyDocument: JSON.stringify(props.document),
              Description: props.description,
              Path: props.path,
              Tags: props.tags
                ? Object.entries(props.tags).map(([Key, Value]) => ({
                    Key,
                    Value,
                  }))
                : undefined,
            }),
          ),
        );

        return this({
          ...props,
          arn: newPolicy.Policy!.Arn!,
          defaultVersionId: newPolicy.Policy!.DefaultVersionId!,
          attachmentCount: newPolicy.Policy!.AttachmentCount!,
          createDate: newPolicy.Policy!.CreateDate!,
          updateDate: newPolicy.Policy!.UpdateDate!,
          isAttachable: newPolicy.Policy!.IsAttachable!,
        });
      }
      throw error;
    }
  },
);
