---
title: APIKey
description: Learn how to create, update, and manage AWS Location APIKeys using Alchemy Cloud Control.
---


The APIKey resource allows you to manage [AWS Location APIKeys](https://docs.aws.amazon.com/location/latest/userguide/), which are used to authenticate requests made to the AWS Location Service.

## Minimal Example

Create a basic APIKey with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicApiKey = await AWS.Location.APIKey("basicApiKey", {
  KeyName: "MyLocationApiKey",
  Description: "API Key for accessing AWS Location Service",
  Restrictions: {
    // Define restrictions as necessary
    // For demonstration purposes, we'll leave this empty
  },
  Tags: [
    {
      Key: "Project",
      Value: "LocationService"
    }
  ]
});
```

## Advanced Configuration

Configure an APIKey with no expiry and forced updates.

```ts
const advancedApiKey = await AWS.Location.APIKey("advancedApiKey", {
  KeyName: "AdvancedLocationApiKey",
  Description: "Advanced API Key with no expiry and forced update",
  NoExpiry: true,
  ForceUpdate: true,
  Restrictions: {
    // Add specific restrictions as necessary
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Team",
      Value: "GeoServices"
    }
  ]
});
```

## Force Deletion Example

Create an APIKey with the option to force delete.

```ts
const forceDeleteApiKey = await AWS.Location.APIKey("forceDeleteApiKey", {
  KeyName: "ForceDeleteApiKey",
  Description: "API Key that can be force deleted",
  ForceDelete: true,
  Restrictions: {
    // Define restrictions as necessary
  }
});
```

## Expiration Example

Create an APIKey with a specific expiration time.

```ts
const expirationApiKey = await AWS.Location.APIKey("expirationApiKey", {
  KeyName: "ExpirationLocationApiKey",
  Description: "API Key that expires after a set time",
  ExpireTime: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
  Restrictions: {
    // Add any necessary restrictions
  }
});
```
