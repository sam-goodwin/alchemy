---
title: Managing AWS Route53 HostedZones with Alchemy
description: Learn how to create, update, and manage AWS Route53 HostedZones using Alchemy Cloud Control.
---

# HostedZone

The HostedZone resource lets you create and manage [AWS Route53 HostedZones](https://docs.aws.amazon.com/route53/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53-hostedzone.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const hostedzone = await AWS.Route53.HostedZone("hostedzone-example", {});
```

