---
title: Job
description: Learn how to create, update, and manage AWS Glue Jobs using Alchemy Cloud Control.
---


The Job resource lets you manage [AWS Glue Jobs](https://docs.aws.amazon.com/glue/latest/userguide/) for data processing and ETL (Extract, Transform, Load) operations.

## Minimal Example

Create a basic AWS Glue Job with required properties and a couple of common optional properties:

```ts
import AWS from "alchemy/aws/control";

const glueJob = await AWS.Glue.Job("basic-glue-job", {
  role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  command: {
    name: "glueetl",
    scriptLocation: "s3://my-bucket/scripts/my-glue-script.py",
    pythonVersion: "3"
  },
  description: "A simple Glue job for ETL process",
  maxRetries: 2
});
```

## Advanced Configuration

Configure a Glue Job with advanced settings such as job mode and custom default arguments:

```ts
const advancedGlueJob = await AWS.Glue.Job("advanced-glue-job", {
  role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  command: {
    name: "glueetl",
    scriptLocation: "s3://my-bucket/scripts/my-advanced-glue-script.py",
    pythonVersion: "3"
  },
  jobMode: "GOVERNED",
  defaultArguments: {
    "--job-bookmark-option": "job-bookmark-enable",
    "--enable-s3-parquet-optimization": "true"
  },
  allocatedCapacity: 10,
  timeout: 60
});
```

## Job Queuing and Notifications

Create a Glue Job that enables job queuing and sets up notifications:

```ts
const queuedGlueJob = await AWS.Glue.Job("queued-glue-job", {
  role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  command: {
    name: "glueetl",
    scriptLocation: "s3://my-bucket/scripts/my-queued-glue-script.py",
    pythonVersion: "3"
  },
  jobRunQueuingEnabled: true,
  notificationProperty: {
    notifyDelayAfter: 5
  }
});
```

## Custom Security Configuration

Define a Glue Job with a custom security configuration for encrypted data processing:

```ts
const secureGlueJob = await AWS.Glue.Job("secure-glue-job", {
  role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  command: {
    name: "glueetl",
    scriptLocation: "s3://my-bucket/scripts/my-secure-glue-script.py",
    pythonVersion: "3"
  },
  securityConfiguration: "my-secure-configuration",
  description: "Glue job with custom security settings"
});
```
