import { afterAll, describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { createCloudflareApi } from "../../src/cloudflare/api.js";
import { DnsRecords } from "../../src/cloudflare/dns-records.js";
import { Zone } from "../../src/cloudflare/zone.js";
import { destroy } from "../../src/destroy.js";
import { BRANCH_PREFIX } from "../util.js";

import type { Scope } from "../../src/scope.js";
import "../../src/test/bun.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

const testDomain = `${BRANCH_PREFIX}-test-2.com`;

let zone: Zone;

let scope: Scope | undefined;
test.beforeAll(async (_scope) => {
  zone = await Zone(`${BRANCH_PREFIX}-zone`, {
    name: testDomain,
  });
  scope = _scope;
});

afterAll(async () => {
  if (scope) {
    await destroy(scope);
  }
});

describe("DnsRecords Resource", async () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const api = await createCloudflareApi();

  test("create, update, and delete DNS records", async (scope) => {
    let dnsRecords;
    try {
      // Create test DNS records
      dnsRecords = await DnsRecords(`${testDomain}-dns`, {
        zoneId: zone.id,
        records: [
          {
            name: `www.${testDomain}`,
            type: "A",
            content: "192.0.2.1",
            proxied: true,
            comment: "Web server",
          },
          {
            name: `api.${testDomain}`,
            type: "A",
            content: "192.0.2.2",
            proxied: true,
            comment: "API server",
          },
          {
            name: `mail.${testDomain}`,
            type: "MX",
            content: "mail.example.com",
            priority: 10,
            proxied: false,
            comment: "Mail server",
          },
        ],
      });

      expect(dnsRecords.records).toHaveLength(3);

      // Verify records were created by querying the API directly
      for (const record of dnsRecords.records) {
        const response = await api.get(
          `/zones/${dnsRecords.zoneId}/dns_records/${record.id}`,
        );
        expect(response.ok).toBe(true);

        const data: any = await response.json();
        expect(data.result.name).toBe(record.name);
        expect(data.result.type).toBe(record.type);
        expect(data.result.content).toBe(record.content);
        expect(data.result.proxied).toBe(record.proxied);
        expect(data.result.comment).toBe(record.comment);
        if (record.priority) {
          expect(data.result.priority).toBe(record.priority);
        }
      }

      // Update records - modify one record, add one record, remove one record
      dnsRecords = await DnsRecords(`${testDomain}-dns`, {
        zoneId: zone.id,
        records: [
          // Modify existing record
          {
            name: `www.${testDomain}`,
            type: "A",
            content: "192.0.2.3", // Changed IP
            proxied: true,
            comment: "Updated web server",
          },
          // Keep existing record unchanged
          {
            name: `api.${testDomain}`,
            type: "A",
            content: "192.0.2.2",
            proxied: true,
            comment: "API server",
          },
          // Add new record
          {
            name: `cdn.${testDomain}`,
            type: "CNAME",
            content: "cdn.cloudflare.com.",
            proxied: true,
            comment: "CDN endpoint",
          },
          // Removed mail.example.com record
        ],
      });

      expect(dnsRecords.records).toHaveLength(3);

      // Verify updated records
      const updatedWww = dnsRecords.records.find(
        (r) => r.name === `www.${testDomain}`,
      );
      expect(updatedWww?.content).toBe("192.0.2.3");
      expect(updatedWww?.comment).toBe("Updated web server");

      // Verify new record
      const newCdn = dnsRecords.records.find(
        (r) => r.name === `cdn.${testDomain}`,
      );
      expect(newCdn?.type).toBe("CNAME");
      expect(newCdn?.content).toBe("cdn.cloudflare.com");

      // Verify deleted record is gone
      const mailRecord = dnsRecords.records.find(
        (r) => r.name === `mail.${testDomain}`,
      );
      expect(mailRecord).toBeUndefined();

      // Verify directly with API
      const listResponse = await api.get(
        `/zones/${dnsRecords.zoneId}/dns_records`,
      );
      expect(listResponse.ok).toBe(true);

      const listData: any = await listResponse.json();
      const apiRecords = listData.result;

      // Should find our 3 records
      const testRecords = apiRecords.filter((r: any) =>
        r.name.includes(testDomain),
      );
      expect(testRecords).toHaveLength(3);
    } catch (err) {
      console.error("Test failed:", err);
      throw err;
    } finally {
      // Clean up all resources
      await destroy(scope);
      // Verify records were deleted
      if (dnsRecords?.records) {
        for (const record of dnsRecords.records) {
          const response = await api.get(
            `/zones/${dnsRecords.zoneId}/dns_records/${record.id}`,
          );
          expect(response.status).toBe(404);
        }
      }
    }
  });

  test("handles empty records array", async (scope) => {
    try {
      const dnsRecords = await DnsRecords(`${testDomain}-empty-dns`, {
        zoneId: zone.id,
        records: [],
      });

      expect(dnsRecords.records).toHaveLength(0);
    } finally {
      await destroy(scope);
    }
  });

  test("handles duplicate records gracefully", async (scope) => {
    try {
      const dnsRecords = await DnsRecords(`${testDomain}-duplicate-dns`, {
        zoneId: zone.id,
        records: [
          {
            name: `www.${testDomain}`,
            type: "A",
            content: "192.0.2.1",
          },
          // Duplicate record with same name and type but different content
          {
            name: `www.${testDomain}`,
            type: "A",
            content: "192.0.2.2",
          },
        ],
      });

      // Should only create one record (the last one)
      expect(dnsRecords.records).toHaveLength(1);
      expect(dnsRecords.records[0].content).toBe("192.0.2.2");
    } finally {
      await destroy(scope);
    }
  });
});
