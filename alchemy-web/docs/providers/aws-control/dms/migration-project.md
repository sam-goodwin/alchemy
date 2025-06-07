---
title: Managing AWS DMS MigrationProjects with Alchemy
description: Learn how to create, update, and manage AWS DMS MigrationProjects using Alchemy Cloud Control.
---

# MigrationProject

The MigrationProject resource lets you create and manage [AWS DMS MigrationProjects](https://docs.aws.amazon.com/dms/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dms-migrationproject.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const migrationproject = await AWS.DMS.MigrationProject("migrationproject-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A migrationproject resource managed by Alchemy",
});
```

## Advanced Configuration

Create a migrationproject with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMigrationProject = await AWS.DMS.MigrationProject("advanced-migrationproject", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A migrationproject resource managed by Alchemy",
});
```

