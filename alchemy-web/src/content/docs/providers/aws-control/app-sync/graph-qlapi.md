---
title: GraphQLApi
description: Learn how to create, update, and manage AWS AppSync GraphQLApis using Alchemy Cloud Control.
---


The GraphQLApi resource lets you manage [AWS AppSync GraphQL APIs](https://docs.aws.amazon.com/appsync/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic GraphQL API with the required properties and a couple of optional settings.

```ts
import AWS from "alchemy/aws/control";

const graphqlApi = await AWS.AppSync.GraphQLApi("myGraphQLApi", {
  name: "MyGraphQLAPI",
  authenticationType: "API_KEY", // Required authentication type
  queryDepthLimit: 5, // Optional: Limit query depth to avoid excessive nested queries
  ownerContact: "admin@mydomain.com" // Optional: Contact for API ownership
});
```

## Advanced Configuration

Configure a GraphQL API with multiple authentication providers and enhanced metrics.

```ts
const advancedGraphqlApi = await AWS.AppSync.GraphQLApi("advancedGraphQLApi", {
  name: "AdvancedGraphQLAPI",
  authenticationType: "AMAZON_COGNITO_USER_POOLS", // Using Cognito for authentication
  additionalAuthenticationProviders: [
    {
      authenticationType: "OPENID_CONNECT",
      openIDConnectConfig: {
        issuer: "https://example.com",
        clientId: "myClientId",
        iatTTL: 3600, // Optional: Token expiration time
        authTTL: 3600 // Optional: Authentication token time-to-live
      }
    }
  ],
  enhancedMetricsConfig: {
    apiGatewayMetricsEnabled: true,
    cloudWatchMetricsEnabled: true
  }
});
```

## Configuring X-Ray for Tracing

Enable AWS X-Ray for tracing requests in your GraphQL API.

```ts
const tracingGraphqlApi = await AWS.AppSync.GraphQLApi("tracingGraphQLApi", {
  name: "TracingGraphQLAPI",
  authenticationType: "API_KEY",
  xrayEnabled: true // Enable X-Ray tracing
});
```

## Adding Environment Variables

Set environment variables in your GraphQL API for configuration.

```ts
const envVarGraphqlApi = await AWS.AppSync.GraphQLApi("envVarGraphQLApi", {
  name: "EnvVarGraphQLAPI",
  authenticationType: "API_KEY",
  environmentVariables: {
    NODE_ENV: "production",
    API_VERSION: "v1"
  }
});
```
