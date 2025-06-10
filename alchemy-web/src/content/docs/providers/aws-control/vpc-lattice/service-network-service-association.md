---
title: ServiceNetworkServiceAssociation
description: Learn how to create, update, and manage AWS VpcLattice ServiceNetworkServiceAssociations using Alchemy Cloud Control.
---


The ServiceNetworkServiceAssociation resource allows you to manage associations between services and service networks in AWS VPC Lattice. This resource helps in organizing and controlling the flow of traffic between services. For more information, refer to the [AWS VpcLattice ServiceNetworkServiceAssociations documentation](https://docs.aws.amazon.com/vpclattice/latest/userguide/).

## Minimal Example

Create a basic service network service association with required properties.

```ts
import AWS from "alchemy/aws/control";

const serviceNetworkAssociation = await AWS.VpcLattice.ServiceNetworkServiceAssociation("myServiceNetworkAssociation", {
  ServiceNetworkIdentifier: "arn:aws:vpclattice:us-west-2:123456789012:servicenetwork/myServiceNetwork",
  ServiceIdentifier: "arn:aws:vpclattice:us-west-2:123456789012:service/myService",
  DnsEntry: {
    DnsName: "my-service.example.com",
    HostedZoneId: "Z1D633PJN98FT9"
  },
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }]
});
```

## Advanced Configuration

Configure a service network service association with additional optional properties such as tags and adopting existing resources.

```ts
const advancedServiceNetworkAssociation = await AWS.VpcLattice.ServiceNetworkServiceAssociation("advancedServiceNetworkAssociation", {
  ServiceNetworkIdentifier: "arn:aws:vpclattice:us-west-2:123456789012:servicenetwork/advancedServiceNetwork",
  ServiceIdentifier: "arn:aws:vpclattice:us-west-2:123456789012:service/advancedService",
  DnsEntry: {
    DnsName: "advanced-service.example.com",
    HostedZoneId: "Z1D633PJN98FT9"
  },
  Tags: [{
    Key: "Project",
    Value: "MyProject"
  }],
  adopt: true // Adopt existing resource if it already exists
});
```

## Example with Multiple Tags

Create a service network service association that includes multiple tags for better resource management.

```ts
const taggedServiceNetworkAssociation = await AWS.VpcLattice.ServiceNetworkServiceAssociation("taggedServiceNetworkAssociation", {
  ServiceNetworkIdentifier: "arn:aws:vpclattice:us-west-2:123456789012:servicenetwork/taggedServiceNetwork",
  ServiceIdentifier: "arn:aws:vpclattice:us-west-2:123456789012:service/taggedService",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "Development" },
    { Key: "CostCenter", Value: "CC1234" }
  ]
});
```

## Example with Custom DNS Entry

Demonstrate creating a service network service association with a custom DNS entry configuration.

```ts
const customDnsServiceNetworkAssociation = await AWS.VpcLattice.ServiceNetworkServiceAssociation("customDnsServiceNetworkAssociation", {
  ServiceNetworkIdentifier: "arn:aws:vpclattice:us-west-2:123456789012:servicenetwork/customDnsServiceNetwork",
  ServiceIdentifier: "arn:aws:vpclattice:us-west-2:123456789012:service/customDnsService",
  DnsEntry: {
    DnsName: "custom-dns.example.com",
    HostedZoneId: "Z1D633PJN98FT9",
    DnsType: "A",
    DnsTtl: 300 // Time to live in seconds
  }
});
```
