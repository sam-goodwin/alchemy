---
title: ExperimentTemplate
description: Learn how to create, update, and manage AWS FIS ExperimentTemplates using Alchemy Cloud Control.
---


The ExperimentTemplate resource allows you to define and manage AWS Fault Injection Simulator (FIS) ExperimentTemplates, which are used to orchestrate chaos engineering experiments. For more details, refer to the [AWS FIS ExperimentTemplates documentation](https://docs.aws.amazon.com/fis/latest/userguide/).

## Minimal Example

Create a simple ExperimentTemplate with necessary properties and some common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const basicExperimentTemplate = await AWS.FIS.ExperimentTemplate("basic-experiment", {
  Description: "A basic experiment to test service resilience.",
  StopConditions: [
    {
      Source: "aws:cloudwatch:alarm",
      Value: "my-alarm"
    }
  ],
  Targets: {
    myTarget: {
      ResourceType: "aws:ec2:instance",
      SelectionMode: "ALL"
    }
  },
  Actions: {
    myAction: {
      ActionId: "aws:ec2:stop-instances",
      Parameters: {
        "target": "myTarget"
      },
      Duration: "PT30S"
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/MyFISRole",
  Tags: {
    Environment: "test",
    Project: "ChaosEngineering"
  }
});
```

## Advanced Configuration

Configure an ExperimentTemplate with a detailed report configuration and additional options for complex experiments.

```ts
const advancedExperimentTemplate = await AWS.FIS.ExperimentTemplate("advanced-experiment", {
  Description: "An advanced experiment for testing failover mechanisms.",
  StopConditions: [
    {
      Source: "aws:cloudwatch:alarm",
      Value: "failover-alarm"
    }
  ],
  Targets: {
    myTarget: {
      ResourceType: "aws:ec2:instance",
      SelectionMode: "ALL"
    }
  },
  Actions: {
    myAction: {
      ActionId: "aws:ec2:stop-instances",
      Parameters: {
        "target": "myTarget"
      },
      Duration: "PT1M"
    }
  },
  ExperimentReportConfiguration: {
    S3Bucket: "my-experiment-reports",
    S3Prefix: "experiments/"
  },
  ExperimentOptions: {
    Include: ["monitoring"],
    Timeout: "PT10M"
  },
  RoleArn: "arn:aws:iam::123456789012:role/MyFISRole",
  Tags: {
    Environment: "production",
    Project: "ChaosEngineering"
  }
});
```

## Using Log Configuration

Create an ExperimentTemplate that includes logging configurations to capture detailed experiment logs.

```ts
const loggingExperimentTemplate = await AWS.FIS.ExperimentTemplate("logging-experiment", {
  Description: "An experiment with logging enabled for detailed insights.",
  StopConditions: [
    {
      Source: "aws:cloudwatch:alarm",
      Value: "log-alarm"
    }
  ],
  Targets: {
    myTarget: {
      ResourceType: "aws:ec2:instance",
      SelectionMode: "ALL"
    }
  },
  Actions: {
    myAction: {
      ActionId: "aws:ec2:stop-instances",
      Parameters: {
        "target": "myTarget"
      },
      Duration: "PT30S"
    }
  },
  LogConfiguration: {
    LogGroupArn: "arn:aws:logs:us-west-2:123456789012:log-group:my-log-group",
    LogStreamName: "experiment-logs"
  },
  RoleArn: "arn:aws:iam::123456789012:role/MyFISRole",
  Tags: {
    Environment: "staging",
    Project: "ChaosEngineering"
  }
});
``` 

## Adopting Existing Resources

If you want to adopt an existing ExperimentTemplate instead of failing when it already exists, you can set the `adopt` property to `true`.

```ts
const adoptExistingExperimentTemplate = await AWS.FIS.ExperimentTemplate("adopt-experiment", {
  Description: "An experiment template that adopts existing configurations.",
  StopConditions: [
    {
      Source: "aws:cloudwatch:alarm",
      Value: "adopt-alarm"
    }
  ],
  Targets: {
    myTarget: {
      ResourceType: "aws:ec2:instance",
      SelectionMode: "ALL"
    }
  },
  Actions: {
    myAction: {
      ActionId: "aws:ec2:stop-instances",
      Parameters: {
        "target": "myTarget"
      },
      Duration: "PT45S"
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/MyFISRole",
  Tags: {
    Environment: "production",
    Project: "ChaosEngineering"
  },
  adopt: true
});
```
