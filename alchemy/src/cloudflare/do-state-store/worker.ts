import { DurableObject } from "cloudflare:workers";

// State Store Durable Object implementation
export class AlchemyStateStore extends DurableObject {
  private readonly sql: SqlStorage;
  constructor(state: DurableObjectState, env: any) {
    super(state, env);
    this.sql = state.storage.sql;

    this.sql.exec(
      `CREATE TABLE IF NOT EXISTS state_store (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )`,
    );
  }

  async list() {
    const stmt = this.sql.exec("SELECT key FROM state_store").toArray();
    return new Response(JSON.stringify(stmt), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // TODO: implement others
}

export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);
    const [app, stage, ...path] = url.pathname.split("/").slice(1);
    const doId = env.ALCHEMY_STATE_STORE.idFromName(`${app}-${stage}`);
    const doObject = env.ALCHEMY_STATE_STORE.get(doId);

    return doObject.fetch(request);
  },
};
