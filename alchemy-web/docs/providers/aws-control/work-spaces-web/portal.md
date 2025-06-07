---
title: Managing AWS WorkSpacesWeb Portals with Alchemy
description: Learn how to create, update, and manage AWS WorkSpacesWeb Portals using Alchemy Cloud Control.
---

# Portal

The Portal resource lets you manage [AWS WorkSpacesWeb Portals](https://docs.aws.amazon.com/workspacesweb/latest/userguide/) which provide users access to web applications and resources in a secure manner.

## Minimal Example

Create a basic WorkSpacesWeb Portal with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicPortal = await AWS.WorkSpacesWeb.Portal("BasicPortal", {
  TrustStoreArn: "arn:aws:acm:us-west-2:123456789012:certificate/12345678-1234-1234-1234-123456789012",
  BrowserSettingsArn: "arn:aws:workspaces-web:us-west-2:123456789012:browser-settings/12345678",
  DisplayName: "Basic WorkSpacesWeb Portal",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```

## Advanced Configuration

Configure a WorkSpacesWeb Portal with additional security settings and logging options.

```ts
const advancedPortal = await AWS.WorkSpacesWeb.Portal("AdvancedPortal", {
  TrustStoreArn: "arn:aws:acm:us-west-2:123456789012:certificate/12345678-1234-1234-1234-123456789012",
  BrowserSettingsArn: "arn:aws:workspaces-web:us-west-2:123456789012:browser-settings/87654321",
  UserAccessLoggingSettingsArn: "arn:aws:workspaces-web:us-west-2:123456789012:user-access-logging-settings/87654321",
  IpAccessSettingsArn: "arn:aws:workspaces-web:us-west-2:123456789012:ip-access-settings/12345678",
  InstanceType: "t3.medium",
  MaxConcurrentSessions: 50,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "OpsTeam" }
  ]
});
```

## Custom Encryption Configuration

Set up a portal that uses custom encryption keys for enhanced security.

```ts
const securePortal = await AWS.WorkSpacesWeb.Portal("SecurePortal", {
  TrustStoreArn: "arn:aws:acm:us-west-2:123456789012:certificate/12345678-1234-1234-1234-123456789012",
  BrowserSettingsArn: "arn:aws:workspaces-web:us-west-2:123456789012:browser-settings/13572468",
  CustomerManagedKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-ab12-cd34-ef56-abcdef123456",
  AdditionalEncryptionContext: {
    "Project": "WebAppProject",
    "Environment": "Production"
  },
  DisplayName: "Secure WorkSpacesWeb Portal",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "WebApp" }
  ]
});
```

## Networking Configuration

Create a WorkSpacesWeb Portal with specific networking settings.

```ts
const networkConfiguredPortal = await AWS.WorkSpacesWeb.Portal("NetworkConfiguredPortal", {
  TrustStoreArn: "arn:aws:acm:us-west-2:123456789012:certificate/12345678-1234-1234-1234-123456789012",
  BrowserSettingsArn: "arn:aws:workspaces-web:us-west-2:123456789012:browser-settings/24681357",
  NetworkSettingsArn: "arn:aws:workspaces-web:us-west-2:123456789012:network-settings/abcdef12",
  InstanceType: "t3.large",
  MaxConcurrentSessions: 100,
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Department", Value: "Engineering" }
  ]
});
```