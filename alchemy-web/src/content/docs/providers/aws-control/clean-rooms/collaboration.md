---
title: Collaboration
description: Learn how to create, update, and manage AWS CleanRooms Collaborations using Alchemy Cloud Control.
---


The Collaboration resource allows you to manage [AWS CleanRooms Collaborations](https://docs.aws.amazon.com/cleanrooms/latest/userguide/) for analyzing and sharing sensitive data securely among multiple parties.

## Minimal Example

Create a basic collaboration with required properties and an optional description:

```ts
import AWS from "alchemy/aws/control";

const basicCollaboration = await AWS.CleanRooms.Collaboration("basicCollaboration", {
  CreatorDisplayName: "Data Analyst Team",
  CreatorMemberAbilities: ["VIEW", "QUERY"],
  Description: "Collaboration for secure data analysis",
  QueryLogStatus: "ENABLED",
  Members: [
    {
      MemberIdentifier: "member1",
      MemberName: "Company A"
    },
    {
      MemberIdentifier: "member2",
      MemberName: "Company B"
    }
  ],
  Tags: [
    {
      Key: "Project",
      Value: "Data Sharing Initiative"
    }
  ]
});
```

## Advanced Configuration

Configure a collaboration with advanced settings, including analytics engine and job log status:

```ts
const advancedCollaboration = await AWS.CleanRooms.Collaboration("advancedCollaboration", {
  CreatorDisplayName: "Data Scientist Team",
  CreatorMemberAbilities: ["VIEW", "QUERY", "ANALYZE"],
  Description: "Advanced collaboration for data-driven insights",
  QueryLogStatus: "ENABLED",
  JobLogStatus: "ENABLED",
  AnalyticsEngine: "Amazon Redshift",
  Members: [
    {
      MemberIdentifier: "member3",
      MemberName: "Company C"
    },
    {
      MemberIdentifier: "member4",
      MemberName: "Company D"
    }
  ],
  CreatorPaymentConfiguration: {
    PaymentMethod: "CREDIT_CARD",
    Amount: 100.00
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    }
  ]
});
```

## Collaboration with Data Encryption

Create a collaboration that includes data encryption metadata for enhanced security:

```ts
const secureCollaboration = await AWS.CleanRooms.Collaboration("secureCollaboration", {
  CreatorDisplayName: "Security Team",
  CreatorMemberAbilities: ["VIEW", "QUERY"],
  Description: "Collaboration with data encryption",
  QueryLogStatus: "ENABLED",
  Members: [
    {
      MemberIdentifier: "member5",
      MemberName: "Company E"
    },
    {
      MemberIdentifier: "member6",
      MemberName: "Company F"
    }
  ],
  DataEncryptionMetadata: {
    EncryptionType: "AES256",
    KeyManagementServiceArn: "arn:aws:kms:us-west-2:123456789012:key/my-key-id"
  }
});
```

## Adoption of Existing Collaboration

Adopt an existing collaboration by setting the `adopt` property to true:

```ts
const adoptCollaboration = await AWS.CleanRooms.Collaboration("adoptCollaboration", {
  CreatorDisplayName: "Existing Team",
  CreatorMemberAbilities: ["VIEW", "QUERY"],
  Description: "Adopting an existing collaboration",
  QueryLogStatus: "DISABLED",
  Members: [
    {
      MemberIdentifier: "member7",
      MemberName: "Company G"
    }
  ],
  adopt: true
});
```
