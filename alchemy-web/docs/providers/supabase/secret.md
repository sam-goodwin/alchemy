# Supabase Secret Resource

The `Secret` resource manages environment variables and secrets for Supabase projects, providing secure configuration management.

## Usage

```typescript
import { Secret } from "alchemy/supabase";

// Create project secrets
const secrets = Secret("app-config", {
  project: "proj-123",
  secrets: {
    API_KEY: "your-api-key-here",
    DATABASE_URL: "postgresql://...",
    JWT_SECRET: "your-jwt-secret",
    STRIPE_SECRET_KEY: "sk_test_...",
  },
});

// Single secret
const dbSecret = Secret("database-config", {
  project: "proj-123",
  secrets: {
    DATABASE_PASSWORD: "super-secure-password",
  },
});
```

## Properties

### Required Properties

- **`project`** (`string | Project`): Reference to the project where secrets will be stored
- **`secrets`** (`Record<string, string>`): Key-value pairs of secret names and values

### Optional Properties

- **`adopt`** (`boolean`): Whether to adopt existing secrets if creation fails due to conflicts. Default: `false`.
- **`accessToken`** (`Secret`): Supabase access token. Falls back to `SUPABASE_ACCESS_TOKEN` environment variable.
- **`baseUrl`** (`string`): Base URL for Supabase API. Default: `https://api.supabase.com/v1`.

## Resource Properties

The secret resource exposes the following properties:

- **`project`** (`string | Project`): Reference to the project
- **`secrets`** (`Array<{name: string, value: string}>`): Array of secret name-value pairs

## Examples

### Application Configuration

```typescript
const appSecrets = Secret("app-config", {
  project: "my-project-ref",
  secrets: {
    NODE_ENV: "production",
    API_BASE_URL: "https://api.example.com",
    REDIS_URL: "redis://localhost:6379",
    SESSION_SECRET: "your-session-secret-here",
  },
});
```

### Database Configuration

```typescript
const dbSecrets = Secret("database-config", {
  project: "my-project-ref", 
  secrets: {
    DB_HOST: "localhost",
    DB_PORT: "5432",
    DB_NAME: "myapp",
    DB_USER: "myuser",
    DB_PASSWORD: "secure-password-123",
  },
});
```

### Third-Party API Keys

```typescript
const apiKeys = Secret("api-keys", {
  project: "my-project-ref",
  secrets: {
    STRIPE_PUBLISHABLE_KEY: "pk_test_...",
    STRIPE_SECRET_KEY: "sk_test_...",
    SENDGRID_API_KEY: "SG.xxx...",
    GOOGLE_CLIENT_ID: "xxx.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "GOCSPX-xxx...",
  },
});
```

### Secrets with Adoption

```typescript
// This will adopt existing secrets if they already exist
const existingSecrets = Secret("existing-config", {
  project: "my-project-ref",
  adopt: true,
  secrets: {
    EXISTING_SECRET: "new-value",
    NEW_SECRET: "another-value",
  },
});
```

### Environment-Specific Secrets

```typescript
const prodSecrets = Secret("production-config", {
  project: "prod-project-ref",
  secrets: {
    NODE_ENV: "production",
    LOG_LEVEL: "error",
    CACHE_TTL: "3600",
  },
});

const devSecrets = Secret("development-config", {
  project: "dev-project-ref",
  secrets: {
    NODE_ENV: "development", 
    LOG_LEVEL: "debug",
    CACHE_TTL: "60",
  },
});
```
