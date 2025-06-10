---
title: Queue
description: Learn how to create, update, and manage AWS Connect Queues using Alchemy Cloud Control.
---


The Queue resource lets you manage [AWS Connect Queues](https://docs.aws.amazon.com/connect/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic AWS Connect Queue with required properties and common optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicQueue = await AWS.Connect.Queue("basicQueue", {
  Name: "CustomerSupportQueue",
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcdefgh-ijkl-mnop-qrst-uvwxyz012345",
  HoursOfOperationArn: "arn:aws:connect:us-west-2:123456789012:hours-of-operation/abcdefgh-ijkl-mnop-qrst-uvwxyzabcdef",
  Status: "ACTIVE",
  Description: "Queue for handling customer support requests"
});
```

## Advanced Configuration

Configure an AWS Connect Queue with advanced settings, including outbound email configuration and tags.

```ts
const advancedQueue = await AWS.Connect.Queue("advancedQueue", {
  Name: "SalesQueue",
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcdefgh-ijkl-mnop-qrst-uvwxyz012345",
  HoursOfOperationArn: "arn:aws:connect:us-west-2:123456789012:hours-of-operation/abcdefgh-ijkl-mnop-qrst-uvwxyzabcdef",
  OutboundEmailConfig: {
    EmailAddress: "support@company.com",
    FromEmailAddress: "no-reply@company.com"
  },
  Tags: [
    { Key: "Department", Value: "Sales" },
    { Key: "Priority", Value: "High" }
  ],
  MaxContacts: 10,
  Status: "ACTIVE"
});
```

## Queue with Outbound Caller Configuration

Set up an AWS Connect Queue with an outbound caller configuration for more personalized customer interactions.

```ts
const callerConfigQueue = await AWS.Connect.Queue("callerConfigQueue", {
  Name: "FeedbackQueue",
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcdefgh-ijkl-mnop-qrst-uvwxyz012345",
  HoursOfOperationArn: "arn:aws:connect:us-west-2:123456789012:hours-of-operation/abcdefgh-ijkl-mnop-qrst-uvwxyzabcdef",
  OutboundCallerConfig: {
    OutboundCallerIdName: "Company Feedback Line",
    OutboundCallerIdNumber: "+11234567890"
  },
  Status: "ACTIVE",
  Description: "Queue for collecting customer feedback"
});
```

## Queue with Quick Connects

Create an AWS Connect Queue that is linked to multiple Quick Connects for enhanced routing capabilities.

```ts
const quickConnectQueue = await AWS.Connect.Queue("quickConnectQueue", {
  Name: "TechSupportQueue",
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcdefgh-ijkl-mnop-qrst-uvwxyz012345",
  HoursOfOperationArn: "arn:aws:connect:us-west-2:123456789012:hours-of-operation/abcdefgh-ijkl-mnop-qrst-uvwxyzabcdef",
  QuickConnectArns: [
    "arn:aws:connect:us-west-2:123456789012:quick-connect/abcdefgh-ijkl-mnop-qrst-uvwxyzabcdef1",
    "arn:aws:connect:us-west-2:123456789012:quick-connect/abcdefgh-ijkl-mnop-qrst-uvwxyzabcdef2"
  ],
  Status: "ACTIVE",
  Description: "Queue for technical support"
});
```
