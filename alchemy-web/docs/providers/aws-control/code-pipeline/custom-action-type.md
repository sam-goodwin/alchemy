---
title: Managing AWS CodePipeline CustomActionTypes with Alchemy
description: Learn how to create, update, and manage AWS CodePipeline CustomActionTypes using Alchemy Cloud Control.
---

# CustomActionType

The CustomActionType resource lets you define new custom action types for AWS CodePipeline, allowing you to integrate additional functionality into your pipelines. For more information, refer to the [AWS CodePipeline CustomActionTypes documentation](https://docs.aws.amazon.com/codepipeline/latest/userguide/).

## Minimal Example

Create a basic custom action type with required properties and some optional configurations.

```ts
import AWS from "alchemy/aws/control";

const BasicCustomActionType = await AWS.CodePipeline.CustomActionType("BasicCustomActionType", {
  Category: "Build",
  InputArtifactDetails: {
    MinimumCount: 1,
    MaximumCount: 1
  },
  OutputArtifactDetails: {
    MinimumCount: 1,
    MaximumCount: 1
  },
  Version: "1.0",
  Provider: "MyCustomProvider",
  ConfigurationProperties: [
    {
      Name: "MyCustomProperty",
      Required: true,
      Key: true,
      Secret: false,
      Queryable: false
    }
  ],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Define a custom action type with additional configuration properties for enhanced functionality.

```ts
const AdvancedCustomActionType = await AWS.CodePipeline.CustomActionType("AdvancedCustomActionType", {
  Category: "Test",
  InputArtifactDetails: {
    MinimumCount: 1,
    MaximumCount: 2
  },
  OutputArtifactDetails: {
    MinimumCount: 1,
    MaximumCount: 2
  },
  Version: "1.1",
  Provider: "MyAdvancedProvider",
  ConfigurationProperties: [
    {
      Name: "MyAdvancedProperty",
      Required: true,
      Key: true,
      Secret: false,
      Queryable: true
    },
    {
      Name: "Timeout",
      Required: false,
      Key: false,
      Secret: false,
      Queryable: false
    }
  ],
  Settings: {
    EntityUrlTemplate: "https://mycustomprovider.com/action/{Input}",
    ExecutionUrlTemplate: "https://mycustomprovider.com/execution/{ExecutionId}"
  }
});
```

## Custom Action with Multiple Input Artifacts

Create a custom action type that accepts multiple input artifacts for a more complex workflow.

```ts
const MultiInputArtifactCustomActionType = await AWS.CodePipeline.CustomActionType("MultiInputArtifactCustomActionType", {
  Category: "Deploy",
  InputArtifactDetails: {
    MinimumCount: 2,
    MaximumCount: 5
  },
  OutputArtifactDetails: {
    MinimumCount: 1,
    MaximumCount: 1
  },
  Version: "2.0",
  Provider: "MyMultiInputProvider",
  ConfigurationProperties: [
    {
      Name: "DeploymentTarget",
      Required: true,
      Key: true,
      Secret: false,
      Queryable: true
    },
    {
      Name: "RollbackOnFailure",
      Required: false,
      Key: false,
      Secret: false,
      Queryable: false
    }
  ]
});
```