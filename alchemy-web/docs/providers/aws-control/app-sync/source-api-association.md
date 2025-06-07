---
title: Managing AWS AppSync SourceApiAssociations with Alchemy
description: Learn how to create, update, and manage AWS AppSync SourceApiAssociations using Alchemy Cloud Control.
---

# SourceApiAssociation

The SourceApiAssociation resource lets you create and manage [AWS AppSync SourceApiAssociations](https://docs.aws.amazon.com/appsync/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appsync-sourceapiassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const sourceapiassociation = await AWS.AppSync.SourceApiAssociation(
  "sourceapiassociation-example",
  { Description: "A sourceapiassociation resource managed by Alchemy" }
);
```

## Advanced Configuration

Create a sourceapiassociation with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSourceApiAssociation = await AWS.AppSync.SourceApiAssociation(
  "advanced-sourceapiassociation",
  { Description: "A sourceapiassociation resource managed by Alchemy" }
);
```

