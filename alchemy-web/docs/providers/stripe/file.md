---
title: Managing Stripe Files with Alchemy
description: Learn how to create and manage Stripe Files for uploads using Alchemy.
---

# File

The File resource lets you create and manage [Stripe Files](https://stripe.com/docs/api/files) for uploading documents and images to Stripe.

## Minimal Example

Upload a dispute evidence file:

```ts
import { File } from "alchemy/stripe";
import fs from "fs";

const disputeEvidence = await File("dispute-evidence", {
  file: fs.readFileSync("./evidence.pdf"),
  purpose: "dispute_evidence"
});
```

## Identity Document

Upload an identity document:

```ts
import { File } from "alchemy/stripe";
import fs from "fs";

const identityDocument = await File("identity-doc", {
  file: fs.readFileSync("./passport.jpg"),
  purpose: "identity_document"
});
```

## Business Logo with File Link

Upload a business logo with file link:

```ts
import { File } from "alchemy/stripe";
import fs from "fs";

const businessLogo = await File("business-logo", {
  file: fs.readFileSync("./logo.png"),
  purpose: "business_logo",
  fileLink: {
    create: true,
    expiresAt: Math.floor(Date.now() / 1000) + 86400,
    metadata: {
      brand: "company_logo"
    }
  }
});
```
