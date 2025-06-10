---
title: JobTemplate
description: Learn how to create, update, and manage AWS IoT JobTemplates using Alchemy Cloud Control.
---


The JobTemplate resource lets you manage [AWS IoT JobTemplates](https://docs.aws.amazon.com/iot/latest/userguide/) for defining job executions for IoT devices. JobTemplates provide a way to specify the actions that devices should take and manage their execution effectively.

## Minimal Example

Create a basic JobTemplate with required properties and some optional configurations.

```ts
import AWS from "alchemy/aws/control";

const basicJobTemplate = await AWS.IoT.JobTemplate("basicJobTemplate", {
  Description: "Basic job template for device updates",
  JobTemplateId: "device-update-template",
  TimeoutConfig: {
    InProgressTimeoutInMinutes: 60
  },
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a JobTemplate with advanced settings such as document source, retry configurations, and abort configurations.

```ts
const advancedJobTemplate = await AWS.IoT.JobTemplate("advancedJobTemplate", {
  Description: "Advanced job template for device maintenance",
  JobTemplateId: "maintenance-job-template",
  Document: JSON.stringify({
    operation: "updateFirmware",
    version: "1.2.3"
  }),
  DocumentSource: "https://my-bucket.s3.amazonaws.com/job-documents/updateFirmware.json",
  JobExecutionsRetryConfig: {
    RetryAttempts: 3
  },
  AbortConfig: {
    CriteriaList: [
      {
        FailureType: "FAILED",
        Action: "ABORT"
      }
    ]
  },
  MaintenanceWindows: [
    {
      StartTime: "2023-10-01T00:00:00Z",
      EndTime: "2023-10-01T02:00:00Z"
    }
  ]
});
```

## Using Presigned URL Configuration

Demonstrate how to include a presigned URL configuration for document access.

```ts
const presignedUrlJobTemplate = await AWS.IoT.JobTemplate("presignedUrlJobTemplate", {
  Description: "Job template with presigned URL for document access",
  JobTemplateId: "presigned-url-job-template",
  DocumentSource: "https://my-bucket.s3.amazonaws.com/job-documents/updateFirmware.json",
  PresignedUrlConfig: {
    ExpiresInSec: 3600,
    RoleArn: "arn:aws:iam::123456789012:role/service-role/IoTJobRole"
  }
});
```

## Retry Configuration with Rollout

Create a JobTemplate that includes job execution rollout configurations along with retry settings.

```ts
const rolloutJobTemplate = await AWS.IoT.JobTemplate("rolloutJobTemplate", {
  Description: "Job template with rollout configuration",
  JobTemplateId: "rollout-job-template",
  JobExecutionsRolloutConfig: {
    MaximumPerMinute: 10,
    MinimumPerMinute: 1
  },
  JobExecutionsRetryConfig: {
    RetryAttempts: 5
  }
});
```
