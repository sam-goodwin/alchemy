# Fly.io Provider

This directory contains the Fly.io provider for Alchemy, enabling Infrastructure-as-Code management of Fly.io resources.

## Overview

Fly.io is a modern container platform that offers global edge hosting with a simple API. This provider allows you to manage Fly.io applications, machines, volumes, secrets, certificates, and IP addresses using Alchemy's declarative approach.

## Resources

| Resource | Description |
|----------|-------------|
| **App** | Applications that can contain machines and infrastructure |
| **Machine** | Virtual machines/containers for running applications |
| **Volume** | Persistent storage volumes for data |
| **FlySecret** | Environment variables and secrets for applications |
| **Certificate** | SSL/TLS certificates for custom domains |
| **IpAddress** | Static IP addresses for applications |

## Authentication

The provider requires a Fly.io API token. You can obtain one by:

1. Installing the Fly.io CLI: `curl -L https://fly.io/install.sh | sh`
2. Authenticating: `fly auth login`
3. Getting your token: `fly auth token`

Set the token in your environment:

```env
FLY_API_TOKEN=your_api_token_here
```

Or pass it directly to resources:

```ts
const app = await App("my-app", {
  apiToken: alchemy.secret("your_token")
});
```

## Example Usage

```ts
import { App, Machine, Volume, FlySecret } from "alchemy/fly";

// Create application
const app = await App("web-app", {
  name: "my-web-app",
  primaryRegion: "iad"
});

// Add secrets
const secret = await FlySecret("db-url", {
  app,
  name: "DATABASE_URL",
  value: alchemy.secret("postgresql://...")
});

// Create volume
const volume = await Volume("data", {
  app,
  size_gb: 10
});

// Deploy machine
const machine = await Machine("server", {
  app,
  config: {
    image: "nginx:alpine",
    services: [{
      protocol: "tcp",
      internal_port: 80,
      ports: [{ port: 80 }]
    }],
    mounts: [{
      source: volume,
      destination: "/data"
    }]
  }
});
```

## Architecture

### Core Concepts

1. **Apps** are top-level containers that group related resources
2. **Machines** are the compute units (containers) that run your applications
3. **Volumes** provide persistent storage that can be mounted to machines
4. **Secrets** are encrypted environment variables
5. **Certificates** enable HTTPS for custom domains
6. **IP Addresses** provide static networking endpoints

### Resource Relationships

```
App (top-level)
├── Machine (compute)
│   └── Volume (mounted storage)
├── FlySecret (environment variables)
├── Certificate (SSL/TLS)
└── IpAddress (networking)
```

## Implementation Details

### API Client (`api.ts`)
- HTTP client with authentication
- Automatic retry logic with exponential backoff
- Error handling for transient failures

### Error Handling (`api-error.ts`)
- Structured error types with HTTP status codes
- Contextual error messages for debugging

### Resources
Each resource implements the standard Alchemy resource lifecycle:
- **Create**: Provision new resources via Fly.io API
- **Update**: Modify existing resources (where supported)
- **Delete**: Clean up resources during teardown

## Testing

Tests are located in `../../test/fly/` and cover:
- Resource creation and updates
- Error handling
- Cleanup verification
- Integration with Fly.io API

Run tests with appropriate Fly.io credentials:

```bash
FLY_API_TOKEN=your_token npm test
```

## Documentation

- [Provider Overview](../../../alchemy-web/docs/providers/fly/index.md)
- [Getting Started Guide](../../../alchemy-web/docs/guides/fly.md)
- Individual resource documentation in `../../../alchemy-web/docs/providers/fly/`

## Examples

See the complete example application in `../../../examples/fly-app/`.

## API Reference

For detailed Fly.io API documentation, see:
- [Fly.io Machines API](https://fly.io/docs/machines/api/)
- [Fly.io Platform API](https://fly.io/docs/reference/api/)

## Contributing

When adding new resources or modifying existing ones:

1. Follow the established patterns in this directory
2. Add comprehensive tests in `../../test/fly/`
3. Update documentation in `../../../alchemy-web/docs/`
4. Add examples demonstrating usage