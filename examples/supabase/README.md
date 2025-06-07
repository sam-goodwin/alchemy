# Supabase + Drizzle Example

This example demonstrates how to use Alchemy to deploy a Supabase project with Edge Functions and Drizzle ORM for database management.

## Features

- **Supabase Project**: Automatically provisioned with database
- **Edge Function**: API handler with bundled TypeScript code
- **Drizzle ORM**: Type-safe database schema and queries
- **Infrastructure as Code**: Everything defined in `alchemy.run.ts`

## Setup

1. Install dependencies:
```bash
bun install
```

2. Set environment variables:
```bash
export SUPABASE_ORG_ID="your-org-id"
export DB_PASSWORD="your-secure-password"
```

3. Deploy the infrastructure:
```bash
bun run alchemy.run.ts
```

## Project Structure

- `alchemy.run.ts` - Infrastructure definition
- `src/schema.ts` - Drizzle database schema
- `src/api.ts` - Edge Function API handler
- `package.json` - Dependencies

## API Endpoints

Once deployed, your function will be available at:
`https://{project-id}.supabase.co/functions/v1/api-handler`

- `GET /users` - List all users
- `POST /users` - Create a new user
- `GET /posts` - List all posts

## Database Schema

The example includes two tables:
- `users` - User profiles with email, phone, etc.
- `posts` - Blog posts with author relationships

## Bundling

The Edge Function uses Alchemy's bundling system to:
- Bundle TypeScript code with esbuild
- Include Drizzle ORM and dependencies
- Optimize for Deno runtime environment
