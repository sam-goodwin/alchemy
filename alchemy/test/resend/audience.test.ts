import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createResendApi } from "../../src/resend/api.ts";
import { ResendAudience } from "../../src/resend/audience.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("ResendAudience", () => {
  test.skipIf(!process.env.RESEND_API_KEY)(
    "create, update, and delete resend audience",
    async (scope) => {
      const api = createResendApi();
      const resourceId = `${BRANCH_PREFIX}-audience`;
      const audienceName = `${resourceId} Test Audience`;
      let audience: ResendAudience | undefined;

      try {
        // Create
        audience = await ResendAudience(resourceId, {
          name: audienceName,
        });

        expect(audience).toMatchObject({
          name: audienceName,
          created_at: expect.any(String),
        });

        expect(audience.id).toBeTruthy();

        // Update
        const updatedName = `${audienceName} Updated`;
        audience = await ResendAudience(resourceId, {
          name: updatedName,
        });

        expect(audience).toMatchObject({
          name: updatedName,
          created_at: expect.any(String),
        });

        expect(audience.id).toBeTruthy();
      } finally {
        await destroy(scope);
        await assertAudienceDoesNotExist(api, audience);
      }
    },
  );
});

async function assertAudienceDoesNotExist(
  api: any,
  audience: ResendAudience | undefined,
) {
  if (audience?.id) {
    const response = await api.get(`/audiences/${audience.id}`);
    expect(response.status).toBe(404);
  }
}
