---
title: ImportDnsRecords
description: Learn how to import existing DNS records from your provider into Alchemy for management with Infrastructure-as-Code.
---


The ImportDnsRecords resource lets you import DNS records from any domain using [Cloudflare's DNS-over-HTTPS API](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/).

## Minimal Example

Import all default DNS record types for a domain.

```ts
import { ImportDnsRecords } from "alchemy/dns";

const dnsRecords = await ImportDnsRecords("example-com", {
  domain: "example.com"
});
```

## Import Specific Record Types

Import only specified DNS record types.

```ts
import { ImportDnsRecords } from "alchemy/dns";

const records = await ImportDnsRecords("example-com", {
  domain: "example.com",
  recordTypes: ["A", "MX"]
});
```

## Transfer Records to Cloudflare

Import DNS records and transfer them to a Cloudflare zone.

```ts
import { ImportDnsRecords, DnsRecords } from "alchemy/dns";

const dnsRecords = await ImportDnsRecords("dns-records", {
  domain: "example.com"
});

await DnsRecords("transfer-records", {
  zoneId: zone.id,
  records: dnsRecords.records
});
```
