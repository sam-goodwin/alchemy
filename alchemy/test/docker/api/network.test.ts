import { describe } from "vitest";
import { alchemy } from "../../../src/alchemy.ts";
import { createDockerApi } from "../../../src/docker/api/api.ts";
import { BRANCH_PREFIX } from "../../util.ts";
// must import this or else alchemy.test won't exist
import "../../../src/test/vitest.ts";

const api = createDockerApi();

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Docker Network Resource", () => {
  const testId = `${BRANCH_PREFIX}-test-network`;

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
