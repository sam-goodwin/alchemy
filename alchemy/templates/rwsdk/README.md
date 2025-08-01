# Standard RedwoodSDK Starter

[![Deployed with Alchemy](https://alchemy.run/alchemy-badge.svg)](https://alchemy.run)

This "standard starter" is the recommended implementation for RedwoodSDK. You get a Typescript project with:

- Vite
- database (Prisma via D1)
- Session Management (via DurableObjects)
- Passkey authentication (Webauthn)
- Storage (via R2)

## Creating your project

```shell
npx create-rwsdk my-project-name
cd my-project-name
pnpm install
```

## Running the dev server

```shell
pnpm dev
```

Point your browser to the URL displayed in the terminal (e.g. `http://localhost:5173/`). You should see a "Hello World" message in your browser.

## Deploying your app

### Wrangler Setup

Within your project's `wrangler.jsonc`:

- Replace the `__change_me__` placeholders with a name for your application

- Create a new D1 database:

```shell
npx wrangler d1 create my-project-db
```

Copy the database ID provided and paste it into your project's `wrangler.jsonc` file:

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "my-project-db",
      "database_id": "your-database-id",
    },
  ],
}
```

### Authentication Setup

For authentication setup and configuration, including optional bot protection, see the [Authentication Documentation](https://docs.rwsdk.com/core/authentication).

## Further Reading

- [RedwoodSDK Documentation](https://docs.rwsdk.com/)
- [Cloudflare Workers Secrets](https://developers.cloudflare.com/workers/runtime-apis/secrets/)
