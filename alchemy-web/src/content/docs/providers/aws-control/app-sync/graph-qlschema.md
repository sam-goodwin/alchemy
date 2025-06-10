---
title: GraphQLSchema
description: Learn how to create, update, and manage AWS AppSync GraphQLSchemas using Alchemy Cloud Control.
---


The GraphQLSchema resource allows you to manage [AWS AppSync GraphQLSchemas](https://docs.aws.amazon.com/appsync/latest/userguide/) for your applications. This resource helps define the shape of your API and manage its schema effectively.

## Minimal Example

Create a basic GraphQL schema using a string definition and specify the API ID.

```ts
import AWS from "alchemy/aws/control";

const basicSchema = await AWS.AppSync.GraphQLSchema("basicSchema", {
  Definition: `
    type Query {
      getUser(id: ID!): User
    }
    type User {
      id: ID!
      name: String
    }
  `,
  ApiId: "your-api-id-12345"
});
```

## Advanced Configuration

You can also specify a schema definition stored in an S3 bucket for larger schemas.

```ts
const advancedSchema = await AWS.AppSync.GraphQLSchema("advancedSchema", {
  DefinitionS3Location: "s3://your-bucket-name/graphql-schema.graphql",
  ApiId: "your-api-id-67890"
});
```

## Adopting Existing Resources

If you want to adopt an existing GraphQL schema instead of creating a new one, you can set the `adopt` property to true.

```ts
const existingSchema = await AWS.AppSync.GraphQLSchema("existingSchema", {
  ApiId: "your-api-id-12345",
  adopt: true
});
```

## Schema with Multiple Types

Here's how to define a more complex schema with multiple types and queries.

```ts
const complexSchema = await AWS.AppSync.GraphQLSchema("complexSchema", {
  Definition: `
    type Query {
      listUsers: [User]
      getPost(id: ID!): Post
    }
    type User {
      id: ID!
      name: String
      posts: [Post]
    }
    type Post {
      id: ID!
      title: String
      content: String
    }
  `,
  ApiId: "your-api-id-98765"
});
```
