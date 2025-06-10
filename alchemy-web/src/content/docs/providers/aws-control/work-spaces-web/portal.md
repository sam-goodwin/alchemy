---
title: Portal
description: Learn how to create, update, and manage AWS WorkSpacesWeb Portals using Alchemy Cloud Control.
---


The Portal resource lets you manage [AWS WorkSpacesWeb Portals](https://docs.aws.amazon.com/workspacesweb/latest/userguide/) which provide secure access to web applications. 

## Minimal Example

Create a basic WorkSpacesWeb Portal with default settings and common optional properties.

```ts
import AWS from "alchemy/aws/control";

const workspacesWebPortal = await AWS.WorkSpacesWeb.Portal("basic-portal", {
  TrustStoreArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-abcd-1234-abcd-1234abcd1234",
  BrowserSettingsArn: "arn:aws:workspacesweb:us-east-1:123456789012:browser-settings/default",
  DisplayName: "Basic WorkSpacesWeb Portal",
  MaxConcurrentSessions: 50
});
```

## Advanced Configuration

Configure a WorkSpacesWeb Portal with more advanced properties including network settings and data protection.

```ts
const advancedWorkspacesWebPortal = await AWS.WorkSpacesWeb.Portal("advanced-portal", {
  TrustStoreArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-abcd-1234-abcd-1234abcd1234",
  BrowserSettingsArn: "arn:aws:workspacesweb:us-east-1:123456789012:browser-settings/advanced",
  NetworkSettingsArn: "arn:aws:workspacesweb:us-east-1:123456789012:network-settings/default",
  DataProtectionSettingsArn: "arn:aws:workspacesweb:us-east-1:123456789012:data-protection-settings/default",
  DisplayName: "Advanced WorkSpacesWeb Portal",
  InstanceType: "t3.medium",
  MaxConcurrentSessions: 100,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "WebAccess" }
  ]
});
```

## Custom Encryption and Logging Settings

Create a portal with custom encryption and user access logging features.

```ts
const secureWorkspacesWebPortal = await AWS.WorkSpacesWeb.Portal("secure-portal", {
  TrustStoreArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-abcd-1234-abcd-1234abcd1234",
  UserAccessLoggingSettingsArn: "arn:aws:workspacesweb:us-east-1:123456789012:user-access-logging-settings/default",
  CustomerManagedKey: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-abcd-1234-abcd-1234abcd1234",
  AdditionalEncryptionContext: {
    "Project": "WebAccess",
    "Environment": "Production"
  },
  DisplayName: "Secure WorkSpacesWeb Portal"
});
``` 

## IP Access Settings

Set up a WorkSpacesWeb Portal with specific IP access settings to restrict access.

```ts
const ipRestrictedWorkspacesWebPortal = await AWS.WorkSpacesWeb.Portal("ip-restricted-portal", {
  TrustStoreArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-abcd-1234-abcd-1234abcd1234",
  IpAccessSettingsArn: "arn:aws:workspacesweb:us-east-1:123456789012:ip-access-settings/default",
  DisplayName: "IP Restricted WorkSpacesWeb Portal",
  MaxConcurrentSessions: 25
});
```
