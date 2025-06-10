---
title: Workflow
description: Learn how to create, update, and manage AWS ImageBuilder Workflows using Alchemy Cloud Control.
---


The Workflow resource lets you manage [AWS ImageBuilder Workflows](https://docs.aws.amazon.com/imagebuilder/latest/userguide/) for automating the creation of Virtual Machine images. This resource enables you to define the workflow type, version, and additional configurations.

## Minimal Example

Create a basic ImageBuilder Workflow with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicWorkflow = await AWS.ImageBuilder.Workflow("basicWorkflow", {
  Type: "build",
  Version: "1.0",
  Description: "A simple ImageBuilder workflow for building images."
});
```

## Advanced Configuration

Configure an ImageBuilder Workflow with additional options including KMS Key ID and tags.

```ts
const advancedWorkflow = await AWS.ImageBuilder.Workflow("advancedWorkflow", {
  Type: "build",
  Version: "1.1",
  Description: "An advanced ImageBuilder workflow with encryption and tags.",
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrstuv",
  Tags: {
    Environment: "Production",
    Project: "ImageBuilderDemo"
  }
});
```

## Workflow with Change Description

Create a workflow that includes a change description for tracking modifications.

```ts
const changeDescriptionWorkflow = await AWS.ImageBuilder.Workflow("changeDescriptionWorkflow", {
  Type: "build",
  Version: "1.2",
  Description: "Workflow with change description.",
  ChangeDescription: "Updated to include new security features."
});
```

## Workflow with URI and Data

Define a workflow that utilizes a specific URI and data payload.

```ts
const uriDataWorkflow = await AWS.ImageBuilder.Workflow("uriDataWorkflow", {
  Type: "build",
  Version: "1.3",
  Description: "Workflow using a URI and data.",
  Uri: "https://example.com/imageBuilderWorkflow",
  Data: JSON.stringify({ key: "value" })
});
```
