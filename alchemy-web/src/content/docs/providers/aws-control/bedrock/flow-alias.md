---
title: FlowAlias
description: Learn how to create, update, and manage AWS Bedrock FlowAliases using Alchemy Cloud Control.
---


The FlowAlias resource lets you manage [AWS Bedrock FlowAliases](https://docs.aws.amazon.com/bedrock/latest/userguide/) for routing requests to various flows. This allows for flexible management of flow configurations.

## Minimal Example

Create a basic FlowAlias with required properties and an optional description.

```ts
import AWS from "alchemy/aws/control";

const flowAlias = await AWS.Bedrock.FlowAlias("basicFlowAlias", {
  flowArn: "arn:aws:bedrock:us-west-2:123456789012:flow/my-flow",
  routingConfiguration: [
    {
      flow: "myFlow",
      weight: 1
    }
  ],
  name: "BasicFlowAlias",
  description: "This is a basic FlowAlias for demonstration purposes."
});
```

## Advanced Configuration

Configure a FlowAlias with multiple routing options and tags for better resource management.

```ts
const advancedFlowAlias = await AWS.Bedrock.FlowAlias("advancedFlowAlias", {
  flowArn: "arn:aws:bedrock:us-west-2:123456789012:flow/advanced-flow",
  routingConfiguration: [
    {
      flow: "primaryFlow",
      weight: 70
    },
    {
      flow: "secondaryFlow",
      weight: 30
    }
  ],
  name: "AdvancedFlowAlias",
  tags: {
    Environment: "Production",
    Project: "AIModel"
  }
});
```

## Adoption of Existing Resource

Create a FlowAlias that adopts an existing resource instead of failing when it already exists.

```ts
const adoptedFlowAlias = await AWS.Bedrock.FlowAlias("adoptedFlowAlias", {
  flowArn: "arn:aws:bedrock:us-west-2:123456789012:flow/adopted-flow",
  routingConfiguration: [
    {
      flow: "existingFlow",
      weight: 100
    }
  ],
  name: "AdoptedFlowAlias",
  adopt: true // Setting adopt to true to use an existing resource
});
```
