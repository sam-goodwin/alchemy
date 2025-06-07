---
title: Managing AWS EC2 ClientVpnEndpoints with Alchemy
description: Learn how to create, update, and manage AWS EC2 ClientVpnEndpoints using Alchemy Cloud Control.
---

# ClientVpnEndpoint

The ClientVpnEndpoint resource lets you create and manage [AWS EC2 ClientVpnEndpoints](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-clientvpnendpoint.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const clientvpnendpoint = await AWS.EC2.ClientVpnEndpoint("clientvpnendpoint-example", {
  ClientCidrBlock: "example-clientcidrblock",
  AuthenticationOptions: [],
  ServerCertificateArn: "example-servercertificatearn",
  ConnectionLogOptions: "example-connectionlogoptions",
  Description: "A clientvpnendpoint resource managed by Alchemy",
});
```

## Advanced Configuration

Create a clientvpnendpoint with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedClientVpnEndpoint = await AWS.EC2.ClientVpnEndpoint("advanced-clientvpnendpoint", {
  ClientCidrBlock: "example-clientcidrblock",
  AuthenticationOptions: [],
  ServerCertificateArn: "example-servercertificatearn",
  ConnectionLogOptions: "example-connectionlogoptions",
  Description: "A clientvpnendpoint resource managed by Alchemy",
});
```

