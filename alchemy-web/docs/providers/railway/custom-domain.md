---
title: Managing Railway Custom Domains with Alchemy
description: Learn how to configure custom domains for Railway services using Alchemy for branded web applications.
---

# Railway Custom Domain

A Railway custom domain allows you to use your own domain name for a service instead of the default Railway-provided domain.

## Basic Custom Domain

Set up a custom domain for your web application:

```typescript
import { CustomDomain, Environment, Project, Service } from "alchemy/railway";

const project = await Project("my-project", {
  name: "My Application",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const service = await Service("web-service", {
  name: "web-app",
  project: project,
});

const customDomain = await CustomDomain("my-domain", {
  domain: "api.mycompany.com",
  service: service,
  environment: environment,
});
```

## Multiple Domains

Configure multiple domains for different services:

```typescript
import { CustomDomain, Environment, Project, Service } from "alchemy/railway";

const project = await Project("saas-platform", {
  name: "SaaS Platform",
  description: "Multi-tenant SaaS application",
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
  name: "web-app",
  project: project,
});

// API domain
const apiDomain = await CustomDomain("api-domain", {
  domain: "api.mycompany.com",
  service: apiService,
  environment: environment,
});

// Web application domain
const webDomain = await CustomDomain("web-domain", {
  domain: "app.mycompany.com",
  service: webService,
  environment: environment,
});

// Documentation domain
const docsDomain = await CustomDomain("docs-domain", {
  domain: "docs.mycompany.com",
  service: webService,
  environment: environment,
});
```

## Production Setup

Set up custom domains for a production environment:

```typescript
import { CustomDomain, Environment, Project, Service } from "alchemy/railway";

const project = await Project("ecommerce-platform", {
  name: "E-commerce Platform",
});

const production = await Environment("production", {
  name: "production",
  project: project,
});

const webService = await Service("web-service", {
  name: "storefront",
  project: project,
});

const apiService = await Service("api-service", {
  name: "api",
  project: project,
});

// Main storefront domain
const storeDomain = await CustomDomain("store-domain", {
  domain: "shop.example.com",
  service: webService,
  environment: production,
});

// API domain
const apiDomain = await CustomDomain("api-domain", {
  domain: "api.example.com",
  service: apiService,
  environment: production,
});

console.log(`Store status: ${storeDomain.status}`);
console.log(`API status: ${apiDomain.status}`);
```

## Subdomain Configuration

Configure subdomains for different features:

```typescript
import { CustomDomain, Environment, Project, Service } from "alchemy/railway";

const project = await Project("multi-tenant-app", {
  name: "Multi-tenant Application",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const service = await Service("app-service", {
  name: "application",
  project: project,
});

// Admin subdomain
const adminDomain = await CustomDomain("admin-domain", {
  domain: "admin.myapp.com",
  service: service,
  environment: environment,
});

// Customer portal subdomain
const portalDomain = await CustomDomain("portal-domain", {
  domain: "portal.myapp.com",
  service: service,
  environment: environment,
});
```

## Using String References

Reference services and environments by their ID strings:

```typescript
import { CustomDomain } from "alchemy/railway";

const customDomain = await CustomDomain("my-domain", {
  domain: "api.myapp.com",
  service: "service_abc123",
  environment: "env_xyz789",
});
```

## Properties

### Required

- **domain** (string): The custom domain name to use
- **service** (string | Service): The service this domain points to
- **environment** (string | Environment): The environment this domain belongs to

### Optional

- **apiKey** (Secret): Railway API token for authentication. Defaults to `RAILWAY_TOKEN` environment variable

## Outputs

- **id** (string): The unique identifier of the custom domain
- **serviceId** (string): The ID of the parent service
- **environmentId** (string): The ID of the parent environment
- **status** (string): The status of the domain (e.g., "pending", "active", "failed")
- **createdAt** (string): When the domain was created
- **updatedAt** (string): When the domain was last updated
