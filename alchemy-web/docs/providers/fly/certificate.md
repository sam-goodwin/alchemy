---
title: Managing Fly.io Certificates with Alchemy
description: Learn how to create, configure, and manage Fly.io SSL/TLS certificates using Alchemy.
---

# Certificate

The Certificate resource lets you create and manage [Fly.io SSL/TLS certificates](https://fly.io/docs/app-guides/custom-domains-with-fly/) for custom domains.

## Basic Certificate

Create a managed certificate for a custom domain:

```ts
import { Certificate } from "alchemy/fly";

const cert = await Certificate("main-cert", {
  app: "my-app",
  hostname: "example.com"
});
```

## Subdomain Certificate

Create a certificate for a subdomain:

```ts
import { Certificate } from "alchemy/fly";

const cert = await Certificate("api-cert", {
  app: myApp,
  hostname: "api.example.com",
  type: "managed"
});
```

## Wildcard Certificate

Create a wildcard certificate for multiple subdomains:

```ts
import { Certificate } from "alchemy/fly";

const cert = await Certificate("wildcard-cert", {
  app: myApp,
  hostname: "*.example.com"
});
```

## Multiple Domain Certificates

Create certificates for multiple domains:

```ts
import { Certificate } from "alchemy/fly";

const domains = ["example.com", "www.example.com", "api.example.com"];

const certificates = await Promise.all(
  domains.map((domain, index) => 
    Certificate(`cert-${index}`, {
      app: myApp,
      hostname: domain
    })
  )
);
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `app` | `string \| App` | Yes | App this certificate belongs to |
| `hostname` | `string` | Yes | Hostname for the certificate |
| `type` | `"managed" \| "manual"` | No | Certificate type (default: "managed") |
| `apiToken` | `Secret` | No | API token (overrides FLY_API_TOKEN env var) |

## Outputs

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | The ID of the certificate |
| `hostname` | `string` | Hostname for the certificate |
| `check_passed` | `boolean` | Whether certificate validation checks have passed |
| `source` | `string` | Certificate source |
| `created_at` | `string` | Time at which the certificate was created |
| `configured` | `boolean` | Whether the certificate is configured |
| `acme_error` | `string` | ACME error message, if any |
| `verified` | `boolean` | Whether the certificate is verified |
| `certificate_authority` | `string` | Certificate authority that issued the certificate |
| `dns_validation_target` | `string` | DNS validation target (for verification) |
| `dns_validation_hostname` | `string` | DNS validation hostname (for verification) |

## Certificate Validation

For managed certificates, Fly.io will automatically handle the certificate provisioning using Let's Encrypt. You may need to:

1. **DNS Validation**: Point your domain to your Fly.io app
2. **HTTP Validation**: Ensure your app is accessible via HTTP

## Notes

- Managed certificates are automatically renewed by Fly.io
- Wildcard certificates require DNS validation
- Certificate provisioning can take several minutes
- Some certificate authorities may have rate limits
- You can check certificate status through the `check_passed` and `verified` properties