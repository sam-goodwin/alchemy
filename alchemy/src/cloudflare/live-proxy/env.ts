import { env as _env } from "../../env.ts";

export interface Env {
  // Durable Object namespace used for coordinating live proxy sessions
  COORDINATOR: DurableObjectNamespace;
  SESSION_SECRET: string;
}

export const env = _env as any as Env;
