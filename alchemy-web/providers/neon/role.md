# Neon Role

A Neon role is a PostgreSQL role (user) within a branch. Roles are used for authentication and authorization.

## Example

```typescript
import { Project, Branch, Role } from "alchemy/neon";

const project = await Project("my-project", {
  name: "My Database Project",
  regionId: "aws-us-east-1",
});

const branch = await Branch("my-branch", {
  project: project,
  name: "main",
});

const role = await Role("my-role", {
  project: project,
  branch: branch,
  name: "app_user",
});
```
