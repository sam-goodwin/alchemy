---
title: Managing AWS AppSync GraphQLApis with Alchemy
description: Learn how to create, update, and manage AWS AppSync GraphQLApis using Alchemy Cloud Control.
---

# GraphQLApi

The GraphQLApi resource lets you create and manage [AWS AppSync GraphQLApis](https://docs.aws.amazon.com/appsync/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appsync-graphqlapi.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const graphqlapi = await AWS.AppSync.GraphQLApi("graphqlapi-example", {
  Name: "graphqlapi-",
  AuthenticationType: "example-authenticationtype",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a graphqlapi with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedGraphQLApi = await AWS.AppSync.GraphQLApi("advanced-graphqlapi", {
  Name: "graphqlapi-",
  AuthenticationType: "example-authenticationtype",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

