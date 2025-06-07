# Bucket

A [Supabase Storage Bucket](https://supabase.com/docs/guides/storage) provides file storage capabilities with fine-grained access controls and policies.

## Minimal Example

Create a basic storage bucket:

```ts
import { Bucket, Project } from "alchemy/supabase";

const project = Project("my-project", {
  organization: "org-123",
  region: "us-east-1",
  dbPass: secret("secure-password")
});

const bucket = Bucket("user-uploads", {
  project,
  public: false
});
```

## Public Bucket

Create a publicly accessible bucket for assets:

```ts
import { Bucket } from "alchemy/supabase";

const bucket = Bucket("public-assets", {
  project,
  public: true
});
```

## With File Restrictions

Control file uploads with size and type limits:

```ts
import { Bucket } from "alchemy/supabase";

const bucket = Bucket("user-uploads", {
  project,
  public: false,
  fileSizeLimit: 5242880, // 5MB
  allowedMimeTypes: ["image/jpeg", "image/png", "image/gif"]
});
```

