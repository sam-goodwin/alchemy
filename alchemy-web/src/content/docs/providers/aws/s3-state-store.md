---
title: S3StateStore
description: Learn how to use S3StateStore for reliable, cloud-based state storage in your Alchemy applications using Amazon S3.
---

The S3StateStore provides reliable, scalable state storage for Alchemy applications using [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html). It's designed for cloud-based deployments where you need durable, shared state storage across multiple environments or team members.

## Basic Usage

Configure Alchemy to use S3 for state storage:

```ts
import { S3StateStore } from "alchemy/aws";

const app = await alchemy("my-app", {
  stage: "prod",
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
  stateStore: (scope) => new S3StateStore(scope, {
    bucketName: "my-app-alchemy-state",
    region: "us-east-1"
  })
});
```

## Configuration Options

### Bucket Name and Region

Specify the S3 bucket and AWS region for state storage:

```ts
import { S3StateStore } from "alchemy/aws";

const app = await alchemy("my-app", {
  stateStore: (scope) => new S3StateStore(scope, {
    bucketName: "my-company-alchemy-state",
    region: "us-west-2"
  })
});
```

### Custom Prefix

Use a prefix to organize state files when sharing buckets across projects:

```ts
import { S3StateStore } from "alchemy/aws";

const app = await alchemy("my-app", {
  stateStore: (scope) => new S3StateStore(scope, {
    bucketName: "shared-alchemy-state",
    prefix: "my-team/my-app/",
    region: "us-east-1"
  })
});
```

## Prerequisites

### Create S3 Bucket

The S3 bucket must exist before using S3StateStore. Use the Alchemy bootstrap command (recommended) or create it manually:

```bash
# Recommended: Use Alchemy bootstrap
alchemy bootstrap s3

# Or create manually with AWS CLI
aws s3 mb s3://my-app-alchemy-state --region us-east-1
```

### Configure AWS Credentials

Ensure AWS credentials are configured via:

- AWS credentials file (`~/.aws/credentials`)
- Environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`)
- IAM roles (for EC2/Lambda)
- AWS CLI profile

The credentials need S3 permissions for the target bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-app-alchemy-state",
        "arn:aws:s3:::my-app-alchemy-state/*"
      ]
    }
  ]
}
```

## State Organization

S3StateStore organizes state files using scope-based prefixes:

```
my-app-alchemy-state/
  alchemy/my-app/dev/
    my-resource
    my-other-resource
  alchemy/my-app/prod/
    my-resource
    my-other-resource
```

Keys containing forward slashes are converted to colons for S3 compatibility:

- Resource key: `api/database/connection`
- S3 object key: `alchemy/my-app/dev/api:database:connection`

## Environment-Specific Configuration

### Development

Use a development-specific bucket or prefix:

```ts
const isDev = process.env.NODE_ENV === "development";

const app = await alchemy("my-app", {
  stage: isDev ? "dev" : "prod",
  stateStore: (scope) => new S3StateStore(scope, {
    bucketName: isDev ? "my-app-dev-state" : "my-app-prod-state",
    region: "us-east-1"
  })
});
```

### Team Environments

Share state across team members with appropriate bucket permissions:

```ts
const app = await alchemy("my-app", {
  stage: "shared",
  stateStore: (scope) => new S3StateStore(scope, {
    bucketName: "team-shared-alchemy-state",
    prefix: `${process.env.USER || "unknown"}/`,
    region: "us-east-1"
  })
});
```

## Error Handling

S3StateStore includes built-in retry logic and proper error handling:

- **NoSuchBucket**: Clear error message if bucket doesn't exist
- **NoSuchKey**: Gracefully handles missing state files
- **Network errors**: Automatic retry with exponential backoff
- **Permissions**: Clear AWS permission error messages

## Performance Considerations

- **Eventual consistency**: S3 provides eventual consistency for state operations
- **Batch operations**: Uses concurrent requests for multi-key operations
- **Network latency**: Consider bucket region proximity to your deployment location
- **Costs**: S3 charges for requests and storage (typically very low for state files)

