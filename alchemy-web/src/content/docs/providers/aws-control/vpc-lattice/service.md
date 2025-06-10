---
title: Service
description: Learn how to create, update, and manage AWS VpcLattice Services using Alchemy Cloud Control.
---


The Service resource lets you manage [AWS VpcLattice Services](https://docs.aws.amazon.com/vpclattice/latest/userguide/) and their associated settings.

## Minimal Example

Create a basic VpcLattice Service with required properties and a custom domain name.

```ts
import AWS from "alchemy/aws/control";

const basicService = await AWS.VpcLattice.Service("basicVpcService", {
  name: "BasicService",
  customDomainName: "service.example.com",
  dnsEntry: {
    hostname: "service.example.com",
    zoneId: "Z1RANDOMZONEID"
  }
});
```

## Advanced Configuration

Configure a service with additional settings such as authentication type and SSL certificate.

```ts
const advancedService = await AWS.VpcLattice.Service("advancedVpcService", {
  name: "AdvancedService",
  customDomainName: "advanced.example.com",
  authType: "AWS_IAM",
  certificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "VpcLatticeDemo" }
  ]
});
```

## Service with Custom Tags

Create a service that includes specific tags for better resource management.

```ts
const taggedService = await AWS.VpcLattice.Service("taggedVpcService", {
  name: "TaggedService",
  customDomainName: "tagged.example.com",
  tags: [
    { key: "Owner", value: "DevTeam" },
    { key: "Purpose", value: "API Gateway" }
  ]
});
```

## Service with Adoption

Create a service while adopting an existing resource if it already exists.

```ts
const adoptedService = await AWS.VpcLattice.Service("adoptedVpcService", {
  name: "AdoptedService",
  customDomainName: "adopted.example.com",
  adopt: true
});
```
