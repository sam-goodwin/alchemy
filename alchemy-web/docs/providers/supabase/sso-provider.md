# Supabase SSO Provider Resource

The `SSOProvider` resource manages Single Sign-On (SSO) authentication providers for Supabase projects, enabling enterprise authentication integration.

## Usage

```typescript
import { SSOProvider } from "alchemy/supabase";

// Create a SAML SSO provider
const samlProvider = SSOProvider("company-saml", {
  project: "proj-123",
  type: "saml",
  metadata: {
    entity_id: "https://company.com/saml",
    sso_url: "https://company.com/sso/login",
    certificate: secret("-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----"),
  },
  domains: ["company.com", "subsidiary.company.com"],
});

// Create an OIDC SSO provider
const oidcProvider = SSOProvider("company-oidc", {
  project: "proj-123",
  type: "oidc",
  metadata: {
    issuer: "https://company.okta.com",
    client_id: "your-client-id",
    client_secret: "your-client-secret",
  },
  domains: ["company.com"],
});
```

## Properties

### Required Properties

- **`project`** (`string | Project`): Reference to the project where the SSO provider will be configured
- **`type`** (`string`): Type of SSO provider ("saml", "oidc", etc.)

### Optional Properties

- **`metadata`** (`Record<string, any>`): Provider-specific configuration metadata
- **`domains`** (`string[]`): Array of email domains that should use this SSO provider
- **`adopt`** (`boolean`): Whether to adopt an existing provider if creation fails due to type conflict. Default: `false`.
- **`delete`** (`boolean`): Whether to delete the provider when the resource is destroyed. Default: `true`.
- **`accessToken`** (`Secret`): Supabase access token. Falls back to `SUPABASE_ACCESS_TOKEN` environment variable.
- **`baseUrl`** (`string`): Base URL for Supabase API. Default: `https://api.supabase.com/v1`.

## Resource Properties

The SSO provider resource exposes the following properties:

- **`id`** (`string`): Unique identifier for the SSO provider
- **`type`** (`string`): Type of SSO provider
- **`metadata`** (`Record<string, any>`): Provider configuration metadata
- **`domains`** (`string[]`): Array of associated email domains
- **`createdAt`** (`string`): ISO timestamp when the provider was created
- **`updatedAt`** (`string`): ISO timestamp when the provider was last updated

## Examples

### SAML Provider

```typescript
const samlProvider = SSOProvider("enterprise-saml", {
  project: "my-project-ref",
  type: "saml",
  metadata: {
    entity_id: "https://enterprise.com/saml/metadata",
    sso_url: "https://enterprise.com/saml/sso",
    slo_url: "https://enterprise.com/saml/slo",
    certificate: `-----BEGIN CERTIFICATE-----
MIICXjCCAcegAwIBAgIJAKS0yiqVrJejMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
...
-----END CERTIFICATE-----`,
    attribute_mapping: {
      email: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
      name: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
    },
  },
  domains: ["enterprise.com", "subsidiary.enterprise.com"],
});
```

### OIDC Provider (Okta)

```typescript
const oktaProvider = SSOProvider("okta-oidc", {
  project: "my-project-ref",
  type: "oidc",
  metadata: {
    issuer: "https://company.okta.com/oauth2/default",
    client_id: "0oa1234567890abcdef",
    client_secret: "your-okta-client-secret",
    authorization_endpoint: "https://company.okta.com/oauth2/default/v1/authorize",
    token_endpoint: "https://company.okta.com/oauth2/default/v1/token",
    userinfo_endpoint: "https://company.okta.com/oauth2/default/v1/userinfo",
    jwks_uri: "https://company.okta.com/oauth2/default/v1/keys",
    scopes: ["openid", "email", "profile"],
  },
  domains: ["company.com"],
});
```

### Azure AD Provider

```typescript
const azureProvider = SSOProvider("azure-ad", {
  project: "my-project-ref",
  type: "oidc",
  metadata: {
    issuer: "https://login.microsoftonline.com/tenant-id/v2.0",
    client_id: "your-azure-client-id",
    client_secret: "your-azure-client-secret",
    authorization_endpoint: "https://login.microsoftonline.com/tenant-id/oauth2/v2.0/authorize",
    token_endpoint: "https://login.microsoftonline.com/tenant-id/oauth2/v2.0/token",
    userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
    jwks_uri: "https://login.microsoftonline.com/tenant-id/discovery/v2.0/keys",
    scopes: ["openid", "email", "profile"],
  },
  domains: ["company.com"],
});
```

### Google Workspace Provider

```typescript
const googleProvider = SSOProvider("google-workspace", {
  project: "my-project-ref",
  type: "oidc",
  metadata: {
    issuer: "https://accounts.google.com",
    client_id: "your-google-client-id.apps.googleusercontent.com",
    client_secret: "your-google-client-secret",
    authorization_endpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    token_endpoint: "https://oauth2.googleapis.com/token",
    userinfo_endpoint: "https://openidconnect.googleapis.com/v1/userinfo",
    jwks_uri: "https://www.googleapis.com/oauth2/v3/certs",
    scopes: ["openid", "email", "profile"],
    hd: "company.com", // Hosted domain restriction
  },
  domains: ["company.com"],
});
```

### Provider with Adoption

```typescript
// This will adopt an existing provider if one with the same type already exists
const existingProvider = SSOProvider("existing-saml", {
  project: "my-project-ref",
  type: "saml",
  adopt: true,
  metadata: {
    entity_id: "https://updated.com/saml",
    sso_url: "https://updated.com/sso",
  },
  domains: ["updated.com"],
});
```
