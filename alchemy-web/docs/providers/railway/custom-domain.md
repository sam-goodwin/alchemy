# Custom Domain

## Basic Usage

```typescript
import { CustomDomain } from "alchemy/railway";

// Basic custom domain
const domain = await CustomDomain("my-domain", {
  domain: "api.mycompany.com",
  service: service,
  environment: environment,
});
```

## Multiple Domains

```typescript
// Multiple domains for different services
const apiDomain = await CustomDomain("api-domain", {
  domain: "api.mycompany.com", 
  service: apiService,
  environment: environment,
});

const webDomain = await CustomDomain("web-domain", {
  domain: "app.mycompany.com",
  service: webService, 
  environment: environment,
});
```

## String References

```typescript
// Using string references
const customDomain = await CustomDomain("my-domain", {
  domain: "api.myapp.com",
  service: "service_abc123",
  environment: "env_xyz789", 
});
```
