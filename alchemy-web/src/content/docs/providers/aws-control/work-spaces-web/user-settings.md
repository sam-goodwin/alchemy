---
title: UserSettings
description: Learn how to create, update, and manage AWS WorkSpacesWeb UserSettingss using Alchemy Cloud Control.
---


The UserSettings resource allows you to manage [AWS WorkSpacesWeb UserSettings](https://docs.aws.amazon.com/workspacesweb/latest/userguide/) configurations, which define user experience and permissions in the WorkSpacesWeb environment.

## Minimal Example

Create a UserSettings with required properties and a couple of common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const userSettings = await AWS.WorkSpacesWeb.UserSettings("basicUserSettings", {
  PrintAllowed: "ENABLED",
  CopyAllowed: "ENABLED",
  DownloadAllowed: "ENABLED",
  UploadAllowed: "DISABLED",
  IdleDisconnectTimeoutInMinutes: 10,
  DisconnectTimeoutInMinutes: 5
});
```

## Advanced Configuration

Configure a UserSettings with advanced options for enhanced security and user experience.

```ts
const advancedUserSettings = await AWS.WorkSpacesWeb.UserSettings("advancedUserSettings", {
  PrintAllowed: "ENABLED",
  CopyAllowed: "ENABLED",
  DownloadAllowed: "ENABLED",
  UploadAllowed: "ENABLED",
  IdleDisconnectTimeoutInMinutes: 15,
  DisconnectTimeoutInMinutes: 10,
  DeepLinkAllowed: "ENABLED",
  ToolbarConfiguration: {
    // Example toolbar configuration
    toolbarItems: [
      "print",
      "copy",
      "download"
    ]
  }
});
```

## Configuring Cookie Synchronization

Set up UserSettings to include cookie synchronization for a seamless experience across sessions.

```ts
const cookieSyncUserSettings = await AWS.WorkSpacesWeb.UserSettings("cookieSyncUserSettings", {
  PrintAllowed: "ENABLED",
  CopyAllowed: "ENABLED",
  DownloadAllowed: "ENABLED",
  UploadAllowed: "ENABLED",
  CookieSynchronizationConfiguration: {
    // Example cookie synchronization settings
    enabled: true,
    cookieNames: ["sessionId", "userId"]
  }
});
```

## Implementing Encryption Context

Create UserSettings that utilize a customer-managed key for enhanced data security with an additional encryption context.

```ts
const encryptedUserSettings = await AWS.WorkSpacesWeb.UserSettings("encryptedUserSettings", {
  PrintAllowed: "ENABLED",
  CopyAllowed: "DISABLED",
  DownloadAllowed: "DISABLED",
  UploadAllowed: "ENABLED",
  CustomerManagedKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  AdditionalEncryptionContext: {
    userId: "user-12345",
    sessionId: "session-67890"
  }
});
```
