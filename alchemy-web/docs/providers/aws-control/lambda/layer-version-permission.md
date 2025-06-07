---
title: Managing AWS Lambda LayerVersionPermissions with Alchemy
description: Learn how to create, update, and manage AWS Lambda LayerVersionPermissions using Alchemy Cloud Control.
---

# LayerVersionPermission

The LayerVersionPermission resource allows you to grant permission to a specific account or organization to use a specific version of an AWS Lambda layer. For more details, refer to the [AWS Lambda LayerVersionPermissions documentation](https://docs.aws.amazon.com/lambda/latest/userguide/).

## Minimal Example

Create a basic LayerVersionPermission to allow a specific AWS account to use the layer version.

```ts
import AWS from "alchemy/aws/control";

const LayerPermission = await AWS.Lambda.LayerVersionPermission("MyLayerPermission", {
  Action: "lambda:GetLayerVersion",
  LayerVersionArn: "arn:aws:lambda:us-east-1:123456789012:layer:my-layer:1",
  Principal: "123456789012" // AWS Account ID
});
```

## Advanced Configuration

Configure LayerVersionPermission to allow an entire organization to access the layer version.

```ts
const OrgLayerPermission = await AWS.Lambda.LayerVersionPermission("OrgLayerPermission", {
  Action: "lambda:GetLayerVersion",
  LayerVersionArn: "arn:aws:lambda:us-east-1:123456789012:layer:my-layer:1",
  Principal: "*", // Allows all principals
  OrganizationId: "o-1234567890", // Your organization ID
  adopt: true
});
```

## Grant Access with Policy

Define a LayerVersionPermission that uses an IAM policy to grant more specific access, such as invoking the layer.

```ts
const PolicyLayerPermission = await AWS.Lambda.LayerVersionPermission("PolicyLayerPermission", {
  Action: "lambda:InvokeFunction",
  LayerVersionArn: "arn:aws:lambda:us-east-1:123456789012:layer:my-layer:1",
  Principal: "arn:aws:iam::123456789012:role/MyExecutionRole", // IAM Role ARN
  OrganizationId: "o-1234567890", // Your organization ID
  adopt: false
});
```