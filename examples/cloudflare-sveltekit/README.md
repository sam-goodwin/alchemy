# Cloudflare SvelteKit Example

This example demonstrates deploying a SvelteKit application to Cloudflare Workers using Alchemy.

It includes:

- A SvelteKit frontend with server-side rendering
- KV Namespace for key-value storage (`AUTH_STORE`)
- R2 Bucket for object storage (`STORAGE`) 
- Cloudflare Workers with Static Assets deployment
- Configuration using `alchemy.run.ts`

## Setup

1. **Install Dependencies:** Navigate to the root of the Alchemy repository and run:
   ```bash
   bun install
   ```
   This will install dependencies for the core library and all examples, including this one.

2. **Cloudflare Credentials:** Ensure you have your Cloudflare API token and Account ID configured as environment variables:
   ```bash
   export CLOUDFLARE_API_TOKEN="your_api_token"
   export CLOUDFLARE_ACCOUNT_ID="your_account_id"
   ```
   You can also place these in a `.env` file in the repository root.

   More information on how to get your Cloudflare API token and Account ID can be found in the [Cloudflare Auth Guide](https://alchemy.run/guides/cloudflare/).

## Running the Deployment

1. **Navigate to Example Directory:**
   ```bash
   cd examples/cloudflare-sveltekit
   ```

2. **Run Alchemy Deployment:**
   ```bash
   bun run deploy
   ```

This command will:

- Execute the `bun run build` script to build the SvelteKit application
- Provision the KV Namespace (`cloudflare-sveltekit-auth-store`)
- Provision the R2 Bucket (`cloudflare-sveltekit-storage`) 
- Upload the static assets from `./.svelte-kit/cloudflare` to Cloudflare Workers Assets
- Deploy the Cloudflare Worker using the entrypoint `./.svelte-kit/cloudflare/_worker.js`
- Bind the KV and R2 resources to the worker environment
- Output the URL of the deployed worker

## Development

To run the SvelteKit development server locally:

1. Navigate to the example directory:
   ```bash
   cd examples/cloudflare-sveltekit
   ```
2. Run the development server:
   ```bash
   bun run dev
   ```

Note: The Cloudflare bindings will not function correctly in the local development environment as they rely on Cloudflare environment bindings injected by Alchemy during deployment.

## Accessing Cloudflare Resources

In your SvelteKit application, access the Cloudflare resources using the runtime environment:

```typescript
// In a +page.server.ts file
import { env } from "cloudflare:workers";

export async function load() {
  const kvData = await env.AUTH_STORE?.get('some-key');
  const r2Object = await env.STORAGE?.get('some-file');
  return { kvData };
}
```

Alternatively, you can access them via the platform parameter:

```typescript
// In a +page.server.ts file
export async function load({ platform }) {
  const kvData = await platform?.env?.AUTH_STORE?.get('some-key');
  const r2Object = await platform?.env?.STORAGE?.get('some-file');
  return { kvData };
}
```

The type definitions for the Cloudflare bindings are configured in [`src/env.d.ts`](./src/env.d.ts) and [`src/app.d.ts`](./src/app.d.ts), which provide type safety for the [Cloudflare bindings](https://svelte.dev/docs/kit/adapter-cloudflare#Runtime-APIs). You can learn more about the Cloudflare bindings [here](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/).

## Cleanup

To destroy the Cloudflare resources created by this example, run:

```bash
cd examples/cloudflare-sveltekit
bun run destroy
```