---
title: Managing AWS SageMaker UserProfiles with Alchemy
description: Learn how to create, update, and manage AWS SageMaker UserProfiles using Alchemy Cloud Control.
---

# UserProfile

The UserProfile resource allows you to manage [AWS SageMaker UserProfiles](https://docs.aws.amazon.com/sagemaker/latest/userguide/) which provide an environment for users to work with SageMaker resources and settings.

## Minimal Example

Create a basic UserProfile with required properties and one optional setting.

```ts
import AWS from "alchemy/aws/control";

const basicUserProfile = await AWS.SageMaker.UserProfile("BasicUserProfile", {
  DomainId: "d-1234567890", // Replace with your actual Domain ID
  UserProfileName: "JaneDoe",
  SingleSignOnUserValue: "jane.doe@example.com" // Optional: Single Sign-On user value
});
```

## Advanced Configuration

Configure a UserProfile with advanced options, including user settings and tags.

```ts
const advancedUserProfile = await AWS.SageMaker.UserProfile("AdvancedUserProfile", {
  DomainId: "d-0987654321", // Replace with your actual Domain ID
  UserProfileName: "JohnSmith",
  UserSettings: {
    JupyterServerAppSettings: {
      DefaultResourceSpec: {
        SageMakerImageArn: "arn:aws:sagemaker:us-east-1:123456789012:image/my-custom-image",
        SageMakerImageVersionArn: "arn:aws:sagemaker:us-east-1:123456789012:image-version/my-custom-image:1"
      }
    }
  },
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Custom User Settings

Create a UserProfile with specific user settings tailored for a Jupyter Notebook environment.

```ts
const jupyterUserProfile = await AWS.SageMaker.UserProfile("JupyterUserProfile", {
  DomainId: "d-1234567890", // Replace with your actual Domain ID
  UserProfileName: "AliceJohnson",
  UserSettings: {
    JupyterServerAppSettings: {
      DefaultResourceSpec: {
        SageMakerImageArn: "arn:aws:sagemaker:us-west-2:123456789012:image/my-jupyter-image",
        SageMakerImageVersionArn: "arn:aws:sagemaker:us-west-2:123456789012:image-version/my-jupyter-image:1"
      }
    },
    KernelGatewayAppSettings: {
      DefaultResourceSpec: {
        SageMakerImageArn: "arn:aws:sagemaker:us-west-2:123456789012:image/my-kernel-image",
        SageMakerImageVersionArn: "arn:aws:sagemaker:us-west-2:123456789012:image-version/my-kernel-image:1"
      }
    }
  }
});
```

## Tagging Best Practices

Demonstrate how to create a UserProfile with meaningful tags for better resource management.

```ts
const taggedUserProfile = await AWS.SageMaker.UserProfile("TaggedUserProfile", {
  DomainId: "d-4567890123", // Replace with your actual Domain ID
  UserProfileName: "BobWilliams",
  Tags: [
    { Key: "Project", Value: "AIResearch" },
    { Key: "Department", Value: "MachineLearning" }
  ]
});
```