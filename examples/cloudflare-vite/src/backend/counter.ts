import { DurableObject } from "cloudflare:workers";

export type CounterEnv = {};

// Define the Durable Object class for an atomic counter
export class Counter extends DurableObject {
  private state: DurableObjectState;
  private value = 0;

  constructor(state: DurableObjectState, env: CounterEnv) {
    super(state, env);

    this.state = state;
    // Restore value from storage on initialization
    this.state.blockConcurrencyWhile(async () => {
      const stored = await this.state.storage.get<number>("value");
      this.value = stored || 0;
    });
  }

  // Handle HTTP requests to the Durable Object
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle different operations based on the path
    if (path === "/increment") {
      // Increment the counter
      this.value++;
      await this.state.storage.put("value", this.value);
      return new Response(this.value.toString());
    } else if (path === "/decrement") {
      // Decrement the counter
      this.value--;
      await this.state.storage.put("value", this.value);
      return new Response(this.value.toString());
    } else if (path === "/reset") {
      // Reset the counter
      this.value = 0;
      await this.state.storage.put("value", this.value);
      return new Response(this.value.toString());
    } else {
      // Default: return the current value
      return new Response(this.value.toString());
    }
  }
}
