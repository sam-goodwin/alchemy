# Project

A [Supabase Project](https://supabase.com/docs/guides/platform/projects) provides a backend environment for your application with PostgreSQL database, authentication, storage, and edge functions.

## Minimal Example

Create a basic project:

```ts
import { Project, Organization } from "alchemy/supabase";
import { secret } from "alchemy";

const org = Organization("my-org", {
  name: "My Organization"
});

const project = Project("my-project", {
  organization: org,
  region: "us-east-1",
  dbPass: secret("secure-password")
});
```

## With Organization ID

You can also reference an organization by its string ID:

```ts
import { Project } from "alchemy/supabase";

const project = Project("my-project", {
  organization: "org-123",
  region: "us-east-1",
  dbPass: secret("secure-password")
});
```

## With Custom Instance Size

Configure the compute resources for your project:

```ts
import { Project } from "alchemy/supabase";

const project = Project("large-app", {
  organization: "org-123",
  region: "us-west-2",
  dbPass: secret("secure-password"),
  desiredInstanceSize: "large"
});
```

## With Template

Initialize your project from a template repository:

```ts
import { Project } from "alchemy/supabase";

const project = Project("blog-app", {
  organization: "org-123",
  region: "eu-west-1",
  dbPass: secret("secure-password"),
  templateUrl: "https://github.com/supabase/supabase/tree/master/examples/nextjs-blog"
});
```
