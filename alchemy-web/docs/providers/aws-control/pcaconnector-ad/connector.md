---
title: Managing AWS PCAConnectorAD Connectors with Alchemy
description: Learn how to create, update, and manage AWS PCAConnectorAD Connectors using Alchemy Cloud Control.
---

# Connector

The Connector resource lets you create and manage [AWS PCAConnectorAD Connectors](https://docs.aws.amazon.com/pcaconnectorad/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pcaconnectorad-connector.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const connector = await AWS.PCAConnectorAD.Connector("connector-example", {
  CertificateAuthorityArn: "example-certificateauthorityarn",
  DirectoryId: "example-directoryid",
  VpcInformation: "example-vpcinformation",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a connector with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConnector = await AWS.PCAConnectorAD.Connector("advanced-connector", {
  CertificateAuthorityArn: "example-certificateauthorityarn",
  DirectoryId: "example-directoryid",
  VpcInformation: "example-vpcinformation",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

