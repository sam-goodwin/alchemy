---
title: Managing AWS SES ReceiptFilters with Alchemy
description: Learn how to create, update, and manage AWS SES ReceiptFilters using Alchemy Cloud Control.
---

# ReceiptFilter

The ReceiptFilter resource lets you create and manage [AWS SES ReceiptFilters](https://docs.aws.amazon.com/ses/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptfilter.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const receiptfilter = await AWS.SES.ReceiptFilter("receiptfilter-example", {
  Filter: "example-filter",
});
```

