# CustomHostname

Create and manage Custom Hostnames for Cloudflare for SaaS. Custom Hostnames allow you to provide SSL certificates for your customer's domains that point to your Cloudflare zone.

Learn more about [Cloudflare for SaaS domain support](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/).

## Example Usage

### Basic Custom Hostname

Create a custom hostname with default SSL settings:

```ts
import { Zone, CustomHostname } from "@alchemy/cloudflare";

const zone = await Zone("example-zone", {
  name: "example.com"
});

const customHostname = await CustomHostname("customer-hostname", {
  hostname: "app.customer.com",
  zone: zone,
  ssl: {
    method: "http",
    type: "dv"
  }
});

console.log(`Custom hostname ID: ${customHostname.id}`);
console.log(`Status: ${customHostname.status}`);
console.log(`SSL Status: ${customHostname.ssl.status}`);
```

### Custom Hostname with Advanced SSL Settings

Create a custom hostname with specific SSL configuration:

```ts
const customHostname = await CustomHostname("secure-hostname", {
  hostname: "secure.customer.com", 
  zone: "your-zone-id",
  ssl: {
    method: "txt",
    type: "dv",
    settings: {
      http2: "on",
      tls_1_3: "on",
      min_tls_version: "1.2"
    },
    bundle_method: "optimal"
  },
  custom_metadata: {
    customer_id: "12345",
    plan: "enterprise"
  }
});
```

### Custom Hostname with Wildcard Certificate

Create a wildcard custom hostname:

```ts
const wildcardHostname = await CustomHostname("wildcard-hostname", {
  hostname: "*.customer.com",
  zone: zone,
  ssl: {
    method: "txt",
    type: "dv",
    wildcard: true,
    bundle_method: "ubiquitous"
  }
});
```

## Properties

### Required Properties

| Property | Type | Description |
|----------|------|-------------|
| `hostname` | `string` | The custom hostname to create (e.g., "app.customer.com") |
| `zone` | `string \| Zone` | The zone where the custom hostname will be created |

### Optional Properties

| Property | Type | Description |
|----------|------|-------------|
| `ssl` | `CustomHostnameSslSettings` | SSL configuration for the hostname |
| `custom_metadata` | `Record<string, string>` | Custom metadata key-value pairs |

### SSL Settings

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `method` | `"http" \| "txt" \| "email"` | `"http"` | SSL certificate validation method |
| `type` | `"dv"` | `"dv"` | SSL certificate type (Domain Validated) |
| `bundle_method` | `"ubiquitous" \| "optimal" \| "force_ubiquitous"` | `"ubiquitous"` | Certificate bundle method |
| `wildcard` | `boolean` | `false` | Enable wildcard certificate |
| `settings` | `object` | - | Advanced SSL settings |

### Advanced SSL Settings

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `http2` | `"on" \| "off"` | `"on"` | Enable HTTP/2 |
| `tls_1_3` | `"on" \| "off"` | `"on"` | Enable TLS 1.3 |
| `min_tls_version` | `"1.0" \| "1.1" \| "1.2" \| "1.3"` | `"1.2"` | Minimum TLS version |
| `ciphers` | `string[]` | - | Custom cipher list |

## Outputs

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier for the custom hostname |
| `zoneId` | `string` | Zone ID where the hostname was created |
| `status` | `string` | Current status of the custom hostname |
| `ssl` | `object` | SSL certificate information and status |
| `ownershipVerification` | `object` | Ownership verification details |
| `ownershipVerificationHttp` | `object` | HTTP verification details (if applicable) |
| `verificationErrors` | `string[]` | Any verification errors |
| `createdAt` | `number` | Creation timestamp |
| `modifiedAt` | `number` | Last modification timestamp |

## Status Values

Custom hostnames can have the following status values:

- `pending_validation` - Waiting for domain validation
- `pending_issuance` - SSL certificate being issued
- `pending_deployment` - SSL certificate being deployed
- `active` - Custom hostname is active and ready to use
- `moved` - Hostname moved to different account
- `deleted` - Hostname has been deleted

## SSL Verification Methods

### HTTP Verification (`method: "http"`)

With HTTP verification, Cloudflare will make an HTTP request to verify domain ownership:

```ts
// Access verification details from the hostname output
if (customHostname.ownershipVerificationHttp) {
  console.log(`Place this content: ${customHostname.ownershipVerificationHttp.httpBody}`);
  console.log(`At this URL: ${customHostname.ownershipVerificationHttp.httpUrl}`);
}
```

### TXT Record Verification (`method: "txt"`)

With TXT verification, you need to create a DNS TXT record:

```ts
// Access verification details from the hostname output
if (customHostname.ownershipVerification) {
  console.log(`Create TXT record: ${customHostname.ownershipVerification.name}`);
  console.log(`With value: ${customHostname.ownershipVerification.value}`);
}
```

## Error Handling

Check for verification errors:

```ts
if (customHostname.verificationErrors && customHostname.verificationErrors.length > 0) {
  console.error("Verification errors:", customHostname.verificationErrors);
}
```

## Best Practices

1. **Use TXT verification for production** - More secure than HTTP verification
2. **Monitor status** - Check the status and verification errors regularly
3. **Use metadata for tracking** - Store customer information in custom_metadata
4. **Choose appropriate bundle method** - Use "optimal" for better performance, "ubiquitous" for compatibility
5. **Enable modern TLS settings** - Use TLS 1.3 and modern cipher suites when possible

## Related Resources

- [Zone](./zone.md) - Cloudflare zone management
- [CustomDomain](./custom-domain.md) - Worker custom domains
- [DNS Records](./dns-records.md) - DNS record management

## Reference

- [Cloudflare Custom Hostnames API](https://developers.cloudflare.com/api/resources/custom_hostnames/)
- [Cloudflare for SaaS Documentation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/)