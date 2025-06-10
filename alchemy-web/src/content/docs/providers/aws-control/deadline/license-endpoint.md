---
title: LicenseEndpoint
description: Learn how to create, update, and manage AWS Deadline LicenseEndpoints using Alchemy Cloud Control.
---


The LicenseEndpoint resource allows you to manage AWS Deadline LicenseEndpoints, which are essential for licensing access to Deadline render management software. For more information, refer to the [AWS Deadline LicenseEndpoints documentation](https://docs.aws.amazon.com/deadline/latest/userguide/).

## Minimal Example

Create a basic LicenseEndpoint with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const licenseEndpoint = await AWS.Deadline.LicenseEndpoint("myLicenseEndpoint", {
  VpcId: "vpc-12345678",
  SecurityGroupIds: [
    "sg-87654321"
  ],
  SubnetIds: [
    "subnet-abcdef01",
    "subnet-abcdef02"
  ],
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a LicenseEndpoint with multiple security groups and subnets for better access management.

```ts
const advancedLicenseEndpoint = await AWS.Deadline.LicenseEndpoint("advancedLicenseEndpoint", {
  VpcId: "vpc-12345678",
  SecurityGroupIds: [
    "sg-87654321",
    "sg-12345678"
  ],
  SubnetIds: [
    "subnet-abcdef01",
    "subnet-abcdef02",
    "subnet-abcdef03"
  ],
  Tags: [
    { Key: "Project", Value: "RenderFarm" }
  ],
  adopt: true // Adopt existing resource if it exists
});
```

## Multiple Subnets for High Availability

Create a LicenseEndpoint spread across multiple subnets to ensure high availability.

```ts
const highAvailabilityLicenseEndpoint = await AWS.Deadline.LicenseEndpoint("highAvailabilityLicenseEndpoint", {
  VpcId: "vpc-12345678",
  SecurityGroupIds: [
    "sg-87654321"
  ],
  SubnetIds: [
    "subnet-abcdef01", // Availability Zone 1
    "subnet-abcdef02", // Availability Zone 2
    "subnet-abcdef03"  // Availability Zone 3
  ],
  Tags: [
    { Key: "Service", Value: "Deadline" }
  ]
});
```

## Security Group Configuration

Demonstrate the use of a LicenseEndpoint with a specific security group configuration.

```ts
const secureLicenseEndpoint = await AWS.Deadline.LicenseEndpoint("secureLicenseEndpoint", {
  VpcId: "vpc-12345678",
  SecurityGroupIds: [
    "sg-87654321"  // Security group allowing inbound traffic on port 8080
  ],
  SubnetIds: [
    "subnet-abcdef01"
  ],
  Tags: [
    { Key: "Access", Value: "Restricted" }
  ]
});
```
