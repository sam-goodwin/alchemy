// @ts-nocheck
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { bind } from "../bind.ts";
import { Bucket } from "../bucket.ts";
import { Worker } from "../worker.ts";

// 1. resource declarations
export class Storage extends Bucket("storage")<Storage>() {}
export class Backend extends Worker("backend")<Backend>() {}

// 2. business logic
export const backend = Backend.implement(
  Effect.fn(function* (request) {
    const object = yield* Storage.get(request.url);
    return new Response(object);
  }),
);

// 3. provide layers to construct physical handler
export default backend.pipe(Layer.provide(Storage, storage));

// 4. deploy infrastructure with least privilege policy
await Effect.runPromise(backend.pipe(bind(Bucket.Get(Storage))));

class WorkerA extends Worker("worker-a")<WorkerA>() {}
class WorkerB extends Worker("worker-b")<WorkerB>() {}

const workerA = WorkerA.implement(
  Effect.fn(function* (request) {
    // self-referential
    yield* WorkerA.fetch(request);
    // circular reference
    return yield* WorkerB.fetch(request);
  }),
);

const workerB = WorkerB.implement(
  Effect.fn(function* (request) {
    // circular reference
    return yield* WorkerA.fetch(request);
  }),
);

await Effect.runPromise(workerA.pipe(bind(Worker.Fetch(WorkerB))));
