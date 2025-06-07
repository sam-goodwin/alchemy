---
title: Managing AWS Invoicing InvoiceUnits with Alchemy
description: Learn how to create, update, and manage AWS Invoicing InvoiceUnits using Alchemy Cloud Control.
---

# InvoiceUnit

The InvoiceUnit resource lets you create and manage [AWS Invoicing InvoiceUnits](https://docs.aws.amazon.com/invoicing/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-invoicing-invoiceunit.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const invoiceunit = await AWS.Invoicing.InvoiceUnit("invoiceunit-example", {
  Rule: "example-rule",
  InvoiceReceiver: "example-invoicereceiver",
  Name: "invoiceunit-",
  Description: "A invoiceunit resource managed by Alchemy",
});
```

## Advanced Configuration

Create a invoiceunit with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedInvoiceUnit = await AWS.Invoicing.InvoiceUnit("advanced-invoiceunit", {
  Rule: "example-rule",
  InvoiceReceiver: "example-invoicereceiver",
  Name: "invoiceunit-",
  Description: "A invoiceunit resource managed by Alchemy",
});
```

