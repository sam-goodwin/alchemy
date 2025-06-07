---
title: Managing AWS Wisdom AssistantAssociations with Alchemy
description: Learn how to create, update, and manage AWS Wisdom AssistantAssociations using Alchemy Cloud Control.
---

# AssistantAssociation

The AssistantAssociation resource lets you create and manage [AWS Wisdom AssistantAssociations](https://docs.aws.amazon.com/wisdom/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wisdom-assistantassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const assistantassociation = await AWS.Wisdom.AssistantAssociation("assistantassociation-example", {
  Association: "example-association",
  AssociationType: "example-associationtype",
  AssistantId: "example-assistantid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a assistantassociation with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAssistantAssociation = await AWS.Wisdom.AssistantAssociation(
  "advanced-assistantassociation",
  {
    Association: "example-association",
    AssociationType: "example-associationtype",
    AssistantId: "example-assistantid",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

