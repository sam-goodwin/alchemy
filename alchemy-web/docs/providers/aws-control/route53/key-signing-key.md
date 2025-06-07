---
title: Managing AWS Route53 KeySigningKeys with Alchemy
description: Learn how to create, update, and manage AWS Route53 KeySigningKeys using Alchemy Cloud Control.
---

# KeySigningKey

The KeySigningKey resource lets you create and manage [AWS Route53 KeySigningKeys](https://docs.aws.amazon.com/route53/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53-keysigningkey.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const keysigningkey = await AWS.Route53.KeySigningKey("keysigningkey-example", {
  Status: "example-status",
  KeyManagementServiceArn: "example-keymanagementservicearn",
  HostedZoneId: "example-hostedzoneid",
  Name: "keysigningkey-",
});
```

