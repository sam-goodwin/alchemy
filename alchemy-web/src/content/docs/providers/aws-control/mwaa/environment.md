---
title: Environment
description: Learn how to create, update, and manage AWS MWAA Environments using Alchemy Cloud Control.
---


The Environment resource allows you to manage [AWS MWAA Environments](https://docs.aws.amazon.com/mwaa/latest/userguide/) for orchestrating workflows using Apache Airflow. This resource provides capabilities to configure Airflow settings, manage plugins, and set up logging.

## Minimal Example

Create a basic MWAA Environment with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const mwaaEnvironment = await AWS.MWAA.Environment("basic-mwaa-env", {
  Name: "basic-mwaa-environment",
  DagS3Path: "s3://my-bucket/dags/",
  PluginsS3Path: "s3://my-bucket/plugins/",
  RequirementsS3Path: "s3://my-bucket/requirements.txt",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/service-role/AmazonMWAA-ExecutionRole",
  AirflowVersion: "2.2.2"
});
```

## Advanced Configuration

Configure an MWAA Environment with advanced settings including logging and network configurations.

```ts
const advancedMwaaEnvironment = await AWS.MWAA.Environment("advanced-mwaa-env", {
  Name: "advanced-mwaa-environment",
  DagS3Path: "s3://my-bucket/dags/",
  PluginsS3Path: "s3://my-bucket/plugins/",
  RequirementsS3Path: "s3://my-bucket/requirements.txt",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/service-role/AmazonMWAA-ExecutionRole",
  AirflowVersion: "2.2.2",
  LoggingConfiguration: {
    DagProcessingLogs: {
      Enabled: true,
      LogLevel: "INFO"
    },
    SchedulerLogs: {
      Enabled: true,
      LogLevel: "INFO"
    },
    WebserverLogs: {
      Enabled: true,
      LogLevel: "INFO"
    }
  },
  NetworkConfiguration: {
    Efs: {
      FileSystemId: "fs-12345678",
      RootDirectory: "/airflow",
      TransitEncryption: "ENABLED"
    },
    Vpc: {
      SecurityGroupIds: ["sg-12345678"],
      SubnetIds: ["subnet-12345678", "subnet-87654321"]
    }
  }
});
```

## Scaling Configuration

Set up an MWAA Environment with specific worker scaling configurations.

```ts
const scalableMwaaEnvironment = await AWS.MWAA.Environment("scalable-mwaa-env", {
  Name: "scalable-mwaa-environment",
  DagS3Path: "s3://my-bucket/dags/",
  PluginsS3Path: "s3://my-bucket/plugins/",
  RequirementsS3Path: "s3://my-bucket/requirements.txt",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/service-role/AmazonMWAA-ExecutionRole",
  AirflowVersion: "2.2.3",
  MaxWorkers: 10,
  MinWorkers: 2,
  WebserverAccessMode: "PUBLIC_ONLY"
});
```

## Custom Startup Script

Create an MWAA Environment that utilizes a custom startup script stored in S3.

```ts
const customStartupMwaaEnvironment = await AWS.MWAA.Environment("custom-startup-mwaa-env", {
  Name: "custom-startup-mwaa-environment",
  DagS3Path: "s3://my-bucket/dags/",
  PluginsS3Path: "s3://my-bucket/plugins/",
  RequirementsS3Path: "s3://my-bucket/requirements.txt",
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/service-role/AmazonMWAA-ExecutionRole",
  StartupScriptS3Path: "s3://my-bucket/scripts/startup.sh"
});
```

This documentation provides you with the essential configurations for managing AWS MWAA Environments using Alchemy, empowering you to streamline your workflow orchestration with ease.
