import { alchemy } from "../../alchemy/src/alchemy";
import { DockerImage, DockerContainer, DockerNetwork } from "../../alchemy/src/docker";

// Initialize Alchemy
const app = await alchemy("docker-example", {
  // Determine the phase based on command line arguments
  phase: process.argv[2] === "destroy" ? "destroy" : "up",
  stage: process.argv[3],
  quiet: process.argv.includes("--quiet"),
});

// Get configuration values (matching the provided Pulumi config)
const frontendPort = 3000;
const backendPort = 3001;
const mongoPort = 27017;
const mongoHost = process.env.mongoHost;
const database = process.env.database;
const nodeEnvironment = process.env.nodeEnvironment;
const protocol = process.env.protocol;

const stack = app.stage || "dev";

// Create a Docker network
const network = await DockerNetwork("network", {
  name: `services-${stack}`,
  driver: "bridge"
});

// Pull the backend image
const backendImageName = "backend";
const backend = await DockerImage(`${backendImageName}Image`, {
  name: "pulumi/tutorial-pulumi-fundamentals-backend",
  tag: "latest"
});

// Pull the frontend image
const frontendImageName = "frontend";
const frontend = await DockerImage(`${frontendImageName}Image`, {
  name: "pulumi/tutorial-pulumi-fundamentals-frontend",
  tag: "latest"
});

// Pull the MongoDB image
const mongoImage = await DockerImage("mongoImage", {
  name: "pulumi/tutorial-pulumi-fundamentals-database",
  tag: "latest"
});

// Create the MongoDB container
const mongoContainer = await DockerContainer("mongoContainer", {
  image: mongoImage,
  name: `mongo-${stack}`,
  ports: [
    { external: mongoPort, internal: mongoPort }
  ],
  networks: [`services-${stack}`],
  restart: "always",
  start: true
});

// Create the backend container
const backendContainer = await DockerContainer("backendContainer", {
  image: backend,
  name: `backend-${stack}`,
  ports: [
    { external: backendPort, internal: backendPort }
  ],
  environment: {
    DATABASE_HOST: mongoHost,
    DATABASE_NAME: database,
    NODE_ENV: nodeEnvironment
  },
  networks: [`services-${stack}`],
  restart: "always",
  start: true
});

// Create the frontend container
const frontendContainer = await DockerContainer("frontendContainer", {
  image: frontend,
  name: `frontend-${stack}`,
  ports: [
    { external: frontendPort, internal: frontendPort }
  ],
  environment: {
    PORT: frontendPort.toString(),
    HTTP_PROXY: `backend-${stack}:${backendPort}`,
    PROXY_PROTOCOL: protocol
  },
  networks: [`services-${stack}`],
  restart: "always",
  start: true
});

await app.finalize();

// Export relevant information
export { network, mongoContainer, backendContainer, frontendContainer };
export const frontendUrl = `http://localhost:${frontendPort}`;
export const backendUrl = `http://localhost:${backendPort}`;
