---
title: Managing AWS IoTSiteWise Portals with Alchemy
description: Learn how to create, update, and manage AWS IoTSiteWise Portals using Alchemy Cloud Control.
---

# Portal

The Portal resource lets you create and manage [AWS IoTSiteWise Portals](https://docs.aws.amazon.com/iotsitewise/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotsitewise-portal.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const portal = await AWS.IoTSiteWise.Portal("portal-example", {
  PortalName: "portal-portal",
  PortalContactEmail: "example-portalcontactemail",
  RoleArn: "example-rolearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a portal with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPortal = await AWS.IoTSiteWise.Portal("advanced-portal", {
  PortalName: "portal-portal",
  PortalContactEmail: "example-portalcontactemail",
  RoleArn: "example-rolearn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

