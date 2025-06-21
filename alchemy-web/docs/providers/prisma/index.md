# Prisma

Prisma is a next-generation ORM and database platform that provides type-safe database access, automated migrations, and powerful development tools for modern applications.

[Official Website](https://prisma.io) | [Documentation](https://docs.prisma.io) | [Platform](https://cloud.prisma.io)

## Resources

- [Project](./project.md) - Create and manage Prisma projects for database development
- [Database](./database.md) - Create and manage databases within Prisma projects
- [Connection](./connection.md) - Create secure database connection strings
- [Backup](./backup.md) - Access database backups and restore functionality

## Example Usage

```ts
import { Project, Database, Connection } from "alchemy/prisma";

// Create a Prisma project
const project = await Project("my-project", {
  name: "My Application",
  region: "us-east-1",
});

// Create a database in the project
const database = await Database("main-db", {
  project: project,
  name: "production",
  isDefault: true,
});

// Create a connection string for the database
const connection = await Connection("app-connection", {
  project: project,
  database: database,
  name: "web-app",
});

console.log("Project ID:", project.id);
console.log("Database ID:", database.id);
console.log("Connection String:", await connection.connectionString.unencrypted);
```