# TCP Proxy

## Basic Usage

```typescript
import { TcpProxy } from "alchemy/railway";

// Game server proxy
const gameProxy = await TcpProxy("minecraft-proxy", {
  applicationPort: 25565,
  proxyPort: 25565,
  service: service,
  environment: environment,
});
```

## Database Proxy with Automatic Port

```typescript
// Database proxy with automatic port
const dbProxy = await TcpProxy("db-proxy", {
  applicationPort: 5432,
  service: dbService,
  environment: environment,
});
```

## String References

```typescript
// Using string references
const tcpProxy = await TcpProxy("my-proxy", {
  applicationPort: 3000,
  proxyPort: 8080,
  service: "service_abc123",
  environment: "env_xyz789",
});
```