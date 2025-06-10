---
title: FlowVersion
description: Learn how to create, update, and manage AWS Bedrock FlowVersions using Alchemy Cloud Control.
---


The FlowVersion resource allows you to manage [AWS Bedrock FlowVersions](https://docs.aws.amazon.com/bedrock/latest/userguide/) for your applications. This resource enables you to define, update, and deploy specific versions of flows within AWS Bedrock.

## Minimal Example

Create a basic FlowVersion with required and common optional properties.

```ts
import AWS from "alchemy/aws/control";

const basicFlowVersion = await AWS.Bedrock.FlowVersion("basic-flow-version", {
  FlowArn: "arn:aws:bedrock:us-west-2:123456789012:flow/my-flow",
  Description: "Initial version of my flow"
});
```

## Advanced Configuration

Configure a FlowVersion with additional properties, including the ability to adopt an existing resource.

```ts
import AWS from "alchemy/aws/control";

const advancedFlowVersion = await AWS.Bedrock.FlowVersion("advanced-flow-version", {
  FlowArn: "arn:aws:bedrock:us-west-2:123456789012:flow/my-advanced-flow",
  Description: "Advanced configuration of my flow",
  adopt: true // Allows adoption of an existing FlowVersion
});
```

## Resource Updating Example

Update an existing FlowVersion to modify its description without changing other properties.

```ts
import AWS from "alchemy/aws/control";

const updatedFlowVersion = await AWS.Bedrock.FlowVersion("updated-flow-version", {
  FlowArn: "arn:aws:bedrock:us-west-2:123456789012:flow/my-flow",
  Description: "Updated version of my flow for new features"
});
```

## Retrieving FlowVersion Information

Retrieve the details of a FlowVersion including its creation and last update timestamps.

```ts
import AWS from "alchemy/aws/control";

const flowVersionDetails = await AWS.Bedrock.FlowVersion("retrieve-flow-version", {
  FlowArn: "arn:aws:bedrock:us-west-2:123456789012:flow/my-flow"
});

// Accessing additional properties
console.log(`Flow Version ARN: ${flowVersionDetails.Arn}`);
console.log(`Created At: ${flowVersionDetails.CreationTime}`);
console.log(`Last Updated At: ${flowVersionDetails.LastUpdateTime}`);
```
