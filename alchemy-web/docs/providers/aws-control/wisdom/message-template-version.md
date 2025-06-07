---
title: Managing AWS Wisdom MessageTemplateVersions with Alchemy
description: Learn how to create, update, and manage AWS Wisdom MessageTemplateVersions using Alchemy Cloud Control.
---

# MessageTemplateVersion

The MessageTemplateVersion resource lets you create and manage [AWS Wisdom MessageTemplateVersions](https://docs.aws.amazon.com/wisdom/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wisdom-messagetemplateversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const messagetemplateversion = await AWS.Wisdom.MessageTemplateVersion(
  "messagetemplateversion-example",
  { MessageTemplateArn: "example-messagetemplatearn" }
);
```

