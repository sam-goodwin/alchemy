import alchemy from "alchemy";
import { App, Machine, Volume, FlySecret, IpAddress } from "alchemy/fly";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX ?? "";
const app = await alchemy("fly-app", {
  stage: BRANCH_PREFIX || undefined,
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
});

// Create the Fly.io application
export const flyApp = await App(`fly-app${BRANCH_PREFIX}`, {
  name: `alchemy-fly-example${BRANCH_PREFIX}`,
  primaryRegion: "iad", // Washington DC
  env: {
    NODE_ENV: "production",
  },
});

// Create application secrets
export const dbSecret = await FlySecret(`db-secret${BRANCH_PREFIX}`, {
  app: flyApp,
  name: "DATABASE_URL",
  value: alchemy.secret("postgresql://example:secret@localhost/testdb"),
});

export const apiKeySecret = await FlySecret(`api-key${BRANCH_PREFIX}`, {
  app: flyApp,
  name: "API_KEY",
  value: alchemy.secret("sk_test_1234567890abcdef"),
});

// Create persistent storage
export const dataVolume = await Volume(`app-data${BRANCH_PREFIX}`, {
  app: flyApp,
  name: `app-data-volume${BRANCH_PREFIX}`,
  size_gb: 1, // 1GB for demo
  region: "iad",
  encrypted: true,
});

// Allocate static IP addresses
export const ipv4 = await IpAddress(`static-ipv4${BRANCH_PREFIX}`, {
  app: flyApp,
  type: "v4",
});

export const ipv6 = await IpAddress(`static-ipv6${BRANCH_PREFIX}`, {
  app: flyApp,
  type: "v6",
});

// Deploy the application machine
export const webMachine = await Machine(`web-server${BRANCH_PREFIX}`, {
  app: flyApp,
  region: "iad",
  name: `web-server-1${BRANCH_PREFIX}`,
  config: {
    image: "registry.fly.io/alchemy-fly-example:latest",
    env: {
      PORT: "3000",
      APP_NAME: `alchemy-fly-example${BRANCH_PREFIX}`,
    },
    guest: {
      cpus: 1,
      memory_mb: 512,
    },
    services: [
      {
        protocol: "tcp",
        internal_port: 3000,
        ports: [
          { port: 80, handlers: ["http"] },
          { port: 443, handlers: ["http", "tls"] },
        ],
        auto_stop_machines: true,
        auto_start_machines: true,
        min_machines_running: 0,
      },
    ],
    mounts: [
      {
        source: dataVolume,
        destination: "/data",
      },
    ],
    restart: {
      policy: "on-failure",
      max_retries: 3,
    },
  },
});

console.log({
  app_name: flyApp.name,
  hostname: flyApp.hostname,
  ipv4_address: ipv4.address,
  ipv6_address: ipv6.address,
  machine_id: webMachine.id,
  volume_id: dataVolume.id,
});

await app.finalize();