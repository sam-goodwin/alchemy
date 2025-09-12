---
title: Images Variant
description: Learn how to create and manage Cloudflare Images Variants for consistent image transformations.
---

A [Cloudflare Images Variant](https://developers.cloudflare.com/images/transform-images/create-variants/) defines a set of transformations that can be applied to images for consistent processing across your application.

## Minimal Example

Create a basic thumbnail variant with square cropping.

```ts
import { ImagesVariant } from "alchemy/cloudflare";

const thumbnail = await ImagesVariant("thumbnail", {
  variantId: "thumbnail",
  options: {
    fit: "cover",
    width: 200,
    height: 200,
  },
});
```

## Full Configuration

Create a variant with comprehensive transformation options.

```ts
import { ImagesVariant } from "alchemy/cloudflare";

const highQualityVariant = await ImagesVariant("high-quality", {
  variantId: "high-quality-webp",
  options: {
    fit: "contain",
    width: 1920,
    height: 1080,
    quality: 95,
    format: "webp",
    sharpen: 10,
    brightness: 5,
    contrast: 3,
  },
  neverRequireSignedURLs: true,
});
```

## Transformation Options

The variant supports various image transformation parameters:

### Basic Resizing
- **`fit`**: Resizing mode (`"scale-down"`, `"contain"`, `"cover"`, `"crop"`, `"pad"`)
- **`width`**: Target width in pixels
- **`height`**: Target height in pixels
- **`dpr`**: Device pixel ratio for high-DPI displays

### Output Format
- **`format`**: Output format (`"auto"`, `"avif"`, `"webp"`, `"jpeg"`, `"png"`, `"gif"`)
- **`quality`**: Quality setting (1-100)
- **`metadata`**: Metadata handling (`"keep"`, `"copyright"`, `"none"`)

### Effects and Filters
- **`brightness`**: Brightness adjustment (-100 to 100)
- **`contrast`**: Contrast adjustment (-100 to 100)
- **`gamma`**: Gamma correction (0.1 to 10)
- **`blur`**: Blur radius (0 to 250)
- **`sharpen`**: Sharpen amount (0 to 100)

### Styling
- **`background`**: Background color (hex format)
- **`border`**: Border configuration with width, color, and individual sides
- **`gravity`**: Crop focus point (`"auto"`, `"side"`, or specific coordinates)
- **`rotate`**: Rotation angle (0, 90, 180, 270)
- **`trim`**: Trim pixels from edges

## Advanced Examples

### Product Image Variant

Create a variant optimized for product images with border and effects.

```ts
const productVariant = await ImagesVariant("product", {
  variantId: "product-display",
  options: {
    fit: "pad",
    width: 500,
    height: 500,
    background: "#ffffff",
    border: {
      width: 2,
      color: "#e5e5e5",
    },
    sharpen: 5,
    quality: 90,
    format: "webp",
  },
});
```

### Mobile Optimized Variant

Create a variant for mobile devices with aggressive compression.

```ts
const mobileVariant = await ImagesVariant("mobile", {
  variantId: "mobile-optimized",
  options: {
    fit: "cover",
    width: 400,
    height: 300,
    quality: 75,
    format: "webp",
    dpr: 2, // Support high-DPI mobile screens
  },
});
```

### Stylized Avatar Variant

Create a variant for user avatars with rounded effects.

```ts
const avatarVariant = await ImagesVariant("avatar", {
  variantId: "user-avatar",
  options: {
    fit: "cover",
    width: 128,
    height: 128,
    gravity: "auto", // Auto-detect faces for cropping
    sharpen: 3,
    quality: 85,
  },
});
```

## Adoption Pattern

Adopt existing variants instead of creating new ones.

```ts
const existingVariant = await ImagesVariant("existing", {
  variantId: "legacy-thumbnail",
  adopt: true,
  options: {
    fit: "cover",
    width: 150,
    height: 150,
  },
});
```

## Using Variants

Once created, variants can be used in image URLs:

```
https://imagedelivery.net/<account-hash>/<image-id>/<variant-id>
```

The variant will automatically apply all the configured transformations to any image using that variant ID.

## Requirements

- Cloudflare Images must be enabled for your account
- Variant IDs must be unique within your account
- At least one transformation option must be specified