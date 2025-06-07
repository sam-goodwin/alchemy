---
title: Managing AWS Cognito ManagedLoginBrandings with Alchemy
description: Learn how to create, update, and manage AWS Cognito ManagedLoginBrandings using Alchemy Cloud Control.
---

# ManagedLoginBranding

The ManagedLoginBranding resource lets you create and manage [AWS Cognito ManagedLoginBrandings](https://docs.aws.amazon.com/cognito/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-managedloginbranding.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const managedloginbranding = await AWS.Cognito.ManagedLoginBranding(
  "managedloginbranding-example",
  { UserPoolId: "example-userpoolid" }
);
```

## Advanced Configuration

Create a managedloginbranding with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedManagedLoginBranding = await AWS.Cognito.ManagedLoginBranding(
  "advanced-managedloginbranding",
  { UserPoolId: "example-userpoolid", Settings: {} }
);
```

