---
title: Disk
description: Learn how to create, update, and manage AWS Lightsail Disks using Alchemy Cloud Control.
---


The Disk resource allows you to manage [AWS Lightsail Disks](https://docs.aws.amazon.com/lightsail/latest/userguide/) for your applications and services running on Lightsail. Disks can be attached to Lightsail instances to provide additional storage resources.

## Minimal Example

Create a basic Lightsail Disk with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicDisk = await AWS.Lightsail.Disk("basic-disk", {
  SizeInGb: 32,
  DiskName: "my-disk",
  AvailabilityZone: "us-east-1a"
});
```

## Advanced Configuration

Configure a Lightsail Disk with additional properties such as tags and location.

```ts
const advancedDisk = await AWS.Lightsail.Disk("advanced-disk", {
  SizeInGb: 64,
  DiskName: "my-advanced-disk",
  AvailabilityZone: "us-east-1b",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "WebApp" }
  ],
  Location: {
    RegionName: "us-east-1"
  }
});
```

## Disk with Add-Ons

Create a Lightsail Disk that includes add-ons for enhanced functionality.

```ts
const diskWithAddOns = await AWS.Lightsail.Disk("disk-with-add-ons", {
  SizeInGb: 128,
  DiskName: "my-disk-with-add-ons",
  AvailabilityZone: "us-west-2a",
  AddOns: [
    {
      Key: "AutoSnapshot",
      Value: "Enabled"
    }
  ]
});
```

## Adopting an Existing Disk

Adopt an existing Lightsail Disk resource instead of failing when it already exists.

```ts
const adoptExistingDisk = await AWS.Lightsail.Disk("adopt-disk", {
  SizeInGb: 50,
  DiskName: "existing-disk",
  AvailabilityZone: "us-west-1a",
  adopt: true
});
```
