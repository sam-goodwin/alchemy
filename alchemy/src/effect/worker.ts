import type { Effect } from "effect/Effect";
import type { Allow, Policy } from "./policy.ts";

export type Worker<Decl> = {
  decl: Decl;
  fetch(request: Request): Effect<Response, never, never>;
};

// TODO
type HttpError = never;

export interface WorkerDecl<Self, ID extends string = any> {
  id: ID;
  fetch(
    request: Request,
  ): Effect<Response, HttpError, Policy<Worker.Fetch<Self>>>;
  implement<Err = never, Req = never>(
    fetch: (request: Request) => Effect<Response, Err, Req>,
  ): Effect<Worker<Self>, never, Req>;

  new (_: never): Worker<Self>;
}

export declare function Worker<ID extends string>(
  id: ID,
): <Self>() => WorkerDecl<Self, ID>;

export declare namespace Worker {
  export type Fetch<W> = Allow<W, "Worker::Fetch", { request: Request }>;
}
