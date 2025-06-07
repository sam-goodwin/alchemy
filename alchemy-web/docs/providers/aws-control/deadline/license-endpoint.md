---
title: Managing AWS Deadline LicenseEndpoints with Alchemy
description: Learn how to create, update, and manage AWS Deadline LicenseEndpoints using Alchemy Cloud Control.
---

# LicenseEndpoint

The LicenseEndpoint resource allows you to manage [AWS Deadline LicenseEndpoints](https://docs.aws.amazon.com/deadline/latest/userguide/) for handling license management and orchestration in your Deadline rendering environment.

## Minimal Example

Create a basic LicenseEndpoint with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicLicenseEndpoint = await AWS.Deadline.LicenseEndpoint("BasicLicenseEndpoint", {
  VpcId: "vpc-123abc45",
  SecurityGroupIds: ["sg-678def90"],
  SubnetIds: ["subnet-abc12345"],
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a LicenseEndpoint with multiple security groups and additional tags for better resource organization.

```ts
const advancedLicenseEndpoint = await AWS.Deadline.LicenseEndpoint("AdvancedLicenseEndpoint", {
  VpcId: "vpc-123abc45",
  SecurityGroupIds: ["sg-678def90", "sg-890ghijkl"],
  SubnetIds: ["subnet-abc12345", "subnet-def67890"],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Rendering" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Specific Use Cases

Create a LicenseEndpoint with a specific CIDR block for enhanced network configurations.

```ts
const cidrLicenseEndpoint = await AWS.Deadline.LicenseEndpoint("CidrLicenseEndpoint", {
  VpcId: "vpc-123abc45",
  SecurityGroupIds: ["sg-678def90"],
  SubnetIds: ["subnet-abc12345"],
  Tags: [
    { Key: "Environment", Value: "Staging" }
  ]
});
```

In this example, the LicenseEndpoint is created using realistic VPC, security group, and subnet identifiers that support a practical use case in a staging environment.