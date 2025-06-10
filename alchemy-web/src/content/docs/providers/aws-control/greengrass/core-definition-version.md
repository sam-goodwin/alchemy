---
title: CoreDefinitionVersion
description: Learn how to create, update, and manage AWS Greengrass CoreDefinitionVersions using Alchemy Cloud Control.
---


The CoreDefinitionVersion resource lets you manage [AWS Greengrass CoreDefinitionVersions](https://docs.aws.amazon.com/greengrass/latest/userguide/) which define a set of Greengrass core devices and their properties.

## Minimal Example

Create a basic CoreDefinitionVersion with required properties.

```ts
import AWS from "alchemy/aws/control";

const coreDefinitionVersion = await AWS.Greengrass.CoreDefinitionVersion("basicCoreDefinitionVersion", {
  Cores: [{
    Id: "CoreDevice1",
    ThingArn: "arn:aws:iot:us-west-2:123456789012:thing/CoreDevice1",
    CertificateArn: "arn:aws:iot:us-west-2:123456789012:cert/abcdef01-2345-6789-abcd-ef0123456789",
    SyncShadow: true
  }],
  CoreDefinitionId: "coreDefinitionId123",
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a CoreDefinitionVersion with additional properties for enhanced functionality.

```ts
const advancedCoreDefinitionVersion = await AWS.Greengrass.CoreDefinitionVersion("advancedCoreDefinitionVersion", {
  Cores: [{
    Id: "CoreDevice2",
    ThingArn: "arn:aws:iot:us-west-2:123456789012:thing/CoreDevice2",
    CertificateArn: "arn:aws:iot:us-west-2:123456789012:cert/abcdef02-2345-6789-abcd-ef0123456789",
    SyncShadow: false // Optional: Disable shadow synchronization
  }],
  CoreDefinitionId: "coreDefinitionId456",
  adopt: false // Optional: Set to false to fail if the resource already exists
});
```

## Multiple Cores Definition

Define a CoreDefinitionVersion with multiple core devices.

```ts
const multipleCoresDefinitionVersion = await AWS.Greengrass.CoreDefinitionVersion("multipleCoresDefinitionVersion", {
  Cores: [{
    Id: "CoreDevice3",
    ThingArn: "arn:aws:iot:us-west-2:123456789012:thing/CoreDevice3",
    CertificateArn: "arn:aws:iot:us-west-2:123456789012:cert/abcdef03-2345-6789-abcd-ef0123456789",
    SyncShadow: true
  }, {
    Id: "CoreDevice4",
    ThingArn: "arn:aws:iot:us-west-2:123456789012:thing/CoreDevice4",
    CertificateArn: "arn:aws:iot:us-west-2:123456789012:cert/abcdef04-2345-6789-abcd-ef0123456789",
    SyncShadow: true
  }],
  CoreDefinitionId: "coreDefinitionId789"
});
```
