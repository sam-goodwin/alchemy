---
title: Managing AWS ServiceCatalog LaunchNotificationConstraints with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalog LaunchNotificationConstraints using Alchemy Cloud Control.
---

# LaunchNotificationConstraint

The LaunchNotificationConstraint resource lets you manage AWS ServiceCatalog Launch Notification Constraints, which allow you to specify notification settings for portfolio and product launches. For more information, refer to the [AWS ServiceCatalog LaunchNotificationConstraints documentation](https://docs.aws.amazon.com/servicecatalog/latest/userguide/).

## Minimal Example

Create a basic LaunchNotificationConstraint with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const BasicLaunchNotificationConstraint = await AWS.ServiceCatalog.LaunchNotificationConstraint("BasicLaunchNotification", {
  NotificationArns: ["arn:aws:sns:us-east-1:123456789012:MyLaunchNotifications"],
  PortfolioId: "portfolio-1234abcd",
  ProductId: "product-5678efgh",
  Description: "This constraint notifies stakeholders upon product launch."
});
```

## Advanced Configuration

Configure a LaunchNotificationConstraint with additional options such as accept language.

```ts
const AdvancedLaunchNotificationConstraint = await AWS.ServiceCatalog.LaunchNotificationConstraint("AdvancedLaunchNotification", {
  NotificationArns: ["arn:aws:sns:us-east-1:123456789012:MyLaunchNotifications"],
  PortfolioId: "portfolio-1234abcd",
  ProductId: "product-5678efgh",
  AcceptLanguage: "en",
  Description: "This constraint notifies stakeholders in English upon product launch."
});
```

## Adoption of Existing Resource

If you want to adopt an existing LaunchNotificationConstraint without failing, set the adopt property to true.

```ts
const AdoptExistingLaunchNotificationConstraint = await AWS.ServiceCatalog.LaunchNotificationConstraint("AdoptExistingNotification", {
  NotificationArns: ["arn:aws:sns:us-east-1:123456789012:MyLaunchNotifications"],
  PortfolioId: "portfolio-1234abcd",
  ProductId: "product-5678efgh",
  adopt: true,
  Description: "Adopting an existing Launch Notification Constraint."
});
```