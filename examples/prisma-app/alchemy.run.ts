import alchemy from "alchemy";
import { Project, Database, Connection, Backup } from "alchemy/prisma";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX ?? "";
const app = await alchemy("prisma-app", {
  stage: BRANCH_PREFIX || undefined,
});

export const project = await Project("project", {
  name: `My Prisma Project${BRANCH_PREFIX ? ` ${BRANCH_PREFIX}` : ""}`,
  description: "A Prisma project created with Alchemy",
  region: "us-east-1",
  private: false,
});

export const database = await Database("database", {
  project: project,
  name: `production${BRANCH_PREFIX ? `-${BRANCH_PREFIX}` : ""}`,
  region: "us-east-1",
  isDefault: true,
});

export const connection = await Connection(
  "connection",
  {
    project: project,
    database: database,
    name: `app-connection${BRANCH_PREFIX ? `-${BRANCH_PREFIX}` : ""}`,
  },
);

export const backups = await Backup("backups", {
  project: project,
  database: database,
});

console.log("Prisma Resources created:");
console.log("\nProject:");
console.log("  ID:", project.id);
console.log("  Name:", project.name);
console.log("  Description:", project.description);
console.log("  Created At:", project.createdAt);
console.log("  Environments:", project.environments.length);

console.log("\nDatabase:");
console.log("  ID:", database.id);
console.log("  Name:", database.name);
console.log("  Region:", database.region);
console.log("  Is Default:", database.isDefault);
console.log("  Created At:", database.createdAt);

console.log("\nConnection:");
console.log("  ID:", connection.id);
console.log("  Name:", connection.name);
console.log("  Created At:", connection.createdAt);
console.log("  Connection String:", "****** (hidden for security)");

console.log("\nBackups:");
console.log("  Available backups:", backups.backups.length);
console.log("  Retention days:", backups.meta.backupRetentionDays);
if (backups.backups.length > 0) {
  console.log("  Latest backup:", backups.backups[0].id);
  console.log("  Backup type:", backups.backups[0].backupType);
  console.log("  Status:", backups.backups[0].status);
}

await app.finalize();
