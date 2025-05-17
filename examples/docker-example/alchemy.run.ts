import { alchemy } from "../../alchemy/src/alchemy";
import { DockerImage, DockerContainer, DockerNetwork } from "../../alchemy/src/docker";

// Initialize Alchemy
const app = await alchemy("docker-example", {
  // Determine the phase based on command line arguments
  phase: process.argv[2] === "destroy" ? "destroy" : "up",
  stage: process.argv[3],
  quiet: process.argv.includes("--quiet"),
});

// This example shows how to use Alchemy's Docker provider to:
// 1. Create a Docker network
// 2. Build and deploy a custom Node.js application
// 3. Deploy a Redis container
// 4. Connect both containers to the network

// Create a Docker network for the application
const appNetwork = await DockerNetwork("app-network", {
  name: "app-example-network",
  driver: "bridge"
});

// Build a custom Node.js application image
const appImage = await DockerImage("app-image", {
  name: "node-app-example",
  tag: "latest",
  build: {
    context: "./app", // Directory containing your app code and Dockerfile
    args: {
      NODE_ENV: "production"
    }
  }
});

// Deploy Redis container
const redisContainer = await DockerContainer("redis", {
  image: "redis:alpine",
  name: "redis-example",
  ports: [
    { external: 6379, internal: 6379 }
  ],
  networks: ["app-example-network"], // Use the string name directly
  restart: "always",
  start: true
});

// Deploy the Node.js application container
const appContainer = await DockerContainer("node-app", {
  image: appImage, // Using the image resource we created above
  name: "node-app-example",
  environment: {
    NODE_ENV: "production",
    REDIS_HOST: "redis-example" // Use the string name directly
  },
  ports: [
    { external: 3000, internal: 3000 }
  ],
  networks: ["app-example-network"], // Use the string name directly
  restart: "always",
  start: true
});


await app.finalize();

// Export relevant information
export { appNetwork, redisContainer, appContainer };
export const appUrl = "http://localhost:3000";
