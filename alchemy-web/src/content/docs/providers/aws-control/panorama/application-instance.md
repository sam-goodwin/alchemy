---
title: ApplicationInstance
description: Learn how to create, update, and manage AWS Panorama ApplicationInstances using Alchemy Cloud Control.
---


The ApplicationInstance resource allows you to manage [AWS Panorama ApplicationInstances](https://docs.aws.amazon.com/panorama/latest/userguide/) which are used for deploying machine learning models to edge devices.

## Minimal Example

Create a basic ApplicationInstance with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicApplicationInstance = await AWS.Panorama.ApplicationInstance("basicInstance", {
  DefaultRuntimeContextDevice: "device-arn-123",
  ManifestPayload: {
    "PayloadData": "manifest data here"
  },
  Description: "A basic application instance for testing"
});
```

## Advanced Configuration

Configure an ApplicationInstance with a runtime role and tags for better management and tracking.

```ts
const advancedApplicationInstance = await AWS.Panorama.ApplicationInstance("advancedInstance", {
  DefaultRuntimeContextDevice: "device-arn-456",
  ManifestPayload: {
    "PayloadData": "advanced manifest data here"
  },
  RuntimeRoleArn: "arn:aws:iam::123456789012:role/MyPanoramaRole",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "PanoramaML" }
  ]
});
```

## Instance Replacement

Create an ApplicationInstance that replaces an existing one.

```ts
const replaceApplicationInstance = await AWS.Panorama.ApplicationInstance("replaceInstance", {
  DefaultRuntimeContextDevice: "device-arn-789",
  ManifestPayload: {
    "PayloadData": "replacement manifest data here"
  },
  ApplicationInstanceIdToReplace: "existing-instance-id-001"
});
```

## With Manifest Overrides

Deploy an ApplicationInstance with manifest overrides for specific runtime configurations.

```ts
const overrideApplicationInstance = await AWS.Panorama.ApplicationInstance("overrideInstance", {
  DefaultRuntimeContextDevice: "device-arn-101",
  ManifestPayload: {
    "PayloadData": "override manifest data here"
  },
  ManifestOverridesPayload: {
    "PayloadData": "overriden data for runtime"
  },
  Description: "Application instance with manifest overrides"
});
```
