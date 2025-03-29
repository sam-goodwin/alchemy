# Alchemy.run

## Hero Section

Materialize and deploy software to any cloud.

## Sub-Hero Section

Alchemy is a TypeScript-native, embeddable Infrastructure-as-Code (IaC) library with zero dependencies.

## Call-to-Action Section

Get started with Alchemy today and transform your cloud infrastructure management. [Learn More](#)

## Feature Section

### Using Resources

Define resources as simple async functions that automatically handle Create, Update, and Delete operations.

```typescript
import { Role } from "alchemy/aws";

export const role = await Role("my-role", {
  roleName: "my-role",
  assumeRolePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { Service: "lambda.amazonaws.com" },
        Action: "sts:AssumeRole",
      },
    ],
  },
});
```

### Scopes

Organize resources using Scopes, which act like namespaces, to manage different environments or stages.

```typescript
await using app = alchemy("my-app", {
  stage: "prod",
  phase: "up",
});
```

### Creating Custom Resources

Implement your own resources by defining a unique name and lifecycle operations using a simple function pattern.

```typescript
export const MyResource = Resource(
  "my::Resource",
  async function (this, id, props) {
    if (this.phase === "delete") {
      return this.destroy();
    }
    // Resource creation logic
    return this(props);
  }
);
```

### Infrastructure as Code (IaC)

Alchemy automates the management of cloud resources, ensuring they are always in the desired state with minimal manual intervention.

```typescript
await using _ = alchemy("cloudflare-worker");

export const worker = await Worker("worker", {
  name: "my-worker",
  entrypoint: "./src/index.ts",
  bindings: {
    COUNTER: counter,
    STORAGE: storage,
    AUTH_STORE: authStore,
    GITHUB_CLIENT_ID: secret(process.env.GITHUB_CLIENT_ID),
    GITHUB_CLIENT_SECRET: secret(process.env.GITHUB_CLIENT_SECRET),
  },
});
```
