import type { PlanetScaleApi } from "./api.ts";

export type PlanetScaleClusterSize =
  | "PS_DEV"
  | "PS_10"
  | "PS_20"
  | "PS_40"
  | "PS_80"
  | "PS_160"
  | "PS_320"
  | "PS_400"
  | "PS_640"
  | "PS_700"
  | "PS_900"
  | "PS_1280"
  | "PS_1400"
  | "PS_1800"
  | "PS_2100"
  | "PS_2560"
  | "PS_2700"
  | "PS_2800"
  | (string & {});

/**
 * Wait for a database to be ready with exponential backoff
 */
export async function waitForDatabaseReady(
  api: PlanetScaleApi,
  organizationId: string,
  databaseName: string,
  branchName?: string,
): Promise<void> {
  const startTime = Date.now();
  let waitMs = 100;
  const branchSuffix = branchName ? `/branches/${branchName}` : "";
  while (true) {
    const response = await api.get(
      `/organizations/${organizationId}/databases/${databaseName}${branchSuffix}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to check database state: ${response.statusText}`);
    }

    const data = await response.json<any>();
    if (data.ready === true) {
      return;
    }

    if (Date.now() - startTime >= 60000) {
      throw new Error(
        `Timeout waiting for database ${databaseName} to be ready`,
      );
    }

    await new Promise((resolve) => setTimeout(resolve, waitMs));
    waitMs = Math.min(waitMs * 2, 1000); // Cap at 1s intervals
  }
}

/**
 * Wait for a keyspace to be ready
 */
export async function waitForKeyspaceReady(
  api: PlanetScaleApi,
  org: string,
  db: string,
  branch: string,
  keyspace: string,
): Promise<void> {
  const start = Date.now();
  let delay = 100;

  while (true) {
    const res = await api.get(
      `/organizations/${org}/databases/${db}/branches/${branch}/keyspaces/${keyspace}/resizes`,
    );
    if (!res.ok) {
      throw new Error(
        `Error fetching keyspace "${keyspace}": ${res.statusText}`,
      );
    }

    const ks = await res.json<{
      data: [
        {
          state: string;
        },
      ];
    }>();
    // once it's fully ready, we can proceed
    if (ks.data.every((item) => item.state !== "resizing")) {
      return;
    }

    if (Date.now() - start > 600_000) {
      throw new Error(`Timeout waiting for keyspace "${keyspace}" to be ready`);
    }

    await new Promise((r) => setTimeout(r, delay));
    delay = Math.min(delay * 2, 1_000);
  }
}

/**
 * Fix cluster size for a branch
 */
export async function fixClusterSize(
  api: PlanetScaleApi,
  organizationId: string,
  databaseName: string,
  branchName: string,
  expectedClusterSize: PlanetScaleClusterSize,
  isDBReady: boolean,
): Promise<void> {
  if (!isDBReady) {
    await waitForDatabaseReady(api, organizationId, databaseName);
  }

  // 1. Ensure branch is production
  let branchRes = await api.get(
    `/organizations/${organizationId}/databases/${databaseName}/branches/${branchName}`,
  );
  if (!branchRes.ok) {
    throw new Error(`Unable to get branch data: ${branchRes.statusText}`);
  }
  let branchData = await branchRes.json<any>();
  if (!branchData.production) {
    if (!branchData.ready) {
      await waitForDatabaseReady(api, organizationId, databaseName, branchName);
    }
    const promoteRes = await api.post(
      `/organizations/${organizationId}/databases/${databaseName}/branches/${branchName}/promote`,
    );
    if (!promoteRes.ok) {
      throw new Error(`Unable to promote branch: ${promoteRes.statusText}`);
    }
  }
  // 2. Load default keyspace
  const ksListRes = await api.get(
    `/organizations/${organizationId}/databases/${databaseName}/branches/${branchName}/keyspaces`,
  );
  if (!ksListRes.ok) {
    throw new Error(`Failed to list keyspaces: ${ksListRes.statusText}`);
  }
  const ksList = (await ksListRes.json<any>()).data as Array<{
    name: string;
    cluster_name: string;
  }>;
  const defaultKsData = ksList.find((x) => x.name === databaseName); // Default keypsace is always the same name as the database
  if (ksList.length === 0 || !defaultKsData) {
    throw new Error(`No default keyspace found for branch ${branchName}`);
  }
  const defaultKs = defaultKsData.name;
  let currentSize = defaultKsData.cluster_name as PlanetScaleClusterSize;

  // 3. Wait until any in-flight resize is done
  await waitForKeyspaceReady(
    api,
    organizationId,
    databaseName,
    branchName,
    defaultKs,
  );

  // 4. If size mismatch, trigger resize and wait again
  // Ideally this would use the undocumented Keyspaces API, but there seems to be a missing oauth scope that we cannot add via the console yet
  if (currentSize !== expectedClusterSize) {
    const resizeRes = await api.patch(
      `/organizations/${organizationId}/databases/${databaseName}/branches/${branchName}/cluster`,
      { cluster_size: expectedClusterSize },
    );
    if (!resizeRes.ok) {
      const text = await resizeRes.text();
      throw new Error(
        `Failed to start resize: ${resizeRes.statusText} ${text}`,
      );
    }

    // Poll until the resize completes
    await waitForKeyspaceReady(
      api,
      organizationId,
      databaseName,
      branchName,
      defaultKs,
    );
  }
}
