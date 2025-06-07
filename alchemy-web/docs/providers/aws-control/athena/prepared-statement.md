---
title: Managing AWS Athena PreparedStatements with Alchemy
description: Learn how to create, update, and manage AWS Athena PreparedStatements using Alchemy Cloud Control.
---

# PreparedStatement

The PreparedStatement resource lets you create and manage [AWS Athena PreparedStatements](https://docs.aws.amazon.com/athena/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-athena-preparedstatement.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const preparedstatement = await AWS.Athena.PreparedStatement("preparedstatement-example", {
  StatementName: "preparedstatement-statement",
  WorkGroup: "example-workgroup",
  QueryStatement: "example-querystatement",
  Description: "A preparedstatement resource managed by Alchemy",
});
```

## Advanced Configuration

Create a preparedstatement with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPreparedStatement = await AWS.Athena.PreparedStatement("advanced-preparedstatement", {
  StatementName: "preparedstatement-statement",
  WorkGroup: "example-workgroup",
  QueryStatement: "example-querystatement",
  Description: "A preparedstatement resource managed by Alchemy",
});
```

