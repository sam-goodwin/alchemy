import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createResendApi } from "../../src/resend/api.ts";
import { ResendAudience } from "../../src/resend/audience.ts";
import { ResendBroadcast } from "../../src/resend/broadcast.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("ResendBroadcast", () => {
  test.skipIf(!process.env.RESEND_API_KEY)(
    "create, update, and delete resend broadcast",
    async (scope) => {
      const api = createResendApi();
      const audienceId = `${BRANCH_PREFIX}-broadcast-audience`;
      const broadcastId = `${BRANCH_PREFIX}-broadcast`;
      const broadcastName = `${broadcastId} Test Broadcast`;
      let audience: ResendAudience | undefined;
      let broadcast: ResendBroadcast | undefined;

      try {
        // First create an audience for the broadcast
        audience = await ResendAudience(audienceId, {
          name: `${audienceId} Test Audience`,
        });

        // Create broadcast using audience resource
        broadcast = await ResendBroadcast(broadcastId, {
          name: broadcastName,
          subject: "Test Subject",
          from: "test@example.com",
          html: "<h1>Test</h1><p>Test content</p>",
          text: "Test\n\nTest content",
          audience: audience,
        });

        expect(broadcast).toMatchObject({
          name: broadcastName,
          subject: "Test Subject",
          from: "test@example.com",
          html: "<h1>Test</h1><p>Test content</p>",
          text: "Test\n\nTest content",
          audience_id: audience.id,
          status: expect.any(String),
          created_at: expect.any(String),
        });

        expect(broadcast.id).toBeTruthy();

        // Update broadcast
        const updatedName = `${broadcastName} Updated`;
        broadcast = await ResendBroadcast(broadcastId, {
          name: updatedName,
          subject: "Updated Subject",
          from: "updated@example.com",
          reply_to: "reply@example.com",
          html: "<h1>Updated</h1><p>Updated content</p>",
          text: "Updated\n\nUpdated content",
          audience: audience.id, // Use string ID this time
        });

        expect(broadcast).toMatchObject({
          name: updatedName,
          subject: "Updated Subject",
          from: "updated@example.com",
          reply_to: "reply@example.com",
          html: "<h1>Updated</h1><p>Updated content</p>",
          text: "Updated\n\nUpdated content",
          audience_id: audience.id,
        });
      } finally {
        await destroy(scope);
        await assertBroadcastDoesNotExist(api, broadcast);
        await assertAudienceDoesNotExist(api, audience);
      }
    },
  );
});

async function assertBroadcastDoesNotExist(
  api: any,
  broadcast: ResendBroadcast | undefined,
) {
  if (broadcast?.id) {
    const response = await api.get(`/broadcasts/${broadcast.id}`);
    expect(response.status).toBe(404);
  }
}

async function assertAudienceDoesNotExist(
  api: any,
  audience: ResendAudience | undefined,
) {
  if (audience?.id) {
    const response = await api.get(`/audiences/${audience.id}`);
    expect(response.status).toBe(404);
  }
}
