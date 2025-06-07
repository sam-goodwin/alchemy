---
title: Managing AWS Route53 CidrCollections with Alchemy
description: Learn how to create, update, and manage AWS Route53 CidrCollections using Alchemy Cloud Control.
---

# CidrCollection

The CidrCollection resource lets you create and manage [AWS Route53 CidrCollections](https://docs.aws.amazon.com/route53/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53-cidrcollection.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const cidrcollection = await AWS.Route53.CidrCollection("cidrcollection-example", {
  Name: "cidrcollection-",
});
```

