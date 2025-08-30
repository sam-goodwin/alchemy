import type { PlanetScaleClient } from "./api/client.gen.ts";
import type { DatabaseBranch } from "./api/types.gen.ts";

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
 * Ensures that the given cluster size is in the correct format.
 */
export function sanitizeClusterSize(input: {
  size: PlanetScaleClusterSize;
  kind?: "mysql" | "postgresql";
  arch?: "x86" | "arm";
  region?: string;
}): string {
  // NAS-backed Postgres cluster sizes are formatted as `PS_<size>_<provider>_<arch>`,
  // where <provider> is either "AWS" or "GCP", and <arch> is either "ARM" or "X86".
  // Postgres clusters backed by PlanetScale Metal are more complex (e.g. "M6_160_AWS_INTEL_D_METAL_118"),
  // so to avoid messing with those, we just check for AWS or GCP in the size.
  if (input.kind === "postgresql" && !input.size.match(/(AWS|GCP)/)) {
    // Infer the provider from the region.
    // Not all AWS regions start with "aws-", but all GCP regions start with "gcp-".
    const provider = input.region?.startsWith("gcp") ? "GCP" : "AWS";
    const arch = (input.arch ?? "x86").toUpperCase();
    return `${input.size}_${provider}_${arch}`;
  }
  return input.size;
}

/**
 * Polls a branch until it is ready.
 */
export async function waitForBranchReady(
  api: PlanetScaleClient,
  organization: string,
  database: string,
  branch: string,
): Promise<DatabaseBranch> {
  return await poll({
    description: `branch "${branch}" ready`,
    fn: () =>
      api.organizations.databases.branches.get({
        path: { organization, database, name: branch },
      }),
    predicate: (branch) => branch.ready,
  });
}

/**
 * Polls a database until it is ready.
 */
export async function waitForDatabaseReady(
  api: PlanetScaleClient,
  organization: string,
  database: string,
): Promise<void> {
  await poll({
    description: `database "${database}" ready`,
    fn: () =>
      api.organizations.databases.get({
        path: { organization, name: database },
      }),
    predicate: (database) => database.ready,
  });
}

/**
 * Polls a keyspace until it is finished resizing.
 */
export async function waitForKeyspaceReady(
  api: PlanetScaleClient,
  organization: string,
  database: string,
  branch: string,
  keyspace: string,
): Promise<void> {
  await poll({
    description: `keyspace "${keyspace}" ready`,
    fn: () =>
      api.organizations.databases.branches.keyspaces.resizes.list({
        path: { organization, database, branch, name: keyspace },
      }),
    predicate: (response) =>
      response.data.every((item) => item.state !== "resizing"),
    initialDelay: 100,
    maxDelay: 1000,
  });
}

/**
 * Ensure a branch is production and has the correct cluster size.
 * If a branch is not production, it will be promoted to production because
 * cluster sizes can only be configured for production branches.
 */
export async function ensureProductionBranchClusterSize(
  api: PlanetScaleClient,
  organization: string,
  database: string,
  branch: string,
  kind: "mysql" | "postgresql",
  expectedClusterSize: PlanetScaleClusterSize,
): Promise<void> {
  switch (kind) {
    case "mysql": {
      // Vitess databases must be promoted before resizing
      await ensureProductionBranch(api, organization, database, branch);
      await ensureMySQLClusterSize(
        api,
        organization,
        database,
        branch,
        expectedClusterSize,
      );
      break;
    }
    case "postgresql": {
      // Postgres databases must be resized first before promoting, otherwise 500 error
      await ensurePostgresClusterSize(
        api,
        organization,
        database,
        branch,
        expectedClusterSize,
      );
      await ensureProductionBranch(api, organization, database, branch);
      break;
    }
  }
}

/**
 * Checks if a branch is production and promotes it if it is not.
 */
async function ensureProductionBranch(
  api: PlanetScaleClient,
  organization: string,
  database: string,
  name: string,
): Promise<void> {
  const data = await api.organizations.databases.branches.get({
    path: {
      organization,
      database,
      name,
    },
  });
  if (!data.production) {
    if (!data.ready) {
      await waitForBranchReady(api, organization, database, name);
    }
    await api.organizations.databases.branches.promote.post({
      path: { organization, database, name },
    });
  }
}

