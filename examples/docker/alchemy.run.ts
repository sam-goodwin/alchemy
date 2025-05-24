import alchemy from "alchemy";
import * as docker from "alchemy/docker";

// Initialize Alchemy
const app = await alchemy("docker", {
  // Determine the phase based on command line arguments
  phase: process.argv[2] === "destroy" ? "destroy" : "up",
  stage: process.argv[3],
  quiet: process.argv.includes("--quiet"),
});

// Get configuration values (matching the provided Pulumi config)
const frontendPort = 3001;
const backendPort = 3000;
const mongoPort = 27017;
const mongoHost = process.env.mongoHost!;
const database = process.env.database!;
const nodeEnvironment = process.env.nodeEnvironment!;
const protocol = process.env.protocol!;

const stack = app.stage || "dev";

// Create a Docker network
const network = await docker.Network("network", {
  name: `services-${stack}`,
  driver: "bridge",
});

// Pull the images in parallel
const [backend, frontend, mongoImage] = await Promise.all([
  docker.RemoteImage("backendImage", {
    name: "pulumi/tutorial-pulumi-fundamentals-backend",
    tag: "latest",
  }),
  docker.RemoteImage("frontendImage", {
    name: "pulumi/tutorial-pulumi-fundamentals-frontend",
    tag: "latest",
  }),
  docker.RemoteImage("mongoImage", {
    name: "pulumi/tutorial-pulumi-fundamentals-database",
    tag: "latest",
  }),
]);

// Create the MongoDB container
const mongoContainer = await docker.Container("mongoContainer", {
  image: mongoImage,
  name: `mongo-${stack}`,
  ports: [{ external: mongoPort, internal: mongoPort }],
  networks: [
    {
      name: network.name,
      aliases: ["mongo"],
    },
  ],
  restart: "always",
  start: true,
});

// Create the backend container
const backendContainer = await docker.Container("backendContainer", {
  image: backend,
  name: `backend-${stack}`,
  ports: [{ external: backendPort, internal: backendPort }],
  environment: {
    DATABASE_HOST: mongoHost,
    DATABASE_NAME: database,
    NODE_ENV: nodeEnvironment,
  },
  networks: [network],
  restart: "always",
  start: true,
});

// Create the frontend container
const frontendContainer = await docker.Container("frontendContainer", {
  image: frontend,
  name: `frontend-${stack}`,
  ports: [{ external: frontendPort, internal: frontendPort }],
  environment: {
    PORT: frontendPort.toString(),
    HTTP_PROXY: `${backendContainer.name}:${backendPort}`,
    PROXY_PROTOCOL: protocol,
  },
  networks: [network],
  restart: "always",
  start: true,
});

await app.finalize();

// Export relevant information
export { backendContainer, frontendContainer, mongoContainer, network };
export const frontendUrl = `http://localhost:${frontendPort}`;
export const backendUrl = `http://localhost:${backendPort}`;
