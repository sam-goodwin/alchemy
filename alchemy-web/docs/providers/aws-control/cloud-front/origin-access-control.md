---
title: Managing AWS CloudFront OriginAccessControls with Alchemy
description: Learn how to create, update, and manage AWS CloudFront OriginAccessControls using Alchemy Cloud Control.
---

# OriginAccessControl

The OriginAccessControl resource lets you create and manage [AWS CloudFront OriginAccessControls](https://docs.aws.amazon.com/cloudfront/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-originaccesscontrol.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const originaccesscontrol = await AWS.CloudFront.OriginAccessControl(
  "originaccesscontrol-example",
  { OriginAccessControlConfig: "example-originaccesscontrolconfig" }
);
```

