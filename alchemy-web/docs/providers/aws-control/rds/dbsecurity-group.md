---
title: Managing AWS RDS DBSecurityGroups with Alchemy
description: Learn how to create, update, and manage AWS RDS DBSecurityGroups using Alchemy Cloud Control.
---

# DBSecurityGroup

The DBSecurityGroup resource lets you create and manage [AWS RDS DBSecurityGroups](https://docs.aws.amazon.com/rds/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-security-group.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const dbsecuritygroup = await AWS.RDS.DBSecurityGroup("dbsecuritygroup-example", {
  DBSecurityGroupIngress: [],
  GroupDescription: "A dbsecuritygroup resource managed by Alchemy",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a dbsecuritygroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDBSecurityGroup = await AWS.RDS.DBSecurityGroup("advanced-dbsecuritygroup", {
  DBSecurityGroupIngress: [],
  GroupDescription: "A dbsecuritygroup resource managed by Alchemy",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

