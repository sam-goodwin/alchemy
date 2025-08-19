import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { BRANCH_PREFIX } from "../util.ts";
// must import this or else alchemy.test won't exist
import "../../src/test/vitest.ts";
import { sortNetmasks } from "../../src/util/netmask.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("netmask", () => {
  const testId = `${BRANCH_PREFIX}-test-network`;

  describe("sorting", () => {
    test("should sort by prefix length", async () => {
      const netmasks = ["192.168.1.0/25", "192.168.1.0/26", "192.168.1.0/24"];

      const sorted = sortNetmasks(netmasks);
      expect(sorted).toEqual([
        "192.168.1.0/24",
        "192.168.1.0/25",
        "192.168.1.0/26",
      ]);
    });
  });
  // TODO: Create network
  // TODO: Update network
  // TODO: Destroy network
  // TODO: Network only with IPv4 Enabled
  // TODO: Network only with IPv6 Enabled
  // TODO: Network with IPv4 and IPv6 Enabled
  // TODO: Network with IPv4 and IPv6 Disabled
  // TODO: Containers are reconnected after update
  // TODO: Containers are preserved after network is destroyed
  // TODO: Containers are reconnected if network update failed
  // TODO: Containers IP addresses are preserved if network updates with no IP invalidating changes
  // TODO: Cotnainers IP addresses are dropped if network updates with IP invalidating changes
  // TODO: Containers IP addresses are kept if still valid after update
});
