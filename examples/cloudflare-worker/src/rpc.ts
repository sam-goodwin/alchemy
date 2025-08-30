import { WorkerEntrypoint } from "cloudflare:workers";

export default class MyRPC extends WorkerEntrypoint {
  /**
   * Hello world
   */
  async hello(name: string) {
    return `Hello, ${name}!`;
  }
  async generic<T>(value: T): Promise<T> {
    return value;
  }
  async fetch() {
    return new Response("Hello from Worker B");
  }
}
