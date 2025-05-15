/**
 * A simple Hello World Durable Object
 */
export class HelloWorldDO implements DurableObject {
  constructor(private readonly state: DurableObjectState) {}

  /**
   * Handle HTTP requests to the Durable Object
   */
  async fetch(_request: Request): Promise<Response> {
    // Get the current count from storage or initialize to 0
    let count = (await this.state.storage.get("count")) || 0;

    // Store the updated count
    await this.state.storage.put("count", count);

    // Return a response with the count
    return new Response(
      JSON.stringify({
        message: "Hello World from Durable Object!",
        count: count,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
