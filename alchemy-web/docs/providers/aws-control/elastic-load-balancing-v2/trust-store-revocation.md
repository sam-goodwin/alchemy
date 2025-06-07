---
title: Managing AWS Application Load Balancer TrustStoreRevocations with Alchemy
description: Learn how to create, update, and manage AWS Application Load Balancer TrustStoreRevocations using Alchemy Cloud Control.
---

# TrustStoreRevocation

The TrustStoreRevocation resource lets you create and manage [AWS Application Load Balancer TrustStoreRevocations](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticloadbalancingv2-truststorerevocation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const truststorerevocation = await AWS.ElasticLoadBalancingV2.TrustStoreRevocation(
  "truststorerevocation-example",
  {}
);
```

