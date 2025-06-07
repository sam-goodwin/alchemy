# Polar Benefit

The Polar Benefit resource allows you to create and manage benefits that can be granted to customers in your Polar organization.

## Usage

```typescript
import { Benefit } from "alchemy/polar";

// Create a Discord access benefit
const discordBenefit = await Benefit("discord-access", {
  type: "discord",
  description: "Access to premium Discord server",
  selectable: true,
  properties: {
    guild_id: "123456789",
    role_id: "987654321"
  }
});

// Create a custom benefit
const customBenefit = await Benefit("custom-benefit", {
  type: "custom",
  description: "Priority customer support",
  selectable: false,
  metadata: {
    category: "support",
    priority: "high"
  }
});
```

## Properties

### Required

- `type` ("custom" | "articles" | "discord" | "github_repository" | "downloadables" | "license_keys"): Type of benefit
- `description` (string): Description of the benefit

### Optional

- `selectable` (boolean): Whether customers can select this benefit
- `deletable` (boolean): Whether this benefit can be deleted
- `organizationId` (string): ID of the organization (usually auto-detected)
- `properties` (Record<string, any>): Type-specific configuration properties
- `metadata` (Record<string, string>): Key-value pairs for storing additional information
- `apiKey` (Secret): Polar API key (overrides environment variable)
- `adopt` (boolean): If true, adopt existing resource if creation fails due to conflict

## Output

The Benefit resource returns all input properties plus:

- `id` (string): Unique identifier for the benefit
- `createdAt` (string): ISO timestamp when the benefit was created
- `modifiedAt` (string): ISO timestamp when the benefit was last modified
- `organizationId` (string): ID of the organization the benefit belongs to

## Benefit Types

### Discord
Grants access to Discord servers with specific roles.

### GitHub Repository
Grants access to private GitHub repositories.

### Articles
Grants access to premium articles or content.

### Downloadables
Provides downloadable files or resources.

### License Keys
Generates and manages software license keys.

### Custom
Flexible benefit type for custom implementations.

## API Reference

- [Get Benefit](https://docs.polar.sh/api-reference/benefits/get)
- [Create Benefit](https://docs.polar.sh/api-reference/benefits/create)
- [Update Benefit](https://docs.polar.sh/api-reference/benefits/update)
- [List Benefits](https://docs.polar.sh/api-reference/benefits/list)
