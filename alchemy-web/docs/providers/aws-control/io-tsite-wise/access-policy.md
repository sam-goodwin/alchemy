---
title: Managing AWS IoTSiteWise AccessPolicys with Alchemy
description: Learn how to create, update, and manage AWS IoTSiteWise AccessPolicys using Alchemy Cloud Control.
---

# AccessPolicy

The AccessPolicy resource lets you create and manage [AWS IoTSiteWise AccessPolicys](https://docs.aws.amazon.com/iotsitewise/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotsitewise-accesspolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const accesspolicy = await AWS.IoTSiteWise.AccessPolicy("accesspolicy-example", {
  AccessPolicyResource: "example-accesspolicyresource",
  AccessPolicyIdentity: "example-accesspolicyidentity",
  AccessPolicyPermission: "example-accesspolicypermission",
});
```

