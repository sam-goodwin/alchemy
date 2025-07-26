export default defineEventHandler(async (event) => {
  try {
    const pipeline = event.context.cloudflare.env.PIPELINE;
    const body = await readBody(event);
    const data = body.data;

    if (!data) {
      throw new Error("Missing 'data' property in request body");
    }

    // Always send data wrapped in an array
    await pipeline.send([{ value: data }]);

    return { success: true, message: "Data sent to pipeline." };
  } catch (error) {
    console.error("Error sending data to pipeline:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : "Pipeline error",
    });
  }
});
