---
title: Managing AWS CustomerProfiles Integrations with Alchemy
description: Learn how to create, update, and manage AWS CustomerProfiles Integrations using Alchemy Cloud Control.
---

# Integration

The Integration resource lets you create and manage [AWS CustomerProfiles Integrations](https://docs.aws.amazon.com/customerprofiles/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-customerprofiles-integration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const integration = await AWS.CustomerProfiles.Integration("integration-example", {
  DomainName: "integration-domain",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a integration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedIntegration = await AWS.CustomerProfiles.Integration("advanced-integration", {
  DomainName: "integration-domain",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

