export const alchemyAwsRules = `
# Alchemy AWS Resources

This document summarizes available AWS resources in Alchemy, with their properties defined in TypeScript format.

// --- Core Helper Types ---
\`\`\`typescript
// Placeholder for Resource base type
interface Resource<Kind extends string = string> {
  // Base type for all Alchemy resources
  // In actual code, this uses symbol properties
}

// Secret type for sensitive values
class Secret {
  readonly type: "secret";
  constructor(readonly value: string) {}
}

// Common options for AWS API requests (Placeholder - adjust as needed)
interface AwsApiOptions {
  region?: string; // Overrides AWS_REGION
  accessKeyId?: Secret; // Overrides AWS_ACCESS_KEY_ID
  secretAccessKey?: Secret; // Overrides AWS_SECRET_ACCESS_KEY
  sessionToken?: Secret; // Overrides AWS_SESSION_TOKEN
}

// Helper type for Lambda Bundle
interface Bundle {
  // Define properties of Bundle if available, e.g.
  // path: string;
  // handler: string;
}

// Helper type for Lambda Runtime
type Runtime = string; // e.g., "nodejs20.x"

// Helper type for Lambda Architecture
type Architecture = "x86_64" | "arm64";

// Helper type for IAM PolicyDocument
interface PolicyStatement {
  Sid?: string;
  Effect: "Allow" | "Deny";
  Action: string | string[];
  Resource?: string | string[];
  Condition?: Record<string, Record<string, string | string[]>>;
  Principal?: Record<string, string | string[]>;
  NotPrincipal?: Record<string, string | string[]>;
  NotAction?: string | string[];
  NotResource?: string | string[];
}

interface PolicyDocument {
  Version: "2012-10-17";
  Statement: PolicyStatement[];
}

// Helper types for SES (Simplified)
interface SendingOptions {}
interface ReputationOptions {}
interface TrackingOptions {}
interface SuppressionOptions {}
interface DeliveryOptions {}
\`\`\`
// --- End Helper Types ---

## AccountId
Helper to get the current AWS account ID.
\`\`\`typescript
type AccountId = string & {
  readonly __brand: "AccountId";
};
// declare function AccountId(): Promise<AccountId>; // This is a function, not a resource with Props/Output
\`\`\`

## Bucket (S3)
Creates and manages AWS S3 Buckets.
\`\`\`typescript
interface BucketProps {
  bucketName: string;
  tags?: Record<string, string>;
}
interface Bucket extends Resource<"s3::Bucket">, BucketProps {
  arn: string;
  bucketDomainName: string;
  bucketRegionalDomainName?: string;
  hostedZoneId?: string;
  region?: string;
  websiteEndpoint?: string;
  websiteDomain?: string;
  versioningEnabled?: boolean;
  acl?: string;
}
\`\`\`

## Function (Lambda)
Creates and manages AWS Lambda functions.
\`\`\`typescript
interface FunctionProps {
  functionName: string;
  bundle: Bundle; // Assuming Bundle is a defined type
  roleArn: string;
  handler: string;
  runtime?: Runtime; // e.g., "nodejs20.x"
  architecture?: Architecture; // "x86_64" | "arm64"
  description?: string;
  timeout?: number; // seconds
  memorySize?: number; // MB
  environment?: Record<string, string>;
  tags?: Record<string, string>;
  url?: {
    invokeMode?: "BUFFERED" | "RESPONSE_STREAM";
    authType?: "AWS_IAM" | "NONE";
    cors?: {
      allowCredentials?: boolean;
      allowHeaders?: string[];
      allowMethods?: string[];
      allowOrigins?: string[];
      exposeHeaders?: string[];
      maxAge?: number;
    };
  };
  layers?: string[]; // Array of layer ARNs
}
interface Function extends Resource<"lambda::Function">, FunctionProps {
  arn: string;
  lastModified: string;
  version: string;
  qualifiedArn: string;
  invokeArn: string;
  sourceCodeHash: string;
  sourceCodeSize: number;
  ephemeralStorageSize?: number;
  architectures: string[];
  masterArn?: string;
  revisionId: string;
  state?: string;
  stateReason?: string;
  stateReasonCode?: string;
  lastUpdateStatus?: string;
  lastUpdateStatusReason?: string;
  lastUpdateStatusReasonCode?: string;
  packageType: string; // "Zip" | "Image"
  signingProfileVersionArn?: string;
  signingJobArn?: string;
  functionUrl?: string;
}
\`\`\`

## OIDCProvider (IAM)
Configures an AWS IAM OIDC provider.
\`\`\`typescript
interface OIDCProviderProps {
  owner: string; // GitHub org or user
  repository: string; // GitHub repo name
  branches?: string[];
  environments?: string[];
  roleArn: string;
  maxSessionDuration?: number; // seconds
  thumbprint: string;
  region?: string;
}
interface OIDCProvider extends Resource<"aws::OIDCProvider">, OIDCProviderProps {
  providerArn: string;
  createdAt: number; // Unix timestamp in ms
}
\`\`\`

## GitHubOIDCProvider (IAM)
A specialized OIDCProvider for GitHub Actions.
\`\`\`typescript
interface GitHubOIDCProviderProps extends Omit<OIDCProviderProps, "thumbprint"> {
  owner: string;
  repository: string;
}
// Output is OIDCProvider type
// type GitHubOIDCProvider = OIDCProvider; // This is how it's defined effectively
\`\`\`

## PolicyAttachment (IAM)
Attaches an IAM policy to an IAM role.
\`\`\`typescript
interface PolicyAttachmentProps {
  policyArn: string;
  roleName: string;
}
interface PolicyAttachment extends Resource<"iam::PolicyAttachment">, PolicyAttachmentProps {}
\`\`\`

## Policy (IAM)
Creates and manages AWS IAM policies.
\`\`\`typescript
interface PolicyProps {
  policyName: string;
  document: PolicyDocument; // Defined in helper types
  description?: string;
  path?: string;
  tags?: Record<string, string>;
}
interface Policy extends Resource<"iam::Policy">, PolicyProps {
  arn: string;
  defaultVersionId: string;
  attachmentCount: number;
  createDate: Date; // or string ISO date
  updateDate: Date; // or string ISO date
  isAttachable: boolean;
}
\`\`\`

## Queue (SQS)
Creates and manages AWS SQS queues.
\`\`\`typescript
interface QueueProps {
  queueName: string;
  fifo?: boolean;
  visibilityTimeout?: number; // seconds
  messageRetentionPeriod?: number; // seconds
  maximumMessageSize?: number; // bytes
  delaySeconds?: number; // seconds
  receiveMessageWaitTimeSeconds?: number; // seconds
  contentBasedDeduplication?: boolean; // FIFO only
  deduplicationScope?: "messageGroup" | "queue"; // FIFO only
  fifoThroughputLimit?: "perQueue" | "perMessageGroupId"; // FIFO only
  tags?: Record<string, string>;
}
interface Queue extends Resource<"sqs::Queue">, QueueProps {
  arn: string;
  url: string;
}
\`\`\`

## Role (IAM)
Creates and manages AWS IAM roles.
\`\`\`typescript
interface RoleProps {
  roleName: string;
  assumeRolePolicy: PolicyDocument; // Defined in helper types
  description?: string;
  path?: string;
  maxSessionDuration?: number; // seconds
  permissionsBoundary?: string; // ARN
  policies?: Array<{
    policyName: string;
    policyDocument: PolicyDocument;
  }>;
  managedPolicyArns?: string[]; // Array of ARNs
  tags?: Record<string, string>;
}
interface Role extends Resource<"iam::Role">, RoleProps {
  arn: string;
  uniqueId: string;
  roleId: string;
  createDate: Date; // or string ISO date
}
\`\`\`

## SES (Simple Email Service)
Configures AWS SES resources for sending email.
\`\`\`typescript
interface SESProps {
  configurationSetName?: string;
  emailIdentity?: string; // email address or domain
  enableDkim?: boolean;
  sendingOptions?: SendingOptions; // Defined in helper types
  reputationOptions?: ReputationOptions; // Defined in helper types
  trackingOptions?: TrackingOptions; // Defined in helper types
  suppressionOptions?: SuppressionOptions; // Defined in helper types
  deliveryOptions?: DeliveryOptions; // Defined in helper types
  tags?: Record<string, string>;
}
interface SES extends Resource<"aws::SES">, SESProps {
  configurationSetArn?: string;
  emailIdentityVerificationStatus?: string; // "PENDING" | "VERIFIED"
  dkimVerificationStatus?: string; // "PENDING" | "SUCCESS" | "FAILED" | ...
  emailIdentityArn?: string;
}
\`\`\`

## Table (DynamoDB)
Creates and manages AWS DynamoDB tables.
\`\`\`typescript
interface TableProps {
  tableName: string;
  partitionKey: {
    name: string;
    type: "S" | "N" | "B";
  };
  sortKey?: {
    name: string;
    type: "S" | "N" | "B";
  };
  billingMode?: "PROVISIONED" | "PAY_PER_REQUEST";
  readCapacity?: number;
  writeCapacity?: number;
  tags?: Record<string, string>;
}
interface Table extends Resource<"dynamo::Table">, TableProps {
  arn: string;
  streamArn?: string;
  tableId: string;
}
\`\`\`
`; 