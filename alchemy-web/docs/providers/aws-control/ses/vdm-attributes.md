---
title: Managing AWS SES VdmAttributess with Alchemy
description: Learn how to create, update, and manage AWS SES VdmAttributess using Alchemy Cloud Control.
---

# VdmAttributes

The VdmAttributes resource lets you create and manage [AWS SES VdmAttributess](https://docs.aws.amazon.com/ses/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-vdmattributes.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const vdmattributes = await AWS.SES.VdmAttributes("vdmattributes-example", {});
```

