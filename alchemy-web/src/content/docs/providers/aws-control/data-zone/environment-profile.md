---
title: EnvironmentProfile
description: Learn how to create, update, and manage AWS DataZone EnvironmentProfiles using Alchemy Cloud Control.
---


The EnvironmentProfile resource allows you to manage [AWS DataZone EnvironmentProfiles](https://docs.aws.amazon.com/datazone/latest/userguide/) for your data environments, enabling better organization and management of your data projects.

## Minimal Example

Create a basic EnvironmentProfile with the required properties and a couple of optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicEnvironmentProfile = await AWS.DataZone.EnvironmentProfile("basicProfile", {
  ProjectIdentifier: "project-123",
  AwsAccountRegion: "us-east-1",
  AwsAccountId: "123456789012",
  EnvironmentBlueprintIdentifier: "blueprint-abc",
  Name: "MyEnvironmentProfile",
  DomainIdentifier: "domain-xyz",
  UserParameters: [
    { key: "instanceType", value: "t2.micro" },
    { key: "storageSize", value: "20" }
  ],
  Description: "A basic environment profile for my project."
});
```

## Advanced Configuration

Configure an EnvironmentProfile with additional settings for a more complex setup.

```ts
const advancedEnvironmentProfile = await AWS.DataZone.EnvironmentProfile("advancedProfile", {
  ProjectIdentifier: "project-456",
  AwsAccountRegion: "us-west-2",
  AwsAccountId: "987654321098",
  EnvironmentBlueprintIdentifier: "blueprint-def",
  Name: "AdvancedEnvironmentProfile",
  DomainIdentifier: "domain-uvw",
  UserParameters: [
    { key: "instanceType", value: "t3.large" },
    { key: "databaseType", value: "PostgreSQL" },
    { key: "replicationFactor", value: "3" }
  ],
  Description: "An advanced environment profile with specific configurations."
});
```

## Adoption of Existing Resources

Create an EnvironmentProfile that adopts an existing resource if it already exists.

```ts
const adoptExistingProfile = await AWS.DataZone.EnvironmentProfile("adoptedProfile", {
  ProjectIdentifier: "project-789",
  AwsAccountRegion: "eu-central-1",
  AwsAccountId: "111222333444",
  EnvironmentBlueprintIdentifier: "blueprint-ghi",
  Name: "AdoptedEnvironmentProfile",
  DomainIdentifier: "domain-rst",
  adopt: true // Adopt existing resource if it already exists
});
```

## Environment Profile with Custom User Parameters

Demonstrate creating an EnvironmentProfile that includes a custom set of user parameters.

```ts
const customUserParametersProfile = await AWS.DataZone.EnvironmentProfile("customParamsProfile", {
  ProjectIdentifier: "project-101",
  AwsAccountRegion: "ap-southeast-1",
  AwsAccountId: "555666777888",
  EnvironmentBlueprintIdentifier: "blueprint-jkl",
  Name: "CustomUserParametersProfile",
  DomainIdentifier: "domain-opq",
  UserParameters: [
    { key: "applicationLoadBalancer", value: "true" },
    { key: "autoScalingEnabled", value: "true" },
    { key: "instanceMaxSize", value: "5" }
  ],
  Description: "Environment profile with custom user parameters for auto-scaling."
});
```
