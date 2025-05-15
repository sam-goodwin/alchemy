import {
  AttachRolePolicyCommand,
  CreateRoleCommand,
  DeleteRoleCommand,
  DeleteRolePolicyCommand,
  DetachRolePolicyCommand,
  EntityAlreadyExistsException,
  GetRoleCommand,
  IAMClient,
  ListAttachedRolePoliciesCommand,
  NoSuchEntityException,
  PutRolePolicyCommand,
  type Tag,
  TagRoleCommand,
  UpdateAssumeRolePolicyCommand,
  UpdateRoleCommand,
} from "@aws-sdk/client-iam";
import type { Context } from "../context.js";
import { Resource } from "../resource.js";
import { ignore } from "../util/ignore.js";
import type { PolicyDocument } from "./policy.js";

/**
 * Properties for creating or updating an IAM role
 */
export interface RoleProps {
  /**
   * Name of the IAM role
   */
  roleName: string;

  /**
   * Policy that defines which entities can assume this role
   */
  assumeRolePolicy: PolicyDocument;

  /**
   * Optional description of the role's purpose
   */
  description?: string;

  /**
   * Optional path prefix for the role
   */
  path?: string;

  /**
   * Maximum session duration in seconds when assumed
   * Default: 3600 seconds (1 hour)
   */
  maxSessionDuration?: number;

  /**
   * ARN of the policy used to set the permissions boundary
   */
  permissionsBoundary?: string;

  /**
   * Inline policies to embed in the role
   * Each policy must have a unique name and policy document
   */
  policies?: Array<{
    policyName: string;
    policyDocument: PolicyDocument;
  }>;

  /**
   * List of managed policy ARNs to attach to the role
   */
  managedPolicyArns?: string[];

  /**
   * Resource tags for the role
   */
  tags?: Record<string, string>;
}

/**
 * Output returned after IAM role creation/update
 */
export interface Role extends Resource<"iam::Role">, RoleProps {
  /**
   * ARN of the role
   */
  arn: string;

  /**
   * Unique identifier for the role
   */
  uniqueId: string;

  /**
   * The stable and unique string identifying the role
   */
  roleId: string;

  /**
   * When the role was created
   */
  createDate: Date;
}

/**
 * AWS IAM Role Resource
 *
 * Creates and manages IAM roles with support for inline policies, managed policies,
 * and automatic cleanup of attached policies during deletion.
 *
 * @example
 * // Create a basic Lambda execution role with inline policy
 * const basicRole = await Role("lambda-role", {
 *   roleName: "lambda-role",
 *   assumeRolePolicy: {
 *     Version: "2012-10-17",
 *     Statement: [{
 *       Effect: "Allow",
 *       Principal: {
 *         Service: "lambda.amazonaws.com"
 *       },
 *       Action: "sts:AssumeRole"
 *     }]
 *   },
 *   description: "Basic Lambda execution role",
 *   tags: {
 *     Environment: "production"
 *   },
 *   policies: [{
 *     policyName: "logs",
 *     policyDocument: {
 *       Version: "2012-10-17",
 *       Statement: [{
 *         Effect: "Allow",
 *         Action: [
 *           "logs:CreateLogGroup",
 *           "logs:CreateLogStream",
 *           "logs:PutLogEvents"
 *         ],
 *         Resource: "*"
 *       }]
 *     }
 *   }]
 * });
 *
 * @example
 * // Create a role with AWS managed policies
 * const managedRole = await Role("readonly-role", {
 *   roleName: "readonly-role",
 *   assumeRolePolicy: {
 *     Version: "2012-10-17",
 *     Statement: [{
 *       Effect: "Allow",
 *       Principal: {
 *         Service: "lambda.amazonaws.com"
 *       },
 *       Action: "sts:AssumeRole"
 *     }]
 *   },
 *   description: "Role with managed policies",
 *   managedPolicyArns: [
 *     "arn:aws:iam::aws:policy/ReadOnlyAccess"
 *   ],
 *   tags: {
 *     Environment: "production"
 *   }
 * });
 *
 * @example
 * // Create a role with multiple inline policies and custom session duration
 * const customRole = await Role("custom-role", {
 *   roleName: "custom-role",
 *   assumeRolePolicy: {
 *     Version: "2012-10-17",
 *     Statement: [{
 *       Effect: "Allow",
 *       Principal: {
 *         Service: "lambda.amazonaws.com"
 *       },
 *       Action: "sts:AssumeRole"
 *     }]
 *   },
 *   description: "Role with multiple policies",
 *   maxSessionDuration: 7200,
 *   policies: [
 *     {
 *       policyName: "logs",
 *       policyDocument: {
 *         Version: "2012-10-17",
 *         Statement: [{
 *           Effect: "Allow",
 *           Action: [
 *             "logs:CreateLogGroup",
 *             "logs:CreateLogStream",
 *             "logs:PutLogEvents"
 *           ],
 *           Resource: "*"
 *         }]
 *       }
 *     },
 *     {
 *       policyName: "s3",
 *       policyDocument: {
 *         Version: "2012-10-17",
 *         Statement: [{
 *           Effect: "Allow",
 *           Action: "s3:ListBucket",
 *           Resource: "*"
 *         }]
 *       }
 *     }
 *   ],
 *   tags: {
 *     Environment: "production",
 *     Updated: "true"
 *   }
 * });
 */
