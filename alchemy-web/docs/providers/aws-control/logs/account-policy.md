---
title: Managing AWS Logs AccountPolicys with Alchemy
description: Learn how to create, update, and manage AWS Logs AccountPolicys using Alchemy Cloud Control.
---

# AccountPolicy

The AccountPolicy resource lets you create and manage [AWS Logs AccountPolicys](https://docs.aws.amazon.com/logs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-accountpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const accountpolicy = await AWS.Logs.AccountPolicy("accountpolicy-example", {
  PolicyType: "example-policytype",
  PolicyName: "accountpolicy-policy",
  PolicyDocument: "example-policydocument",
});
```

