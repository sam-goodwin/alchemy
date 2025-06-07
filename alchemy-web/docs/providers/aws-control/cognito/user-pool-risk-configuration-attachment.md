---
title: Managing AWS Cognito UserPoolRiskConfigurationAttachments with Alchemy
description: Learn how to create, update, and manage AWS Cognito UserPoolRiskConfigurationAttachments using Alchemy Cloud Control.
---

# UserPoolRiskConfigurationAttachment

The UserPoolRiskConfigurationAttachment resource lets you create and manage [AWS Cognito UserPoolRiskConfigurationAttachments](https://docs.aws.amazon.com/cognito/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolriskconfigurationattachment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const userpoolriskconfigurationattachment = await AWS.Cognito.UserPoolRiskConfigurationAttachment(
  "userpoolriskconfigurationattachment-example",
  { UserPoolId: "example-userpoolid", ClientId: "example-clientid" }
);
```

