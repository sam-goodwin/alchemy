---
title: Portal
description: Learn how to create, update, and manage AWS IoTSiteWise Portals using Alchemy Cloud Control.
---


The Portal resource allows you to create and manage [AWS IoTSiteWise Portals](https://docs.aws.amazon.com/iotsitewise/latest/userguide/) for visualizing and analyzing industrial data.

## Minimal Example

Create a basic IoTSiteWise Portal with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicPortal = await AWS.IoTSiteWise.Portal("basicPortal", {
  PortalName: "MyIndustrialPortal",
  PortalContactEmail: "contact@myindustrialcompany.com",
  RoleArn: "arn:aws:iam::123456789012:role/MyIoTSiteWiseRole",
  NotificationSenderEmail: "notifications@myindustrialcompany.com"
});
```

## Advanced Configuration

Configure a portal with advanced settings including alarms and additional portal type configurations.

```ts
const advancedPortal = await AWS.IoTSiteWise.Portal("advancedPortal", {
  PortalName: "AdvancedIndustrialPortal",
  PortalContactEmail: "contact@advancedportal.com",
  RoleArn: "arn:aws:iam::123456789012:role/AdvancedIoTSiteWiseRole",
  NotificationSenderEmail: "alerts@advancedportal.com",
  Alarms: {
    Notification: {
      Email: "alerts@advancedportal.com"
    }
  },
  PortalTypeConfiguration: {
    Dashboard: {
      Name: "MainDashboard"
    }
  }
});
```

## Creating a Portal with Tags

Demonstrate how to create a portal with tags for better resource management and organization.

```ts
const taggedPortal = await AWS.IoTSiteWise.Portal("taggedPortal", {
  PortalName: "TaggedIndustrialPortal",
  PortalContactEmail: "contact@taggedportal.com",
  RoleArn: "arn:aws:iam::123456789012:role/TaggedIoTSiteWiseRole",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Manufacturing" }
  ]
});
```

## Adoption of Existing Resources

Show how to configure the portal to adopt an existing resource if it already exists.

```ts
const adoptExistingPortal = await AWS.IoTSiteWise.Portal("existingPortal", {
  PortalName: "ExistingIndustrialPortal",
  PortalContactEmail: "contact@existingportal.com",
  RoleArn: "arn:aws:iam::123456789012:role/ExistingIoTSiteWiseRole",
  adopt: true // Adopts the existing resource instead of failing
});
```
