---
title: LayerVersionPermission
description: Learn how to create, update, and manage AWS Lambda LayerVersionPermissions using Alchemy Cloud Control.
---


The LayerVersionPermission resource allows you to manage permissions for AWS Lambda Layer Versions, enabling you to control which AWS accounts or organizations can use a specific layer version. For more detailed information, refer to the [AWS Lambda LayerVersionPermissions documentation](https://docs.aws.amazon.com/lambda/latest/userguide/).

## Minimal Example

Create a basic LayerVersionPermission that allows a specific AWS account to use a layer version.

```ts
import AWS from "alchemy/aws/control";

const layerPermission = await AWS.Lambda.LayerVersionPermission("exampleLayerPermission", {
  Action: "lambda:GetLayerVersion",
  LayerVersionArn: "arn:aws:lambda:us-west-2:123456789012:layer:my-layer:1",
  Principal: "123456789012", // AWS Account ID
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure LayerVersionPermission to allow an entire organization to access a layer version.

```ts
const orgLayerPermission = await AWS.Lambda.LayerVersionPermission("orgLayerPermission", {
  Action: "lambda:GetLayerVersion",
  LayerVersionArn: "arn:aws:lambda:us-west-2:123456789012:layer:my-layer:1",
  Principal: "*", // Allow all principals
  OrganizationId: "o-12345678" // Example Organization ID
});
```

## Specific Use Case: Grant Access to Multiple Accounts

You can set permissions for multiple AWS accounts by creating multiple LayerVersionPermission resources.

```ts
const account1Permission = await AWS.Lambda.LayerVersionPermission("account1Permission", {
  Action: "lambda:GetLayerVersion",
  LayerVersionArn: "arn:aws:lambda:us-west-2:123456789012:layer:my-layer:1",
  Principal: "111111111111" // First AWS Account ID
});

const account2Permission = await AWS.Lambda.LayerVersionPermission("account2Permission", {
  Action: "lambda:GetLayerVersion",
  LayerVersionArn: "arn:aws:lambda:us-west-2:123456789012:layer:my-layer:1",
  Principal: "222222222222" // Second AWS Account ID
});
```
