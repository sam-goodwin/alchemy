---
title: Space
description: Learn how to create, update, and manage AWS SageMaker Spaces using Alchemy Cloud Control.
---


The Space resource lets you manage [AWS SageMaker Spaces](https://docs.aws.amazon.com/sagemaker/latest/userguide/) which provide a collaborative environment for data scientists and developers to share resources, tools, and workflows.

## Minimal Example

Create a basic SageMaker Space with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const sageMakerSpace = await AWS.SageMaker.Space("mySageMakerSpace", {
  DomainId: "d-1234567890",
  SpaceName: "dataScienceTeam",
  SpaceDisplayName: "Data Science Team Space"
});
```

## Advanced Configuration

Configure a SageMaker Space with advanced settings including space settings, sharing settings, and tags.

```ts
const advancedSageMakerSpace = await AWS.SageMaker.Space("advancedSageMakerSpace", {
  DomainId: "d-1234567890",
  SpaceName: "advancedDataScience",
  SpaceDisplayName: "Advanced Data Science Space",
  SpaceSettings: {
    JupyterServerAppSettings: {
      LifecycleConfigArns: [
        "arn:aws:sagemaker:us-west-2:123456789012:lifecycle-config/myLifecycleConfig"
      ]
    }
  },
  SpaceSharingSettings: {
    ShareSpace: true
  },
  Tags: [
    {
      Key: "Team",
      Value: "DataScience"
    }
  ]
});
```

## Custom Ownership Settings

Create a SageMaker Space with specific ownership settings to control the access and management of the space.

```ts
const ownershipConfiguredSpace = await AWS.SageMaker.Space("ownershipConfiguredSpace", {
  DomainId: "d-1234567890",
  SpaceName: "ownershipControlledSpace",
  OwnershipSettings: {
    Owner: "user@example.com",
    AllowExternalAccess: false
  }
});
```

## Space with Sharing Settings

Set up a SageMaker Space that allows sharing with other users or groups.

```ts
const sharedSageMakerSpace = await AWS.SageMaker.Space("sharedSageMakerSpace", {
  DomainId: "d-1234567890",
  SpaceName: "sharedDataScience",
  SpaceDisplayName: "Shared Data Science Space",
  SpaceSharingSettings: {
    ShareSpace: true,
    SharedWith: [
      {
        UserId: "user1@example.com"
      },
      {
        UserId: "user2@example.com"
      }
    ]
  }
});
```
