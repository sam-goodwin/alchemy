# Fly.io

Fly.io is a modern container platform that offers global edge hosting with a simple API for managing applications, machines (containers), and infrastructure.

**Official Links:**
- [Fly.io Website](https://fly.io)
- [Fly.io Docs](https://fly.io/docs/)
- [Machines API](https://fly.io/docs/machines/api/)

## Resources

- [App](./app.md) - Applications that can contain machines and infrastructure
- [Machine](./machine.md) - Virtual machines/containers for running applications
- [Volume](./volume.md) - Persistent storage volumes for data
- [FlySecret](./secret.md) - Environment variables and secrets for applications
- [Certificate](./certificate.md) - SSL/TLS certificates for custom domains
- [IpAddress](./ip-address.md) - Static IP addresses for applications

## Example Usage

```ts
import { 
  App, 
  Machine, 
  Volume, 
  FlySecret, 
  Certificate, 
  IpAddress 
} from "alchemy/fly";

// Create application
const app = await App("my-web-app", {
  name: "production-app",
  primaryRegion: "sea",
  env: {
    NODE_ENV: "production"
  }
});

// Add secrets
const dbSecret = await FlySecret("db-url", {
  app,
  name: "DATABASE_URL",
  value: alchemy.secret("postgresql://...")
});

// Create persistent volume
const volume = await Volume("app-data", {
  app,
  size_gb: 10,
  region: "sea"
});

// Deploy machine with volume
const machine = await Machine("web-server", {
  app,
  region: "sea",
  config: {
    image: "nginx:alpine",
    env: {
      PORT: "8080"
    },
    services: [{
      protocol: "tcp",
      internal_port: 8080,
      ports: [{ port: 80, handlers: ["http"] }]
    }],
    guest: {
      cpus: 1,
      memory_mb: 512
    },
    mounts: [{
      source: volume,
      destination: "/data"
    }]
  }
});

// Add custom domain certificate
const cert = await Certificate("custom-domain", {
  app,
  hostname: "myapp.com"
});

// Allocate static IP
const ipv4 = await IpAddress("static-ip", {
  app,
  type: "v4",
  region: "sea"
});
```