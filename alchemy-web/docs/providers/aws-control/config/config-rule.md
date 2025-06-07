---
title: Managing AWS Config ConfigRules with Alchemy
description: Learn how to create, update, and manage AWS Config ConfigRules using Alchemy Cloud Control.
---

# ConfigRule

The ConfigRule resource lets you create and manage [AWS Config ConfigRules](https://docs.aws.amazon.com/config/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-config-configrule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const configrule = await AWS.Config.ConfigRule("configrule-example", {
  Source: "example-source",
  Description: "A configrule resource managed by Alchemy",
});
```

## Advanced Configuration

Create a configrule with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConfigRule = await AWS.Config.ConfigRule("advanced-configrule", {
  Source: "example-source",
  Description: "A configrule resource managed by Alchemy",
});
```

