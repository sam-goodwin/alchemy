---
title: Managing AWS Config OrganizationConfigRules with Alchemy
description: Learn how to create, update, and manage AWS Config OrganizationConfigRules using Alchemy Cloud Control.
---

# OrganizationConfigRule

The OrganizationConfigRule resource lets you create and manage [AWS Config OrganizationConfigRules](https://docs.aws.amazon.com/config/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-config-organizationconfigrule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const organizationconfigrule = await AWS.Config.OrganizationConfigRule(
  "organizationconfigrule-example",
  { OrganizationConfigRuleName: "organizationconfigrule-organizationconfigrule" }
);
```

