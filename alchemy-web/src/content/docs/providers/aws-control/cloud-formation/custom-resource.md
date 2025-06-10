---
title: CustomResource
description: Learn how to create, update, and manage AWS CloudFormation CustomResources using Alchemy Cloud Control.
---


The CustomResource resource allows you to define custom actions and manage resources within AWS CloudFormation. For more details, refer to the [AWS CloudFormation CustomResources documentation](https://docs.aws.amazon.com/cloudformation/latest/userguide/).

## Minimal Example

Create a basic custom resource with the required properties and a service timeout.

```ts
import AWS from "alchemy/aws/control";

const basicCustomResource = await AWS.CloudFormation.CustomResource("BasicCustomResource", {
  ServiceToken: "arn:aws:lambda:us-east-1:123456789012:function:my-custom-resource-function",
  ServiceTimeout: 300 // 5 minutes timeout
});
```

## Advanced Configuration

Configure a custom resource with the option to adopt existing resources.

```ts
const advancedCustomResource = await AWS.CloudFormation.CustomResource("AdvancedCustomResource", {
  ServiceToken: "arn:aws:lambda:us-east-1:123456789012:function:my-custom-resource-function",
  ServiceTimeout: 600, // 10 minutes timeout
  adopt: true // Allow adoption of existing resources
});
```

## Resource Adoption Example

Demonstrate how to adopt an existing custom resource without failing.

```ts
const resourceAdoptionExample = await AWS.CloudFormation.CustomResource("ResourceAdoptionExample", {
  ServiceToken: "arn:aws:lambda:us-east-1:123456789012:function:my-custom-resource-function",
  adopt: true // Adopt existing resource if it already exists
});
```

## Custom Timeout Example

Show how to set a longer service timeout for complex operations.

```ts
const longTimeoutCustomResource = await AWS.CloudFormation.CustomResource("LongTimeoutCustomResource", {
  ServiceToken: "arn:aws:lambda:us-east-1:123456789012:function:my-custom-resource-function",
  ServiceTimeout: 1200 // 20 minutes timeout for long operations
});
```
