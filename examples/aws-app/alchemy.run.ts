import alchemy from "alchemy";
import { Function, Queue, Role, Table } from "alchemy/aws";
import { R2RestStateStore } from "alchemy/cloudflare";
import { Bundle } from "alchemy/esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = await alchemy("aws-app", {
  // decide the mode/stage however you want
  phase: process.argv[2] === "destroy" ? "destroy" : "up",
  stage: process.argv[3],
  quiet: process.argv.includes("--quiet"),
  stateStore:
    process.env.ALCHEMY_STATE_STORE === "cloudflare"
      ? (scope) => new R2RestStateStore(scope)
      : undefined,
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const [_queue, table, role] = await Promise.all([
  Queue("alchemy-items-queue", {
    queueName: "alchemy-items-queue",
    visibilityTimeout: 30,
    messageRetentionPeriod: 345600, // 4 days
  }),

  // Create DynamoDB table
  Table("alchemy-items-table", {
    tableName: "alchemy-items",
    partitionKey: {
      name: "id",
      type: "S",
    },
  }),

  // Create Lambda execution role with DynamoDB access
  Role("alchemy-api-role", {
    roleName: "alchemy-api-lambda-role",
    assumeRolePolicy: {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: {
            Service: "lambda.amazonaws.com",
          },
          Action: "sts:AssumeRole",
        },
      ],
    },
  }),
]);

// Create Lambda function
const bundle = await Bundle("api-bundle", {
  entryPoint: path.join(__dirname, "src", "index.ts"),
  outdir: ".out",
  format: "esm",
  platform: "node",
  target: "node20",
  minify: true,
  sourcemap: true,
  // Don't bundle aws-sdk as it's provided by Lambda
  external: ["@aws-sdk/*"],
});

const _api = await Function("api", {
  functionName: "alchemy-items-api",
  bundle,
  roleArn: role.arn,
  handler: "index.handler",
  environment: {
    TABLE_NAME: table.tableName,
  },
  url: {
    // Enable public access
    authType: "NONE",
    cors: {
      allowOrigins: ["*"],
      allowMethods: ["GET", "POST", "PUT", "DELETE"],
      allowHeaders: ["content-type"],
    },
  },
});

await app.finalize();
