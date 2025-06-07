# Neon Branch

A Neon branch is a copy-on-write clone of the database. Branches allow you to create isolated environments for development, testing, and experimentation without affecting your main database.

## Example

```typescript
import { Project, Branch } from "alchemy/neon";

const project = await Project("my-project", {
  name: "My Database Project",
  regionId: "aws-us-east-1",
});

const devBranch = await Branch("dev-branch", {
  project: project,
  name: "development",
});

const featureBranch = await Branch("feature-branch", {
  project: project,
  name: "feature-xyz",
  parent: devBranch,
});
```
