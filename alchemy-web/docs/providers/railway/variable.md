---
title: Managing Railway Variables with Alchemy
description: Learn how to create and manage Railway environment variables using Alchemy for secure configuration management.
---

# Railway Variable

A Railway variable represents an environment variable for a service within a specific environment.

## Basic Variable

Create a simple environment variable:

```typescript
import { Environment, Project, Service, Variable } from "alchemy/railway";

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

const port = await Variable("port-var", {
  name: "PORT",
  value: "3000",
  environment: environment,
  service: service,
});
```

## Secret Variable

Store sensitive values securely:

```typescript
import { Environment, Project, Service, Variable, secret } from "alchemy/railway";

const project = await Project("secure-app", {
  name: "Secure Application",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const service = await Service("api-service", {
  name: "api",
  project: project,
});

const apiKey = await Variable("api-key-var", {
  name: "API_KEY",
  value: secret("super-secret-key-123"),
  environment: environment,
  service: service,
});
```

## Database Configuration

Set up database connection variables:

```typescript
import { Database, Environment, Project, Service, Variable } from "alchemy/railway";

const project = await Project("web-app", {
  name: "Web Application",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const service = await Service("api-service", {
  name: "api",
  project: project,
});

const database = await Database("postgres-db", {
  name: "main-database",
  project: project,
  environment: environment,
  type: "postgresql",
});

const dbUrl = await Variable("db-url-var", {
  name: "DATABASE_URL",
  value: database.connectionString,
  environment: environment,
  service: service,
});
```

## Bulk Variables

Configure multiple environment variables:

```typescript
import { Environment, Project, Service, Variable, secret } from "alchemy/railway";

const project = await Project("microservice", {
  name: "Microservice Platform",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const service = await Service("auth-service", {
  name: "auth",
  project: project,
});

// Application configuration
const port = await Variable("port", {
  name: "PORT",
  value: "8080",
  environment: environment,
  service: service,
});

const nodeEnv = await Variable("node-env", {
  name: "NODE_ENV",
  value: "production",
  environment: environment,
  service: service,
});

// Secret configuration
const jwtSecret = await Variable("jwt-secret", {
  name: "JWT_SECRET",
  value: secret("your-jwt-secret-key"),
  environment: environment,
  service: service,
});

const dbPassword = await Variable("db-password", {
  name: "DB_PASSWORD",
  value: secret("secure-database-password"),
  environment: environment,
  service: service,
});
```

## Using String References

Reference services and environments by their ID strings:

```typescript
import { Variable, secret } from "alchemy/railway";

const variable = await Variable("my-var", {
  name: "SECRET_KEY",
  value: secret("my-secret-value"),
  environment: "env_abc123",
  service: "service_xyz789",
});
```

## Properties

### Required

- **name** (string): The name of the environment variable
- **value** (Secret | string): The value of the variable. Sensitive values should use `secret()`
- **environment** (string | Environment): The environment this variable belongs to
- **service** (string | Service): The service this variable belongs to

### Optional

- **apiKey** (Secret): Railway API token for authentication. Defaults to `RAILWAY_TOKEN` environment variable

## Outputs

- **id** (string): The unique identifier of the variable
- **environmentId** (string): The ID of the parent environment
- **serviceId** (string): The ID of the parent service
- **value** (Secret): The value of the variable (always wrapped as a Secret)
- **createdAt** (string): When the variable was created
- **updatedAt** (string): When the variable was last updated
