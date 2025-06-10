---
title: ServiceLevelObjective
description: Learn how to create, update, and manage AWS ApplicationSignals ServiceLevelObjectives using Alchemy Cloud Control.
---


The ServiceLevelObjective resource allows you to define and manage [AWS ApplicationSignals ServiceLevelObjectives](https://docs.aws.amazon.com/applicationsignals/latest/userguide/) to measure the performance and reliability of your applications.

## Minimal Example

Create a basic Service Level Objective with required properties and a couple of common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const basicSlo = await AWS.ApplicationSignals.ServiceLevelObjective("basicSlo", {
  name: "UserLoginSLO",
  Sli: {
    type: "requestBased",
    requestBasedSli: {
      successCount: "100",
      totalCount: "120"
    }
  },
  Goal: {
    type: "percentage",
    value: 95
  },
  Description: "Measures the success rate of user login requests"
});
```

## Advanced Configuration

Define a Service Level Objective with burn rate configurations and exclusion windows for better control over your SLO metrics.

```ts
const advancedSlo = await AWS.ApplicationSignals.ServiceLevelObjective("advancedSlo", {
  name: "CheckoutSLO",
  Sli: {
    type: "requestBased",
    requestBasedSli: {
      successCount: "200",
      totalCount: "250"
    }
  },
  Goal: {
    type: "percentage",
    value: 98
  },
  BurnRateConfigurations: [
    {
      threshold: 5,
      duration: "1h"
    },
    {
      threshold: 10,
      duration: "2h"
    }
  ],
  ExclusionWindows: [
    {
      startTime: "2023-10-01T14:00:00Z",
      endTime: "2023-10-01T15:00:00Z"
    }
  ],
  Description: "Measures the success rate of checkout requests with exclusion for maintenance windows."
});
```

## Integrating Request-Based SLI

Create a Service Level Objective based on request metrics, demonstrating how to use request-based SLI configurations.

```ts
const requestBasedSlo = await AWS.ApplicationSignals.ServiceLevelObjective("requestBasedSlo", {
  name: "ApiResponseSLO",
  RequestBasedSli: {
    requestCount: {
      successCount: "300",
      totalCount: "350"
    }
  },
  Goal: {
    type: "percentage",
    value: 90
  },
  Description: "Tracks API response success rates for our critical endpoints."
});
```
