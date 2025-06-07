# Function

A [Supabase Edge Function](https://supabase.com/docs/guides/functions) is a serverless TypeScript function that runs on the edge, close to your users for minimal latency.

## Minimal Example

Create a basic function with file-based entrypoint:

```ts
import { Function, Project } from "alchemy/supabase";

const project = Project("my-project", {
  organization: "org-123",
  region: "us-east-1",
  dbPass: secret("secure-password")
});

const func = Function("api-handler", {
  project,
  main: "./functions/api-handler.ts"
});
```

## With Bundle Configuration

Optimize your function with custom build settings:

```ts
import { Function, Project } from "alchemy/supabase";

const func = Function("optimized-api", {
  project,
  main: "./src/api.ts",
  bundle: {
    minify: true,
    target: "es2020"
  }
});
```

## With JWT Verification

Protect your function with automatic JWT verification:

```ts
import { Function } from "alchemy/supabase";

const protectedFunc = Function("protected-api", {
  project,
  main: "./functions/protected-api.ts",
  verifyJwt: true
});
```

## With Import Map

Use Deno-style import maps for dependency management:

```ts
import { Function } from "alchemy/supabase";

const func = Function("advanced-api", {
  project,
  main: "./functions/advanced-api.ts",
  importMap: {
    "std/": "https://deno.land/std@0.168.0/",
    "supabase/": "https://esm.sh/@supabase/supabase-js@2"
  }
});
```
