---
title: Domain
description: Manage email domains for sending emails through Resend
---

# Domain

The `ResendDomain` resource manages email domains for sending emails through Resend. Domains must be verified via DNS records before they can be used for sending emails.

## Example Usage

### Basic Domain Setup

Create a domain with default settings:

```ts
import { ResendDomain } from "alchemy/resend";

const domain = await ResendDomain("my-domain", {
  name: "example.com"
});

console.log(`Domain ID: ${domain.id}`);
console.log(`Status: ${domain.status}`);
console.log(`DNS Records to configure:`);
domain.records.forEach(record => {
  console.log(`${record.type}: ${record.name} -> ${record.value}`);
});
```

### Domain with Custom Region

Create a domain in a specific region:

```ts
const euDomain = await ResendDomain("eu-domain", {
  name: "mail.example.com",
  region: "eu-west-1",
  apiKey: alchemy.secret(process.env.RESEND_API_KEY)
});
```

### Using Domain for Email Sending

Once verified, use the domain for sending emails:

```ts
const domain = await ResendDomain("verified-domain", {
  name: "mail.example.com"
});

// Use domain in email sending
const fromAddress = `noreply@${domain.name}`;
console.log(`Send emails from: ${fromAddress}`);
```

## Properties

### Input Properties

- **`name`** (required): Domain name to add to Resend
- **`region`** (optional): Region where the domain will be used. Defaults to `"us-east-1"`. Options:
  - `"us-east-1"` - United States East (default)
  - `"eu-west-1"` - Europe West (GDPR compliant)
  - `"sa-east-1"` - South America East
- **`apiKey`** (optional): API key for authentication. Falls back to `RESEND_API_KEY` environment variable
- **`baseUrl`** (optional): Custom API base URL. Defaults to `"https://api.resend.com"`

### Output Properties

All input properties, plus:

- **`id`**: The unique identifier for the domain
- **`status`**: Current verification status (`"not_started"`, `"pending"`, `"verified"`, `"failed"`)
- **`records`**: Array of DNS records required for domain verification:
  - **`name`**: DNS record name
  - **`type`**: DNS record type (TXT, MX, CNAME)
  - **`value`**: DNS record value
  - **`ttl`**: Time to live for the record
  - **`priority`**: Priority for MX records
  - **`status`**: Individual record verification status
- **`created_at`**: Timestamp when the domain was created

## DNS Configuration

After creating a domain, you'll need to configure DNS records with your DNS provider:

```ts
const domain = await ResendDomain("company-domain", {
  name: "mail.company.com"
});

// Display DNS records for configuration
console.log("Configure these DNS records:");
domain.records.forEach(record => {
  console.log(`Type: ${record.type}`);
  console.log(`Name: ${record.name}`);
  console.log(`Value: ${record.value}`);
  if (record.priority) {
    console.log(`Priority: ${record.priority}`);
  }
  if (record.ttl) {
    console.log(`TTL: ${record.ttl}`);
  }
  console.log(`Status: ${record.status}`);
  console.log('---');
});
```

## Regional Considerations

Choose the appropriate region based on your audience location and compliance requirements:

- **US East (us-east-1)**: Best for North American audiences
- **EU West (eu-west-1)**: GDPR compliant, best for European audiences
- **South America East (sa-east-1)**: Best for South American audiences

```ts
// GDPR compliant domain for European users
const gdprDomain = await ResendDomain("gdpr-domain", {
  name: "eu.example.com",
  region: "eu-west-1"
});
```

## Verification Process

1. **Create Domain**: Domain is created with `pending` status
2. **Configure DNS**: Add the provided DNS records to your DNS provider
3. **Automatic Verification**: Resend automatically checks DNS records
4. **Verified**: Domain status changes to `verified` when all records are valid

The verification process typically takes a few minutes but can take up to 24 hours depending on DNS propagation.

## Important Notes

- **Immutable Properties**: Domain name and region cannot be changed after creation
- **DNS Propagation**: Allow time for DNS changes to propagate globally
- **Subdomain Support**: You can use subdomains (e.g., `mail.example.com`)
- **Multiple Domains**: You can verify multiple domains for different purposes