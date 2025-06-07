---
title: Managing AWS AppSync GraphQLSchemas with Alchemy
description: Learn how to create, update, and manage AWS AppSync GraphQLSchemas using Alchemy Cloud Control.
---

# GraphQLSchema

The GraphQLSchema resource lets you create and manage [AWS AppSync GraphQLSchemas](https://docs.aws.amazon.com/appsync/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appsync-graphqlschema.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const graphqlschema = await AWS.AppSync.GraphQLSchema("graphqlschema-example", {
  ApiId: "example-apiid",
});
```

