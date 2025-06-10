---
title: ClientVpnAuthorizationRule
description: Learn how to create, update, and manage AWS EC2 ClientVpnAuthorizationRules using Alchemy Cloud Control.
---


The ClientVpnAuthorizationRule resource allows you to manage [AWS EC2 Client VPN authorization rules](https://docs.aws.amazon.com/ec2/latest/userguide/). These rules control access for VPN clients to specific network resources.

## Minimal Example

Create a basic ClientVpnAuthorizationRule with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicAuthRule = await AWS.EC2.ClientVpnAuthorizationRule("basicAuthRule", {
  ClientVpnEndpointId: "cvpn-endpoint-1234567890abcdef0",
  TargetNetworkCidr: "10.0.0.0/16",
  Description: "Basic authorization rule for VPN clients"
});
```

## Advanced Configuration

Configure a ClientVpnAuthorizationRule that uses an access group and authorizes all groups.

```ts
const advancedAuthRule = await AWS.EC2.ClientVpnAuthorizationRule("advancedAuthRule", {
  ClientVpnEndpointId: "cvpn-endpoint-0987654321abcdef0",
  TargetNetworkCidr: "192.168.1.0/24",
  AccessGroupId: "sg-0123456789abcdef0",
  AuthorizeAllGroups: true,
  Description: "Advanced authorization rule with all groups authorized"
});
```

## Specific Use Case: Restrict Access to a Subnet

This example demonstrates how to create a rule that restricts VPN access to a specific subnet.

```ts
const subnetAuthRule = await AWS.EC2.ClientVpnAuthorizationRule("subnetAuthRule", {
  ClientVpnEndpointId: "cvpn-endpoint-abcdef0123456789",
  TargetNetworkCidr: "172.16.0.0/12",
  AccessGroupId: "sg-abcdef0123456789",
  Description: "Authorization rule for restricted subnet access"
});
```

## Adoption of Existing Resource

In this example, we adopt an existing ClientVpnAuthorizationRule instead of failing if it already exists.

```ts
const adoptAuthRule = await AWS.EC2.ClientVpnAuthorizationRule("adoptAuthRule", {
  ClientVpnEndpointId: "cvpn-endpoint-abcdefgh12345678",
  TargetNetworkCidr: "10.1.0.0/16",
  Description: "Adopting an existing authorization rule",
  adopt: true
});
```
