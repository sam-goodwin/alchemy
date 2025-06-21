# Variable

## Basic Usage

```typescript
import { Variable } from "alchemy/railway";

// Basic environment variable
const port = await Variable("port-var", {
  name: "PORT",
  value: "3000",
  environment: environment,
  service: service,
});
```

## Secret Variable

```typescript
// Secret variable
const apiKey = await Variable("api-key-var", {
  name: "API_KEY",
  value: secret("super-secret-key-123"),
  environment: environment,
  service: service,
});
```

## String References

```typescript
// Using string references
const variable = await Variable("my-var", {
  name: "SECRET_KEY",
  value: secret("my-secret-value"),
  environment: "env_abc123",
  service: "service_xyz789",
});
```