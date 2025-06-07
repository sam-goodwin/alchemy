---
title: Managing AWS Personalize Schemas with Alchemy
description: Learn how to create, update, and manage AWS Personalize Schemas using Alchemy Cloud Control.
---

# Schema

The Schema resource lets you create and manage [AWS Personalize Schemas](https://docs.aws.amazon.com/personalize/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-personalize-schema.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const schema = await AWS.Personalize.Schema("schema-example", {
  Schema: "example-schema",
  Name: "schema-",
});
```

