import * as Effect from "effect/Effect";

export const zipCode = Effect.fn(function* (
  content: string | Uint8Array<ArrayBufferLike>,
) {
  // Create a zip buffer in memory
  const zip = new (yield* Effect.promise(() => import("jszip"))).default();
  zip.file("index.mjs", content);

  return yield* Effect.promise(() =>
    zip.generateAsync({
      type: "nodebuffer",
      compression: "DEFLATE",
      platform: "UNIX",
    }),
  );
});
