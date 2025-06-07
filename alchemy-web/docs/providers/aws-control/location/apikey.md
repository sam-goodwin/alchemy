---
title: Managing AWS Location APIKeys with Alchemy
description: Learn how to create, update, and manage AWS Location APIKeys using Alchemy Cloud Control.
---

# APIKey

The APIKey resource lets you create and manage [AWS Location APIKeys](https://docs.aws.amazon.com/location/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-apikey.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const apikey = await AWS.Location.APIKey("apikey-example", {
  KeyName: "apikey-key",
  Restrictions: "example-restrictions",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A apikey resource managed by Alchemy",
});
```

## Advanced Configuration

Create a apikey with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAPIKey = await AWS.Location.APIKey("advanced-apikey", {
  KeyName: "apikey-key",
  Restrictions: "example-restrictions",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A apikey resource managed by Alchemy",
});
```

