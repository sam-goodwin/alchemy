---
title: Partnership
description: Learn how to create, update, and manage AWS B2BI Partnerships using Alchemy Cloud Control.
---


The Partnership resource lets you manage [AWS B2BI Partnerships](https://docs.aws.amazon.com/b2bi/latest/userguide/) and their configurations.

## Minimal Example

Create a basic B2BI Partnership with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const partnership = await AWS.B2BI.Partnership("myPartnership", {
  ProfileId: "profile-123",
  Email: "partner@example.com",
  Capabilities: ["SFTP", "AS2"],
  Phone: "+1234567890",
  Name: "My B2BI Partner"
});
```

## Advanced Configuration

Configure a B2BI Partnership with capability options and tags to manage access and metadata.

```ts
const advancedPartnership = await AWS.B2BI.Partnership("advancedPartnership", {
  ProfileId: "profile-456",
  Email: "advancedpartner@example.com",
  Capabilities: ["SFTP", "AS2", "FTP"],
  CapabilityOptions: {
    SFTP: {
      Encryption: "AES256",
      Compression: "Zlib"
    },
    AS2: {
      Acknowledgment: true
    }
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Finance" }
  ],
  Name: "Advanced B2BI Partner"
});
```

## Tagging for Resource Management

Create a partnership with specific tags to facilitate resource tracking and management.

```ts
const taggedPartnership = await AWS.B2BI.Partnership("taggedPartnership", {
  ProfileId: "profile-789",
  Email: "taggedpartner@example.com",
  Capabilities: ["AS2"],
  Tags: [
    { Key: "Project", Value: "ProjectX" },
    { Key: "Owner", Value: "Alice" }
  ],
  Name: "Tagged B2BI Partner"
});
```

## Adoption of Existing Resource

Adopt an existing B2BI partnership if it already exists, ensuring continuity in operations.

```ts
const existingPartnership = await AWS.B2BI.Partnership("existingPartnership", {
  ProfileId: "profile-321",
  Email: "existingpartner@example.com",
  Capabilities: ["SFTP"],
  Name: "Existing B2BI Partner",
  adopt: true // Set to true to adopt the existing partnership resource
});
```
