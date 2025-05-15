import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { AiGateway } from "../../src/cloudflare/ai-gateway.js";
import { createCloudflareApi } from "../../src/cloudflare/api.js";
import { destroy } from "../../src/destroy.js";
import { BRANCH_PREFIX } from "../util.js";
// must import this or else alchemy.test won't exist
import "../../src/test/bun.js";

// Create API client for verification
const api = await createCloudflareApi();

const test = alchemy.test(import.meta);

describe("AiGateway Resource", () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testId = `${BRANCH_PREFIX}-test-ai-gateway`;

  test("create, update, and delete ai gateway", async (scope) => {
    let gateway: AiGateway | undefined;
    try {
      // Create a test AI Gateway with basic settings
      gateway = await AiGateway(testId, {
        collectLogs: true,
        cacheTtl: 0,
        rateLimitingTechnique: "fixed",
      });

      expect(gateway.id).toEqual(testId);
      expect(gateway.collectLogs).toEqual(true);
      expect(gateway.cacheTtl).toEqual(0);
      expect(gateway.rateLimitingTechnique).toEqual("fixed");

      // Verify gateway was created by querying the API directly
      const getResponse = await api.get(
        `/accounts/${api.accountId}/ai-gateway/gateways/${testId}`,
      );
      expect(getResponse.status).toEqual(200);

      const responseData: any = await getResponse.json();
      expect(responseData.result.id).toEqual(testId);
      expect(responseData.result.collect_logs).toEqual(true);

      // Update the gateway
      gateway = await AiGateway(testId, {
        collectLogs: true,
        cacheTtl: 60,
        rateLimitingTechnique: "sliding",
        rateLimitingInterval: 60,
        rateLimitingLimit: 100,
      });

      expect(gateway.id).toEqual(testId);
      expect(gateway.cacheTtl).toEqual(60);
      expect(gateway.rateLimitingTechnique).toEqual("sliding");
      expect(gateway.rateLimitingInterval).toEqual(60);
      expect(gateway.rateLimitingLimit).toEqual(100);

      // Verify gateway was updated
      const getUpdatedResponse = await api.get(
        `/accounts/${api.accountId}/ai-gateway/gateways/${testId}`,
      );
      const updatedData: any = await getUpdatedResponse.json();
      expect(updatedData.result.id).toEqual(testId);
      expect(updatedData.result.cache_ttl).toEqual(60);
      expect(updatedData.result.rate_limiting_technique).toEqual("sliding");
      expect(updatedData.result.rate_limiting_interval).toEqual(60);
      expect(updatedData.result.rate_limiting_limit).toEqual(100);
    } catch (err) {
      // log the error or else it's silently swallowed by destroy errors
      console.log(err);
      throw err;
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify gateway was deleted
      const getDeletedResponse = await api.get(
        `/accounts/${api.accountId}/ai-gateway/gateways/${testId}`,
      );
      expect(getDeletedResponse.status).toEqual(404);
    }
  });

  test("create ai gateway with authentication and logging", async (scope) => {
    let gateway: AiGateway | undefined;
    try {
      // Create a test AI Gateway with authentication and logging
      gateway = await AiGateway(`${testId}-auth`, {
        collectLogs: true,
        authentication: true,
        logManagement: 10000,
        logManagementStrategy: "DELETE_OLDEST",
      });

      expect(gateway.id).toEqual(`${testId}-auth`);
      expect(gateway.authentication).toEqual(true);
      expect(gateway.logManagement).toEqual(10000);
      expect(gateway.logManagementStrategy).toEqual("DELETE_OLDEST");

      // Verify gateway was created with correct settings
      const getResponse = await api.get(
        `/accounts/${api.accountId}/ai-gateway/gateways/${testId}-auth`,
      );
      expect(getResponse.status).toEqual(200);

      const responseData: any = await getResponse.json();
      expect(responseData.result.authentication).toEqual(true);
      expect(responseData.result.log_management).toEqual(10000);
      expect(responseData.result.log_management_strategy).toEqual(
        "DELETE_OLDEST",
      );
    } finally {
      // Always clean up
      await destroy(scope);

      // Verify gateway was deleted
      const getDeletedResponse = await api.get(
        `/accounts/${api.accountId}/ai-gateway/gateways/${testId}-auth`,
      );
      expect(getDeletedResponse.status).toEqual(404);
    }
  });

  test("create ai gateway with rate limiting", async (scope) => {
    let gateway: AiGateway | undefined;
    try {
      // Create a test AI Gateway with rate limiting
      gateway = await AiGateway(`${testId}-ratelimit`, {
        rateLimitingInterval: 30,
        rateLimitingLimit: 50,
        rateLimitingTechnique: "sliding",
        cacheInvalidateOnUpdate: true,
      });

      expect(gateway.id).toEqual(`${testId}-ratelimit`);
      expect(gateway.rateLimitingInterval).toEqual(30);
      expect(gateway.rateLimitingLimit).toEqual(50);
      expect(gateway.rateLimitingTechnique).toEqual("sliding");
      expect(gateway.cacheInvalidateOnUpdate).toEqual(true);

      // Verify gateway was created with correct rate limiting settings
      const getResponse = await api.get(
        `/accounts/${api.accountId}/ai-gateway/gateways/${testId}-ratelimit`,
      );
      expect(getResponse.status).toEqual(200);

      const responseData: any = await getResponse.json();
      expect(responseData.result.rate_limiting_interval).toEqual(30);
      expect(responseData.result.rate_limiting_limit).toEqual(50);
      expect(responseData.result.rate_limiting_technique).toEqual("sliding");
    } finally {
      // Always clean up
      await destroy(scope);

      // Verify gateway was deleted
      const getDeletedResponse = await api.get(
        `/accounts/${api.accountId}/ai-gateway/gateways/${testId}-ratelimit`,
      );
      expect(getDeletedResponse.status).toEqual(404);
    }
  });
});
