import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { Astro } from "../../src/cloudflare/astro.ts";
import { destroy } from "../../src/destroy.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Astro Resource", () => {
  test("create astro resource with default settings", async (scope) => {
    const resourceId = `${BRANCH_PREFIX}-astro-test`;
    let astroApp: Awaited<ReturnType<typeof Astro>>;

    try {
      // Create Astro resource with default settings
      astroApp = await Astro(resourceId, {
        // Use a simple script for testing instead of building a real Astro app
        script: `
          export default {
            fetch(request, env, ctx) {
              return new Response('Hello from Astro!', { status: 200 });
            }
          };
        `,
        // Override main to use script instead of building
        main: undefined,
        // Disable building for test
        command: undefined,
        adopt: true,
      });

      expect(astroApp).toMatchObject({
        id: resourceId,
        type: "cloudflare::worker",
      });

      // Verify it has the expected URL structure
      expect(astroApp.url).toMatch(/https:\/\/.*\..*\.workers\.dev/);
    } finally {
      await destroy(scope);
    }
  });
});
