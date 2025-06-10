---
title: ReceiptFilter
description: Learn how to create, update, and manage AWS SES ReceiptFilters using Alchemy Cloud Control.
---


The ReceiptFilter resource lets you manage [AWS SES ReceiptFilters](https://docs.aws.amazon.com/ses/latest/userguide/) for controlling which IP addresses can send mail to your Amazon SES account.

## Minimal Example

Create a basic receipt filter that allows a specific IP address to send emails.

```ts
import AWS from "alchemy/aws/control";

const basicReceiptFilter = await AWS.SES.ReceiptFilter("basic-receipt-filter", {
  Filter: {
    Name: "AllowSpecificIP",
    IpFilter: {
      IpAddress: "203.0.113.0/24",
      Policy: "Allow"
    }
  }
});
```

## Advanced Configuration

Configure a receipt filter with an additional option to adopt an existing resource if it already exists.

```ts
const advancedReceiptFilter = await AWS.SES.ReceiptFilter("advanced-receipt-filter", {
  Filter: {
    Name: "AllowMultipleIPs",
    IpFilter: {
      IpAddress: "198.51.100.0/24",
      Policy: "Allow"
    }
  },
  adopt: true // Adopt the existing receipt filter if it is already present
});
```

## Example with Deny Policy

Create a receipt filter that denies a specific IP address from sending emails.

```ts
const denyReceiptFilter = await AWS.SES.ReceiptFilter("deny-receipt-filter", {
  Filter: {
    Name: "DenySpecificIP",
    IpFilter: {
      IpAddress: "192.0.2.0/24",
      Policy: "Deny"
    }
  }
});
```

## Example with Multiple Filters

You can create multiple receipt filters to manage different sets of IP addresses.

```ts
const multipleFilters = await AWS.SES.ReceiptFilter("multiple-filters", {
  Filter: {
    Name: "CombinedFilters",
    IpFilter: {
      IpAddress: "203.0.113.0/24",
      Policy: "Allow"
    }
  },
  adopt: true // This will adopt existing resources if any
});

// Adding another filter
const secondFilter = await AWS.SES.ReceiptFilter("deny-filter", {
  Filter: {
    Name: "DenyIPRange",
    IpFilter: {
      IpAddress: "192.0.2.0/24",
      Policy: "Deny"
    }
  }
});
```
