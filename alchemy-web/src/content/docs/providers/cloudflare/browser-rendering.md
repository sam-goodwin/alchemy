---
title: BrowserRendering
description: Learn how to use Cloudflare Browser Rendering with Alchemy for taking screenshots and automating browser tasks at the edge.
---


[Cloudflare Browser Rendering](https://developers.cloudflare.com/browser-rendering/) allows you to run a full browser instance within your Worker to take screenshots, generate PDFs, and automate browser tasks.

## Minimal Example

Create a basic Worker with browser rendering capabilities:

```ts
import { Worker, BrowserRendering } from "alchemy/cloudflare";

const worker = await Worker("browser-worker", {
  name: "browser-worker",
  entrypoint: "./src/browser.ts",
  compatibilityFlags: ["nodejs_compat"],
  bindings: {
    BROWSER: new BrowserRendering()
  }
});
```

## Worker Runtime Usage

Use Puppeteer to control the browser in your Worker:

```ts
// src/browser.ts
import puppeteer from "@cloudflare/puppeteer";

export default {
  async fetch(request: Request, env: any) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return new Response("Please add an ?url=https://example.com/ parameter");
    }

    const browser = await puppeteer.launch(env.BROWSER);
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot();
    await browser.close();

    return new Response(screenshot, {
      headers: {
        "content-type": "image/jpeg",
      },
    });
  },
};
```
