---
title: Managing AWS Glue Jobs with Alchemy
description: Learn how to create, update, and manage AWS Glue Jobs using Alchemy Cloud Control.
---

# Job

The Job resource allows you to manage [AWS Glue Jobs](https://docs.aws.amazon.com/glue/latest/userguide/) for ETL (Extract, Transform, Load) operations in your data workflows.

## Minimal Example

Create a basic Glue Job with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicGlueJob = await AWS.Glue.Job("BasicGlueJob", {
  Role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  Command: {
    Name: "glueetl",
    ScriptLocation: "s3://my-script-bucket/scripts/my_etl_script.py"
  },
  DefaultArguments: {
    "--TempDir": "s3://my-script-bucket/temp/",
    "--job-language": "python"
  },
  MaxRetries: 2
});
```

## Advanced Configuration

Configure a Glue Job with additional properties for fine-tuning its execution.

```ts
const advancedGlueJob = await AWS.Glue.Job("AdvancedGlueJob", {
  Role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  Command: {
    Name: "glueetl",
    ScriptLocation: "s3://my-script-bucket/scripts/my_etl_script.py"
  },
  WorkerType: "G.2X",
  NumberOfWorkers: 10,
  MaxCapacity: 10,
  GlueVersion: "2.0",
  DefaultArguments: {
    "--TempDir": "s3://my-script-bucket/temp/",
    "--job-language": "python",
    "--enable-metrics": "true"
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Analytics" }
  ]
});
```

## Job with Security Configuration

Set up a Glue Job with a security configuration for sensitive data handling.

```ts
const secureGlueJob = await AWS.Glue.Job("SecureGlueJob", {
  Role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  Command: {
    Name: "glueetl",
    ScriptLocation: "s3://my-script-bucket/scripts/my_etl_script.py"
  },
  SecurityConfiguration: "my-security-configuration",
  DefaultArguments: {
    "--TempDir": "s3://my-script-bucket/temp/",
    "--job-language": "python"
  },
  NotificationProperty: {
    NotifyDelayAfter: 10
  }
});
```

## Job with Execution Property

Create a Glue Job with specific execution properties for fine-tuning.

```ts
const executionPropertyGlueJob = await AWS.Glue.Job("ExecutionPropertyGlueJob", {
  Role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  Command: {
    Name: "glueetl",
    ScriptLocation: "s3://my-script-bucket/scripts/my_etl_script.py"
  },
  ExecutionProperty: {
    MaxConcurrentRuns: 5
  },
  DefaultArguments: {
    "--TempDir": "s3://my-script-bucket/temp/",
    "--job-language": "python"
  }
});
```