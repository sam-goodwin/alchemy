---
title: Cloudflare Certificate Pack
description: Learn how to create and manage Cloudflare Advanced Certificate Packs for flexible SSL/TLS certificates with multiple Certificate Authorities and custom configurations.
---

# Certificate Pack

The Certificate Pack resource lets you create and manage [Cloudflare Advanced Certificate Packs](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate_packs/) for flexible SSL/TLS certificates with multiple Certificate Authority options.

**Important Requirements:**
- **Advanced Certificate Manager (ACM) must be activated:** Before using Certificate Packs, you must activate ACM in your Cloudflare dashboard. Navigate to your domain > **SSL/TLS** > **Edge Certificates** and click **Activate** for Advanced Certificate Manager. This requires a $10/month subscription per domain.
- Requires a paid Cloudflare plan (not available on Free plans)
- Certificate provisioning can take up to 10 minutes
- Most properties are immutable after creation (only `cloudflareBranding` can be updated)

## Basic Example

Create a basic certificate pack with Let's Encrypt for your domain.

```ts
import { Zone, CertificatePack } from "alchemy/cloudflare";

const zone = await Zone("my-zone", {
  name: "example.com",
});

const basicCert = await CertificatePack("my-cert", {
  zone: zone,
  certificateAuthority: "lets_encrypt",
  hosts: ["example.com", "www.example.com"],
  validationMethod: "txt",
  validityDays: 90,
});
```

## Enterprise Certificate with Google Trust Services

Create an enterprise-grade certificate with Google Trust Services and Cloudflare branding.

```ts
const enterpriseCert = await CertificatePack("enterprise-cert", {
  zone: "example.com", // Can use zone ID string or Zone resource
  certificateAuthority: "google",
  hosts: ["example.com", "*.example.com", "api.example.com"],
  validationMethod: "txt",
  validityDays: 365,
  cloudflareBranding: true,
});
```

## Wildcard Certificate with SSL.com

Create a wildcard certificate using SSL.com with email validation.

```ts
const wildcardCert = await CertificatePack("wildcard-cert", {
  zone: myZone,
  certificateAuthority: "ssl_com",
  hosts: ["example.com", "*.example.com"],
  validationMethod: "email",
  validityDays: 365,
});
```

## Multi-Domain Certificate

Create a certificate covering multiple subdomains with Let's Encrypt.

```ts
const multiDomainCert = await CertificatePack("multi-cert", {
  zone: "example.com",
  certificateAuthority: "lets_encrypt",
  hosts: [
    "example.com",
    "www.example.com",
    "api.example.com",
    "admin.example.com",
    "blog.example.com"
  ],
  validationMethod: "http",
  validityDays: 90,
});
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `zone` | `string \| Zone` | Yes | Zone resource or zone ID where the certificate will be created |
| `certificateAuthority` | `"google" \| "lets_encrypt" \| "ssl_com"` | Yes | Certificate Authority to use for issuing the certificate |
| `hosts` | `string[]` | Yes | List of hostnames (max 50, must include zone apex) |
| `validationMethod` | `"txt" \| "http" \| "email"` | Yes | Domain ownership validation method |
| `validityDays` | `14 \| 30 \| 90 \| 365` | Yes | Certificate validity period in days |
| `cloudflareBranding` | `boolean` | No | Add Cloudflare branding subdomain as Common Name (default: false) |
| `type` | `"advanced"` | No | Certificate type (only "advanced" supported, default: "advanced") |
| `delete` | `boolean` | No | Whether to delete the certificate pack on destroy (default: true) |

## Certificate Authorities

### Let's Encrypt (`lets_encrypt`)
- **Cost:** Free
- **Best for:** Basic SSL needs, development environments
- **Validity:** Shorter periods (14, 30, 90 days)
- **Features:** Standard domain validation

### Google Trust Services (`google`)
- **Cost:** Paid
- **Best for:** Enterprise applications, production environments
- **Validity:** Up to 365 days
- **Features:** Enhanced validation, enterprise support

### SSL.com (`ssl_com`)
- **Cost:** Commercial
- **Best for:** Commercial applications requiring extended validation
- **Validity:** Up to 365 days  
- **Features:** Extended validation options, commercial support

## Validation Methods

### TXT Record (`txt`)
- Add DNS TXT record to prove domain ownership
- Most reliable method for automation
- Works with all domain configurations

### HTTP File (`http`)
- Upload verification file to domain's web server
- Requires web server access
- Good for domains with existing websites

### Email (`email`)
- Receive validation email at admin addresses
- Requires access to domain admin email
- Manual validation process

## Important Notes

### Immutable Properties
Most certificate pack properties cannot be changed after creation. To modify these properties, you must delete and recreate the certificate pack:

- Certificate Authority (`certificateAuthority`)
- Hostnames (`hosts`)
- Validation Method (`validationMethod`)
- Validity Period (`validityDays`)
- Type (`type`)

### Updateable Properties
Only `cloudflareBranding` can be updated after creation:

```ts
// Update to enable Cloudflare branding
const updatedCert = await CertificatePack("my-cert", {
  zone: zone,
  certificateAuthority: "lets_encrypt", // Must match original
  hosts: ["example.com", "www.example.com"], // Must match original
  validationMethod: "txt", // Must match original
  validityDays: 90, // Must match original
  cloudflareBranding: true, // Only this can change
});
```

### Host Requirements
- Maximum 50 hostnames per certificate pack
- Must include the zone apex (root domain)
- Supports wildcards (e.g., `*.example.com`)
- Cannot be empty

### Provisioning Time
- Certificate packs take time to provision and become active
- Full deployment can take up to 10 minutes
- Monitor the `status` property to track progress

### Subscription Requirements
Advanced Certificate Packs require a paid Cloudflare plan. Free plans cannot create certificate packs and will receive subscription-related errors.

## Status Values

Certificate packs progress through various status values during their lifecycle:

- `initializing` - Certificate pack creation in progress
- `pending_validation` - Waiting for domain validation
- `pending_issuance` - Certificate being issued by CA
- `pending_deployment` - Certificate being deployed to edge
- `active` - Certificate is live and serving traffic
- `expired` - Certificate has expired
- `deleted` - Certificate pack has been deleted

Error states include `*_timed_out` variants when operations exceed time limits.

## Helper Functions

### Wait for Certificate to Become Active

```ts
import { waitForCertificatePackActive } from "alchemy/cloudflare/certificate-pack";

// Wait for certificate to become active (up to 10 minutes)
const finalStatus = await waitForCertificatePackActive(
  api,
  zone.id,
  certificatePack.id,
  10 * 60 * 1000 // 10 minutes timeout
);

console.log(`Certificate pack is now: ${finalStatus}`);
```