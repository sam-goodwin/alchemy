---
title: SourceLocation
description: Learn how to create, update, and manage AWS MediaTailor SourceLocations using Alchemy Cloud Control.
---


The SourceLocation resource lets you manage [AWS MediaTailor SourceLocations](https://docs.aws.amazon.com/mediatailor/latest/userguide/) for configuring video streaming sources.

## Resource Documentation

For detailed information on SourceLocations, refer to the [AWS CloudFormation documentation](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-sourcelocation.html).

## Minimal Example

Create a basic SourceLocation with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicSourceLocation = await AWS.MediaTailor.SourceLocation("basicSourceLocation", {
  SourceLocationName: "MySourceLocation",
  HttpConfiguration: {
    BaseUrl: "https://myvideo.com"
  },
  DefaultSegmentDeliveryConfiguration: {
    SegmentBase: {
      DurationSeconds: 10,
      ManifestEndpointPrefix: "https://myvideo.com/manifest"
    }
  }
});
```

## Advanced Configuration

Configure a SourceLocation with multiple segment delivery configurations and access control.

```ts
const advancedSourceLocation = await AWS.MediaTailor.SourceLocation("advancedSourceLocation", {
  SourceLocationName: "MyAdvancedSourceLocation",
  HttpConfiguration: {
    BaseUrl: "https://myadvancedvideo.com"
  },
  SegmentDeliveryConfigurations: [
    {
      SegmentDeliveryConfigurationName: "HLSConfiguration",
      SegmentBase: {
        DurationSeconds: 10,
        ManifestEndpointPrefix: "https://myadvancedvideo.com/hls"
      }
    },
    {
      SegmentDeliveryConfigurationName: "DASHConfiguration",
      SegmentBase: {
        DurationSeconds: 5,
        ManifestEndpointPrefix: "https://myadvancedvideo.com/dash"
      }
    }
  ],
  AccessConfiguration: {
    AccessType: "ALLOW",
    AllowedOrigins: ["https://myallowedorigin.com"]
  }
});
```

## Tagging for Organization

Create a SourceLocation with tags to help with resource organization.

```ts
const taggedSourceLocation = await AWS.MediaTailor.SourceLocation("taggedSourceLocation", {
  SourceLocationName: "MyTaggedSourceLocation",
  HttpConfiguration: {
    BaseUrl: "https://mytaggedvideo.com"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "VideoStreaming" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing SourceLocation instead of failing if it already exists.

```ts
const adoptSourceLocation = await AWS.MediaTailor.SourceLocation("adoptSourceLocation", {
  SourceLocationName: "MyExistingSourceLocation",
  HttpConfiguration: {
    BaseUrl: "https://myexistingvideo.com"
  },
  adopt: true // This ensures that it will adopt the existing resource
});
```
