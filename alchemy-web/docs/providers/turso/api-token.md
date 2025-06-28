# ApiToken

ApiToken creates and manages API tokens for authenticating with the Turso API. These tokens are required for programmatic access to Turso services.

**Important**: The token value is only available when first created. Store it securely as it cannot be retrieved again.

## Properties

### Input Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | Yes | The name of the API token. This is used to identify the token and cannot be changed after creation. |

### Output Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | The name of the API token. |
| `id` | `string` | The unique identifier for the token. |
| `token` | `string` | The actual token value. **Only available when the token is first created**. |

## Examples

### Create an API Token

Create a token for CI/CD pipelines:

```ts
import { ApiToken } from "@alchemy/turso";

const token = await ApiToken("ci-token", {
  name: "github-actions",
});

// IMPORTANT: Save this token value securely!
console.log("Token created:", token.token);

// Store in your CI/CD secrets:
// GitHub: Add as a repository secret
// GitLab: Add as a CI/CD variable
// CircleCI: Add as an environment variable
```

### Multiple Tokens for Different Environments

Create separate tokens for different purposes:

```ts
import { ApiToken } from "@alchemy/turso";

// Development token
const devToken = await ApiToken("dev", {
  name: "development-token",
});

// CI/CD token
const ciToken = await ApiToken("ci", {
  name: "ci-pipeline",
});

// Production token
const prodToken = await ApiToken("prod", {
  name: "production-api",
});

// Save each token securely
console.log("Development token:", devToken.token);
console.log("CI/CD token:", ciToken.token);
console.log("Production token:", prodToken.token);
```

### Token Rotation

Implement a token rotation strategy:

```ts
import { ApiToken } from "@alchemy/turso";

// This approach ensures zero downtime during rotation
async function rotateApiToken() {
  // Step 1: Create new token
  const newToken = await ApiToken("api-token-v2", {
    name: "production-api-v2",
  });
  
  console.log("New token created:", newToken.token);
  console.log("Update your application with the new token");
  
  // Step 2: After updating all services with the new token,
  // destroy the old token resource
  // await destroy(oldTokenResource);
}
```

### Idempotent Token Management

Subsequent applies won't regenerate the token:

```ts
import { ApiToken } from "@alchemy/turso";

// First apply - token value is available
const token1 = await ApiToken("my-token", {
  name: "api-access",
});
console.log("Token value:", token1.token); // Shows the token

// Second apply - token value is NOT available
const token2 = await ApiToken("my-token", {
  name: "api-access",
});
console.log("Token value:", token2.token); // undefined
console.log("Token ID:", token2.id); // Same ID as token1
```

## Security Best Practices

### 1. Secure Storage

Never commit tokens to version control. Use environment variables or secret management services:

```bash
# .env file (add to .gitignore)
TURSO_API_TOKEN=your-token-here
```

### 2. Minimal Permissions

Create separate tokens for different purposes rather than sharing a single token across all services.

### 3. Regular Rotation

Implement a token rotation policy:

```ts
import { ApiToken } from "@alchemy/turso";

// Quarterly token rotation
const quarter = Math.floor((new Date().getMonth() / 3)) + 1;
const year = new Date().getFullYear();

const token = await ApiToken(`api-token-${year}-q${quarter}`, {
  name: `production-${year}-q${quarter}`,
});
```

### 4. Audit Trail

Keep track of token creation:

```ts
import { ApiToken } from "@alchemy/turso";

const token = await ApiToken("audit-token", {
  name: `api-${Date.now()}`,
});

// Log token creation (without the actual token value)
console.log(`Token created: ${token.name} (ID: ${token.id}) at ${new Date().toISOString()}`);
```

## Important Notes

1. **One-Time Access**: The token value is only available when first created. There's no way to retrieve it later.

2. **Name Uniqueness**: Token names must be unique within your account.

3. **Immutable Names**: Token names cannot be changed after creation.

4. **User Scope**: API tokens are scoped to your user account, not to a specific organization.

5. **No Expiration**: Tokens don't expire automatically. Implement your own rotation policy.

6. **Deletion**: When the resource is destroyed, the token is permanently deleted and cannot be recovered.

## Usage with Turso API

Once created, use the token for API authentication:

```ts
// Set as environment variable
process.env.TURSO_API_TOKEN = token.token;

// Use with the Turso API client
import { getTursoApi } from "@alchemy/turso/api";

const api = getTursoApi();
// The API client will automatically use the TURSO_API_TOKEN env var
```

## Related Resources

- [Group](./group.md) - API tokens are used to manage groups
- [Database](./database.md) - API tokens are used to manage databases
- [OrganizationMember](./organization-member.md) - API tokens are used to manage organization members