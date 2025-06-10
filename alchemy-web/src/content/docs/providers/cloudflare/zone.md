---
title: Zone
description: Learn how to manage your Cloudflare Zones (domains) including DNS settings and other configurations using Alchemy.
---

The Zone resource lets you manage [Cloudflare DNS zones](https://developers.cloudflare.com/dns/zone-setups/) and their configuration settings.

## Minimal Example

Create a basic DNS zone with default settings.

```ts
import { Zone } from "alchemy/cloudflare";

const zone = await Zone("example-zone", {
  name: "example.com",
  type: "full",
  delete: true //Default true: Delete's Zone on --destroy
});
```

## Enhanced Security Settings

Configure a zone with strict SSL and enhanced security settings.

```ts
const secureZone = await Zone("secure-zone", {
  name: "secure.example.com",
  settings: {
    ssl: "strict",
    alwaysUseHttps: "on", 
    minTlsVersion: "1.3",
    tls13: "zrt"
  }
});
```

## Performance Optimization

Create a zone optimized for performance with HTTP/3 and caching.

```ts
const fastZone = await Zone("fast-zone", {
  name: "fast.example.com", 
  settings: {
    browserCacheTtl: 7200,
    brotli: "on",
    http3: "on",
    earlyHints: "on"
  }
});
```

## Development Mode

Configure a zone for development with specific features enabled.

```ts
const devZone = await Zone("dev-zone", {
  name: "dev.example.com",
  settings: {
    developmentMode: "on",
    websockets: "on",
    hotlinkProtection: "on"
  }
});
```