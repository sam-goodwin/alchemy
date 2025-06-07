---
title: Managing AWS Logs Transformers with Alchemy
description: Learn how to create, update, and manage AWS Logs Transformers using Alchemy Cloud Control.
---

# Transformer

The Transformer resource lets you create and manage [AWS Logs Transformers](https://docs.aws.amazon.com/logs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-transformer.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const transformer = await AWS.Logs.Transformer("transformer-example", {
  TransformerConfig: [],
  LogGroupIdentifier: "example-loggroupidentifier",
});
```

