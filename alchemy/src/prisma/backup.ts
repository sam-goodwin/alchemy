import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { logger } from "../util/logger.ts";
import { handleApiError } from "./api-error.ts";
import { createPrismaApi, type PrismaApiOptions } from "./api.ts";
import type { Database } from "./database.ts";
import type { Project } from "./project.ts";

/**
 * Properties for accessing Prisma database backups
 */
export interface BackupProps extends PrismaApiOptions {
  /**
   * The project that the database belongs to
   */
  project: string | Project;

  /**
   * The database to access backups for
   */
  database: string | Database;

  /**
   * Optional: Restore a specific backup to a new database
   */
  restore?: {
    /**
     * The backup ID to restore from
     */
    backupId: string;

    /**
     * Name of the new database to restore to
     */
    targetDatabaseName: string;
  };
}

/**
 * A single backup entry
 */
export interface BackupEntry {
  /**
   * Backup ID
   */
  id: string;

  /**
   * Time when the backup was created
   */
  createdAt: string;

  /**
   * Type of backup (full or incremental)
   */
  backupType: "full" | "incremental";

  /**
   * Size of the backup in bytes
   */
  size: number;

  /**
   * Status of the backup
   */
  status: "running" | "completed" | "failed" | "unknown";
}

/**
 * Backup metadata
 */
export interface PrismaBackupMeta {
  /**
   * Number of days backups are retained
   */
  backupRetentionDays: number;
}

/**
 * Output returned after accessing Prisma database backups
 */
export interface Backup extends Resource<"prisma::Backup"> {
  /**
   * The ID of the project
   */
  projectId: string;

  /**
   * The ID of the database these backups belong to
   */
  databaseId: string;

  /**
   * List of available backups
   */
  backups: BackupEntry[];

  /**
   * Backup metadata
   */
  meta: PrismaBackupMeta;

  /**
   * If a restore was requested, the restored database details
   */
  restoredDatabase?: {
    id: string;
    name: string;
    region: string | null;
    isDefault: boolean;
    status: string;
    createdAt: string;
  };
}

/**
 * Accesses Prisma database backups and provides restore functionality.
 * This is a read-only resource that lists available backups and can restore them.
 *
 * @example
 * ## List database backups
 *
 * ```ts
 * const backups = await Backup("db-backups", {
 *   project: project,
 *   database: database
 * });
 *
 * console.log(`Found ${backups.backups.length} backups`);
 * console.log(`Retention: ${backups.meta.backupRetentionDays} days`);
 * ```
 *
 * @example
 * ## Restore a backup to a new database
 *
 * ```ts
 * const backups = await Backup("restore-backup", {
 *   project: project,
 *   database: database,
 *   restore: {
 *     backupId: "backup-123",
 *     targetDatabaseName: "restored-production"
 *   }
 * });
 *
 * console.log(`Restored to database: ${backups.restoredDatabase?.id}`);
 * ```
 *
 * @example
 * ## Find latest completed backup
 *
 * ```ts
 * const backups = await Backup("latest-backup", {
 *   project: "project-123",
 *   database: "database-456"
 * });
 *
 * const latestBackup = backups.backups
 *   .filter(b => b.status === "completed")
 *   .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
 * ```
 */
export const Backup = Resource(
  "prisma::Backup",
  async function (
    this: Context<Backup>,
    id: string,
    props: BackupProps,
  ): Promise<Backup> {
    const api = createPrismaApi(props);
    const projectId =
      typeof props.project === "string" ? props.project : props.project.id;
    const databaseId =
      typeof props.database === "string" ? props.database : props.database.id;

    if (this.phase === "delete") {
      // Backups are read-only, nothing to delete
      return this.destroy();
    }

    try {
      // Get backups for the database
      const backupData = await getBackups(api, projectId, databaseId, id);

      let restoredDatabase: any;

      // Handle restore if requested
      if (props.restore && this.phase === "create") {
        restoredDatabase = await restoreBackup(
          api,
          projectId,
          databaseId,
          props.restore.backupId,
          props.restore.targetDatabaseName,
          id,
        );
      }

      return this({
        projectId: projectId,
        databaseId: databaseId,
        backups: backupData.data || [],
        meta: backupData.meta || { backupRetentionDays: 0 },
        restoredDatabase: restoredDatabase,
      });
    } catch (error) {
      logger.error(`Error ${this.phase} Prisma backup '${id}':`, error);
      throw error;
    }
  },
);

/**
 * Helper function to get backups for a database
 */
async function getBackups(
  api: any,
  projectId: string,
  databaseId: string,
  resourceId: string,
): Promise<any> {
  const backupResponse = await api.get(
    `/projects/${projectId}/databases/${databaseId}/backups`,
  );

  if (!backupResponse.ok) {
    await handleApiError(backupResponse, "get", "backups", resourceId);
  }

  return await backupResponse.json();
}

/**
 * Helper function to restore a backup to a new database
 */
async function restoreBackup(
  api: any,
  projectId: string,
  databaseId: string,
  backupId: string,
  targetDatabaseName: string,
  resourceId: string,
): Promise<any> {
  const restoreResponse = await api.post(
    `/projects/${projectId}/databases/${databaseId}/backups/${backupId}/recoveries`,
    {
      targetDatabaseName,
    },
  );

  if (!restoreResponse.ok) {
    await handleApiError(restoreResponse, "restore", "backup", resourceId);
  }

  const restoreData = await restoreResponse.json();
  return restoreData.data;
}
