import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { createCloudflareApi } from "../../src/cloudflare/api.js";
import { R2Bucket } from "../../src/cloudflare/bucket.js";
import {
  Pipeline,
  type PipelineRecord,
} from "../../src/cloudflare/pipeline.js";
import { Worker } from "../../src/cloudflare/worker.js";
import { destroy } from "../../src/destroy.js";
import { BRANCH_PREFIX } from "../util.js";

import "../../src/test/bun.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

// Create a Cloudflare API client for verification
const api = await createCloudflareApi();

// Helper function to check if a pipeline exists
async function assertPipelineExists(pipelineName: string): Promise<boolean> {
  try {
    const response = await api.get(
      `/accounts/${api.accountId}/pipelines/${pipelineName}`,
    );
    return response.status === 200;
  } catch {
    return false;
  }
}

// Helper function to check if a worker exists
async function assertWorkerDoesNotExist(workerName: string) {
  try {
    const response = await api.get(
      `/accounts/${api.accountId}/workers/scripts/${workerName}`,
    );
    expect(response.status).toEqual(404);
  } catch {
    // 404 is expected, so we can ignore it
    return;
  }
}

const accessKeyId = await alchemy.secret.env("R2_ACCESS_KEY_ID");
const secretAccessKey = await alchemy.secret.env("R2_SECRET_ACCESS_KEY");

