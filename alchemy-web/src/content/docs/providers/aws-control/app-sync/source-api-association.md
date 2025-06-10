---
title: SourceApiAssociation
description: Learn how to create, update, and manage AWS AppSync SourceApiAssociations using Alchemy Cloud Control.
---


The SourceApiAssociation resource allows you to manage [AWS AppSync Source API Associations](https://docs.aws.amazon.com/appsync/latest/userguide/), enabling you to link various APIs for enhanced data management and retrieval.

## Minimal Example

Create a basic SourceApiAssociation with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const sourceApiAssociation = await AWS.AppSync.SourceApiAssociation("mySourceApiAssociation", {
  Description: "This association links my source API to the AppSync API",
  SourceApiIdentifier: "source-api-12345",
  SourceApiAssociationConfig: {
    // Configuration details for the source API association
    type: "AWS_LAMBDA", // Example of a source API type
    endpoint: "arn:aws:lambda:us-west-2:123456789012:function:myLambdaFunction"
  }
});
```

## Advanced Configuration

Configure a SourceApiAssociation with additional properties like merging APIs and adopting existing resources.

```ts
const advancedSourceApiAssociation = await AWS.AppSync.SourceApiAssociation("advancedSourceApiAssociation", {
  Description: "Advanced configuration for source API association",
  SourceApiIdentifier: "source-api-67890",
  MergedApiIdentifier: "merged-api-54321",
  SourceApiAssociationConfig: {
    type: "HTTP", // Example of another source API type
    endpoint: "https://api.example.com/data",
    headers: {
      "Authorization": "Bearer my-secret-token"
    }
  },
  adopt: true // Adopt existing resource if it already exists
});
```

## Merging Multiple APIs

Demonstrate how to merge multiple APIs into a single AppSync API.

```ts
const mergedApiAssociation = await AWS.AppSync.SourceApiAssociation("mergedApiAssociation", {
  Description: "Merging two APIs into one AppSync API",
  SourceApiIdentifier: "source-api-11111",
  MergedApiIdentifier: "merged-api-22222",
  SourceApiAssociationConfig: {
    type: "GRAPHQL",
    endpoint: "https://graphql.example.com/graphql"
  }
});
```

## Adoption of Existing Resource

Show how to create a SourceApiAssociation that adopts an existing resource.

```ts
const adoptedSourceApiAssociation = await AWS.AppSync.SourceApiAssociation("adoptedSourceApiAssociation", {
  Description: "Adopting an existing source API association",
  SourceApiIdentifier: "existing-source-api",
  SourceApiAssociationConfig: {
    type: "AWS_STEP_FUNCTIONS",
    endpoint: "arn:aws:states:us-east-1:123456789012:stateMachine:myStateMachine"
  },
  adopt: true // This will adopt the existing association without error
});
```
