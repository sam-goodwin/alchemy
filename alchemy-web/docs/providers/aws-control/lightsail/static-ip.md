---
title: Managing AWS Lightsail StaticIps with Alchemy
description: Learn how to create, update, and manage AWS Lightsail StaticIps using Alchemy Cloud Control.
---

# StaticIp

The StaticIp resource allows you to create and manage [AWS Lightsail Static IPs](https://docs.aws.amazon.com/lightsail/latest/userguide/) that can be attached to your Lightsail instances for consistent public IP addressing.

## Minimal Example

Create a basic Static IP with a specified name.

```ts
import AWS from "alchemy/aws/control";

const BasicStaticIp = await AWS.Lightsail.StaticIp("BasicStaticIp", {
  StaticIpName: "MyStaticIp"
});
```

## Attach to an Instance

This example demonstrates how to attach the Static IP to a Lightsail instance.

```ts
const AttachedStaticIp = await AWS.Lightsail.StaticIp("AttachedStaticIp", {
  StaticIpName: "MyStaticIp",
  AttachedTo: "MyLightsailInstance"
});
```

## Detach from an Instance

In this example, we show how to detach the Static IP from a Lightsail instance.

```ts
const DetachedStaticIp = await AWS.Lightsail.StaticIp("DetachedStaticIp", {
  StaticIpName: "MyStaticIp",
  AttachedTo: undefined // Detaching by not specifying an instance
});
```

## Adopt Existing Static IP

Use this example to adopt an existing Static IP instead of creating a new one.

```ts
const AdoptedStaticIp = await AWS.Lightsail.StaticIp("AdoptedStaticIp", {
  StaticIpName: "ExistingStaticIpName",
  adopt: true
});
```