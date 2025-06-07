---
title: Managing AWS Transfer Connectors with Alchemy
description: Learn how to create, update, and manage AWS Transfer Connectors using Alchemy Cloud Control.
---

# Connector

The Connector resource lets you create and manage [AWS Transfer Connectors](https://docs.aws.amazon.com/transfer/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-transfer-connector.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const connector = await AWS.Transfer.Connector("connector-example", {
  AccessRole: "example-accessrole",
  Url: "example-url",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a connector with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConnector = await AWS.Transfer.Connector("advanced-connector", {
  AccessRole: "example-accessrole",
  Url: "example-url",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

