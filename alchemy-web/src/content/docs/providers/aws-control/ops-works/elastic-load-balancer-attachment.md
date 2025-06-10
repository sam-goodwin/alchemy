---
title: ElasticLoadBalancerAttachment
description: Learn how to create, update, and manage AWS OpsWorks ElasticLoadBalancerAttachments using Alchemy Cloud Control.
---


The ElasticLoadBalancerAttachment resource allows you to manage the attachment of Elastic Load Balancers to OpsWorks layers in AWS. For more information, refer to the [AWS OpsWorks ElasticLoadBalancerAttachments](https://docs.aws.amazon.com/opsworks/latest/userguide/).

## Minimal Example

Create a basic ElasticLoadBalancerAttachment with required properties.

```ts
import AWS from "alchemy/aws/control";

const elbAttachment = await AWS.OpsWorks.ElasticLoadBalancerAttachment("myElbAttachment", {
  ElasticLoadBalancerName: "my-load-balancer",
  LayerId: "layer-12345",
  adopt: true // Optional: Adopt existing resource
});
```

## Advanced Configuration

Attach an Elastic Load Balancer with additional configurations, including adopting an existing resource.

```ts
const advancedElbAttachment = await AWS.OpsWorks.ElasticLoadBalancerAttachment("advancedElbAttachment", {
  ElasticLoadBalancerName: "my-advanced-load-balancer",
  LayerId: "layer-67890",
  adopt: true // Allows adopting existing resources
});
```

## Use Case: Updating an Existing ELB Attachment

This example shows how to update an existing ElasticLoadBalancerAttachment by specifying the same `LayerId`.

```ts
const updateElbAttachment = await AWS.OpsWorks.ElasticLoadBalancerAttachment("updateElbAttachment", {
  ElasticLoadBalancerName: "my-load-balancer",
  LayerId: "layer-12345",
  adopt: false // Do not adopt, will fail if it already exists
});
```
