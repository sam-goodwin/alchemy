---
title: Managing AWS PCAConnectorSCEP Connectors with Alchemy
description: Learn how to create, update, and manage AWS PCAConnectorSCEP Connectors using Alchemy Cloud Control.
---

# Connector

The Connector resource lets you create and manage [AWS PCAConnectorSCEP Connectors](https://docs.aws.amazon.com/pcaconnectorscep/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pcaconnectorscep-connector.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const connector = await AWS.PCAConnectorSCEP.Connector("connector-example", {
  CertificateAuthorityArn: "example-certificateauthorityarn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a connector with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConnector = await AWS.PCAConnectorSCEP.Connector("advanced-connector", {
  CertificateAuthorityArn: "example-certificateauthorityarn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

