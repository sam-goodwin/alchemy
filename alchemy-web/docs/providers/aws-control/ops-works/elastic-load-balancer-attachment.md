---
title: Managing AWS OpsWorks ElasticLoadBalancerAttachments with Alchemy
description: Learn how to create, update, and manage AWS OpsWorks ElasticLoadBalancerAttachments using Alchemy Cloud Control.
---

# ElasticLoadBalancerAttachment

The ElasticLoadBalancerAttachment resource lets you create and manage [AWS OpsWorks ElasticLoadBalancerAttachments](https://docs.aws.amazon.com/opsworks/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-opsworks-elbattachment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const elasticloadbalancerattachment = await AWS.OpsWorks.ElasticLoadBalancerAttachment(
  "elasticloadbalancerattachment-example",
  {
    ElasticLoadBalancerName: "elasticloadbalancerattachment-elasticloadbalancer",
    LayerId: "example-layerid",
  }
);
```

