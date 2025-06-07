---
title: Managing AWS PCAConnectorAD DirectoryRegistrations with Alchemy
description: Learn how to create, update, and manage AWS PCAConnectorAD DirectoryRegistrations using Alchemy Cloud Control.
---

# DirectoryRegistration

The DirectoryRegistration resource allows you to manage AWS PCAConnectorAD Directory Registrations, enabling you to integrate AWS Private Certificate Authority (PCA) with your Active Directory environment. For more detailed information, refer to the [AWS PCAConnectorAD DirectoryRegistrations documentation](https://docs.aws.amazon.com/pcaconnectorad/latest/userguide/).

## Minimal Example

Create a basic DirectoryRegistration with the required DirectoryId and a tag.

```ts
import AWS from "alchemy/aws/control";

const basicDirectoryRegistration = await AWS.PCAConnectorAD.DirectoryRegistration("BasicDirectoryRegistration", {
  DirectoryId: "d-1234567890", // Example Directory ID
  Tags: [
    { Key: "Environment", Value: "development" }
  ]
});
```

## Advanced Configuration

Configure a DirectoryRegistration with additional properties like tags for better resource management.

```ts
const advancedDirectoryRegistration = await AWS.PCAConnectorAD.DirectoryRegistration("AdvancedDirectoryRegistration", {
  DirectoryId: "d-1234567890", // Example Directory ID
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Using Directory Registration in Applications

Incorporate the DirectoryRegistration into your application for certificate management.

```ts
const appDirectoryRegistration = await AWS.PCAConnectorAD.DirectoryRegistration("AppDirectoryRegistration", {
  DirectoryId: "d-0987654321", // Different Directory ID
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "QA" }
  ]
});

// Use the created DirectoryRegistration for further operations
console.log(`Directory Registration ARN: ${appDirectoryRegistration.Arn}`);
```