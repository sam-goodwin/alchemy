---
title: Managing AWS EC2 ClientVpnAuthorizationRules with Alchemy
description: Learn how to create, update, and manage AWS EC2 ClientVpnAuthorizationRules using Alchemy Cloud Control.
---

# ClientVpnAuthorizationRule

The ClientVpnAuthorizationRule resource allows you to manage [AWS EC2 ClientVpnAuthorizationRules](https://docs.aws.amazon.com/ec2/latest/userguide/) to control access to your Client VPN endpoints.

## Minimal Example

Create a basic ClientVpnAuthorizationRule with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicAuthorizationRule = await AWS.EC2.ClientVpnAuthorizationRule("BasicAuthRule", {
  ClientVpnEndpointId: "cvpn-endpoint-12345678",
  TargetNetworkCidr: "10.0.0.0/16",
  Description: "Basic authorization rule for VPN access"
});
```

## Advanced Configuration

Configure a ClientVpnAuthorizationRule with additional settings, including access group ID and authorization for all groups.

```ts
const advancedAuthorizationRule = await AWS.EC2.ClientVpnAuthorizationRule("AdvancedAuthRule", {
  ClientVpnEndpointId: "cvpn-endpoint-87654321",
  TargetNetworkCidr: "10.1.0.0/16",
  AccessGroupId: "vpn-access-group-01",
  AuthorizeAllGroups: true,
  Description: "Advanced rule allowing access to all groups"
});
```

## Specific Use Case: Restricting Access

Create a ClientVpnAuthorizationRule that restricts access to a specific CIDR block for a defined access group.

```ts
const restrictedAccessRule = await AWS.EC2.ClientVpnAuthorizationRule("RestrictedAccessRule", {
  ClientVpnEndpointId: "cvpn-endpoint-abcdef12",
  TargetNetworkCidr: "10.2.0.0/24",
  AccessGroupId: "restricted-access-group",
  Description: "Rule restricting access to a specific subnet"
});
```

## Adoption of Existing Resource

Create a rule that adopts an existing resource instead of failing if the resource already exists.

```ts
const adoptExistingRule = await AWS.EC2.ClientVpnAuthorizationRule("AdoptExistingRule", {
  ClientVpnEndpointId: "cvpn-endpoint-12345678",
  TargetNetworkCidr: "10.3.0.0/24",
  adopt: true,
  Description: "Adopts existing authorization rule if present"
});
```