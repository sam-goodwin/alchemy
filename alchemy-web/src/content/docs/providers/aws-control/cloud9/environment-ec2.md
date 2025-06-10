---
title: EnvironmentEC2
description: Learn how to create, update, and manage AWS Cloud9 EnvironmentEC2s using Alchemy Cloud Control.
---


The EnvironmentEC2 resource allows you to create and manage [AWS Cloud9 EnvironmentEC2s](https://docs.aws.amazon.com/cloud9/latest/userguide/) for cloud-based development environments.

## Minimal Example

Create a basic Cloud9 EnvironmentEC2 with required properties and a couple of optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicEnvironment = await AWS.Cloud9.EnvironmentEC2("basicEnvironment", {
  imageId: "ami-12345678", // Specify a valid AMI ID
  instanceType: "t2.micro", // Choose an appropriate instance type
  automaticStopTimeMinutes: 30, // Environment stops after 30 minutes of inactivity
  name: "MyBasicEnvironment" // Name your environment
});
```

## Advanced Configuration

Configure a Cloud9 EnvironmentEC2 with additional options such as repository settings and custom tags.

```ts
const advancedEnvironment = await AWS.Cloud9.EnvironmentEC2("advancedEnvironment", {
  imageId: "ami-12345678", // Specify a valid AMI ID
  instanceType: "t2.medium", // Choose a larger instance type for more resources
  automaticStopTimeMinutes: 15, // Environment stops after 15 minutes of inactivity
  repositories: [
    {
      pathComponent: "my-repo", // Path to the repository in the environment
      repositoryUrl: "https://github.com/my-org/my-repo.git" // URL to the Git repository
    }
  ],
  tags: [
    {
      key: "Environment",
      value: "Development"
    },
    {
      key: "Project",
      value: "MyProject"
    }
  ],
  name: "MyAdvancedEnvironment" // Name your environment
});
```

## Custom Networking

Create an EnvironmentEC2 that specifies a subnet and owner ARN for advanced networking configurations.

```ts
const networkedEnvironment = await AWS.Cloud9.EnvironmentEC2("networkedEnvironment", {
  imageId: "ami-12345678", // Specify a valid AMI ID
  instanceType: "t2.large", // Use a larger instance type
  subnetId: "subnet-0abc12345def67890", // Specify the subnet for the environment
  ownerArn: "arn:aws:iam::123456789012:user/my-user", // Specify the ARN of the owner
  description: "Development environment with custom networking." // Description of your environment
});
```

## Adoption of Existing Resource

Use the `adopt` property to take over an existing Cloud9 EnvironmentEC2 without creating a new one.

```ts
const adoptedEnvironment = await AWS.Cloud9.EnvironmentEC2("adoptedEnvironment", {
  imageId: "ami-12345678", // Specify a valid AMI ID
  instanceType: "t2.micro",
  adopt: true, // Adopt existing resource if it already exists
  name: "MyAdoptedEnvironment" // Name your environment
});
```
