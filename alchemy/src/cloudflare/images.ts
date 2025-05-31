/**
 * Cloudflare Images binding for image transformation and manipulation.
 * 
 * Provides access to Cloudflare Images API for transforming, drawing, and outputting images
 * within Workers. The binding requires no configuration - just the binding name.
 * 
 * @example
 * // Create an Images binding and bind to a Worker:
 * const images = new Images();
 * 
 * const worker = await Worker("image-processor", {
 *   entrypoint: "./src/worker.ts",
 *   bindings: {
 *     IMAGES: images
 *   }
 * });
 * 
 * @example
 * // In your worker code, access the Images API:
 * export default {
 *   async fetch(request: Request, env: any): Promise<Response> {
 *     const imageData = await request.arrayBuffer();
 *     
 *     const transformedImage = env.IMAGES
 *       .input(imageData)
 *       .transform({ width: 800, height: 600, format: "webp" })
 *       .output();
 *     
 *     return new Response(transformedImage, {
 *       headers: { "Content-Type": "image/webp" }
 *     });
 *   }
 * };
 * 
 * @example
 * // Draw overlays and watermarks:
 * const watermarkedImage = env.IMAGES
 *   .input(baseImage)
 *   .draw(overlayImage, { opacity: 0.8, top: 10, left: 10 })
 *   .transform({ format: "jpeg" })
 *   .output();
 * 
 * @see https://developers.cloudflare.com/images/transform-images/bindings/
 */
export class Images {
  public readonly type = "images";
}