/**
 * Ensures that a MySQL branch has the correct cluster size.
 */
async function ensureMySQLClusterSize(
  api: PlanetScaleClient,
  organization: string,
  database: string,
  branch: string,
  expectedClusterSize: PlanetScaleClusterSize,
): Promise<void> {
  // 1. Load default keyspace
  const keyspaces = await api.organizations.databases.branches.keyspaces.list({
    path: {
      organization,
      database,
      branch,
    },
  });
  const defaultKeyspace = keyspaces.data.find((x) => x.name === database); // Default keyspace is always the same name as the database
  if (!defaultKeyspace) {
    throw new Error(`No default keyspace found for branch ${branch}`);
  }

  // 2. Wait until any in-flight resize is done
  await waitForKeyspaceReady(
    api,
    organization,
    database,
    branch,
    defaultKeyspace.name,
  );

  // 3. If size mismatch, trigger resize and wait again
  // Ideally this would use the undocumented Keyspaces API, but there seems to be a missing oauth scope that we cannot add via the console yet
  if (defaultKeyspace.cluster_name !== expectedClusterSize) {
    await api.organizations.databases.branches.cluster.patch({
      path: {
        organization,
        database,
        name: branch,
      },
      body: { cluster_size: expectedClusterSize },
    });

    // Poll until the resize completes
    await waitForKeyspaceReady(
      api,
      organization,
      database,
      branch,
      defaultKeyspace.name,
    );
  }
}

/**
 * Ensures that a Postgres branch has the correct cluster size.
 */
async function ensurePostgresClusterSize(
  api: PlanetScaleClient,
  organization: string,
  database: string,
  branch: string,
  expectedClusterSize: PlanetScaleClusterSize,
): Promise<void> {
  const data = await api.organizations.databases.branches.get({
    path: {
      organization,
      database,
      name: branch,
    },
  });
  if (data.cluster_name === expectedClusterSize) {
    return;
  }
  await waitForPendingPostgresChanges(api, organization, database, branch);
  const change = await api.organizations.databases.branches.changes.patch({
    path: {
      organization,
      database,
      branch,
    },
    body: {
      cluster_size: expectedClusterSize,
    },
  });
  await waitForPendingPostgresChanges(
    api,
    organization,
    database,
    branch,
    change.id,
  );
}

/**
 * Polls for a pending Postgres change to be completed.
 */
async function waitForPendingPostgresChanges(
  api: PlanetScaleClient,
  organization: string,
  database: string,
  branch: string,
  changeId?: string,
) {
  await poll({
    description: `changes for branch "${branch}"`,
    fn: () =>
      api.organizations.databases.branches.changes.list({
        path: { organization, database, branch },
      }),
    predicate: (response) =>
      response.data.every(
        (change) =>
          change.state === "completed" ||
          change.state === "canceled" ||
          (changeId && change.id === changeId),
      ),
  });
}

/**
 * Polls a function until it returns a result that satisfies the predicate.
 */
async function poll<T>(input: {
  /**
   * A description of the operation being polled.
   */
  description: string;

  /**
   * The function to poll.
   */
  fn: () => Promise<T>;

  /**
   * A predicate that determines if the operation has completed.
   */
  predicate: (result: T) => boolean;

  /**
   * The initial delay between polls.
   * @default 250ms
   */
  initialDelay?: number;

  /**
   * The maximum delay between polls.
   * @default 2_500ms (2.5 seconds)
   */
  maxDelay?: number;

  /**
   * The timeout for the poll in milliseconds.
   * @default 1_000_000 (~16 minutes)
   */
  timeout?: number;
}): Promise<T> {
  const start = Date.now();
  let delay = input.initialDelay ?? 250;
  while (true) {
    const result = await input.fn();
    if (input.predicate(result)) {
      return result;
    }
    if (Date.now() - start >= (input.timeout ?? 1_000_000)) {
      throw new Error(
        `Timed out waiting for ${input.description} after ${Math.round(
          (input.timeout ?? 1_000_000) / 1000,
        )}s`,
      );
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
    delay = Math.min(delay * 2, input.maxDelay ?? 5_000);
  }
}
