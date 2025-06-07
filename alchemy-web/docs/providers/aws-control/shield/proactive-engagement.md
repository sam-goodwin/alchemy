---
title: Managing AWS Shield ProactiveEngagements with Alchemy
description: Learn how to create, update, and manage AWS Shield ProactiveEngagements using Alchemy Cloud Control.
---

# ProactiveEngagement

The ProactiveEngagement resource allows you to manage proactive engagement settings for AWS Shield, helping you to configure and handle emergency contacts for DDoS response. For more information, refer to the [AWS Shield ProactiveEngagements](https://docs.aws.amazon.com/shield/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic ProactiveEngagement configuration with the required properties.

```ts
import AWS from "alchemy/aws/control";

const BasicProactiveEngagement = await AWS.Shield.ProactiveEngagement("BasicEngagement", {
  ProactiveEngagementStatus: "ENABLED",
  EmergencyContactList: [
    {
      EmailAddress: "admin@example.com",
      PhoneNumber: "+12065551234"
    }
  ]
});
```

## Advanced Configuration

In this example, we configure the ProactiveEngagement resource with additional properties, such as adopting an existing resource and providing multiple emergency contacts.

```ts
const AdvancedProactiveEngagement = await AWS.Shield.ProactiveEngagement("AdvancedEngagement", {
  ProactiveEngagementStatus: "ENABLED",
  EmergencyContactList: [
    {
      EmailAddress: "secops@example.com",
      PhoneNumber: "+12065559876"
    },
    {
      EmailAddress: "it-support@example.com",
      PhoneNumber: "+12065552345"
    }
  ],
  adopt: true
});
```

## Custom Emergency Contact Configuration

This example outlines how to set up a ProactiveEngagement with a detailed emergency contact list, tailored for a specific operational team.

```ts
const CustomContactEngagement = await AWS.Shield.ProactiveEngagement("CustomContactEngagement", {
  ProactiveEngagementStatus: "ENABLED",
  EmergencyContactList: [
    {
      EmailAddress: "emergency@example.com",
      PhoneNumber: "+12065557654"
    },
    {
      EmailAddress: "on-call@example.com",
      PhoneNumber: "+12065553210"
    }
  ]
});
```

## Summary

The ProactiveEngagement resource is essential for organizations that want to ensure rapid response to DDoS attacks through proper emergency contact management. By utilizing the examples above, you can effectively configure and manage ProactiveEngagement settings tailored to your operational needs.