---
title: Managing AWS PCAConnectorAD Templates with Alchemy
description: Learn how to create, update, and manage AWS PCAConnectorAD Templates using Alchemy Cloud Control.
---

# Template

The Template resource lets you create and manage [AWS PCAConnectorAD Templates](https://docs.aws.amazon.com/pcaconnectorad/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pcaconnectorad-template.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const template = await AWS.PCAConnectorAD.Template("template-example", {
  ConnectorArn: "example-connectorarn",
  Definition: "example-definition",
  Name: "template-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a template with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTemplate = await AWS.PCAConnectorAD.Template("advanced-template", {
  ConnectorArn: "example-connectorarn",
  Definition: "example-definition",
  Name: "template-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

