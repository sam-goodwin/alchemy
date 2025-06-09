# Neon Project

A Neon project is a serverless PostgreSQL project that automatically manages compute and storage scaling. Projects contain branches, databases, roles, and endpoints.

## Example

```typescript
import { Project } from "alchemy/neon";

const project = await Project("my-project", {
  name: "My Application Database",
  regionId: "aws-us-east-1",
  pgVersion: 16,
});

// Access the default branch
console.log(project.defaultBranch);

// Access connection information
console.log(project.connectionUris[0].connectionUri);
console.log(project.endpoints[0].host);
```