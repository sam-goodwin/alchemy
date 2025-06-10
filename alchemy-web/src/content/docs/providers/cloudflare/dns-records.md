---
title: DnsRecords
description: Learn how to create, update, and manage Cloudflare DNS Records for your domains using Alchemy.
---

Manages DNS records in a Cloudflare zone using the [Cloudflare DNS API](https://developers.cloudflare.com/api/operations/dns-records-for-a-zone-list-dns-records).

## Minimal Example

Create a basic A record pointing to an IP address.

```ts
import { DnsRecords } from "alchemy/cloudflare";

const records = await DnsRecords("example-dns", {
  zoneId: "YOUR_ZONE_ID",
  records: [{
    name: "www.example.com", 
    type: "A",
    content: "192.0.2.1",
    proxied: true
  }]
});
```

## Email Records

Create MX and TXT records for email routing.

```ts
import { DnsRecords } from "alchemy/cloudflare";

const emailRecords = await DnsRecords("email-dns", {
  zoneId: "YOUR_ZONE_ID", 
  records: [
    {
      name: "example.com",
      type: "MX",
      content: "aspmx.l.google.com",
      priority: 1
    },
    {
      name: "example.com", 
      type: "TXT",
      content: "v=spf1 include:_spf.google.com ~all"
    }
  ]
});
```

## Proxied Records

Create proxied records to take advantage of Cloudflare's CDN and security features.

```ts
import { DnsRecords } from "alchemy/cloudflare";

const proxiedRecords = await DnsRecords("proxied-dns", {
  zoneId: "YOUR_ZONE_ID",
  records: [
    {
      name: "www.example.com",
      type: "A", 
      content: "192.0.2.1",
      proxied: true,
      ttl: 1 // Auto TTL when proxied
    },
    {
      name: "blog.example.com",
      type: "CNAME",
      content: "www.example.com",
      proxied: true
    }
  ]
});
```