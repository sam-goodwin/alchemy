---
title: Managing AWS Panorama ApplicationInstances with Alchemy
description: Learn how to create, update, and manage AWS Panorama ApplicationInstances using Alchemy Cloud Control.
---

# ApplicationInstance

The ApplicationInstance resource allows you to manage [AWS Panorama ApplicationInstances](https://docs.aws.amazon.com/panorama/latest/userguide/) for running machine learning applications on edge devices.

## Minimal Example

Create a basic ApplicationInstance with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const BasicApplicationInstance = await AWS.Panorama.ApplicationInstance("BasicAppInstance", {
  DefaultRuntimeContextDevice: "arn:aws:panorama:us-east-1:123456789012:device/my-device",
  ManifestPayload: {
    "PayloadData": "some-manifest-data"
  },
  Tags: [{ Key: "Environment", Value: "development" }]
});
```

## Advanced Configuration

Configure an ApplicationInstance with additional properties such as a description and runtime role ARN.

```ts
const AdvancedApplicationInstance = await AWS.Panorama.ApplicationInstance("AdvancedAppInstance", {
  DefaultRuntimeContextDevice: "arn:aws:panorama:us-east-1:123456789012:device/my-device",
  ManifestPayload: {
    "PayloadData": "some-manifest-data"
  },
  Description: "This is an advanced application instance.",
  RuntimeRoleArn: "arn:aws:iam::123456789012:role/my-panorama-role",
  Tags: [{ Key: "Environment", Value: "production" }, { Key: "Team", Value: "AI" }]
});
```

## Replace Existing ApplicationInstance

If you need to replace an existing ApplicationInstance, you can specify the `ApplicationInstanceIdToReplace` property.

```ts
const ReplaceApplicationInstance = await AWS.Panorama.ApplicationInstance("ReplaceAppInstance", {
  DefaultRuntimeContextDevice: "arn:aws:panorama:us-east-1:123456789012:device/my-device",
  ManifestPayload: {
    "PayloadData": "new-manifest-data"
  },
  ApplicationInstanceIdToReplace: "existing-instance-id",
  Tags: [{ Key: "Environment", Value: "testing" }]
});
```

## Override Manifest Payload

You can also provide overrides for the existing manifest with `ManifestOverridesPayload`.

```ts
const OverrideManifestApplicationInstance = await AWS.Panorama.ApplicationInstance("OverrideManifestAppInstance", {
  DefaultRuntimeContextDevice: "arn:aws:panorama:us-east-1:123456789012:device/my-device",
  ManifestPayload: {
    "PayloadData": "base-manifest-data"
  },
  ManifestOverridesPayload: {
    "PayloadData": "overridden-manifest-data"
  },
  Tags: [{ Key: "Environment", Value: "staging" }]
});
```