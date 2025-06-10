---
title: IpAccessSettings
description: Learn how to create, update, and manage AWS WorkSpacesWeb IpAccessSettings using Alchemy Cloud Control.
---


The IpAccessSettings resource lets you manage [AWS WorkSpacesWeb IpAccessSettings](https://docs.aws.amazon.com/workspacesweb/latest/userguide/) for controlling access to your applications based on IP address rules.

## Minimal Example

Create basic IP access settings with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const ipAccessSettings = await AWS.WorkSpacesWeb.IpAccessSettings("basicIpAccessSettings", {
  IpRules: [
    {
      ipRule: "192.168.1.0/24",
      ruleAction: "ALLOW"
    },
    {
      ipRule: "10.0.0.0/8",
      ruleAction: "DENY"
    }
  ],
  Description: "Basic IP access settings for application access"
});
```

## Advanced Configuration

Configure IP access settings with additional encryption context and a customer-managed key for enhanced security.

```ts
const advancedIpAccessSettings = await AWS.WorkSpacesWeb.IpAccessSettings("advancedIpAccessSettings", {
  IpRules: [
    {
      ipRule: "203.0.113.0/24",
      ruleAction: "ALLOW"
    },
    {
      ipRule: "198.51.100.0/24",
      ruleAction: "DENY"
    }
  ],
  Description: "Advanced IP access settings with encryption",
  CustomerManagedKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  AdditionalEncryptionContext: {
    "Project": "WebApp",
    "Environment": "Production"
  },
  DisplayName: "Advanced Access Settings"
});
```

## Using Tags for Resource Management

Create IP access settings with tags for better organization and management.

```ts
const taggedIpAccessSettings = await AWS.WorkSpacesWeb.IpAccessSettings("taggedIpAccessSettings", {
  IpRules: [
    {
      ipRule: "192.0.2.0/24",
      ruleAction: "ALLOW"
    }
  ],
  Description: "IP access settings with tags",
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    },
    {
      Key: "Department",
      Value: "IT"
    }
  ]
});
```

## Adopting Existing Resources

Create IP access settings while adopting an existing resource to avoid failures.

```ts
const adoptedIpAccessSettings = await AWS.WorkSpacesWeb.IpAccessSettings("adoptedIpAccessSettings", {
  IpRules: [
    {
      ipRule: "172.16.0.0/12",
      ruleAction: "ALLOW"
    }
  ],
  Description: "Adopt existing IP access settings",
  adopt: true
});
```
