---
title: OptionGroup
description: Learn how to create, update, and manage AWS RDS OptionGroups using Alchemy Cloud Control.
---


The OptionGroup resource lets you manage [AWS RDS OptionGroups](https://docs.aws.amazon.com/rds/latest/userguide/) which are used to enable additional features for your Amazon RDS DB instances. An OptionGroup allows you to configure optional features for your database engine, such as Oracle's TDE or SQL Server's Transparent Data Encryption.

## Minimal Example

Create a basic OptionGroup with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const optionGroup = await AWS.RDS.OptionGroup("basicOptionGroup", {
  OptionGroupDescription: "Basic Option Group for RDS",
  MajorEngineVersion: "12.4",
  EngineName: "oracle-ee",
  OptionConfigurations: [
    {
      OptionName: "Oracle TDE",
      OptionSettings: [
        {
          Name: "Encryption",
          Value: "Enabled"
        }
      ]
    }
  ],
  Tags: [
    {
      Key: "Project",
      Value: "DatabaseMigration"
    }
  ]
});
```

## Advanced Configuration

Configure an OptionGroup with multiple option configurations and additional settings.

```ts
const advancedOptionGroup = await AWS.RDS.OptionGroup("advancedOptionGroup", {
  OptionGroupDescription: "Advanced Option Group with multiple options",
  MajorEngineVersion: "12.4",
  EngineName: "oracle-ee",
  OptionConfigurations: [
    {
      OptionName: "Oracle TDE",
      OptionSettings: [
        {
          Name: "Encryption",
          Value: "Enabled"
        }
      ]
    },
    {
      OptionName: "Oracle Advanced Security",
      OptionSettings: [
        {
          Name: "Encryption",
          Value: "Enabled"
        },
        {
          Name: "Data Redaction",
          Value: "Enabled"
        }
      ]
    }
  ]
});
```

## Using Tags for Resource Management

Utilize tags to help manage and organize your OptionGroups effectively.

```ts
const taggedOptionGroup = await AWS.RDS.OptionGroup("taggedOptionGroup", {
  OptionGroupDescription: "Option Group with resource tags",
  MajorEngineVersion: "12.4",
  EngineName: "mysql",
  OptionConfigurations: [
    {
      OptionName: "MYSQL_AUDIT_PLUGIN",
      OptionSettings: [
        {
          Name: "AuditLog",
          Value: "Enabled"
        }
      ]
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Owner",
      Value: "DatabaseTeam"
    }
  ]
});
```

## Adoption of Existing Resources

Create an OptionGroup that adopts an existing resource if it already exists.

```ts
const adoptExistingOptionGroup = await AWS.RDS.OptionGroup("adoptOptionGroup", {
  OptionGroupDescription: "Adopt existing Option Group if it exists",
  MajorEngineVersion: "12.4",
  EngineName: "postgres",
  adopt: true
});
```
