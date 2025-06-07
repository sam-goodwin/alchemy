---
title: Managing AWS EMR StudioSessionMappings with Alchemy
description: Learn how to create, update, and manage AWS EMR StudioSessionMappings using Alchemy Cloud Control.
---

# StudioSessionMapping

The StudioSessionMapping resource lets you create and manage [AWS EMR StudioSessionMappings](https://docs.aws.amazon.com/emr/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-emr-studiosessionmapping.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const studiosessionmapping = await AWS.EMR.StudioSessionMapping("studiosessionmapping-example", {
  IdentityType: "example-identitytype",
  SessionPolicyArn: "example-sessionpolicyarn",
  StudioId: "example-studioid",
  IdentityName: "studiosessionmapping-identity",
});
```

