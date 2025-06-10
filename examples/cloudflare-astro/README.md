# Astro + Cloudflare + Alchemy Example

This example demonstrates how to deploy an Astro application to Cloudflare Workers using Alchemy Infrastructure-as-Code.

## Features

- 🚀 **Astro** - Modern web framework with component islands
- ☁️ **Cloudflare Workers** - Edge runtime with global deployment
- 🔮 **Alchemy** - TypeScript Infrastructure-as-Code
- 📦 **R2 Storage** - Object storage integration
- 🗄️ **KV Cache** - Key-value caching

## Getting Started

1. **Install dependencies:**

```bash
bun install
```

2. **Login to Cloudflare:**

```bash
bun wrangler login
```

3. **Deploy the application:**

```bash
bun run deploy
```

## Local Development

Run the Astro development server:

```bash
bun run dev
```

## Project Structure

```
src/
├── layouts/
│   └── Layout.astro       # Base layout component
├── pages/
│   ├── index.astro        # Homepage
│   └── api/
│       └── hello.ts       # API endpoint
└── env.d.ts              # TypeScript environment types
```

## Cloudflare Bindings

This example includes:

- **STORAGE** - R2 bucket for file storage
- **CACHE** - KV namespace for caching

Access these in your Astro API routes via the runtime context.

## Cleanup

To tear down the deployed resources:

```bash
bun run destroy
```