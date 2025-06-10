---
title: LaunchNotificationConstraint
description: Learn how to create, update, and manage AWS ServiceCatalog LaunchNotificationConstraints using Alchemy Cloud Control.
---


The LaunchNotificationConstraint resource lets you manage [AWS ServiceCatalog Launch Notification Constraints](https://docs.aws.amazon.com/servicecatalog/latest/userguide/). This resource is used to specify notification settings for when a product is launched from a portfolio.

## Minimal Example

Create a basic Launch Notification Constraint with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const launchNotificationConstraint = await AWS.ServiceCatalog.LaunchNotificationConstraint("launchNotificationConstraint1", {
  PortfolioId: "portfolio-12345678",
  ProductId: "product-12345678",
  NotificationArns: [
    "arn:aws:sns:us-east-1:123456789012:my-sns-topic"
  ],
  Description: "This constraint sends notifications to specified SNS topics."
});
```

## Advanced Configuration

Configure a Launch Notification Constraint with additional optional properties like Accept Language.

```ts
const advancedLaunchNotificationConstraint = await AWS.ServiceCatalog.LaunchNotificationConstraint("advancedLaunchNotificationConstraint", {
  PortfolioId: "portfolio-12345678",
  ProductId: "product-12345678",
  NotificationArns: [
    "arn:aws:sns:us-east-1:123456789012:my-sns-topic",
    "arn:aws:sns:us-east-1:123456789012:another-topic"
  ],
  Description: "This constraint sends notifications in English.",
  AcceptLanguage: "en"
});
```

## Adoption of Existing Resources

Adopt an existing Launch Notification Constraint instead of failing if it already exists.

```ts
const adoptLaunchNotificationConstraint = await AWS.ServiceCatalog.LaunchNotificationConstraint("adoptLaunchNotificationConstraint", {
  PortfolioId: "portfolio-12345678",
  ProductId: "product-12345678",
  NotificationArns: [
    "arn:aws:sns:us-east-1:123456789012:my-sns-topic"
  ],
  adopt: true
});
```
