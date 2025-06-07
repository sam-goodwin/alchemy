---
title: Managing AWS Transfer Agreements with Alchemy
description: Learn how to create, update, and manage AWS Transfer Agreements using Alchemy Cloud Control.
---

# Agreement

The Agreement resource lets you create and manage [AWS Transfer Agreements](https://docs.aws.amazon.com/transfer/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-agreement.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const agreement = await AWS.Transfer.Agreement("agreement-example", {
  ServerId: "example-serverid",
  AccessRole: "example-accessrole",
  PartnerProfileId: "example-partnerprofileid",
  LocalProfileId: "example-localprofileid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A agreement resource managed by Alchemy",
});
```

## Advanced Configuration

Create a agreement with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAgreement = await AWS.Transfer.Agreement("advanced-agreement", {
  ServerId: "example-serverid",
  AccessRole: "example-accessrole",
  PartnerProfileId: "example-partnerprofileid",
  LocalProfileId: "example-localprofileid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A agreement resource managed by Alchemy",
});
```

