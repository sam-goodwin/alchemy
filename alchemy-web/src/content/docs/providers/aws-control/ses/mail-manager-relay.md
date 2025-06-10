---
title: MailManagerRelay
description: Learn how to create, update, and manage AWS SES MailManagerRelays using Alchemy Cloud Control.
---


The MailManagerRelay resource allows you to manage [AWS SES MailManagerRelays](https://docs.aws.amazon.com/ses/latest/userguide/) for sending email through Amazon Simple Email Service (SES). This resource provides configuration settings for authentication, server details, and optional tags.

## Minimal Example

Create a basic MailManagerRelay with required properties and common optional values.

```ts
import AWS from "alchemy/aws/control";

const mailRelay = await AWS.SES.MailManagerRelay("basicRelay", {
  Authentication: "SMTP", // Example value for authentication
  ServerName: "smtp.example.com",
  ServerPort: 587,
  RelayName: "Example Relay", // Optional name for the relay
  Tags: [{ Key: "Environment", Value: "Development" }] // Optional tags
});
```

## Advanced Configuration

Configure a MailManagerRelay with additional settings for tags and adopting existing resources.

```ts
const advancedMailRelay = await AWS.SES.MailManagerRelay("advancedRelay", {
  Authentication: "API_KEY",
  ServerName: "smtp.secureexample.com",
  ServerPort: 465,
  RelayName: "Advanced Secure Relay",
  Tags: [
    { Key: "Project", Value: "Email Service" },
    { Key: "Owner", Value: "Dev Team" }
  ],
  adopt: true // Adopt an existing resource if it already exists
});
```

## Custom Port and Tags

Create a MailManagerRelay specifically configured for a custom port and multiple tags.

```ts
const customPortRelay = await AWS.SES.MailManagerRelay("customPortRelay", {
  Authentication: "SMTP",
  ServerName: "smtp.customexample.com",
  ServerPort: 25, // Custom port for SMTP
  RelayName: "Custom Port Relay",
  Tags: [
    { Key: "Department", Value: "Marketing" },
    { Key: "Usage", Value: "Transactional Emails" }
  ]
});
```
