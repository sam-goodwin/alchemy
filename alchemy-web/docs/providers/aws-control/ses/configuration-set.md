---
title: Managing AWS SES ConfigurationSets with Alchemy
description: Learn how to create, update, and manage AWS SES ConfigurationSets using Alchemy Cloud Control.
---

# ConfigurationSet

The ConfigurationSet resource lets you create and manage [AWS SES ConfigurationSets](https://docs.aws.amazon.com/ses/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-configurationset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const configurationset = await AWS.SES.ConfigurationSet("configurationset-example", {});
```

