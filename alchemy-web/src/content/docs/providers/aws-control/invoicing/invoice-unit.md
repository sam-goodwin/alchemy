---
title: InvoiceUnit
description: Learn how to create, update, and manage AWS Invoicing InvoiceUnits using Alchemy Cloud Control.
---


The InvoiceUnit resource allows you to manage [AWS Invoicing InvoiceUnits](https://docs.aws.amazon.com/invoicing/latest/userguide/) for handling invoices in your AWS environment.

## Minimal Example

Create a basic InvoiceUnit with required properties and some optional configurations.

```ts
import AWS from "alchemy/aws/control";

const basicInvoiceUnit = await AWS.Invoicing.InvoiceUnit("basicInvoiceUnit", {
  Name: "Monthly Subscription",
  InvoiceReceiver: "customer@example.com",
  Rule: {
    // Define your rule here
    Type: "Standard",
    Conditions: {
      Amount: 100,
      Currency: "USD"
    }
  },
  Description: "Invoice for monthly subscription service",
  TaxInheritanceDisabled: false
});
```

## Advanced Configuration

Configure an InvoiceUnit with advanced options including resource tags and adoption of existing resources.

```ts
const advancedInvoiceUnit = await AWS.Invoicing.InvoiceUnit("advancedInvoiceUnit", {
  Name: "Annual Service Agreement",
  InvoiceReceiver: "client@business.com",
  Rule: {
    Type: "Standard",
    Conditions: {
      Amount: 1200,
      Currency: "USD"
    }
  },
  ResourceTags: [
    { Key: "Project", Value: "Finance" },
    { Key: "Environment", Value: "Production" }
  ],
  TaxInheritanceDisabled: true,
  adopt: true,
  Description: "Invoice for annual service agreement with client"
});
```

## Example with Resource Tags

Demonstrate how to create an InvoiceUnit with specific resource tags for better organization.

```ts
const taggedInvoiceUnit = await AWS.Invoicing.InvoiceUnit("taggedInvoiceUnit", {
  Name: "Consultation Fees",
  InvoiceReceiver: "consultant@example.com",
  Rule: {
    Type: "Standard",
    Conditions: {
      Amount: 500,
      Currency: "USD"
    }
  },
  ResourceTags: [
    { Key: "Department", Value: "Consulting" },
    { Key: "Client", Value: "XYZ Corp" }
  ],
  Description: "Invoice for consulting services provided to XYZ Corp"
});
```