export const Role = Resource(
  "iam::Role",
  async function (
    this: Context<Role>,
    _id: string,
    props: RoleProps,
  ): Promise<Role> {
    const client = new IAMClient({});

    if (this.phase === "delete") {
      try {
        // Delete any inline policies first
        if (props.policies) {
          for (const policy of props.policies) {
            await ignore(NoSuchEntityException.name, () =>
              client.send(
                new DeleteRolePolicyCommand({
                  RoleName: props.roleName,
                  PolicyName: policy.policyName,
                }),
              ),
            );
          }
        }

        // We need to detach managed policies before deleting the role
        // First, get all attached policies
        try {
          const attachedPoliciesResponse = await client.send(
            new ListAttachedRolePoliciesCommand({
              RoleName: props.roleName,
            }),
          );

          // Detach all managed policies
          const attachedPolicies =
            attachedPoliciesResponse.AttachedPolicies || [];
          for (const policy of attachedPolicies) {
            await ignore(NoSuchEntityException.name, () =>
              client.send(
                new DetachRolePolicyCommand({
                  RoleName: props.roleName,
                  PolicyArn: policy.PolicyArn!,
                }),
              ),
            );
          }
        } catch (error: any) {
          if (error.name !== NoSuchEntityException.name) {
            throw error;
          }
          // Role doesn't exist, no need to continue with detaching policies
        }

        // Try to delete the role, ignoring if it doesn't exist
        await ignore(NoSuchEntityException.name, () =>
          client.send(
            new DeleteRoleCommand({
              RoleName: props.roleName,
            }),
          ),
        );
      } catch (error: any) {
        // If we get any other error besides NoSuchEntityException, log it but don't fail
        // This ensures the resource is still marked as destroyed
        if (error.name !== NoSuchEntityException.name) {
          console.error(`Error deleting role ${props.roleName}:`, error);
        }
      }

      // Always return destroyed state regardless of any errors
      return this.destroy();
    }

    const assumeRolePolicyDocument = JSON.stringify(props.assumeRolePolicy);
    let role;

    try {
      if (this.phase === "create") {
        // Try to create the role
        await client.send(
          new CreateRoleCommand({
            RoleName: props.roleName,
            AssumeRolePolicyDocument: assumeRolePolicyDocument,
            Description: props.description,
            Path: props.path,
            MaxSessionDuration: props.maxSessionDuration,
            PermissionsBoundary: props.permissionsBoundary,
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
      }
    } catch (error: any) {
      if (
        error instanceof EntityAlreadyExistsException &&
        this.phase === "create"
      ) {
        // Check if we were the ones who created it
        const existingRole = await client.send(
          new GetRoleCommand({
            RoleName: props.roleName,
          }),
        );
        const roleTags =
          existingRole.Role?.Tags?.reduce(
            (acc, tag) => {
              acc[tag.Key!] = tag.Value!;
              return acc;
            },
            {} as Record<string, string>,
          ) || {};

        if (
          roleTags.alchemy_stage !== this.stage ||
          roleTags.alchemy_resource !== this.id
        ) {
          throw error;
        }
      } else if (error.name !== NoSuchEntityException.name) {
        throw error;
      }
    }

    // Get or update the role
    role = await client.send(
      new GetRoleCommand({
        RoleName: props.roleName,
      }),
    );

    // Update assume role policy if it changed
    if (role.Role?.AssumeRolePolicyDocument !== assumeRolePolicyDocument) {
      await client.send(
        new UpdateAssumeRolePolicyCommand({
          RoleName: props.roleName,
          PolicyDocument: assumeRolePolicyDocument,
        }),
      );
    }

    // Update role description and max session duration if they changed
    if (
      role.Role?.Description !== props.description ||
      role.Role?.MaxSessionDuration !== props.maxSessionDuration
    ) {
      await client.send(
        new UpdateRoleCommand({
          RoleName: props.roleName,
          Description: props.description,
          MaxSessionDuration: props.maxSessionDuration,
        }),
      );
    }

    // Update tags
    const newTags = {
      ...props.tags,
      alchemy_stage: this.stage,
      alchemy_resource: this.id,
    };
    const tags: Tag[] = Object.entries(newTags).map(([Key, Value]) => ({
      Key,
      Value,
    }));
    await client.send(
      new TagRoleCommand({
        RoleName: props.roleName,
        Tags: tags,
      }),
    );

    // Handle policy changes
    const previousPolicies =
      this.phase === "update" ? this.output!.policies || [] : [];
    const currentPolicies = props.policies || [];

    // Delete policies that were removed
    for (const oldPolicy of previousPolicies) {
      if (
        !currentPolicies.some(
          (p: { policyName: string }) => p.policyName === oldPolicy.policyName,
        )
      ) {
        await ignore(NoSuchEntityException.name, () =>
          client.send(
            new DeleteRolePolicyCommand({
              RoleName: props.roleName,
              PolicyName: oldPolicy.policyName,
            }),
          ),
        );
      }
    }

    // Update or create policies
    for (const policy of currentPolicies) {
      const oldPolicy = previousPolicies.find(
        (p) => p.policyName === policy.policyName,
      );
      if (
        !oldPolicy ||
        JSON.stringify(oldPolicy.policyDocument) !==
          JSON.stringify(policy.policyDocument)
      ) {
        await client.send(
          new PutRolePolicyCommand({
            RoleName: props.roleName,
            PolicyName: policy.policyName,
            PolicyDocument: JSON.stringify(policy.policyDocument),
          }),
        );
      }
    }

    // Handle managed policy attachments
    // Get currently attached policies
    const attachedPoliciesResponse = await client.send(
      new ListAttachedRolePoliciesCommand({
        RoleName: props.roleName,
      }),
    );

    const currentAttachedPolicies =
      attachedPoliciesResponse.AttachedPolicies || [];
    const currentPolicyArns = currentAttachedPolicies.map((p) => p.PolicyArn!);

    // If we're updating, use an empty array as default when managedPolicyArns is undefined
    // to ensure we detach all managed policies
    const desiredPolicyArns = props.managedPolicyArns || [];

    // Detach policies that are no longer needed
    for (const policyArn of currentPolicyArns) {
      if (!desiredPolicyArns.includes(policyArn)) {
        await client.send(
          new DetachRolePolicyCommand({
            RoleName: props.roleName,
            PolicyArn: policyArn,
          }),
        );
      }
    }

    // Attach new policies that weren't attached before
    for (const policyArn of desiredPolicyArns) {
      if (!currentPolicyArns.includes(policyArn)) {
        await client.send(
          new AttachRolePolicyCommand({
            RoleName: props.roleName,
            PolicyArn: policyArn,
          }),
        );
      }
    }

    if (!role?.Role) {
      throw new Error(`Failed to create or update role ${props.roleName}`);
    }

    return this({
      ...props,
      arn: role.Role.Arn!,
      uniqueId: role.Role.RoleId!,
      roleId: role.Role.RoleId!,
      roleName: role.Role.RoleName ?? props.roleName,
      createDate: role.Role.CreateDate!,
    });
  },
);
