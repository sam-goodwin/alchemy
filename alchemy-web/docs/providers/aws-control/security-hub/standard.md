---
title: Managing AWS SecurityHub Standards with Alchemy
description: Learn how to create, update, and manage AWS SecurityHub Standards using Alchemy Cloud Control.
---

# Standard

The Standard resource lets you create and manage [AWS SecurityHub Standards](https://docs.aws.amazon.com/securityhub/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-securityhub-standard.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const standard = await AWS.SecurityHub.Standard("standard-example", {
  StandardsArn: "example-standardsarn",
});
```

