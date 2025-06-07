---
title: Managing Railway Service Domains with Alchemy
description: Learn how to configure Railway-managed subdomains for your services using Alchemy for easy web access.
---

# Railway Service Domain

A Railway service domain provides a Railway-managed subdomain for your service, typically in the format `service-name.railway.app`.

## Basic Service Domain

Create a Railway subdomain for your API service:

```typescript
import { Environment, Project, Service, ServiceDomain } from "alchemy/railway";

const project = await Project("my-project", {
  name: "My Application",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const service = await Service("api-service", {
  name: "api",
  project: project,
});

const serviceDomain = await ServiceDomain("api-domain", {
  domain: "my-api.railway.app",
  service: service,
  environment: environment,
});
```

## Multiple Services

Set up domains for different services in your application:

```typescript
import { Environment, Project, Service, ServiceDomain } from "alchemy/railway";

const project = await Project("web-platform", {
  name: "Web Platform",
  description: "Multi-service web platform",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const apiService = await Service("api-service", {
  name: "api",
  project: project,
});

const webService = await Service("web-service", {
  name: "frontend",
  project: project,
});

const adminService = await Service("admin-service", {
  name: "admin",
  project: project,
});

// API service domain
const apiDomain = await ServiceDomain("api-domain", {
  domain: "api.railway.app",
  service: apiService,
  environment: environment,
});

// Web application domain
const webDomain = await ServiceDomain("web-domain", {
  domain: "app.railway.app",
  service: webService,
  environment: environment,
});

// Admin panel domain
const adminDomain = await ServiceDomain("admin-domain", {
  domain: "admin.railway.app",
  service: adminService,
  environment: environment,
});
```

## API Endpoints

Create service domains for different API endpoints:

```typescript
import { Environment, Project, Service, ServiceDomain } from "alchemy/railway";

const project = await Project("microservices", {
  name: "Microservices Platform",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const authService = await Service("auth-service", {
  name: "auth",
  project: project,
});

const userService = await Service("user-service", {
  name: "users",
  project: project,
});

const paymentService = await Service("payment-service", {
  name: "payments",
  project: project,
});

// Authentication API
const authDomain = await ServiceDomain("auth-domain", {
  domain: "auth-api.railway.app",
  service: authService,
  environment: environment,
});

// User management API
const userDomain = await ServiceDomain("user-domain", {
  domain: "user-api.railway.app",
  service: userService,
  environment: environment,
});

// Payment processing API
const paymentDomain = await ServiceDomain("payment-domain", {
  domain: "payment-api.railway.app",
  service: paymentService,
  environment: environment,
});

console.log(`Auth API: ${authDomain.url}`);
console.log(`User API: ${userDomain.url}`);
console.log(`Payment API: ${paymentDomain.url}`);
```

## Environment-specific Domains

Set up different domains for staging and production:

```typescript
import { Environment, Project, Service, ServiceDomain } from "alchemy/railway";

const project = await Project("deployment-pipeline", {
  name: "Deployment Pipeline",
});

const staging = await Environment("staging", {
  name: "staging",
  project: project,
});

const production = await Environment("production", {
  name: "production",
  project: project,
});

const service = await Service("web-service", {
  name: "web-app",
  project: project,
});

// Staging domain
const stagingDomain = await ServiceDomain("staging-domain", {
  domain: "staging-app.railway.app",
  service: service,
  environment: staging,
});

// Production domain
const prodDomain = await ServiceDomain("prod-domain", {
  domain: "prod-app.railway.app",
  service: service,
  environment: production,
});
```

## Using String References

Reference services and environments by their ID strings:

```typescript
import { ServiceDomain } from "alchemy/railway";

const serviceDomain = await ServiceDomain("my-domain", {
  domain: "my-service.railway.app",
  service: "service_abc123",
  environment: "env_xyz789",
});
```

## Properties

### Required

- **domain** (string): The Railway subdomain to use (e.g., "my-app.railway.app")
- **service** (string | Service): The service this domain points to
- **environment** (string | Environment): The environment this domain belongs to

### Optional

- **apiKey** (Secret): Railway API token for authentication. Defaults to `RAILWAY_TOKEN` environment variable

## Outputs

- **id** (string): The unique identifier of the service domain
- **serviceId** (string): The ID of the parent service
- **environmentId** (string): The ID of the parent environment
- **url** (string): The full URL where the service can be accessed
- **createdAt** (string): When the domain was created
- **updatedAt** (string): When the domain was last updated
