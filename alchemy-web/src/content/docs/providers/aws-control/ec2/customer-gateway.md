---
title: CustomerGateway
description: Learn how to create, update, and manage AWS EC2 CustomerGateways using Alchemy Cloud Control.
---


The CustomerGateway resource allows you to manage [AWS EC2 CustomerGateways](https://docs.aws.amazon.com/ec2/latest/userguide/) which are used to set up a VPN connection between your network and AWS. 

## Minimal Example

Create a basic CustomerGateway with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const customerGateway = await AWS.EC2.CustomerGateway("MyCustomerGateway", {
  Type: "ipsec.1",
  IpAddress: "203.0.113.5",
  BgpAsn: 65000
});
```

## Advanced Configuration

Configure a CustomerGateway with additional properties such as BGP ASN and tags.

```ts
const advancedCustomerGateway = await AWS.EC2.CustomerGateway("AdvancedCustomerGateway", {
  Type: "ipsec.1",
  IpAddress: "203.0.113.10",
  BgpAsn: 65001,
  Tags: [
    { Key: "Name", Value: "Advanced-Customer-Gateway" },
    { Key: "Environment", Value: "Production" }
  ],
  CertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-efgh-5678-ijkl-9012mnopqrst"
});
```

## Using BGP ASN Extended

Create a CustomerGateway with extended BGP ASN for specific routing needs.

```ts
const extendedBgpCustomerGateway = await AWS.EC2.CustomerGateway("ExtendedBgpCustomerGateway", {
  Type: "ipsec.1",
  IpAddress: "203.0.113.15",
  BgpAsn: 65002,
  BgpAsnExtended: 65002 // Extended BGP ASN for more specific routing
});
```

## Adoption of Existing Resources

Use the adopt property to avoid failure when the resource already exists.

```ts
const existingCustomerGateway = await AWS.EC2.CustomerGateway("ExistingCustomerGateway", {
  Type: "ipsec.1",
  IpAddress: "203.0.113.20",
  adopt: true // Adopt existing resource instead of failing
});
```
