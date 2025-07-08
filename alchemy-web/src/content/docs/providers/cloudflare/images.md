---
title: Images
description: Learn how to use Cloudflare Images binding with Alchemy for image transformation and manipulation in Workers.
---

The [Cloudflare Images binding](https://developers.cloudflare.com/images/transform-images/bindings/) provides access to Cloudflare Images API for transforming, drawing, and outputting images within Workers.

## Minimal Example

Create a basic Images binding for image processing.

```ts
import { Images } from "alchemy/cloudflare";

const images = Images();
```

## Bind to a Worker

Bind the Images service to a Worker to enable image processing capabilities.

```ts
import { Worker, Images } from "alchemy/cloudflare";

const images = Images();

await Worker("image-processor", {
  name: "image-processor",
  entrypoint: "./src/worker.ts",
  bindings: {
    IMAGES: images,
  },
});
```

## Runtime Usage

In your Worker code, use the Images binding to process images:

```ts
// worker.ts
export default {
  async fetch(request: Request, env: any): Promise<Response> {
    // Get image data from request
    const imageData = await request.arrayBuffer();

    // Transform the image
    const transformedImage = env.IMAGES.input(imageData)
      .transform({
        width: 800,
        height: 600,
        format: "webp",
      })
      .output();

    return new Response(transformedImage, {
      headers: {
        "Content-Type": "image/webp",
      },
    });
  },
};
```

## Requirements

The Images binding requires Cloudflare Images to be enabled for your account.

**Important**: For deployed Workers, image transformations require enabling image transforms for the zone where the Worker is deployed. Without this setting, the original image will be returned instead of the transformed version. You can enable this in your Cloudflare dashboard under **Speed** > **Optimization** > **Image Optimization** or follow the [zone transformation setup guide](https://developers.cloudflare.com/images/get-started/#enable-transformations-on-your-zone).

## Advanced Transformations

The Images binding supports various transformation options:

```ts
// Resize and apply effects
const processedImage = env.IMAGES.input(originalImage)
  .transform({
    width: 400,
    height: 300,
    fit: "cover",
    quality: 85,
    format: "avif",
    blur: 5,
    brightness: 1.2,
  })
  .output();

// Draw overlays and watermarks
const watermarkedImage = env.IMAGES.input(baseImage)
  .draw(watermarkImage, {
    opacity: 0.8,
    top: 10,
    left: 10,
  })
  .transform({ format: "jpeg" })
  .output();
```
