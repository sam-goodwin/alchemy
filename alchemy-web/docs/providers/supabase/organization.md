# Supabase Organization Resource

The `Organization` resource manages Supabase organizations, which are top-level containers for projects and billing.

## Usage

```typescript
import { Organization } from "alchemy/supabase";

// Create a new organization
const org = Organization("my-org", {
  name: "My Organization",
});

// Adopt an existing organization
const existingOrg = Organization("existing-org", {
  name: "Existing Organization", 
  adopt: true,
});
```

## Properties

### Required Properties

None - all properties are optional.

### Optional Properties

- **`name`** (`string`): The name of the organization. Defaults to the resource ID if not provided.
- **`adopt`** (`boolean`): Whether to adopt an existing organization if creation fails due to name conflict. Default: `false`.
- **`accessToken`** (`Secret`): Supabase access token. Falls back to `SUPABASE_ACCESS_TOKEN` environment variable.
- **`baseUrl`** (`string`): Base URL for Supabase API. Default: `https://api.supabase.com/v1`.

## Resource Properties

The organization resource exposes the following properties:

- **`id`** (`string`): Unique identifier for the organization
- **`name`** (`string`): Organization name
- **`plan`** (`string`): Billing plan (e.g., "free", "pro", "enterprise")
- **`optInTags`** (`string[]`): Optional tags for the organization
- **`allowedReleaseChannels`** (`string[]`): Allowed release channels for projects

## Examples

### Basic Organization

```typescript
const org = Organization("acme-corp", {
  name: "ACME Corporation",
});
```

### Organization with Adoption

```typescript
// This will adopt an existing organization if one with the same name already exists
const org = Organization("existing-org", {
  name: "Existing Organization",
  adopt: true,
});
```

### Using Custom Access Token

```typescript
import { alchemy } from "alchemy";

const org = Organization("secure-org", {
  name: "Secure Organization",
  accessToken: alchemy.secret("my-supabase-token"),
});
```
