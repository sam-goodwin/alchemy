---
title: Managing AWS SES Templates with Alchemy
description: Learn how to create, update, and manage AWS SES Templates using Alchemy Cloud Control.
---

# Template

The Template resource lets you create and manage [AWS SES Templates](https://docs.aws.amazon.com/ses/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-template.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const template = await AWS.SES.Template("template-example", {});
```

