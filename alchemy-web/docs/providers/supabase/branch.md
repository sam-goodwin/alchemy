# Supabase Branch Resource

The `Branch` resource manages Supabase preview environments (database branches), which allow you to create isolated database environments for testing and development.

## Usage

```typescript
import { Branch } from "alchemy/supabase";

// Create a basic branch
const branch = Branch("feature-branch", {
  project: "proj-123",
  branchName: "feature-branch"
});

// Create a branch with git integration
const branch = Branch("feature-branch", {
  project: myProject,
  branchName: "feature-branch", 
  gitBranch: "feature/new-feature",
  persistent: true
});

// Create a branch with custom configuration
const branch = Branch("staging", {
  project: "proj-123",
  branchName: "staging",
  region: "us-east-1",
  desiredInstanceSize: "micro"
});
```

## Properties

### Required Properties

- **project** (`string | Project`): Reference to the parent project (string ID or Project resource)
- **branchName** (`string`): Name of the branch

### Optional Properties

- **gitBranch** (`string`): Git branch to associate with this database branch
- **persistent** (`boolean`): Whether the branch should be persistent (default: false)
- **region** (`string`): Region for the branch
- **desiredInstanceSize** (`string`): Desired instance size (e.g., "micro", "small", "medium")
- **releaseChannel** (`string`): Release channel for the branch
- **adopt** (`boolean`): Whether to adopt an existing branch instead of failing on conflict
- **delete** (`boolean`): Whether to delete the branch on resource destruction (default: true)

## Resource Properties

The `Branch` resource provides the following properties:

- **id** (`string`): Unique identifier of the branch
- **name** (`string`): Name of the branch

- **isDefault** (`boolean`): Whether this is the default branch
- **gitBranch** (`string`): Git branch associated with this database branch
- **prNumber** (`number`): Pull request number if applicable
- **latestCheckRunId** (`number`): Latest check run ID
- **persistent** (`boolean`): Whether the branch is persistent
- **status** (`string`): Current status of the branch
- **createdAt** (`string`): Creation timestamp
- **updatedAt** (`string`): Last update timestamp

## Examples

### Basic Branch Creation

```typescript
import { Branch } from "alchemy/supabase";

const branch = Branch("my-branch", {
  project: "proj-abc123",
  branchName: "my-branch"
});
```

### Branch with Git Integration

```typescript
import { Branch, Project } from "alchemy/supabase";

const project = Project("my-project", {
  organizationId: "org-123",
  region: "us-east-1",
  dbPass: secret("secure-password")
});

const branch = Branch("feature-branch", {
  project: project,
  branchName: "feature-branch",
  gitBranch: "feature/new-feature",
  persistent: true
});
```

### Staging Environment

```typescript
import { Branch } from "alchemy/supabase";

const stagingBranch = Branch("staging", {
  project: "proj-abc123",
  branchName: "staging",
  persistent: true,
  region: "us-east-1",
  desiredInstanceSize: "small"
});
```

### Adopting Existing Branch

```typescript
import { Branch } from "alchemy/supabase";

const existingBranch = Branch("existing-branch", {
  project: "proj-abc123",
  branchName: "existing-branch",
  adopt: true
});
```

## Authentication

The Branch resource uses the same authentication as other Supabase resources. Set your access token:

```bash
export SUPABASE_ACCESS_TOKEN="your-access-token"
```

## Error Handling

The Branch resource handles common error scenarios:

- **Branch already exists**: Use `adopt: true` to adopt existing branches
- **Project not found**: Ensure the project reference is valid
- **Insufficient permissions**: Verify your access token has the required permissions
- **Rate limiting**: Automatic exponential backoff is applied

## Best Practices

1. **Use descriptive branch names** that match your git branches
2. **Set persistent: true** for long-lived environments like staging
3. **Clean up temporary branches** by ensuring `delete: true` (default)
4. **Use Project resources** instead of string IDs for better type safety
5. **Monitor branch status** before deploying to ensure readiness
