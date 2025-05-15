import puppeteer from "@cloudflare/puppeteer";

export default {
  async fetch(request: Request, env: any) {
    const { searchParams } = new URL(request.url);
    let url = searchParams.get("url");
    let img;

    if (url) {
      url = new URL(url).toString(); // normalize
      img = await env.BROWSER_KV_DEMO.get(url, { type: "arrayBuffer" });

      if (img === null) {
        const browser = await puppeteer.launch(env.MYBROWSER);
        const page = await browser.newPage();
        await page.goto(url);
        img = await page.screenshot();

        await env.BROWSER_KV_DEMO.put(url, img, {
          expirationTtl: 60 * 60 * 24,
        });

        await browser.close();
      }

      return new Response(img, {
        headers: {
          "content-type": "image/jpeg",
        },
      });
    } else {
      return new Response("Please add an ?url=https://example.com/ parameter");
    }
  },
};
