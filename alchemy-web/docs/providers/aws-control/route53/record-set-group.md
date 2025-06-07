---
title: Managing AWS Route53 RecordSetGroups with Alchemy
description: Learn how to create, update, and manage AWS Route53 RecordSetGroups using Alchemy Cloud Control.
---

# RecordSetGroup

The RecordSetGroup resource lets you create and manage [AWS Route53 RecordSetGroups](https://docs.aws.amazon.com/route53/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53-recordsetgroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const recordsetgroup = await AWS.Route53.RecordSetGroup("recordsetgroup-example", {});
```

