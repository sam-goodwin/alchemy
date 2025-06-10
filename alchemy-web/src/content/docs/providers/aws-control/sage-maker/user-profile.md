---
title: UserProfile
description: Learn how to create, update, and manage AWS SageMaker UserProfiles using Alchemy Cloud Control.
---


The UserProfile resource lets you manage [AWS SageMaker UserProfiles](https://docs.aws.amazon.com/sagemaker/latest/userguide/) which are used to provide a unique environment for each user in a SageMaker domain.

## Minimal Example

Create a basic SageMaker UserProfile with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const userProfile = await AWS.SageMaker.UserProfile("default-user-profile", {
  DomainId: "d-1234567890",
  UserProfileName: "defaultUser",
  SingleSignOnUserValue: "user@example.com"
});
```

## Advanced Configuration

Configure a UserProfile with additional settings including user settings and tags.

```ts
const advancedUserProfile = await AWS.SageMaker.UserProfile("advanced-user-profile", {
  DomainId: "d-1234567890",
  UserProfileName: "advancedUser",
  SingleSignOnUserValue: "admin@example.com",
  UserSettings: {
    JupyterServerAppSettings: {
      DefaultResourceSpec: {
        SageMakerImageArn: "arn:aws:sagemaker:us-west-2:123456789012:image/my-custom-image",
        SageMakerImageVersionArn: "arn:aws:sagemaker:us-west-2:123456789012:image-version/my-custom-image:1"
      }
    }
  },
  Tags: [
    { Key: "Project", Value: "MachineLearning" },
    { Key: "Environment", Value: "Development" }
  ]
});
```

## User Profile Adoption

Create a UserProfile that adopts an existing resource if it already exists.

```ts
const adoptedUserProfile = await AWS.SageMaker.UserProfile("existing-user-profile", {
  DomainId: "d-1234567890",
  UserProfileName: "existingUser",
  adopt: true // Adopt existing resource instead of failing
});
```
