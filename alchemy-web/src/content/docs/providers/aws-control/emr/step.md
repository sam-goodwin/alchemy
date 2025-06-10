---
title: Step
description: Learn how to create, update, and manage AWS EMR Steps using Alchemy Cloud Control.
---


The Step resource lets you manage [AWS EMR Steps](https://docs.aws.amazon.com/emr/latest/userguide/) for executing specific tasks in an EMR cluster.

## Minimal Example

Create a basic EMR Step that runs a Hadoop job with required properties.

```ts
import AWS from "alchemy/aws/control";

const emrStep = await AWS.EMR.Step("basic-emr-step", {
  JobFlowId: "j-3SD91V4KQ1D2", // Replace with your actual JobFlowId
  ActionOnFailure: "CONTINUE",
  HadoopJarStep: {
    Jar: "command-runner.jar",
    Args: ["hadoop-streaming", "-input", "s3://my-bucket/input", "-output", "s3://my-bucket/output"]
  },
  Name: "Basic EMR Step"
});
```

## Advanced Configuration

Configure an EMR Step with a custom action on failure and additional Hadoop arguments.

```ts
const advancedEmrStep = await AWS.EMR.Step("advanced-emr-step", {
  JobFlowId: "j-3SD91V4KQ1D2", // Replace with your actual JobFlowId
  ActionOnFailure: "TERMINATE_CLUSTER",
  HadoopJarStep: {
    Jar: "command-runner.jar",
    Args: [
      "hadoop-streaming",
      "-input", "s3://my-bucket/input",
      "-output", "s3://my-bucket/output",
      "-mapper", "mapper.py",
      "-reducer", "reducer.py"
    ]
  },
  Name: "Advanced EMR Step",
  adopt: true // Allows adoption of existing step
});
```

## Running a Spark Job

Create an EMR Step that runs a Spark job with specific configurations.

```ts
const sparkEmrStep = await AWS.EMR.Step("spark-emr-step", {
  JobFlowId: "j-3SD91V4KQ1D2", // Replace with your actual JobFlowId
  ActionOnFailure: "CONTINUE",
  HadoopJarStep: {
    Jar: "command-runner.jar",
    Args: [
      "spark-submit",
      "--class", "org.example.MySparkApp",
      "s3://my-bucket/my-spark-app.jar"
    ]
  },
  Name: "Spark EMR Step"
});
```

## Running a Hive Job

Configure an EMR Step to run a Hive script.

```ts
const hiveEmrStep = await AWS.EMR.Step("hive-emr-step", {
  JobFlowId: "j-3SD91V4KQ1D2", // Replace with your actual JobFlowId
  ActionOnFailure: "CONTINUE",
  HadoopJarStep: {
    Jar: "command-runner.jar",
    Args: [
      "hive-script",
      "--run-hive-script",
      "--args",
      "-f", "s3://my-bucket/scripts/my-hive-script.hql"
    ]
  },
  Name: "Hive EMR Step"
});
```
