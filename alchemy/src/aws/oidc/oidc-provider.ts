import {
  CreateOpenIDConnectProviderCommand,
  DeleteOpenIDConnectProviderCommand,
  GetOpenIDConnectProviderCommand,
  GetRoleCommand,
  IAMClient,
  type Tag,
  UpdateAssumeRolePolicyCommand,
} from "@aws-sdk/client-iam";
import type { Context } from "../../context.js";
import { Resource } from "../../resource.js";
import { AccountId } from "../account-id.js";

/**
 * Properties for configuring an AWS OIDC provider for GitHub Actions
 */
export interface OIDCProviderProps {
  /**
   * The GitHub organization or user that owns the repository
   * Example: "my-org" or "my-username"
   */
  owner: string;

  /**
   * The name of the GitHub repository
   * Example: "my-repo"
   */
  repository: string;

  /**
   * Optional list of branches to restrict access to
   * If not provided, all branches will be allowed
   * Example: ["main", "prod"]
   */
  branches?: string[];

  /**
   * Optional list of environments to restrict access to
   * If not provided, all environments will be allowed
   * Example: ["staging", "production"]
   */
  environments?: string[];

  /**
   * The ARN of the IAM role to be assumed
   * Format: arn:aws:iam::account-id:role/role-name
   */
  roleArn: string;

  /**
   * Optional maximum session duration in seconds
   * Default: 3600 (1 hour)
   * Range: 900-43200 seconds (15 minutes to 12 hours)
   */
  maxSessionDuration?: number;

  /**
   * Thumbprint for the OIDC provider
   * Used to verify the identity provider's server certificate
   */
  thumbprint: string;

  /**
   * Optional AWS region
   * @default AWS_REGION environment variable
   */
  region?: string;
}

/**
 * Output returned after OIDC provider configuration
 */
export interface OIDCProvider
  extends Resource<"aws::OIDCProvider">,
    OIDCProviderProps {
  /**
   * The ARN of the OIDC provider
   * Format: arn:aws:iam::account-id:oidc-provider/token.actions.githubusercontent.com
   */
  providerArn: string;

  /**
   * Time at which the provider was created
   * Unix timestamp in milliseconds
   */
  createdAt: number;
}

/**
 * AWS OIDC Provider Resource for GitHub Actions
 *
 * Creates and manages an OpenID Connect (OIDC) identity provider in AWS IAM
 * for GitHub Actions workflows. This enables secure, token-based authentication
 * between GitHub Actions and AWS without storing long-term credentials.
 *
 * @example
 * // Create an OIDC provider for all branches
 * const provider = await OIDCProvider("github", {
 *   owner: "my-org",
 *   repository: "my-repo",
 *   roleArn: "arn:aws:iam::123456789012:role/github-actions",
 *   thumbprint: "6938fd4d98bab03faadb97b34396831e3780aea1"
 * });
 *
 * @example
 * // Create an OIDC provider restricted to specific branches and environments
 * const provider = await OIDCProvider("github-restricted", {
 *   owner: "my-org",
 *   repository: "my-repo",
 *   branches: ["main", "prod"],
 *   environments: ["staging", "production"],
 *   roleArn: "arn:aws:iam::123456789012:role/github-actions",
 *   thumbprint: "6938fd4d98bab03faadb97b34396831e3780aea1",
 *   maxSessionDuration: 7200
 * });
 */
const TRUST_POLICY_SID = "GitHubOIDCTrust";

