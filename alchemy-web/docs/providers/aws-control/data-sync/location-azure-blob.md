---
title: Managing AWS DataSync LocationAzureBlobs with Alchemy
description: Learn how to create, update, and manage AWS DataSync LocationAzureBlobs using Alchemy Cloud Control.
---

# LocationAzureBlob

The LocationAzureBlob resource lets you create and manage [AWS DataSync LocationAzureBlobs](https://docs.aws.amazon.com/datasync/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datasync-locationazureblob.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const locationazureblob = await AWS.DataSync.LocationAzureBlob("locationazureblob-example", {
  AzureBlobAuthenticationType: "example-azureblobauthenticationtype",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a locationazureblob with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLocationAzureBlob = await AWS.DataSync.LocationAzureBlob(
  "advanced-locationazureblob",
  {
    AzureBlobAuthenticationType: "example-azureblobauthenticationtype",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

