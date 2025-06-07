---
title: Managing AWS CleanRooms PrivacyBudgetTemplates with Alchemy
description: Learn how to create, update, and manage AWS CleanRooms PrivacyBudgetTemplates using Alchemy Cloud Control.
---

# PrivacyBudgetTemplate

The PrivacyBudgetTemplate resource lets you create and manage [AWS CleanRooms PrivacyBudgetTemplates](https://docs.aws.amazon.com/cleanrooms/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cleanrooms-privacybudgettemplate.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const privacybudgettemplate = await AWS.CleanRooms.PrivacyBudgetTemplate(
  "privacybudgettemplate-example",
  {
    PrivacyBudgetType: "example-privacybudgettype",
    MembershipIdentifier: "example-membershipidentifier",
    Parameters: "example-parameters",
    AutoRefresh: "example-autorefresh",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a privacybudgettemplate with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPrivacyBudgetTemplate = await AWS.CleanRooms.PrivacyBudgetTemplate(
  "advanced-privacybudgettemplate",
  {
    PrivacyBudgetType: "example-privacybudgettype",
    MembershipIdentifier: "example-membershipidentifier",
    Parameters: "example-parameters",
    AutoRefresh: "example-autorefresh",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

