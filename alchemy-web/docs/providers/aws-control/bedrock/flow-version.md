---
title: Managing AWS Bedrock FlowVersions with Alchemy
description: Learn how to create, update, and manage AWS Bedrock FlowVersions using Alchemy Cloud Control.
---

# FlowVersion

The FlowVersion resource allows you to create and manage versions of AWS Bedrock workflows. You can define different versions of your workflows and easily switch between them as needed. For more information, refer to the [AWS Bedrock FlowVersions](https://docs.aws.amazon.com/bedrock/latest/userguide/) documentation.

## Minimal Example

Create a basic FlowVersion with the required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const BasicFlowVersion = await AWS.Bedrock.FlowVersion("BasicFlowVersion", {
  FlowArn: "arn:aws:bedrock:us-west-2:123456789012:flow/my-first-flow",
  Description: "This is the first version of my workflow"
});
```

## Advanced Configuration

Configure a FlowVersion with additional properties for better management and tracking.

```ts
const AdvancedFlowVersion = await AWS.Bedrock.FlowVersion("AdvancedFlowVersion", {
  FlowArn: "arn:aws:bedrock:us-west-2:123456789012:flow/my-first-flow",
  Description: "This version includes additional features and optimizations",
  adopt: true // Adopt existing resource if it already exists
});
```

## Version Adoption

Demonstrate how to adopt an existing FlowVersion instead of failing if it already exists.

```ts
const AdoptedFlowVersion = await AWS.Bedrock.FlowVersion("AdoptedFlowVersion", {
  FlowArn: "arn:aws:bedrock:us-west-2:123456789012:flow/my-first-flow",
  Description: "Adopting existing workflow version",
  adopt: true
});
```

## Resource Outputs

Access the outputs of the created FlowVersion resource for further use.

```ts
const FlowVersionOutput = await AWS.Bedrock.FlowVersion("FlowVersionOutput", {
  FlowArn: "arn:aws:bedrock:us-west-2:123456789012:flow/my-first-flow",
  Description: "Getting outputs of the FlowVersion"
});

// Example of accessing the ARN and creation time
console.log("FlowVersion ARN:", FlowVersionOutput.Arn);
console.log("FlowVersion Created At:", FlowVersionOutput.CreationTime);
```