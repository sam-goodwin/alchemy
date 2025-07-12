import { afterAll, beforeAll, describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { createCloudflareApi } from "../../src/cloudflare/api.ts";
import { DOFSStateStore } from "../../src/cloudflare/dofs-state-store/index.ts";
import {
  DOFSStateStoreClient,
  upsertStateStoreWorker,
} from "../../src/cloudflare/dofs-state-store/internal.ts";
import { getAccountSubdomain } from "../../src/cloudflare/worker-subdomain.ts";
import { deleteWorker } from "../../src/cloudflare/worker.ts";
import { File } from "../../src/fs/file.ts";
import "../../src/test/vitest.ts";
import { BRANCH_PREFIX } from "../util.ts";
import { assertWorkerDoesNotExist } from "./test-helpers.ts";

const workerName = `alchemy-state-${BRANCH_PREFIX}`;

const api = await createCloudflareApi();
const token = await alchemy.secret.env.ALCHEMY_STATE_TOKEN;
const subdomain = await getAccountSubdomain(api);

const test = alchemy.test(import.meta, {
  stateStore: (scope) =>
    new DOFSStateStore(scope, {
      worker: {
        name: workerName,
      },
    }),
});

afterAll(async () => {
  await deleteWorker(api, { scriptName: workerName });
  await assertWorkerDoesNotExist(api, workerName);
});

describe("DOFSStateStore", () => {
  test("should initialize with lazy worker creation", async (scope) => {
    try {
      await File("file", {
        content: "test",
        path: `/tmp/alchemy-state-store-test${BRANCH_PREFIX}`,
      });
    } finally {
      alchemy.destroy(scope);
    }
  });

  describe("Internal", () => {
    const name = `${workerName}-internal`;

    const client = new DOFSStateStoreClient({
      app: "alchemy",
      stage: "internal",
      url: `https://${name}.${subdomain}.workers.dev`,
      token: token.unencrypted,
    });

    beforeAll(async () => {
      await upsertStateStoreWorker(api, name, token.unencrypted, true);
      await client.waitUntilReady();
    });

    afterAll(async () => {
      await deleteWorker(api, { scriptName: name });
      await assertWorkerDoesNotExist(api, name);
    });

    async function expectKeys(prefix: string, keys: string[]) {
      const list = await client.rpc("list", { prefix });
      expect(list).toEqual(keys);
      const count = await client.rpc("count", { prefix });
      expect(count).toEqual(keys.length);
    }

    function createTestState(data: any) {
      return {
        status: "created" as const,
        kind: "test",
        id: "test-id",
        fqn: "test::test-id",
        seq: 1,
        data: {},
        props: undefined,
        output: data,
      };
    }

    test("get, set, list, count, delete", async () => {
      const value1 = createTestState({ value: "test-data1" });
      const value2 = createTestState({ value: "test-data2" });
      await client.rpc("set", { key: "root/prefix1/key1", value: value1 });
      await client.rpc("set", { key: "root/prefix2/key2", value: value2 });

      await expectKeys("root/prefix1", ["key1"]);
      await expect(
        client.rpc("get", { key: "root/prefix1/key1" }),
      ).resolves.toEqual(JSON.stringify(value1));
      await expect(
        client.rpc("get", { key: "root/prefix1/key2" }),
      ).resolves.toBeUndefined();
      await expect(
        client.rpc("all", { prefix: "root/prefix1" }),
      ).resolves.toEqual({ key1: JSON.stringify(value1) });

      await expectKeys("root/prefix2", ["key2"]);
      await expect(
        client.rpc("get", { key: "root/prefix2/key2" }),
      ).resolves.toEqual(JSON.stringify(value2));
      await expect(
        client.rpc("get", { key: "root/prefix2/key1" }),
      ).resolves.toBeUndefined();
      await expect(
        client.rpc("all", { prefix: "root/prefix2" }),
      ).resolves.toEqual({ key2: JSON.stringify(value2) });

      await client.rpc("delete", { key: "root/prefix1/key1" });
      await client.rpc("delete", { key: "root/prefix1" });
      await expect(
        client.rpc("get", { key: "root/prefix1/key1" }),
      ).resolves.toBeUndefined();
      await expect(
        client.rpc("all", { prefix: "root/prefix1" }),
      ).resolves.toEqual({});

      await client.rpc("delete", { key: "root/prefix2/key2" });
      await client.rpc("delete", { key: "root/prefix2" });
      await expect(
        client.rpc("get", { key: "root/prefix2/key2" }),
      ).resolves.toBeUndefined();
      await expect(
        client.rpc("all", { prefix: "root/prefix2" }),
      ).resolves.toEqual({});

      await expectKeys("root/prefix1", []);
      await expectKeys("root/prefix2", []);
    });
  });
});
