---
order: 20
title: Railway Getting Started
description: Deploy applications, databases, and infrastructure on Railway platform. Learn how to build full-stack applications with Alchemy's Railway provider.
---

# Railway Getting Started

Railway is a modern application hosting platform that simplifies deployments and infrastructure management. This guide walks you through building a complete full-stack application using Alchemy's Railway provider.

## Prerequisites

1. **Railway Account**: Sign up at [railway.com](https://railway.com/)
2. **API Token**: Generate a token in your [Railway dashboard](https://railway.com/account/tokens)
3. **Environment Setup**:

```bash
export RAILWAY_TOKEN="your-railway-api-token"
```

## Project Setup

Every Railway application starts with a project that contains all your resources:

```typescript
import { Project, Environment } from "alchemy/railway";

// Create your main project
export const project = await Project("my-fullstack-app", {
  name: "My Fullstack App",
  description: "A complete web application with API and database"
});

// Create environments
export const production = await Environment("production", {
  name: "production",
  project: project
});

export const staging = await Environment("staging", {
  name: "staging", 
  project: project
});
```

## Database Setup

Add a PostgreSQL database for persistent data storage:

```typescript
import { Database, Variable } from "alchemy/railway";

// Create PostgreSQL database
export const database = await Database("postgres-db", {
  name: "app-database",
  project: project,
  environment: production,
  type: "postgresql"
});

// Create Redis for caching (optional)
export const cache = await Database("redis-cache", {
  name: "session-cache", 
  project: project,
  environment: production,
  type: "redis"
});
```

## Backend API Service

Deploy your backend API service with GitHub integration:

```typescript
import { Service, Variable } from "alchemy/railway";

// Create API service
export const apiService = await Service("api-service", {
  name: "api",
  project: project,
  sourceRepo: "https://github.com/myorg/my-app-api",
  sourceRepoBranch: "main"
});

// Add database connection
export const databaseUrl = await Variable("database-url", {
  name: "DATABASE_URL",
  value: database.connectionString,
  environment: production,
  service: apiService
});

// Add Redis connection (if using cache)
export const redisUrl = await Variable("redis-url", {
  name: "REDIS_URL", 
  value: cache.connectionString,
  environment: production,
  service: apiService
});

// Add other environment variables
export const jwtSecret = await Variable("jwt-secret", {
  name: "JWT_SECRET",
  value: "your-jwt-secret-key",
  environment: production,
  service: apiService
});
```

## Frontend Service

Deploy your frontend application:

```typescript
// Create frontend service
export const frontendService = await Service("frontend-service", {
  name: "frontend",
  project: project,
  sourceRepo: "https://github.com/myorg/my-app-frontend",
  sourceRepoBranch: "main"
});

// Configure API endpoint for frontend
export const apiEndpoint = await Variable("api-endpoint", {
  name: "VITE_API_URL", // or REACT_APP_API_URL, NEXT_PUBLIC_API_URL
  value: `https://${apiService.domain}`,
  environment: production,
  service: frontendService
});
```

## Custom Domains

Set up custom domains for production:

```typescript
import { CustomDomain } from "alchemy/railway";

// Custom domain for API
export const apiDomain = await CustomDomain("api-domain", {
  domain: "api.myapp.com",
  service: apiService,
  environment: production
});

// Custom domain for frontend
export const webDomain = await CustomDomain("web-domain", {
  domain: "myapp.com",
  service: frontendService,
  environment: production
});
```

## Serverless Functions

Add serverless functions for background tasks:

```typescript
import { Function } from "alchemy/railway";

// Create background job function
export const emailFunction = await Function("email-function", {
  name: "send-emails",
  project: project,
  environment: production,
  runtime: "node20",
  entrypoint: "./functions/send-emails.js"
});

// Connect function to database
export const functionDbUrl = await Variable("function-db-url", {
  name: "DATABASE_URL",
  value: database.connectionString,
  environment: production,
  service: emailFunction
});
```

## Volume Storage

Add persistent storage for file uploads:

```typescript
import { Volume } from "alchemy/railway";

// Create volume for file storage
export const fileStorage = await Volume("file-storage", {
  name: "app-files",
  project: project,
  environment: production,
  mountPath: "/app/uploads",
  size: 10 // 10GB
});

// Mount volume to API service
export const fileStorageMount = await Variable("storage-path", {
  name: "UPLOAD_PATH",
  value: "/app/uploads",
  environment: production,
  service: apiService
});
```

## Environment Variables

Manage different configurations per environment:

```typescript
// Production variables
export const prodVars = [
  await Variable("node-env-prod", {
    name: "NODE_ENV",
    value: "production",
    environment: production,
    service: apiService
  }),
  
  await Variable("log-level-prod", {
    name: "LOG_LEVEL", 
    value: "warn",
    environment: production,
    service: apiService
  })
];

// Staging variables  
export const stagingVars = [
  await Variable("node-env-staging", {
    name: "NODE_ENV",
    value: "staging", 
    environment: staging,
    service: apiService
  }),
  
  await Variable("log-level-staging", {
    name: "LOG_LEVEL",
    value: "debug",
    environment: staging, 
    service: apiService
  })
];
```

## TCP Proxy Setup

Expose database for external tools (development only):

```typescript
import { TcpProxy } from "alchemy/railway";

// TCP proxy for database access (staging only)
export const dbProxy = await TcpProxy("db-proxy", {
  applicationPort: 5432,
  proxyPort: 5432,
  service: database,
  environment: staging
});
```

## Complete Example

Here's the full setup for a production-ready application:

```typescript
import { 
  Project, 
  Environment, 
  Service, 
  Database, 
  Variable, 
  CustomDomain, 
  Volume 
} from "alchemy/railway";

// Project and environments
export const project = await Project("my-fullstack-app", {
  name: "My Fullstack App",
  description: "A complete web application"
});

export const production = await Environment("production", {
  name: "production",
  project: project
});

// Database
export const database = await Database("postgres-db", {
  name: "app-database",
  project: project,
  environment: production,
  type: "postgresql"
});

// Storage
export const storage = await Volume("file-storage", {
  name: "app-files", 
  project: project,
  environment: production,
  mountPath: "/app/uploads",
  size: 20
});

// Backend service
export const api = await Service("api-service", {
  name: "api",
  project: project,
  sourceRepo: "https://github.com/myorg/api",
  sourceRepoBranch: "main"
});

// Frontend service
export const frontend = await Service("frontend-service", {
  name: "frontend",
  project: project, 
  sourceRepo: "https://github.com/myorg/frontend",
  sourceRepoBranch: "main"
});

// Environment variables
export const databaseUrl = await Variable("database-url", {
  name: "DATABASE_URL",
  value: database.connectionString,
  environment: production,
  service: api
});

export const apiUrl = await Variable("api-url", {
  name: "VITE_API_URL",
  value: `https://${api.domain}`,
  environment: production,
  service: frontend
});

// Custom domains
export const apiDomain = await CustomDomain("api-domain", {
  domain: "api.myapp.com",
  service: api,
  environment: production
});

export const webDomain = await CustomDomain("web-domain", {
  domain: "myapp.com", 
  service: frontend,
  environment: production
});
```

## Next Steps

- Configure your CI/CD pipeline to deploy on git pushes
- Set up monitoring and logging for your services
- Add staging environments for testing
- Configure backup strategies for your databases
- Set up custom domain SSL certificates

## Learn More

- [Railway Resources](../providers/railway/index.md)
- [Project Management](../providers/railway/project.md)
- [Database Guide](../providers/railway/database.md)
- [Custom Domains](../providers/railway/custom-domain.md)