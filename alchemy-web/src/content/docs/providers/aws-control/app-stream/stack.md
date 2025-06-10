---
title: Stack
description: Learn how to create, update, and manage AWS AppStream Stacks using Alchemy Cloud Control.
---


The Stack resource lets you manage [AWS AppStream Stacks](https://docs.aws.amazon.com/appstream/latest/userguide/) which provide users access to applications streamed from the cloud.

## Minimal Example

Create a basic AppStream Stack with essential properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicStack = await AWS.AppStream.Stack("basicAppStreamStack", {
  name: "BasicAppStreamStack",
  description: "A basic stack for streaming applications.",
  redirectURL: "https://redirect.example.com",
  displayName: "Basic AppStream Stack"
});
```

## Advanced Configuration

Configure an AppStream Stack with advanced settings including user settings and storage connectors.

```ts
import AWS from "alchemy/aws/control";

const advancedStack = await AWS.AppStream.Stack("advancedAppStreamStack", {
  name: "AdvancedAppStreamStack",
  description: "An advanced stack with enhanced configurations.",
  storageConnectors: [
    {
      connectorType: "HOMEFOLDER", // Example storage connector type
      resourceIdentifier: "home-folder" // Identifier for the connector
    }
  ],
  userSettings: [
    {
      action: "CLIPBOARD_COPY_FROM_LOCAL_DEVICE",
      permission: "ENABLED"
    },
    {
      action: "FILE_UPLOAD",
      permission: "ENABLED"
    }
  ],
  feedbackURL: "https://feedback.example.com"
});
```

## Configuration with Deletion of Storage Connectors

Create a stack that deletes existing storage connectors upon update.

```ts
import AWS from "alchemy/aws/control";

const deletionStack = await AWS.AppStream.Stack("deletionAppStreamStack", {
  name: "DeletionAppStreamStack",
  description: "A stack that deletes existing storage connectors.",
  deleteStorageConnectors: true,
  storageConnectors: [
    {
      connectorType: "GOOGLE_DRIVE",
      resourceIdentifier: "google-drive"
    }
  ]
});
```

## Stack with Access Endpoints

Set up an AppStream Stack that includes access endpoints for user connections.

```ts
import AWS from "alchemy/aws/control";

const endpointStack = await AWS.AppStream.Stack("endpointAppStreamStack", {
  name: "EndpointAppStreamStack",
  description: "A stack with access endpoints configured.",
  accessEndpoints: [
    {
      endpointType: "STREAMING",
      vpceId: "vpce-12345678" // Example VPC endpoint ID
    }
  ],
  userSettings: [
    {
      action: "CLIPBOARD_COPY_TO_LOCAL_DEVICE",
      permission: "ENABLED"
    }
  ]
});
```
