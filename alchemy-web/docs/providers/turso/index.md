# Turso

Turso is the edge database platform powered by libSQL, a fork of SQLite optimized for distributed systems. It provides globally distributed SQLite databases with built-in replication, making it ideal for edge computing and low-latency applications.

- [Official Website](https://turso.tech)
- [Documentation](https://docs.turso.tech)
- [API Reference](https://docs.turso.tech/api-reference/introduction)

## Resources

- [Group](./group.md) - Manages database groups for replication and placement configuration
- [Database](./database.md) - Creates and manages individual SQLite database instances
- [OrganizationMember](./organization-member.md) - Manages organization membership and roles
- [OrganizationInvite](./organization-invite.md) - Handles invitations to join an organization
- [ApiToken](./api-token.md) - Creates and manages API tokens for authentication

## Example Usage

```ts
import { 
  Group, 
  Database, 
  OrganizationMember, 
  OrganizationInvite, 
  ApiToken 
} from "@alchemy/turso";

// Create an API token for authentication
const token = await ApiToken("main-token", {
  name: "production-api",
});

// Create a multi-region group for global distribution
const globalGroup = await Group("global", {
  locations: ["iad", "lhr", "syd", "nrt"],
  primary: "iad",
  delete_protection: true,
});

// Create a schema database for migrations
const schemaDb = await Database("schema", {
  group: globalGroup,
  is_schema: true,
});

// Create production database using the schema
const productionDb = await Database("production", {
  group: globalGroup,
  schema: schemaDb,
  size_limit: "10GB",
});

// Create a development database in a single region
const devGroup = await Group("development", {
  locations: ["iad"],
});

const devDb = await Database("dev", {
  group: devGroup,
  seed: {
    type: "database",
    value: "production", // Copy data from production
  },
});

// Manage team access
const teamLead = await OrganizationMember("lead", {
  username: "alice",
  role: "admin",
});

const developer = await OrganizationMember("dev", {
  username: "bob",
  role: "member",
});

// Invite new team members
const newMemberInvite = await OrganizationInvite("new-dev", {
  email: "charlie@example.com",
  role: "member",
});

// Output connection details
console.log(`Production DB: https://${productionDb.Hostname}`);
console.log(`Development DB: https://${devDb.Hostname}`);
```

## Authentication

All Turso resources require authentication via environment variables:

```bash
# Required: Your Turso API token
export TURSO_API_TOKEN="your-api-token"

# Required: Your organization slug
export TURSO_ORGANIZATION_SLUG="your-org-slug"
```

Get your API token from: https://app.turso.tech/account

Find your organization slug in the URL when logged into Turso: `https://app.turso.tech/<your-org-slug>`

## Key Features

### Global Distribution
Turso databases can be replicated across multiple regions for low-latency access worldwide. Groups define the replication topology, and databases inherit their placement from their group.

### Schema Management
Use schema databases to maintain consistent database schemas across multiple databases. This is particularly useful for multi-tenant applications or development/staging/production environments.

### Database Branching
Create database branches by seeding new databases from existing ones, either from a specific point in time or the current state.

### Edge-Optimized
Built on libSQL (a fork of SQLite), Turso is optimized for edge computing with features like HTTP-based connections and built-in replication.

## Limitations

- **Free Tier**: Limited to 1 group and 3 databases
- **Group Names**: Must be unique within an organization and cannot be changed after creation
- **Database Names**: Must be unique within an organization and cannot be changed after creation
- **API Tokens**: Token values are only visible when first created - store them securely