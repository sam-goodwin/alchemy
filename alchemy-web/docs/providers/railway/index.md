# Railway Provider

Railway is a modern application hosting platform that provides simple deployments, databases, and infrastructure. The Alchemy Railway provider allows you to manage Railway resources using Infrastructure as Code.

## Authentication

The Railway provider uses your Railway API token for authentication:

```bash
export RAILWAY_TOKEN="your-railway-api-token"
```

You can also provide the token directly in your code using `alchemy.secret()`:

```typescript
import { secret } from "alchemy";
import { RailwayApi } from "alchemy/railway";

const api = new RailwayApi({
  apiKey: secret("your-railway-token")
});
```

## Resources

### Core Resources

- **[Project](./project.md)** - Railway project container for applications and resources
- **[Environment](./environment.md)** - Deployment environments (production, staging, development)
- **[Service](./service.md)** - Applications and microservices with GitHub integration
- **[Variable](./variable.md)** - Environment variables with secret handling

### Infrastructure Resources

- **[Database](./database.md)** - Managed databases (PostgreSQL, MySQL, Redis, MongoDB)
- **[Volume](./volume.md)** - Persistent storage with configurable mount paths
- **[Function](./function.md)** - Serverless functions (Node.js, Python, Go, Rust)

### Networking Resources

- **[CustomDomain](./custom-domain.md)** - Custom domain management for services
- **[ServiceDomain](./service-domain.md)** - Railway-managed subdomains
- **[TcpProxy](./tcp-proxy.md)** - TCP proxy configuration for external access

## Quick Start

```typescript
import { 
  Project, 
  Environment, 
  Service, 
  Database, 
  Variable 
} from "alchemy/railway";

// Create a project
const project = await Project("my-app", {
  name: "My Application",
  description: "A full-stack web application"
});

// Create production environment
const production = await Environment("production", {
  name: "production",
  project: project
});

// Create a database
const database = await Database("postgres-db", {
  name: "main-database",
  project: project,
  environment: production,
  type: "postgresql"
});

// Create a service
const api = await Service("api-service", {
  name: "api",
  project: project,
  sourceRepo: "https://github.com/myorg/api",
  sourceRepoBranch: "main"
});

// Add database connection string as environment variable
const dbUrl = await Variable("db-url", {
  name: "DATABASE_URL",
  value: database.connectionString,
  environment: production,
  service: api
});
```

## Getting Started Guide

For a comprehensive walkthrough of building a full application with Railway, see the [Railway Getting Started Guide](../../guides/railway-getting-started.md).

## External Resources

- [Railway Documentation](https://docs.railway.com/)
- [Railway API Reference](https://docs.railway.com/reference/public-api)
- [Railway Console](https://railway.com/)