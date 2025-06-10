---
title: Stage
description: Learn how to create, update, and manage AWS IVS Stages using Alchemy Cloud Control.
---


The Stage resource allows you to create and manage [AWS IVS Stages](https://docs.aws.amazon.com/ivs/latest/userguide/) for live streaming applications, providing a way to configure streaming settings and participant recording options.

## Minimal Example

This example demonstrates creating a basic IVS Stage with a name and an optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicStage = await AWS.IVS.Stage("basic-stage", {
  Name: "MyBasicStage",
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

This example shows how to set up an IVS Stage with an auto participant recording configuration.

```ts
import AWS from "alchemy/aws/control";

const advancedStage = await AWS.IVS.Stage("advanced-stage", {
  Name: "MyAdvancedStage",
  AutoParticipantRecordingConfiguration: {
    DestinationConfiguration: {
      DestinationType: "S3",
      S3: {
        BucketName: "my-recordings-bucket",
        Prefix: "recordings/"
      }
    }
  },
  Tags: [
    { Key: "Project", Value: "LiveStreaming" }
  ]
});
```

## Adoption of Existing Resources

This example demonstrates how to adopt an existing IVS Stage instead of failing when the resource already exists.

```ts
import AWS from "alchemy/aws/control";

const adoptedStage = await AWS.IVS.Stage("adopted-stage", {
  Name: "MyAdoptedStage",
  adopt: true
});
```

## Resource Tagging

This example shows how to create an IVS Stage with multiple tags for better resource management.

```ts
import AWS from "alchemy/aws/control";

const taggedStage = await AWS.IVS.Stage("tagged-stage", {
  Name: "MyTaggedStage",
  Tags: [
    { Key: "Team", Value: "Engineering" },
    { Key: "Status", Value: "Active" },
    { Key: "Region", Value: "us-west-2" }
  ]
});
```
