---
title: Managing AWS Connect EmailAddresss with Alchemy
description: Learn how to create, update, and manage AWS Connect EmailAddresss using Alchemy Cloud Control.
---

# EmailAddress

The EmailAddress resource lets you manage email addresses within AWS Connect for customer engagement. For more information, visit the [AWS Connect EmailAddresss documentation](https://docs.aws.amazon.com/connect/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic email address resource with required properties and an optional display name.

```ts
import AWS from "alchemy/aws/control";

const basicEmailAddress = await AWS.Connect.EmailAddress("BasicEmail", {
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcd1234-5678-90ef-ghij-1234567890ab",
  EmailAddress: "support@example.com",
  DisplayName: "Support Team"
});
```

## Advanced Configuration

In this example, we will create an email address with a description and tags for better organization.

```ts
const advancedEmailAddress = await AWS.Connect.EmailAddress("AdvancedEmail", {
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcd1234-5678-90ef-ghij-1234567890ab",
  EmailAddress: "sales@example.com",
  DisplayName: "Sales Team",
  Description: "Email address for the sales team",
  Tags: [
    { Key: "Department", Value: "Sales" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Adoption of Existing Resource

This example shows how to adopt an existing email address resource instead of failing if it already exists.

```ts
const adoptEmailAddress = await AWS.Connect.EmailAddress("AdoptEmail", {
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcd1234-5678-90ef-ghij-1234567890ab",
  EmailAddress: "info@example.com",
  adopt: true // Adopts the existing resource
});
```