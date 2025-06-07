---
title: Managing AWS Pinpoint Apps with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint Apps using Alchemy Cloud Control.
---

# App

The App resource lets you manage [AWS Pinpoint Apps](https://docs.aws.amazon.com/pinpoint/latest/userguide/) for engaging with your customers through targeted messaging and analytics.

## Minimal Example

Create a basic Pinpoint App with a name and optional tags.

```ts
import AWS from "alchemy/aws/control";

const pinpointApp = await AWS.Pinpoint.App("myPinpointApp", {
  Name: "MyFirstApp",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Owner", Value: "Marketing" }
  ]
});
```

## Advanced Configuration

Configure a Pinpoint App with additional properties such as adoption of existing resources.

```ts
const existingApp = await AWS.Pinpoint.App("existingApp", {
  Name: "MyExistingApp",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Owner", Value: "Marketing" }
  ],
  adopt: true // Adopt the existing resource instead of failing
});
```

## Creating a Unique App

Create a unique Pinpoint App that focuses on a specific marketing campaign.

```ts
const campaignApp = await AWS.Pinpoint.App("campaignApp", {
  Name: "SummerSaleCampaign",
  Tags: [
    { Key: "Campaign", Value: "Summer Sale" },
    { Key: "Owner", Value: "SalesTeam" }
  ]
});
```

## Updating an Existing App

Update an existing Pinpoint App with a new name and tags.

```ts
const updatedApp = await AWS.Pinpoint.App("updateApp", {
  Name: "UpdatedAppName",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Owner", Value: "ProductTeam" }
  ],
  adopt: true // Adopt the existing resource instead of failing
});
```