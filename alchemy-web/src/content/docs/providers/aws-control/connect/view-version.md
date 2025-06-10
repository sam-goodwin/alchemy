---
title: ViewVersion
description: Learn how to create, update, and manage AWS Connect ViewVersions using Alchemy Cloud Control.
---


The ViewVersion resource lets you manage [AWS Connect ViewVersions](https://docs.aws.amazon.com/connect/latest/userguide/) for your Amazon Connect instances. This resource is used to define and control the versions of views that are part of your customer service operations.

## Minimal Example

Create a basic ViewVersion with required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const basicViewVersion = await AWS.Connect.ViewVersion("basicViewVersion", {
  ViewArn: "arn:aws:connect:us-east-1:123456789012:view/abcd1234-efgh-5678-ijkl-9876543210mn",
  VersionDescription: "Initial version for customer support view"
});
```

## Advanced Configuration

Update the ViewVersion with a SHA256 hash of the view content for version tracking.

```ts
const advancedViewVersion = await AWS.Connect.ViewVersion("advancedViewVersion", {
  ViewArn: "arn:aws:connect:us-east-1:123456789012:view/abcd1234-efgh-5678-ijkl-9876543210mn",
  VersionDescription: "Updated version with new layout",
  ViewContentSha256: "3d6f6a3e5f4e3b7a2cbe0c9f3e5a387f3c9b4b6f7c1e3d3b8e5c5f6a7b8c8d8e"
});
```

## Adopting Existing Resources

If you want to create a ViewVersion that adopts an existing resource, set the adopt property to true.

```ts
const adoptViewVersion = await AWS.Connect.ViewVersion("adoptViewVersion", {
  ViewArn: "arn:aws:connect:us-east-1:123456789012:view/abcd1234-efgh-5678-ijkl-9876543210mn",
  VersionDescription: "Adopting existing view version",
  adopt: true
});
```

## Creating Multiple Versions

You can create multiple versions for different use cases, such as testing or production.

```ts
const testViewVersion = await AWS.Connect.ViewVersion("testViewVersion", {
  ViewArn: "arn:aws:connect:us-east-1:123456789012:view/abcd1234-efgh-5678-ijkl-9876543210mn",
  VersionDescription: "Test version for QA purposes"
});

const productionViewVersion = await AWS.Connect.ViewVersion("productionViewVersion", {
  ViewArn: "arn:aws:connect:us-east-1:123456789012:view/abcd1234-efgh-5678-ijkl-9876543210mn",
  VersionDescription: "Production version with customer feedback"
});
```
