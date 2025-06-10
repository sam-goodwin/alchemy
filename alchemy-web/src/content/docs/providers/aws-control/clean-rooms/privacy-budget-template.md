---
title: PrivacyBudgetTemplate
description: Learn how to create, update, and manage AWS CleanRooms PrivacyBudgetTemplates using Alchemy Cloud Control.
---


The PrivacyBudgetTemplate resource allows you to manage privacy budget templates in AWS CleanRooms, which helps in maintaining compliance and control over data access. For more details, refer to the [AWS CleanRooms PrivacyBudgetTemplates documentation](https://docs.aws.amazon.com/cleanrooms/latest/userguide/).

## Minimal Example

Create a basic PrivacyBudgetTemplate with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicPrivacyBudgetTemplate = await AWS.CleanRooms.PrivacyBudgetTemplate("basicPrivacyBudgetTemplate", {
  PrivacyBudgetType: "Standard",
  MembershipIdentifier: "membership-12345",
  Parameters: {
    maxUsage: 100,
    maxPrivacyBudget: 50
  },
  AutoRefresh: "true"
});
```

## Advanced Configuration

Configure a PrivacyBudgetTemplate with tags and additional parameters.

```ts
const advancedPrivacyBudgetTemplate = await AWS.CleanRooms.PrivacyBudgetTemplate("advancedPrivacyBudgetTemplate", {
  PrivacyBudgetType: "Advanced",
  MembershipIdentifier: "membership-67890",
  Parameters: {
    maxUsage: 200,
    maxPrivacyBudget: 100,
    alertThreshold: 80
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "DataTeam" }
  ],
  AutoRefresh: "false"
});
```

## Adoption of Existing Resources

Create a PrivacyBudgetTemplate and adopt an existing resource if it already exists.

```ts
const adoptedPrivacyBudgetTemplate = await AWS.CleanRooms.PrivacyBudgetTemplate("adoptedPrivacyBudgetTemplate", {
  PrivacyBudgetType: "Standard",
  MembershipIdentifier: "membership-54321",
  Parameters: {
    maxUsage: 150,
    maxPrivacyBudget: 75
  },
  AutoRefresh: "true",
  adopt: true
});
```
