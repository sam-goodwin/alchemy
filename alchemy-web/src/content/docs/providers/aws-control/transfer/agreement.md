---
title: Agreement
description: Learn how to create, update, and manage AWS Transfer Agreements using Alchemy Cloud Control.
---


The Agreement resource lets you manage [AWS Transfer Agreements](https://docs.aws.amazon.com/transfer/latest/userguide/) for secure file transfer between your organization and external partners. This resource facilitates the establishment of agreements that define how data transfer should occur.

## Minimal Example

Create a basic transfer agreement with the required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicAgreement = await AWS.Transfer.Agreement("basic-agreement", {
  ServerId: "s-1234567890abcdef0",
  AccessRole: "arn:aws:iam::123456789012:role/MyTransferAccessRole",
  PartnerProfileId: "partner-profile-123",
  LocalProfileId: "local-profile-456",
  Status: "ACTIVE" // Indicates that the agreement is currently active
});
```

## Advanced Configuration

Configure a transfer agreement with additional optional properties for more nuanced control.

```ts
const advancedAgreement = await AWS.Transfer.Agreement("advanced-agreement", {
  ServerId: "s-0987654321abcdef0",
  AccessRole: "arn:aws:iam::123456789012:role/MyAdvancedTransferAccessRole",
  PartnerProfileId: "partner-profile-789",
  LocalProfileId: "local-profile-012",
  Description: "This agreement allows secure file transfer with enhanced logging.",
  EnforceMessageSigning: "true",
  PreserveFilename: "true",
  Tags: [
    {
      Key: "Project",
      Value: "DataTransfer"
    },
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Custom Directory Configuration

Create a transfer agreement with custom directory settings for specific file structure requirements.

```ts
const customDirectoryAgreement = await AWS.Transfer.Agreement("custom-directory-agreement", {
  ServerId: "s-1122334455abcdef0",
  AccessRole: "arn:aws:iam::123456789012:role/MyCustomDirectoryRole",
  PartnerProfileId: "partner-profile-345",
  LocalProfileId: "local-profile-678",
  CustomDirectories: {
    Directory1: "/data/inbound",
    Directory2: "/data/outbound"
  }
});
```

## Adoption of Existing Resource

Set up a transfer agreement that adopts an existing resource instead of failing when a resource already exists.

```ts
const adoptExistingAgreement = await AWS.Transfer.Agreement("existing-agreement", {
  ServerId: "s-9876543210abcdef0",
  AccessRole: "arn:aws:iam::123456789012:role/MyExistingAgreementRole",
  PartnerProfileId: "partner-profile-012",
  LocalProfileId: "local-profile-345",
  adopt: true // Allow adoption of existing agreements
});
```
