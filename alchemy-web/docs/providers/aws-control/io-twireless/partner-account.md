---
title: Managing AWS IoTWireless PartnerAccounts with Alchemy
description: Learn how to create, update, and manage AWS IoTWireless PartnerAccounts using Alchemy Cloud Control.
---

# PartnerAccount

The PartnerAccount resource lets you create and manage [AWS IoTWireless PartnerAccounts](https://docs.aws.amazon.com/iotwireless/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotwireless-partneraccount.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const partneraccount = await AWS.IoTWireless.PartnerAccount("partneraccount-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a partneraccount with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPartnerAccount = await AWS.IoTWireless.PartnerAccount("advanced-partneraccount", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

