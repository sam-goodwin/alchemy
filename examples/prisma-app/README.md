# Prisma Example

This example demonstrates how to use Alchemy to create and manage Prisma resources including projects, databases, connections, and backups.

## Prerequisites

Before running this example, you need:

1. A Prisma API key - Set `PRISMA_API_KEY` environment variable
2. Access to Prisma platform services

## Quick Start

1. Install dependencies:
   ```bash
   bun install
   ```

2. Deploy the project:
   ```bash
   bun run deploy
   ```

3. View the created project details in the console output.

4. Clean up resources:
   ```bash
   bun run destroy
   ```

## What This Example Does

- Creates a Prisma project with basic configuration
- Creates a database within the project with regional settings
- Sets up a secure database connection string
- Accesses backup information for the database
- Demonstrates resource relationships (project → database → connection → backups)
- Shows how to access resource properties and metadata
- Properly manages the lifecycle (create, update, delete) of all Prisma resources

## Configuration

The example creates these resources:

### Project
- **Name**: Dynamically generated with branch prefix
- **Description**: A descriptive text about the project
- **Region**: us-east-1 (configurable)
- **Private**: false (public project)

### Database
- **Name**: "production" (with branch prefix)
- **Region**: us-east-1 (same as project)
- **Default**: true (primary database for the project)

### Connection
- **Name**: "app-connection" (with branch prefix)
- **Purpose**: Secure database access for applications

### Backups
- **Access**: Read-only access to backup information
- **Purpose**: Monitor backup status and retention policies

## Environment Variables

- `PRISMA_API_KEY`: Your Prisma API key (required)
- `BRANCH_PREFIX`: Optional prefix for resource names (useful for CI/CD)

## Next Steps

This example can be extended to:
- Create multiple databases for different environments (staging, production)
- Generate additional connection strings for different purposes (read-only, admin)
- Implement backup restoration workflows
- Set up automated monitoring of backup status
- Deploy Prisma schema changes
- Configure environment-specific settings
- Integrate with CI/CD pipelines for database migrations