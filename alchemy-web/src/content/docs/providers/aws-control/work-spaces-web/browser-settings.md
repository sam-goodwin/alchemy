---
title: BrowserSettings
description: Learn how to create, update, and manage AWS WorkSpacesWeb BrowserSettingss using Alchemy Cloud Control.
---


The BrowserSettings resource allows you to manage the configuration settings for browser settings in AWS WorkSpacesWeb. For more information, refer to the [AWS WorkSpacesWeb BrowserSettings documentation](https://docs.aws.amazon.com/workspacesweb/latest/userguide/).

## Minimal Example

Create a basic BrowserSettings resource with a browser policy and a customer-managed key.

```ts
import AWS from "alchemy/aws/control";

const basicBrowserSettings = await AWS.WorkSpacesWeb.BrowserSettings("basicBrowserSettings", {
  BrowserPolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "workspacesweb:StartBrowserSession",
        Resource: "*"
      }
    ]
  }),
  CustomerManagedKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-12ab-34cd-56ef-1234567890ab"
});
```

## Advanced Configuration

Configure a BrowserSettings resource with additional encryption context and tags for resource management.

```ts
const advancedBrowserSettings = await AWS.WorkSpacesWeb.BrowserSettings("advancedBrowserSettings", {
  BrowserPolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "workspacesweb:StartBrowserSession",
        Resource: "*"
      }
    ]
  }),
  CustomerManagedKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-12ab-34cd-56ef-1234567890ab",
  AdditionalEncryptionContext: {
    "User": "exampleUser",
    "Session": "session-12345"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "WebApp" }
  ]
});
```

## Using Adopt Option

Create a BrowserSettings resource while adopting an existing resource if it already exists.

```ts
const adoptBrowserSettings = await AWS.WorkSpacesWeb.BrowserSettings("adoptBrowserSettings", {
  BrowserPolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "workspacesweb:StartBrowserSession",
        Resource: "*"
      }
    ]
  }),
  CustomerManagedKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-12ab-34cd-56ef-1234567890ab",
  adopt: true
});
```
