# Neon Endpoint

A Neon endpoint is a compute instance that provides access to a database branch. Endpoints can be read-write or read-only.

## Example

```typescript
import { Project, Branch, Endpoint } from "alchemy/neon";

const project = await Project("my-project", {
  name: "My Database Project",
  regionId: "aws-us-east-1",
});

const branch = await Branch("my-branch", {
  project: project,
  name: "main",
});

const readWriteEndpoint = await Endpoint("rw-endpoint", {
  project: project,
  branch: branch,
  type: "read_write",
  poolerEnabled: true,
  poolerMode: "transaction",
});

const readOnlyEndpoint = await Endpoint("ro-endpoint", {
  project: project,
  branch: branch,
  type: "read_only",
  suspendTimeoutSeconds: 300,
});
```
