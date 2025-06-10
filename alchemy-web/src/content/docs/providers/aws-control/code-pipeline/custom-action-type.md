---
title: CustomActionType
description: Learn how to create, update, and manage AWS CodePipeline CustomActionTypes using Alchemy Cloud Control.
---


The CustomActionType resource lets you define custom actions for your AWS CodePipeline, enabling integration with third-party services or custom processing logic. For more detailed information, refer to the [AWS CodePipeline CustomActionTypes documentation](https://docs.aws.amazon.com/codepipeline/latest/userguide/).

## Minimal Example

Create a basic CustomActionType with required properties and a common optional configuration.

```ts
import AWS from "alchemy/aws/control";

const simpleCustomActionType = await AWS.CodePipeline.CustomActionType("simpleCustomAction", {
  category: "Build",
  inputArtifactDetails: {
    minimumCount: 1,
    maximumCount: 5,
    type: {
      name: "MyInputArtifact",
      type: "S3"
    }
  },
  outputArtifactDetails: {
    minimumCount: 1,
    maximumCount: 5,
    type: {
      name: "MyOutputArtifact",
      type: "S3"
    }
  },
  provider: "MyCustomProvider",
  version: "1.0",
  settings: {
    entityUrlTemplate: "https://example.com/{JobId}",
    executionUrlTemplate: "https://example.com/{JobId}/execute"
  }
});
```

## Advanced Configuration

Configure a CustomActionType with detailed configuration properties including multiple configuration options and tags.

```ts
const advancedCustomActionType = await AWS.CodePipeline.CustomActionType("advancedCustomAction", {
  category: "Test",
  inputArtifactDetails: {
    minimumCount: 1,
    maximumCount: 3,
    type: {
      name: "TestInputArtifact",
      type: "S3"
    }
  },
  outputArtifactDetails: {
    minimumCount: 1,
    maximumCount: 2,
    type: {
      name: "TestOutputArtifact",
      type: "S3"
    }
  },
  provider: "AdvancedProvider",
  version: "1.0",
  configurationProperties: [
    {
      key: "TestParameter1",
      required: true,
      secret: false,
      type: "String"
    },
    {
      key: "TestParameter2",
      required: false,
      secret: true,
      type: "String"
    }
  ],
  tags: [
    { key: "Project", value: "MyProject" },
    { key: "Environment", value: "Production" }
  ]
});
```

## Custom Action with IAM Permissions

Define a CustomActionType that requires specific IAM permissions for execution.

```ts
const customActionWithPermissions = await AWS.CodePipeline.CustomActionType("permissionedCustomAction", {
  category: "Deploy",
  inputArtifactDetails: {
    minimumCount: 1,
    maximumCount: 1,
    type: {
      name: "DeployInputArtifact",
      type: "S3"
    }
  },
  outputArtifactDetails: {
    minimumCount: 1,
    maximumCount: 1,
    type: {
      name: "DeployOutputArtifact",
      type: "S3"
    }
  },
  provider: "PermissionedProvider",
  version: "1.0",
  configurationProperties: [
    {
      key: "Environment",
      required: true,
      secret: false,
      type: "String"
    }
  ],
  settings: {
    entityUrlTemplate: "https://example.com/{JobId}",
    executionUrlTemplate: "https://example.com/{JobId}/execute"
  },
  tags: [
    { key: "Service", value: "DeploymentService" }
  ]
});
```