describe("Pipeline Resource", () => {
  // Create mock secrets for testing - reuse these across tests

  test("create and delete basic pipeline", async (scope) => {
    const pipelineName = `${BRANCH_PREFIX}-test-pipeline`;
    const bucketName = `${BRANCH_PREFIX.toLowerCase()}-basic-bucket`;

    let pipeline: Pipeline | undefined;
    let bucket: R2Bucket | undefined;

    try {
      // Create an R2 bucket
      bucket = await R2Bucket("basic-bucket", {
        name: bucketName,
      });

      expect(bucket.name).toEqual(bucketName);

      // Create a basic pipeline with R2 destination
      pipeline = await Pipeline(pipelineName, {
        name: pipelineName,
        source: [
          {
            type: "http",
            format: "json",
            authentication: true,
            cors: { origins: ["*"] },
          },
        ],
        destination: {
          type: "r2",
          format: "json",
          path: {
            bucket: bucket.name,
          },
          credentials: {
            accessKeyId,
            secretAccessKey,
          },
        },
      });

      // Verify the pipeline was created
      expect(pipeline.id).toBeTruthy();
      expect(pipeline.name).toEqual(pipelineName);
      expect(pipeline.endpoint).toBeTruthy();
      expect(pipeline.version).toBeNumber();
      expect(pipeline.type).toEqual("pipeline");
      expect(pipeline.destination).toBeDefined();
      expect(pipeline.destination.type).toEqual("r2");
      expect(pipeline.destination.path.bucket).toEqual(bucketName);

      // Verify the pipeline exists via the API
      const exists = await assertPipelineExists(pipelineName);
      expect(exists).toEqual(true);
    } finally {
      await destroy(scope);

      // Verify the pipeline was deleted
      const exists = await assertPipelineExists(pipelineName);
      expect(exists).toEqual(false);
    }
  }, 60000); // Increase timeout for pipeline operations

  test("create pipeline with R2 bucket destination and custom settings", async (scope) => {
    const pipelineName = `${BRANCH_PREFIX}-r2-pipeline`;
    const bucketName = `${BRANCH_PREFIX.toLowerCase()}-pipeline-bucket`;
    const prefix = "test-logs";

    let pipeline: Pipeline | undefined;
    let bucket: R2Bucket | undefined;

    try {
      // Create an R2 bucket
      bucket = await R2Bucket("pipeline-bucket", {
        name: bucketName,
      });

      expect(bucket.name).toEqual(bucketName);

      // Create a pipeline with the R2 bucket as destination and custom settings
      pipeline = await Pipeline(pipelineName, {
        name: pipelineName,
        source: [
          {
            type: "http",
            format: "json",
            authentication: true,
            cors: { origins: ["*"] },
          },
        ],
        destination: {
          type: "r2",
          format: "json",
          path: {
            bucket: bucket.name,
            prefix: prefix,
          },
          credentials: {
            accessKeyId,
            secretAccessKey,
          },
          batch: {
            maxMb: 10, // 10 MB
            maxSeconds: 60, // 1 minute
            maxRows: 1000, // 1000 rows
          },
          compression: {
            type: "gzip",
          },
        },
      });

      // Verify the pipeline was created
      expect(pipeline.id).toBeTruthy();
      expect(pipeline.name).toEqual(pipelineName);
      expect(pipeline.endpoint).toBeTruthy();
      expect(pipeline.destination).toBeDefined();
      expect(pipeline.destination.type).toEqual("r2");
      expect(pipeline.destination.path.bucket).toEqual(bucketName);
      expect(pipeline.destination.path.prefix).toEqual(prefix);
      expect(pipeline.destination.batch).toBeDefined();
      expect(pipeline.destination.batch?.maxMb).toEqual(10);
      expect(pipeline.destination.batch?.maxSeconds).toEqual(60);
      expect(pipeline.destination.batch?.maxRows).toEqual(1000);

      // Verify the pipeline exists via the API
      const exists = await assertPipelineExists(pipelineName);
      expect(exists).toEqual(true);
    } finally {
      await destroy(scope);
    }
  }, 60000); // Increase timeout for pipeline operations

  test("update pipeline settings", async (scope) => {
    const pipelineName = `${BRANCH_PREFIX}-update-pipeline`;
    const bucketName = `${BRANCH_PREFIX.toLowerCase()}-update-bucket`;

    let pipeline: Pipeline | undefined;
    let bucket: R2Bucket | undefined;

    try {
      // Create an R2 bucket
      bucket = await R2Bucket("update-bucket", {
        name: bucketName,
      });

      // Create a pipeline with initial settings
      pipeline = await Pipeline(pipelineName, {
        name: pipelineName,
        source: [
          {
            type: "http",
            format: "json",
            authentication: true,
            cors: { origins: ["*"] },
          },
        ],
        destination: {
          type: "r2",
          format: "json",
          path: {
            bucket: bucket.name,
          },
          credentials: {
            accessKeyId,
            secretAccessKey,
          },
          batch: {
            maxMb: 10,
            maxSeconds: 60,
          },
        },
      });

      expect(pipeline.id).toBeTruthy();
      expect(pipeline.name).toEqual(pipelineName);
      expect(pipeline.destination.batch?.maxMb).toEqual(10);
      expect(pipeline.destination.batch?.maxSeconds).toEqual(60);

      // Update the pipeline with new settings
      pipeline = await Pipeline(pipelineName, {
        name: pipelineName,
        source: [
          {
            type: "http",
            format: "json",
            authentication: true,
            cors: { origins: ["*"] },
          },
        ],
        destination: {
          type: "r2",
          format: "json",
          path: {
            bucket: bucket.name,
            prefix: "updated-prefix",
          },
          credentials: {
            accessKeyId,
            secretAccessKey,
          },
          batch: {
            maxMb: 20,
            maxSeconds: 120,
            maxRows: 2000,
          },
        },
        compression: {
          type: "gzip",
        },
      });

      // Verify the update
      expect(pipeline.id).toBeTruthy();
      expect(pipeline.name).toEqual(pipelineName);
      expect(pipeline.destination.path.prefix).toEqual("updated-prefix");
      expect(pipeline.destination.batch?.maxMb).toEqual(20);
      expect(pipeline.destination.batch?.maxSeconds).toEqual(120);
      expect(pipeline.destination.batch?.maxRows).toEqual(2000);
      expect(pipeline.compression?.type).toEqual("gzip");
    } finally {
      await destroy(scope);
    }
  }, 60000); // Increase timeout for pipeline operations

  test("create worker with pipeline binding and send records", async (scope) => {
    const pipelineName = `${BRANCH_PREFIX}-worker-pipeline`;
    const workerName = `${BRANCH_PREFIX}-pipeline-worker`;
    const bucketName = `${BRANCH_PREFIX.toLowerCase()}-worker-bucket`;

    // Define a TypeScript interface for our test records
    interface TestRecord extends PipelineRecord {
      id: string;
      event: string;
      timestamp: number;
      data: {
        value: number;
        tags: string[];
      };
    }

    // Sample worker script that uses a pipeline binding
    const pipelineWorkerScript = `
      export default {
        async fetch(request, env, ctx) {
          const url = new URL(request.url);

          // Send a record to the pipeline
          if (url.pathname === '/send-record') {
            try {
              // Parse the request body
              const records = await request.json();
              
              // Send records to the pipeline
              await env.DATA_PIPELINE.send(records);
              
              return new Response(JSON.stringify({
                success: true,
                message: 'Records sent to pipeline',
                count: Array.isArray(records) ? records.length : 1
              }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              });
            } catch (error) {
              return new Response(JSON.stringify({
                success: false,
                error: error.message
              }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
              });
            }
          }
          
          return new Response('Pipeline Worker is running!', {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
      };
    `;

    let pipeline: Pipeline<TestRecord> | undefined;
    let bucket: R2Bucket | undefined;
    let worker: Worker<{ DATA_PIPELINE: Pipeline<TestRecord> }> | undefined;

    try {
      // Create an R2 bucket
      bucket = await R2Bucket("worker-bucket", {
        name: bucketName,
        accessKey: accessKeyId,
        secretAccessKey: secretAccessKey,
        delete: true,
        empty: true,
      });

      // Create a pipeline with the R2 bucket as destination
      pipeline = await Pipeline(pipelineName, {
        name: pipelineName,
        source: [
          {
            type: "binding",
            format: "json",
          },
        ],
        destination: {
          type: "r2",
          format: "json",
          path: {
            bucket: bucket.name,
            prefix: "worker-logs",
          },
          credentials: {
            accessKeyId,
            secretAccessKey,
          },
          batch: {
            maxMb: 1, // 1 MB
            maxSeconds: 1, // 5 seconds
            maxRows: 100, // 100 rows
          },
        },
      });

      expect(pipeline.id).toBeTruthy();
      expect(pipeline.name).toEqual(pipelineName);
      expect(pipeline.endpoint).toBeTruthy();

      // Create a worker with the pipeline binding
      worker = await Worker(workerName, {
        name: workerName,
        script: pipelineWorkerScript,
        format: "esm",
        url: true, // Enable workers.dev URL to test the worker
        bindings: {
          DATA_PIPELINE: pipeline,
        },
      });

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.bindings).toBeDefined();
      expect(worker.bindings!.DATA_PIPELINE).toBeDefined();
      expect(worker.url).toBeTruthy();

      if (worker.url) {
        // Create test records
        const testRecords: TestRecord[] = [
          {
            id: "rec-1",
            event: "test-event",
            timestamp: Date.now(),
            data: {
              value: 42,
              tags: ["test", "pipeline"],
            },
          },
          {
            id: "rec-2",
            event: "another-event",
            timestamp: Date.now(),
            data: {
              value: 99,
              tags: ["pipeline", "worker"],
            },
          },
        ];

        // Send records to the pipeline through the worker
        const sendResponse = await fetch(`${worker.url}/send-record`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(testRecords),
        });

        const responseData: any = await sendResponse.json();
        console.log(responseData);

        expect(sendResponse.status).toEqual(200);
        expect(responseData.success).toEqual(true);
        expect(responseData.message).toEqual("Records sent to pipeline");
        expect(responseData.count).toEqual(2);

        // Note: We can't easily verify the records were written to R2 in a test
        // because it might take time for the batching and delivery to complete.
        // In a real application, you'd have monitoring or a way to query the destination.

        console.log("Records sent to pipeline:", responseData);
      }
    } finally {
      // wait 10s for pipeline to flush
      await new Promise((resolve) => setTimeout(resolve, 3 * 1000));
      await destroy(scope);
      // Verify the worker was deleted
      if (worker) {
        await assertWorkerDoesNotExist(workerName);
      }
    }
  }, 120000); // Increase timeout for worker and pipeline operations
});
