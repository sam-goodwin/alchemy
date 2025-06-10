---
title: MonitoringSchedule
description: Learn how to create, update, and manage AWS SageMaker MonitoringSchedules using Alchemy Cloud Control.
---


The MonitoringSchedule resource lets you manage [AWS SageMaker MonitoringSchedules](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for monitoring model performance and data quality over time.

## Minimal Example

Create a basic monitoring schedule with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicMonitoringSchedule = await AWS.SageMaker.MonitoringSchedule("basicMonitoringSchedule", {
  MonitoringScheduleName: "ModelPerformanceMonitoring",
  MonitoringScheduleConfig: {
    // Example configuration for monitoring
    MonitoringJobDefinition: {
      // Define the monitoring job here
      BaselineConfig: {
        BaselineParameters: {
          // Parameters for baseline
        },
        Statistics: {
          // Statistics for monitoring
        }
      },
      // Additional configurations...
    }
  },
  EndpointName: "my-endpoint" // Optional
});
```

## Advanced Configuration

Configure a monitoring schedule with detailed settings and tags for resource management.

```ts
const advancedMonitoringSchedule = await AWS.SageMaker.MonitoringSchedule("advancedMonitoringSchedule", {
  MonitoringScheduleName: "AdvancedModelMonitoring",
  MonitoringScheduleConfig: {
    MonitoringJobDefinition: {
      BaselineConfig: {
        BaselineParameters: {
          // Define baseline parameters
        },
        Statistics: {
          // Define statistics
        }
      },
      // Additional configurations...
    }
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "ModelMonitoring"
    }
  ]
});
```

## Error Handling

Create a monitoring schedule with options to handle failure scenarios.

```ts
const errorHandlingMonitoringSchedule = await AWS.SageMaker.MonitoringSchedule("errorHandlingMonitoringSchedule", {
  MonitoringScheduleName: "ErrorHandlingMonitoring",
  MonitoringScheduleConfig: {
    MonitoringJobDefinition: {
      BaselineConfig: {
        BaselineParameters: {
          // Baseline parameters
        },
        Statistics: {
          // Statistics
        }
      },
      // Additional configurations...
    }
  },
  FailureReason: "Invalid configuration provided" // Optional, to log the failure reason
});
```
