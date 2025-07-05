# Service Domain

## Basic Usage

```typescript
import { ServiceDomain } from "alchemy/railway";

// Basic Railway subdomain
const serviceDomain = await ServiceDomain("api-domain", {
  domain: "my-api.railway.app",
  service: service,
  environment: environment,
});
```

## Multiple Service Domains

```typescript
// Multiple service domains
const apiDomain = await ServiceDomain("api-domain", {
  domain: "api.railway.app",
  service: apiService,
  environment: environment,
});

const webDomain = await ServiceDomain("web-domain", {
  domain: "app.railway.app",
  service: webService,
  environment: environment,
});
```

## String References

```typescript
// Using string references
const serviceDomain = await ServiceDomain("my-domain", {
  domain: "my-service.railway.app",
  service: "service_abc123",
  environment: "env_xyz789",
});
```