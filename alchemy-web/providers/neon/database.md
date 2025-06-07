# Neon Database

A Neon database is a PostgreSQL database within a branch. Each branch can contain multiple databases.

## Example

```typescript
import { Project, Branch, Database } from "alchemy/neon";

const project = await Project("my-project", {
  name: "My Database Project",
  regionId: "aws-us-east-1",
});

const branch = await Branch("my-branch", {
  project: project,
  name: "main",
});

const database = await Database("my-database", {
  project: project,
  branch: branch,
  name: "myapp_db",
  ownerName: "myapp_user",
});
```