export const OIDCProvider = Resource(
  "aws::OIDCProvider",
  async function (
    this: Context<OIDCProvider>,
    _id: string,
    props: OIDCProviderProps,
  ) {
    // Initialize AWS SDK client
    const client = new IAMClient({
      region: props.region,
    });

    if (this.phase === "delete") {
      if (this.output?.providerArn) {
        try {
          // First, remove our trust policy statement from the role
          const getRole = await client.send(
            new GetRoleCommand({
              RoleName: props.roleArn.split("/").pop(),
            }),
          );

          if (getRole.Role?.AssumeRolePolicyDocument) {
            const policy = JSON.parse(
              decodeURIComponent(getRole.Role.AssumeRolePolicyDocument),
            );

            // Remove our specific statement while preserving others
            policy.Statement = policy.Statement.filter(
              (stmt: any) => stmt.Sid !== TRUST_POLICY_SID,
            );

            await client.send(
              new UpdateAssumeRolePolicyCommand({
                RoleName: props.roleArn.split("/").pop(),
                PolicyDocument: JSON.stringify(policy),
              }),
            );
          }

          // Then delete the OIDC provider if we're the last user
          const provider = await client.send(
            new GetOpenIDConnectProviderCommand({
              OpenIDConnectProviderArn: this.output.providerArn,
            }),
          );

          // Only delete the provider if it exists and has no other tags
          if (provider && (!provider.Tags || provider.Tags.length === 0)) {
            await client.send(
              new DeleteOpenIDConnectProviderCommand({
                OpenIDConnectProviderArn: this.output.providerArn,
              }),
            );
          }
        } catch (error) {
          // Log but don't throw on cleanup errors
          console.error("Error during cleanup:", error);
        }
      }
      return this.destroy();
    }

    try {
      const url = "https://token.actions.githubusercontent.com";
      const thumbprint = props.thumbprint;

      // Create or get existing OIDC provider
      let providerArn: string;
      try {
        const createProvider = await client.send(
          new CreateOpenIDConnectProviderCommand({
            Url: url,
            ClientIDList: ["sts.amazonaws.com"],
            ThumbprintList: [thumbprint],
            Tags: [
              {
                Key: "ManagedBy",
                Value: "alchemy",
              },
            ] as Tag[],
          }),
        );
        providerArn = createProvider.OpenIDConnectProviderArn!;
      } catch (error: any) {
        if (error.name === "EntityAlreadyExistsException") {
          // Provider exists, use its ARN
          providerArn = `arn:aws:iam::${await AccountId()}:oidc-provider/${url}`;
        } else {
          throw error;
        }
      }

      // Get current role policy
      const getRole = await client.send(
        new GetRoleCommand({
          RoleName: props.roleArn.split("/").pop(),
        }),
      );

      let policy: any;
      if (getRole.Role?.AssumeRolePolicyDocument) {
        policy = JSON.parse(
          decodeURIComponent(getRole.Role.AssumeRolePolicyDocument),
        );
      } else {
        policy = {
          Version: "2012-10-17",
          Statement: [],
        };
      }

      // Construct the trust policy conditions
      const conditions: Record<string, any> = {
        StringEquals: {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": `repo:${props.owner}/${props.repository}:`,
        },
      };

      if (props.branches?.length) {
        conditions.StringEquals["token.actions.githubusercontent.com:sub"] =
          props.branches.map(
            (branch) =>
              `repo:${props.owner}/${props.repository}:ref:refs/heads/${branch}`,
          );
      }

      if (props.environments?.length) {
        conditions.StringEquals["token.actions.githubusercontent.com:sub"] =
          props.environments.map(
            (env) =>
              `repo:${props.owner}/${props.repository}:environment:${env}`,
          );
      }

      // Create our policy statement
      const ourStatement = {
        Sid: TRUST_POLICY_SID,
        Effect: "Allow",
        Principal: {
          Federated: providerArn,
        },
        Action: "sts:AssumeRoleWithWebIdentity",
        Condition: conditions,
      };

      // Remove any existing statement with our SID and add the new one
      policy.Statement = [
        ...policy.Statement.filter(
          (stmt: any) => stmt.Sid !== TRUST_POLICY_SID,
        ),
        ourStatement,
      ];

      // Update the role's trust policy
      await client.send(
        new UpdateAssumeRolePolicyCommand({
          RoleName: props.roleArn.split("/").pop(),
          PolicyDocument: JSON.stringify(policy),
        }),
      );

      return this({
        ...props,
        providerArn,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.error("Error configuring OIDC provider:", error);
      throw error;
    }
  },
);
