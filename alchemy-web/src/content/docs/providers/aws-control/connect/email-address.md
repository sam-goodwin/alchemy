---
title: EmailAddress
description: Learn how to create, update, and manage AWS Connect EmailAddresss using Alchemy Cloud Control.
---


The EmailAddress resource lets you manage [AWS Connect Email Addresses](https://docs.aws.amazon.com/connect/latest/userguide/) for your contact center, enabling email communication capabilities.

## Minimal Example

Create a basic email address associated with an AWS Connect instance, including a description and display name.

```ts
import AWS from "alchemy/aws/control";

const emailAddress = await AWS.Connect.EmailAddress("customerSupportEmail", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-abcd-1234-abcd-1234567890ab",
  EmailAddress: "support@example.com",
  Description: "Customer support email address",
  DisplayName: "Customer Support"
});
```

## Advanced Configuration

Configure an email address with tags for better management and organization.

```ts
const taggedEmailAddress = await AWS.Connect.EmailAddress("salesEmail", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-abcd-1234-abcd-1234567890ab",
  EmailAddress: "sales@example.com",
  Description: "Sales department email address",
  DisplayName: "Sales Team",
  Tags: [
    { Key: "Department", Value: "Sales" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing email address instead of creating a new one, you can set the adopt property to true.

```ts
const existingEmailAddress = await AWS.Connect.EmailAddress("existingSupportEmail", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-abcd-1234-abcd-1234567890ab",
  EmailAddress: "existing-support@example.com",
  adopt: true // Adopt existing resource if it exists
});
```

## Updating an Email Address

Update the display name of an existing email address.

```ts
const updatedEmailAddress = await AWS.Connect.EmailAddress("updatedSupportEmail", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-abcd-1234-abcd-1234567890ab",
  EmailAddress: "support@example.com",
  Description: "Updated customer support email address",
  DisplayName: "Updated Customer Support"
});
```
