---
title: EventType
description: Learn how to create, update, and manage AWS FraudDetector EventTypes using Alchemy Cloud Control.
---


The EventType resource allows you to define and manage event types in AWS FraudDetector. This resource is essential for creating rules and detecting fraudulent activities based on various events. For more information, refer to the [AWS FraudDetector EventTypes documentation](https://docs.aws.amazon.com/frauddetector/latest/userguide/).

## Minimal Example

Create a basic EventType with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicEventType = await AWS.FraudDetector.EventType("basicEventType", {
  Name: "UserSignUp",
  Description: "Event type for user sign-up",
  EntityTypes: [
    { Name: "User" }
  ],
  Labels: [
    { Name: "SignUp" }
  ],
  EventVariables: [
    { Name: "UserEmail" },
    { Name: "UserIP" }
  ]
});
```

## Advanced Configuration

Configure an EventType with additional properties, including tags for better organization.

```ts
const advancedEventType = await AWS.FraudDetector.EventType("advancedEventType", {
  Name: "Transaction",
  Description: "Event type for transactions",
  EntityTypes: [
    { Name: "Account" },
    { Name: "Transaction" }
  ],
  Labels: [
    { Name: "Payment" },
    { Name: "Purchase" }
  ],
  EventVariables: [
    { Name: "TransactionAmount" },
    { Name: "PaymentMethod" },
    { Name: "UserLocation" }
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "FraudDetection" }
  ]
});
```

## Custom Event Variables

Define an EventType with specific event variables tailored for a fraud detection scenario.

```ts
const fraudDetectionEventType = await AWS.FraudDetector.EventType("fraudDetectionEventType", {
  Name: "SuspiciousLogin",
  EntityTypes: [
    { Name: "User" }
  ],
  Labels: [
    { Name: "Suspicious" }
  ],
  EventVariables: [
    { Name: "LoginTime" },
    { Name: "UserAgent" },
    { Name: "FailedLoginAttempts" }
  ]
});
```

## Using Tags for Organization

Create an EventType with tags that help categorize your event types for better management.

```ts
const taggedEventType = await AWS.FraudDetector.EventType("taggedEventType", {
  Name: "AccountUpdate",
  EntityTypes: [
    { Name: "User" }
  ],
  Labels: [
    { Name: "AccountChange" }
  ],
  EventVariables: [
    { Name: "UpdateTime" },
    { Name: "UpdatedField" }
  ],
  Tags: [
    { Key: "Project", Value: "UserManagement" },
    { Key: "Priority", Value: "High" }
  ]
});
```
