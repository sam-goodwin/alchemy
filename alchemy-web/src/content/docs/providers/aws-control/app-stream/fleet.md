---
title: Fleet
description: Learn how to create, update, and manage AWS AppStream Fleets using Alchemy Cloud Control.
---


The Fleet resource lets you manage [AWS AppStream Fleets](https://docs.aws.amazon.com/appstream/latest/userguide/) which are used to deliver applications to users through a secure, scalable environment.

## Minimal Example

Create a basic AppStream Fleet with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const appStreamFleet = await AWS.AppStream.Fleet("myFleet", {
  Name: "MyAppFleet",
  InstanceType: "stream.standard.medium",
  ComputeCapacity: {
    DesiredCapacity: 2
  },
  EnableDefaultInternetAccess: true
});
```

## Advanced Configuration

Configure an AppStream Fleet with more advanced options, including VPC settings and IAM role.

```ts
const advancedFleet = await AWS.AppStream.Fleet("advancedFleet", {
  Name: "AdvancedAppFleet",
  InstanceType: "stream.compute.large",
  ComputeCapacity: {
    DesiredCapacity: 5
  },
  VpcConfig: {
    VpcId: "vpc-12345678",
    SubnetIds: ["subnet-12345678", "subnet-87654321"],
    SecurityGroupIds: ["sg-12345678"]
  },
  IamRoleArn: "arn:aws:iam::123456789012:role/AppStreamAccessRole",
  MaxConcurrentSessions: 10,
  DomainJoinInfo: {
    DirectoryName: "myDomain",
    OrganizationalUnitDistinguishedNames: ["OU=AppStream,DC=mydomain,DC=com"]
  }
});
```

## Custom Session Script

Create a Fleet that includes a session script for custom user sessions.

```ts
const fleetWithSessionScript = await AWS.AppStream.Fleet("sessionScriptFleet", {
  Name: "FleetWithSessionScript",
  InstanceType: "stream.standard.large",
  ComputeCapacity: {
    DesiredCapacity: 3
  },
  SessionScriptS3Location: {
    S3Bucket: "my-bucket",
    S3Key: "scripts/sessionScript.sh"
  },
  MaxUserDurationInSeconds: 3600
});
```

## USB Device Filtering

Configure a Fleet that includes USB device filtering to restrict which devices can be used.

```ts
const usbFilteredFleet = await AWS.AppStream.Fleet("usbFilteredFleet", {
  Name: "UsbFilteredFleet",
  InstanceType: "stream.standard.medium",
  ComputeCapacity: {
    DesiredCapacity: 4
  },
  UsbDeviceFilterStrings: ["VendorID:1234,ProductID:5678"]
});
```
