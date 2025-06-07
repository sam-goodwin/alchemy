import { Pipeline, R2Bucket } from "../alchemy/src/cloudflare/index.js";
import alchemy from "../alchemy/src/index.js";
import env from "./env.js";

const app = await alchemy("alchemy:telemetry", env);

const bucket = await R2Bucket("telemetry-bucket", {
  name: "alchemy-telemetry-bucket",
});

const pipeline = await Pipeline("telemetry-pipeline", {
  name: "alchemy-telemetry-pipeline",
  source: [{ type: "http", format: "json" }],
  destination: {
    type: "r2",
    format: "json",
    path: {
      bucket: bucket.name,
    },
    credentials: {
      accessKeyId: await alchemy.secret.env.R2_ACCESS_KEY_ID,
      secretAccessKey: await alchemy.secret.env.R2_SECRET_ACCESS_KEY,
    },
  },
});

console.log(`Pipeline endpoint: ${pipeline.endpoint}`);

await app.finalize();
