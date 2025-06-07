# Neon

Neon is a serverless PostgreSQL platform that automatically scales compute and storage. It separates compute from storage, enabling instant branching, time-travel queries, and pay-per-use pricing.

Official documentation: [neon.tech/docs](https://neon.tech/docs)

## Resources

- [Project](../../../docs/providers/neon/project.md) - A Neon serverless PostgreSQL project
- [Branch](./branch.md) - Copy-on-write database clones for isolated environments
- [Database](./database.md) - PostgreSQL databases within branches
- [Role](./role.md) - Database user roles with permissions
- [Endpoint](./endpoint.md) - Connection endpoints for accessing branches

## Example Usage

```ts
import { Project, Branch, Database, Role, Endpoint } from "alchemy/neon";

// Create a project with default settings
const project = await Project("my-app", {
  name: "My Application Database",
  regionId: "aws-us-east-1",
  pgVersion: 16,
});

// Create a development branch
const devBranch = await Branch("dev-branch", {
  project: project,
  name: "development",
});

// Create a database for the application
const database = await Database("app-db", {
  project: project,
  branch: devBranch,
  name: "myapp_db",
  ownerName: project.roles[0].name,
});

// Create an application role
const appRole = await Role("app-role", {
  project: project,
  branch: devBranch,
  name: "app_user",
});

// Create a read-write endpoint
const endpoint = await Endpoint("rw-endpoint", {
  project: project,
  branch: devBranch,
  type: "read_write",
  poolerEnabled: true,
  poolerMode: "transaction",
});

console.log(`Database URL: ${project.connectionUris[0].connectionUri}`);
console.log(`Endpoint host: ${endpoint.host}`);
```