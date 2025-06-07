---
title: Managing AWS Connect ViewVersions with Alchemy
description: Learn how to create, update, and manage AWS Connect ViewVersions using Alchemy Cloud Control.
---

# ViewVersion

The ViewVersion resource lets you manage [AWS Connect ViewVersions](https://docs.aws.amazon.com/connect/latest/userguide/) for your Amazon Connect instances, enabling you to define and manage the layout and functionality of your contact center's user interface.

## Minimal Example

Create a basic ViewVersion with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicViewVersion = await AWS.Connect.ViewVersion("BasicViewVersion", {
  ViewArn: "arn:aws:connect:us-west-2:123456789012:view/12345678-1234-5678-1234-123456789012",
  VersionDescription: "Initial version of the view"
});
```

## Advanced Configuration

Configure a ViewVersion with additional properties like content hash.

```ts
const AdvancedViewVersion = await AWS.Connect.ViewVersion("AdvancedViewVersion", {
  ViewArn: "arn:aws:connect:us-west-2:123456789012:view/12345678-1234-5678-1234-123456789012",
  VersionDescription: "Updated version with content hash",
  ViewContentSha256: "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
});
```

## Adoption of Existing ViewVersion

Adopt an existing ViewVersion instead of failing when the resource already exists.

```ts
const AdoptedViewVersion = await AWS.Connect.ViewVersion("AdoptedViewVersion", {
  ViewArn: "arn:aws:connect:us-west-2:123456789012:view/12345678-1234-5678-1234-123456789012",
  VersionDescription: "Version that adopts existing resource",
  adopt: true
});
```