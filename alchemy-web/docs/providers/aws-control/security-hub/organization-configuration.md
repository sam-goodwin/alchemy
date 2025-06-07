---
title: Managing AWS SecurityHub OrganizationConfigurations with Alchemy
description: Learn how to create, update, and manage AWS SecurityHub OrganizationConfigurations using Alchemy Cloud Control.
---

# OrganizationConfiguration

The OrganizationConfiguration resource lets you create and manage [AWS SecurityHub OrganizationConfigurations](https://docs.aws.amazon.com/securityhub/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-securityhub-organizationconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const organizationconfiguration = await AWS.SecurityHub.OrganizationConfiguration(
  "organizationconfiguration-example",
  { AutoEnable: true }
);
```

