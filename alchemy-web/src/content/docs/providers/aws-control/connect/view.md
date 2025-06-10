---
title: View
description: Learn how to create, update, and manage AWS Connect Views using Alchemy Cloud Control.
---


The View resource allows you to manage [AWS Connect Views](https://docs.aws.amazon.com/connect/latest/userguide/) which define how information is displayed in the AWS Connect interface.

## Minimal Example

Create a basic AWS Connect View with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const connectView = await AWS.Connect.View("basicConnectView", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  Name: "CustomerSupportView",
  Actions: ["ViewCustomerDetails", "EscalateCall"],
  Description: "A view for customer support agents."
});
```

## Advanced Configuration

Configure an AWS Connect View with additional properties, including tags for better resource management.

```ts
const advancedConnectView = await AWS.Connect.View("advancedConnectView", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  Name: "SalesDashboardView",
  Actions: ["ViewSalesData", "CreateFollowUp"],
  Template: {
    templateType: "default",
    settings: {
      layout: "vertical",
      colorScheme: "light"
    }
  },
  Tags: [
    { Key: "Department", Value: "Sales" },
    { Key: "Team", Value: "SalesForce" }
  ]
});
```

## Custom View Actions

Create a view with specific actions tailored for a marketing team.

```ts
const marketingView = await AWS.Connect.View("marketingConnectView", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  Name: "MarketingCampaignView",
  Actions: ["ViewCampaignPerformance", "ManageLeads"],
  Description: "A view designed for the marketing team to manage campaigns effectively."
});
```

## Adopting Existing Resources

If you are updating an existing view, use the adopt property to ensure the operation succeeds instead of failing.

```ts
const existingView = await AWS.Connect.View("existingConnectView", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  Name: "SupportQueueView",
  Actions: ["ViewSupportQueue"],
  adopt: true // Adopt the existing resource if it already exists
});
```
