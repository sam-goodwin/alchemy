---
title: StaticIp
description: Learn how to create, update, and manage AWS Lightsail StaticIps using Alchemy Cloud Control.
---


The StaticIp resource allows you to manage [AWS Lightsail Static IPs](https://docs.aws.amazon.com/lightsail/latest/userguide/) for your instances, providing a fixed IP address that can be associated with your Lightsail resources.

## Minimal Example

Create a basic Static IP with the required properties and an optional attachment.

```ts
import AWS from "alchemy/aws/control";

const staticIp = await AWS.Lightsail.StaticIp("myStaticIp", {
  StaticIpName: "MyStaticIp",
  AttachedTo: "myInstance" // Optional: Attach to an existing instance
});
```

## Advanced Configuration

Create a Static IP with the option to adopt an existing resource if it already exists.

```ts
const adoptStaticIp = await AWS.Lightsail.StaticIp("adoptStaticIp", {
  StaticIpName: "ExistingStaticIp",
  adopt: true // Adopt existing resource
});
```

## Detaching and Reattaching

Demonstrate how to detach a Static IP from an instance and then reattach it.

```ts
// Detach from an instance
await AWS.Lightsail.StaticIp("detachStaticIp", {
  StaticIpName: "MyStaticIp",
  AttachedTo: undefined // Detach the Static IP
});

// Reattach to a different instance
await AWS.Lightsail.StaticIp("reattachStaticIp", {
  StaticIpName: "MyStaticIp",
  AttachedTo: "anotherInstance" // Reattach to a new instance
});
```

## Cleanup Example

Show how to clean up by deleting a Static IP when it is no longer needed.

```ts
await AWS.Lightsail.StaticIp("deleteStaticIp", {
  StaticIpName: "MyStaticIp"
});
```
