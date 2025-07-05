import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createGitHubClient } from "../../src/github/client.ts";
import { RepositoryWebhook } from "../../src/github/repository-webhook.ts";
import "../../src/test/vitest.ts";
import { BRANCH_PREFIX } from "../util.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

const testOwner = "sam-goodwin";
const testRepo = "test-alchemy-resources";

describe.skipIf(process.env.CI)("RepositoryWebhook Resource", () => {
  const testWebhookId = `${BRANCH_PREFIX}-webhook`;

  test("create, update, and delete webhook", async (scope) => {
    let webhook: RepositoryWebhook | undefined;
    const octokit = await createGitHubClient();

    try {
      // Create a test webhook
      webhook = await RepositoryWebhook(testWebhookId, {
        owner: testOwner,
        repository: testRepo,
        url: "https://example.com/webhook",
        events: ["push"],
        secret: "test-secret",
        contentType: "application/json",
      });

      expect(webhook.webhookId).toBeTruthy();
      expect(webhook.url).toEqual("https://example.com/webhook");
      expect(webhook.events).toEqual(["push"]);
      expect(webhook.contentType).toEqual("application/json");

      // Verify webhook was created by querying the GitHub API directly
      const { data: webhooks } = await octokit.rest.repos.listWebhooks({
        owner: testOwner,
        repo: testRepo,
      });

      const createdWebhook = webhooks.find((w) => w.id === webhook!.webhookId);
      expect(createdWebhook).toBeTruthy();
      expect(createdWebhook!.config.url).toEqual("https://example.com/webhook");

      // Update the webhook
      webhook = await RepositoryWebhook(testWebhookId, {
        owner: testOwner,
        repository: testRepo,
        url: "https://updated.example.com/webhook",
        events: ["push", "pull_request"],
        secret: "updated-secret",
        contentType: "application/x-www-form-urlencoded",
      });

      expect(webhook.webhookId).toEqual(webhook.webhookId);
      expect(webhook.url).toEqual("https://updated.example.com/webhook");
      expect(webhook.events).toEqual(["push", "pull_request"]);
      expect(webhook.contentType).toEqual("application/x-www-form-urlencoded");

      // Verify webhook was updated
      const { data: updatedWebhooks } = await octokit.rest.repos.listWebhooks({
        owner: testOwner,
        repo: testRepo,
      });

      const updatedWebhook = updatedWebhooks.find(
        (w) => w.id === webhook!.webhookId,
      );
      expect(updatedWebhook).toBeTruthy();
      expect(updatedWebhook!.config.url).toEqual(
        "https://updated.example.com/webhook",
      );
      expect(updatedWebhook!.config.content_type).toEqual(
        "application/x-www-form-urlencoded",
      );
    } catch (err) {
      // log the error or else it's silently swallowed by destroy errors
      console.log(err);
      throw err;
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify webhook was deleted
      if (webhook?.webhookId) {
        const { data: finalWebhooks } = await octokit.rest.repos.listWebhooks({
          owner: testOwner,
          repo: testRepo,
        });

        const deletedWebhook = finalWebhooks.find(
          (w) => w.id === webhook!.webhookId,
        );
        expect(deletedWebhook).toBeFalsy();
      }
    }
  });

  test("create webhook with minimal configuration", async (scope) => {
    let webhook: RepositoryWebhook | undefined;

    try {
      // Create a webhook with minimal configuration
      webhook = await RepositoryWebhook(`${testWebhookId}-minimal`, {
        owner: testOwner,
        repository: testRepo,
        url: "https://minimal.example.com/webhook",
      });

      expect(webhook.webhookId).toBeTruthy();
      expect(webhook.url).toEqual("https://minimal.example.com/webhook");
      expect(webhook.events).toEqual(["push"]); // Default events
      expect(webhook.contentType).toEqual("application/json"); // Default content type
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);
    }
  });

  test("create webhook for all events", async (scope) => {
    let webhook: RepositoryWebhook | undefined;

    try {
      // Create a webhook that listens to all events
      webhook = await RepositoryWebhook(`${testWebhookId}-all-events`, {
        owner: testOwner,
        repository: testRepo,
        url: "https://all-events.example.com/webhook",
        events: ["*"],
        insecureSsl: true,
        active: false,
      });

      expect(webhook.webhookId).toBeTruthy();
      expect(webhook.url).toEqual("https://all-events.example.com/webhook");
      expect(webhook.events).toEqual(["*"]);
      expect(webhook.insecureSsl).toBeTruthy();
      expect(webhook.active).toBeFalsy();
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);
    }
  });
});
