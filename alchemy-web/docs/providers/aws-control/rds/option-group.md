---
title: Managing AWS RDS OptionGroups with Alchemy
description: Learn how to create, update, and manage AWS RDS OptionGroups using Alchemy Cloud Control.
---

# OptionGroup

The OptionGroup resource lets you manage [AWS RDS OptionGroups](https://docs.aws.amazon.com/rds/latest/userguide/) to configure specific options for your RDS database instances.

## Minimal Example

Create a basic OptionGroup with the required properties and a common optional tag.

```ts
import AWS from "alchemy/aws/control";

const BasicOptionGroup = await AWS.RDS.OptionGroup("BasicOptionGroup", {
  OptionGroupDescription: "Basic option group for MySQL database",
  MajorEngineVersion: "8.0",
  EngineName: "mysql",
  OptionConfigurations: [
    {
      OptionName: "MEMCACHED",
      OptionSettings: [
        { Name: "CacheSize", Value: "512" }
      ]
    }
  ],
  Tags: [
    { Key: "Environment", Value: "development" }
  ]
});
```

## Advanced Configuration

Configure an OptionGroup with multiple options and additional settings for a PostgreSQL database.

```ts
const AdvancedOptionGroup = await AWS.RDS.OptionGroup("AdvancedOptionGroup", {
  OptionGroupDescription: "Advanced option group for PostgreSQL database",
  MajorEngineVersion: "13.3",
  EngineName: "postgres",
  OptionConfigurations: [
    {
      OptionName: "pg_prewarm",
      OptionSettings: [
        { Name: "PrewarmTime", Value: "600" }
      ]
    },
    {
      OptionName: "oracle_advanced_security",
      OptionSettings: [
        { Name: "Encryption", Value: "AES256" }
      ]
    }
  ],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Configuring with Multiple Options

Create an OptionGroup that includes multiple configurations for enhanced functionality.

```ts
const MultiOptionGroup = await AWS.RDS.OptionGroup("MultiOptionGroup", {
  OptionGroupDescription: "Option group with multiple configurations for MySQL",
  MajorEngineVersion: "8.0",
  EngineName: "mysql",
  OptionConfigurations: [
    {
      OptionName: "MYSQL_INNODB_CLUSTER",
      OptionSettings: [
        { Name: "ClusterName", Value: "MyCluster" },
        { Name: "InstanceCount", Value: "3" }
      ]
    },
    {
      OptionName: "MEMCACHED",
      OptionSettings: [
        { Name: "CacheSize", Value: "1024" }
      ]
    }
  ]
});
```

## Tagging for Resource Management

This example demonstrates setting up an OptionGroup with descriptive tags for better resource management.

```ts
const TaggedOptionGroup = await AWS.RDS.OptionGroup("TaggedOptionGroup", {
  OptionGroupDescription: "Option group with detailed tagging for better management",
  MajorEngineVersion: "12.4",
  EngineName: "postgres",
  OptionConfigurations: [
    {
      OptionName: "pg_stat_statements",
      OptionSettings: [
        { Name: "Enabled", Value: "true" }
      ]
    }
  ],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Owner", Value: "DevTeam" },
    { Key: "Project", Value: "CRM" }
  ]
});
```