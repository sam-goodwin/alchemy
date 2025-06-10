---
title: AssistantAssociation
description: Learn how to create, update, and manage AWS Wisdom AssistantAssociations using Alchemy Cloud Control.
---


The AssistantAssociation resource allows you to create and manage associations between AWS Wisdom assistants and other resources. This can enhance the functionality of your assistants by connecting them with the required data sources and services. For more information, refer to the [AWS Wisdom AssistantAssociations documentation](https://docs.aws.amazon.com/wisdom/latest/userguide/).

## Minimal Example

Create a basic AssistantAssociation with required properties and an optional tag.

```ts
import AWS from "alchemy/aws/control";

const assistantAssociation = await AWS.Wisdom.AssistantAssociation("basicAssociation", {
  Association: {
    Type: "KnowledgeBase",
    Id: "knowledge-base-id"
  },
  AssociationType: "KnowledgeBase",
  AssistantId: "assistant-id",
  Tags: [
    {
      Key: "Project",
      Value: "CustomerSupport"
    }
  ]
});
```

## Advanced Configuration

Configure an AssistantAssociation with an adopt option to handle existing resources.

```ts
const advancedAssociation = await AWS.Wisdom.AssistantAssociation("advancedAssociation", {
  Association: {
    Type: "KnowledgeBase",
    Id: "another-knowledge-base-id"
  },
  AssociationType: "KnowledgeBase",
  AssistantId: "assistant-id",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Owner",
      Value: "TeamA"
    }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Connecting Multiple Resources

Create an AssistantAssociation that connects multiple knowledge bases and assistants.

```ts
const multipleAssociations = await AWS.Wisdom.AssistantAssociation("multiAssociation", {
  Association: {
    Type: "KnowledgeBase",
    Id: "knowledge-base-id-1"
  },
  AssociationType: "KnowledgeBase",
  AssistantId: "assistant-id-1",
  Tags: [
    {
      Key: "Integration",
      Value: "CrossTeam"
    }
  ]
});

// Adding another association
const secondAssociation = await AWS.Wisdom.AssistantAssociation("multiAssociation2", {
  Association: {
    Type: "KnowledgeBase",
    Id: "knowledge-base-id-2"
  },
  AssociationType: "KnowledgeBase",
  AssistantId: "assistant-id-2"
});
```
