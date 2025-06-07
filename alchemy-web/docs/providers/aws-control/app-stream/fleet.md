---
title: Managing AWS AppStream Fleets with Alchemy
description: Learn how to create, update, and manage AWS AppStream Fleets using Alchemy Cloud Control.
---

# Fleet

The Fleet resource lets you manage [AWS AppStream Fleets](https://docs.aws.amazon.com/appstream/latest/userguide/) that provide a collection of compute resources for streaming applications to users. This resource allows you to configure various parameters essential for the effective operation of your AppStream environment.

## Minimal Example

Create a basic AppStream Fleet with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const DefaultFleet = await AWS.AppStream.Fleet("DefaultFleet", {
  Name: "DefaultFleet",
  InstanceType: "stream.standard.small",
  ComputeCapacity: {
    DesiredInstances: 1
  },
  VpcConfig: {
    SubnetIds: ["subnet-12345678"],
    SecurityGroupIds: ["sg-12345678"]
  }
});
```

## Advanced Configuration

Configure an AppStream Fleet with advanced settings including session management and USB device filtering.

```ts
const AdvancedFleet = await AWS.AppStream.Fleet("AdvancedFleet", {
  Name: "AdvancedFleet",
  InstanceType: "stream.standard.medium",
  ComputeCapacity: {
    DesiredInstances: 2
  },
  MaxUserDurationInSeconds: 3600,
  IdleDisconnectTimeoutInSeconds: 300,
  UsbDeviceFilterStrings: ["*"],
  EnableDefaultInternetAccess: true,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Development" }
  ]
});
```

## Fleet with Domain Join

This example demonstrates how to configure a Fleet that joins a domain and uses a session script.

```ts
const DomainJoinedFleet = await AWS.AppStream.Fleet("DomainJoinedFleet", {
  Name: "DomainJoinedFleet",
  InstanceType: "stream.standard.large",
  ComputeCapacity: {
    DesiredInstances: 1
  },
  DomainJoinInfo: {
    DirectoryName: "corporate-domain.com",
    OrganizationalUnitDistinguishedName: "OU=AppStream,DC=corporate-domain,DC=com"
  },
  SessionScriptS3Location: {
    S3Bucket: "my-bucket",
    S3Key: "session-script.sh"
  },
  MaxConcurrentSessions: 10
});
```

## Fleet with Custom Network Configuration

This example shows how to configure a Fleet with specific network settings including a VPC configuration.

```ts
const NetworkConfiguredFleet = await AWS.AppStream.Fleet("NetworkConfiguredFleet", {
  Name: "NetworkConfiguredFleet",
  InstanceType: "stream.standard.xlarge",
  ComputeCapacity: {
    DesiredInstances: 3
  },
  VpcConfig: {
    SubnetIds: ["subnet-87654321"],
    SecurityGroupIds: ["sg-87654321"]
  },
  EnableDefaultInternetAccess: false,
  Tags: [
    { Key: "Environment", Value: "test" },
    { Key: "Team", Value: "QA" }
  ]
});
```