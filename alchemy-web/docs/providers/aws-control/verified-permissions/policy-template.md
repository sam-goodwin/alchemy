---
title: Managing AWS VerifiedPermissions PolicyTemplates with Alchemy
description: Learn how to create, update, and manage AWS VerifiedPermissions PolicyTemplates using Alchemy Cloud Control.
---

# PolicyTemplate

The PolicyTemplate resource lets you create and manage [AWS VerifiedPermissions PolicyTemplates](https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-verifiedpermissions-policytemplate.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const policytemplate = await AWS.VerifiedPermissions.PolicyTemplate("policytemplate-example", {
  Statement: "example-statement",
  PolicyStoreId: "example-policystoreid",
  Description: "A policytemplate resource managed by Alchemy",
});
```

## Advanced Configuration

Create a policytemplate with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPolicyTemplate = await AWS.VerifiedPermissions.PolicyTemplate(
  "advanced-policytemplate",
  {
    Statement: "example-statement",
    PolicyStoreId: "example-policystoreid",
    Description: "A policytemplate resource managed by Alchemy",
  }
);
```

