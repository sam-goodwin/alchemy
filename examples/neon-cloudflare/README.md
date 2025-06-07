# Neon PostgreSQL with Cloudflare Workers Example

This example demonstrates how to use Alchemy to create a Neon PostgreSQL database and connect it to a Cloudflare Worker via Hyperdrive for optimal performance.

## Architecture

- **Neon PostgreSQL**: Serverless PostgreSQL database with automatic scaling
- **Cloudflare Hyperdrive**: Connection pooling and caching for faster database access
- **Cloudflare Workers**: Serverless API endpoints using Hono framework

## Getting Started

1. Install dependencies:
   ```bash
   bun install
   ```

2. Login to Cloudflare:
   ```bash
   bunx wrangler login
   ```

3. Set up your Neon API key (get it from [Neon Console](https://console.neon.tech)):
   ```bash
   export NEON_API_KEY=your_neon_api_key_here
   ```

4. Deploy the infrastructure:
   ```bash
   bun run deploy
   ```

5. Set up the database tables:
   ```bash
   curl -X GET https://your-worker-url.workers.dev/setup
   ```

## API Endpoints

Once deployed, your API will have the following endpoints:

- `GET /` - Health check and API documentation
- `GET /setup` - Create database tables (run this first)
- `GET /users` - List all users
- `POST /users` - Create a new user
- `GET /posts` - List all posts with user information
- `POST /posts` - Create a new post

## Example Usage

```bash
# Create a user
curl -X POST https://your-worker-url.workers.dev/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'

# Create a post
curl -X POST https://your-worker-url.workers.dev/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "My First Post", "content": "Hello World!", "user_id": 1}'

# Get all posts
curl https://your-worker-url.workers.dev/posts
```

## Features Demonstrated

- **Neon Branching**: Creates a development branch for isolated development
- **Database Management**: Creates databases and roles programmatically
- **Hyperdrive Integration**: Uses Cloudflare Hyperdrive for faster database connections
- **Serverless API**: Hono-based API running on Cloudflare Workers
- **SQL Operations**: Basic CRUD operations with PostgreSQL

## Cleanup

To tear down all resources:

```bash
bun run destroy
```

This will delete the Neon project, databases, and Cloudflare resources.