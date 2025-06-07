---
title: Managing Fly.io IP Addresses with Alchemy
description: Learn how to create, configure, and manage Fly.io static IP addresses using Alchemy.
---

# IpAddress

The IpAddress resource lets you create and manage [Fly.io static IP addresses](https://fly.io/docs/networking/services/#dedicated-ipv4) for applications.

## Basic IPv4 Address

Create a static IPv4 address for your application:

```ts
import { IpAddress } from "alchemy/fly";

const ipv4 = await IpAddress("static-ipv4", {
  app: "my-app",
  type: "v4"
});
```

## Regional IP Addresses

Create IP addresses in specific regions:

```ts
import { IpAddress } from "alchemy/fly";

const eastCoastIp = await IpAddress("east-ip", {
  app: myApp,
  type: "v4",
  region: "iad"
});

const westCoastIp = await IpAddress("west-ip", {
  app: myApp,
  type: "v4",
  region: "sea"
});
```

## IPv4 and IPv6 Addresses

Create both types of IP addresses for full connectivity:

```ts
import { IpAddress } from "alchemy/fly";

const ipv4 = await IpAddress("app-ipv4", {
  app: myApp,
  type: "v4"
});

const ipv6 = await IpAddress("app-ipv6", {
  app: myApp,
  type: "v6"
});
```

## Global Load Balancing

Create IP addresses in multiple regions for global load balancing:

```ts
import { IpAddress } from "alchemy/fly";

const regions = ["iad", "sea", "lhr", "nrt"];

const ips = await Promise.all(
  regions.map((region, index) =>
    IpAddress(`ip-${region}`, {
      app: myApp,
      type: "v4",
      region
    })
  )
);
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `app` | `string \| App` | Yes | App this IP address belongs to |
| `type` | `"v4" \| "v6"` | Yes | IP address type |
| `region` | `string` | No | Region where the IP address will be allocated (default: "global") |
| `shared` | `boolean` | No | Whether this is a shared IP address (default: false) |
| `apiToken` | `Secret` | No | API token (overrides FLY_API_TOKEN env var) |

## Outputs

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | The ID of the IP address |
| `address` | `string` | The IP address value |
| `type` | `"v4" \| "v6"` | IP address type |
| `region` | `string` | Region where the IP address is allocated |
| `created_at` | `string` | Time at which the IP address was created |
| `shared` | `boolean` | Whether this is a shared IP address |
| `network` | `string` | Network information |

## IP Address Types

### IPv4 Addresses
- Dedicated IPv4 addresses are billable resources
- Limited availability in some regions
- Required for services that need consistent IP addresses
- Useful for allowlisting and firewall rules

### IPv6 Addresses
- IPv6 addresses are provided at no additional cost
- Available in all regions
- Automatically assigned to all applications
- Future-proof for IPv6-only networks

## Notes

- IP addresses are allocated immediately upon creation
- Static IP addresses persist across machine deployments
- IPv4 addresses have associated costs
- IP addresses can be moved between apps in the same organization
- Regional IP addresses provide better performance for users in that region