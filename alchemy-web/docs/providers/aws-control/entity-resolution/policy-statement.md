---
title: Managing AWS EntityResolution PolicyStatements with Alchemy
description: Learn how to create, update, and manage AWS EntityResolution PolicyStatements using Alchemy Cloud Control.
---

# PolicyStatement

The PolicyStatement resource lets you create and manage [AWS EntityResolution PolicyStatements](https://docs.aws.amazon.com/entityresolution/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-entityresolution-policystatement.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const policystatement = await AWS.EntityResolution.PolicyStatement("policystatement-example", {
  StatementId: "example-statementid",
  Arn: "example-arn",
});
```

