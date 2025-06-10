---
title: PackagingConfiguration
description: Learn how to create, update, and manage AWS MediaPackage PackagingConfigurations using Alchemy Cloud Control.
---


The PackagingConfiguration resource lets you manage [AWS MediaPackage PackagingConfigurations](https://docs.aws.amazon.com/mediapackage/latest/userguide/) for preparing and delivering video content over the internet.

## Minimal Example

Create a basic PackagingConfiguration with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const basicPackagingConfiguration = await AWS.MediaPackage.PackagingConfiguration("basicPackagingConfig", {
  Id: "basic-config",
  PackagingGroupId: "packaging-group-1",
  HlsPackage: {
    SegmentDurationSeconds: 10,
    PlaylistType: "EVENT" // Optional property
  }
});
```

## Advanced Configuration

Configure a PackagingConfiguration with multiple packaging types, including DASH, CMAF, and HLS:

```ts
const advancedPackagingConfiguration = await AWS.MediaPackage.PackagingConfiguration("advancedPackagingConfig", {
  Id: "advanced-config",
  PackagingGroupId: "packaging-group-1",
  MssPackage: {
    SegmentDurationSeconds: 10,
    ManifestWindowSeconds: 60,
    StreamSelection: {
      MinVideoBitsPerSecond: 500000,
      MaxVideoBitsPerSecond: 5000000,
      StreamOrder: "ORIGINAL"
    }
  },
  CmafPackage: {
    SegmentDurationSeconds: 10,
    Encryption: {
      SpekeKeyProvider: {
        RoleArn: "arn:aws:iam::123456789012:role/SampleRole",
        Url: "https://example.com/speke",
        CertificateArn: "arn:aws:iam::123456789012:server-certificate/sample-cert"
      }
    }
  },
  DashPackage: {
    SegmentDurationSeconds: 10,
    ManifestLayout: "FULL",
    Profile: "NONE"
  }
});
```

## Tagging and Resource Management

Create a PackagingConfiguration with tags for better resource management:

```ts
const taggedPackagingConfiguration = await AWS.MediaPackage.PackagingConfiguration("taggedPackagingConfig", {
  Id: "tagged-config",
  PackagingGroupId: "packaging-group-1",
  HlsPackage: {
    SegmentDurationSeconds: 10
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "VideoStreaming" }
  ]
});
```

## Adoption of Existing Resources

Adopt an existing PackagingConfiguration instead of creating a new one if it already exists:

```ts
const adoptExistingPackagingConfiguration = await AWS.MediaPackage.PackagingConfiguration("adoptPackagingConfig", {
  Id: "existing-config",
  PackagingGroupId: "packaging-group-1",
  adopt: true // This will adopt the existing resource
});
```
