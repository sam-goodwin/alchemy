---
title: Location
description: Learn how to create, update, and manage AWS GameLift Locations using Alchemy Cloud Control.
---


The Location resource allows you to manage [AWS GameLift Locations](https://docs.aws.amazon.com/gamelift/latest/userguide/) for deploying game servers across various geographic regions to optimize performance and latency.

## Minimal Example

Create a basic GameLift location with required properties.

```ts
import AWS from "alchemy/aws/control";

const gameLiftLocation = await AWS.GameLift.Location("myGameLiftLocation", {
  LocationName: "us-west-2",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "GameServerDeployment" }
  ]
});
```

## Advanced Configuration

Configure a GameLift location with the adoption option enabled, allowing you to adopt an existing resource if it already exists.

```ts
const adoptedLocation = await AWS.GameLift.Location("adoptedGameLiftLocation", {
  LocationName: "eu-central-1",
  adopt: true,
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Project", Value: "Testing" }
  ]
});
```

## Resource Metadata

Access the metadata of a GameLift location, including its ARN, creation time, and last update time.

```ts
const locationMetadata = await AWS.GameLift.Location("locationMetadata", {
  LocationName: "ap-south-1"
});

// Log the metadata details
console.log(`ARN: ${locationMetadata.Arn}`);
console.log(`Created At: ${locationMetadata.CreationTime}`);
console.log(`Last Updated At: ${locationMetadata.LastUpdateTime}`);
```

## Tagging for Resource Management

Create a location with meaningful tags for better resource management and organization.

```ts
const taggedLocation = await AWS.GameLift.Location("taggedLocation", {
  LocationName: "us-east-1",
  Tags: [
    { Key: "Owner", Value: "GameDevTeam" },
    { Key: "Version", Value: "1.0" }
  ]
});
```
