import alchemy from "alchemy";
import { Queue, R2Bucket, R2RestStateStore, Worker } from "alchemy/cloudflare";
import { type } from "arktype";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX ?? process.env.USER;

const app = await alchemy("cloudflare-worker", {
  stage: BRANCH_PREFIX,
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
  stateStore:
    process.env.ALCHEMY_STATE_STORE === "cloudflare"
      ? (scope) => new R2RestStateStore(scope)
      : undefined,
  password: process.env.ALCHEMY_PASSWORD,
  dev: process.argv.includes("--dev"),
});

type Message = typeof Message.infer;
const Message = type({
  name: "string",
  email: "string",
});

const ReceiveRequest = type({
  email: "string",
});

const bucket = await R2Bucket("bucket", {
  name: `cloudflare-worker-bootstrap-${BRANCH_PREFIX}`,
  accessKey: await alchemy.secret.env.R2_ACCESS_KEY_ID,
  secretAccessKey: await alchemy.secret.env.R2_SECRET_ACCESS_KEY,
  adopt: true,
  empty: true,
});

const queue = await Queue<Message>("queue", {
  name: `cloudflare-worker-bootstrap-queue-${BRANCH_PREFIX}`,
});

const worker = Worker("queue-consumer", import.meta, {
  name: `cloudflare-worker-bootstrap-${BRANCH_PREFIX}`,
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/send") {
      const body = Message(await request.json());
      if (body instanceof type.errors) {
        return new Response("Invalid request body", { status: 400 });
      }
      await queue.send(body);
    } else if (url.pathname === "/receive") {
      const body = ReceiveRequest(await request.json());
      if (body instanceof type.errors) {
        return new Response("Invalid request body", { status: 400 });
      }
      const name = await bucket.get(`${body.email}.txt`);
      if (!name) {
        return new Response("Not found", { status: 404 });
      }
      return new Response();
    }
    return new Response();
  },
  eventSources: [queue],
  async queue(batch) {
    for (const message of batch.messages) {
      await bucket.put(`${message.body.email}.txt`, message.body.name);
    }
  },
});

export default worker;

await app.finalize();

if (!alchemy.isRuntime) {
  // end-to-end test
  const johnDoe = {
    name: "John Doe",
    email: `john.doe.${Date.now()}@example.com`,
  };

  const response = await worker.fetch("/send", {
    method: "POST",
    body: JSON.stringify(johnDoe),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  while (true) {
    const response = await worker.fetch("/receive", {
      method: "POST",
      body: JSON.stringify({ email: johnDoe.email }),
    });

    if (response.ok) {
      console.log("message traveled end to end");
      break;
    } else if (response.status === 404) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      continue;
    }
    throw new Error("Failed to receive message");
  }

  // exit because bun will hang serving http://localhost:3000
  process.exit(0);
}
