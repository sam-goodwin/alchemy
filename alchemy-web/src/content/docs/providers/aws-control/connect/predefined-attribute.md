---
title: PredefinedAttribute
description: Learn how to create, update, and manage AWS Connect PredefinedAttributes using Alchemy Cloud Control.
---


The PredefinedAttribute resource allows you to manage [AWS Connect PredefinedAttributes](https://docs.aws.amazon.com/connect/latest/userguide/) for your contact center settings.

## Minimal Example

Create a basic PredefinedAttribute with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const predefinedAttribute = await AWS.Connect.PredefinedAttribute("basicPredefinedAttribute", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-abcd-1234-abcd-1234abcd5678",
  Values: {
    // Example values configuration
    "attribute1": "value1",
    "attribute2": "value2"
  },
  Name: "CustomerFeedback",
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a PredefinedAttribute with additional settings for custom values.

```ts
const advancedPredefinedAttribute = await AWS.Connect.PredefinedAttribute("advancedPredefinedAttribute", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-abcd-1234-abcd-1234abcd5678",
  Values: {
    "satisfactionRating": "5",
    "responseTime": "quick"
  },
  Name: "CustomerSatisfaction",
  adopt: false // Do not adopt if it exists
});
```

## Custom Use Case: Feedback Collection

Create a PredefinedAttribute specifically for collecting customer feedback during calls.

```ts
const feedbackPredefinedAttribute = await AWS.Connect.PredefinedAttribute("feedbackPredefinedAttribute", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-abcd-1234-abcd-1234abcd5678",
  Values: {
    "feedbackType": "positive",
    "feedbackComments": "Great service!"
  },
  Name: "CallFeedback"
});
```

## Custom Use Case: Call Metrics

This example demonstrates creating a PredefinedAttribute to capture call metrics.

```ts
const callMetricsPredefinedAttribute = await AWS.Connect.PredefinedAttribute("callMetricsPredefinedAttribute", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-abcd-1234-abcd-1234abcd5678",
  Values: {
    "callDuration": "300", // Duration in seconds
    "waitTime": "60" // Wait time in seconds
  },
  Name: "CallMetrics",
  adopt: true // Adopt existing resource if it already exists
});
```
