---
title: DirectoryRegistration
description: Learn how to create, update, and manage AWS PCAConnectorAD DirectoryRegistrations using Alchemy Cloud Control.
---


The DirectoryRegistration resource allows you to manage [AWS PCAConnectorAD DirectoryRegistrations](https://docs.aws.amazon.com/pcaconnectorad/latest/userguide/) which enable the integration of AWS Private Certificate Authority with Active Directory.

## Minimal Example

Create a basic DirectoryRegistration with required properties and a tag.

```ts
import AWS from "alchemy/aws/control";

const directoryRegistration = await AWS.PCAConnectorAD.DirectoryRegistration("myDirectoryRegistration", {
  DirectoryId: "d-1234567890", // Your Active Directory ID
  Tags: {
    Environment: "Development"
  }
});
```

## Advanced Configuration

Configure a DirectoryRegistration with additional properties, including the adopt option to handle existing resources.

```ts
const advancedDirectoryRegistration = await AWS.PCAConnectorAD.DirectoryRegistration("myAdvancedDirectoryRegistration", {
  DirectoryId: "d-0987654321", // Your Active Directory ID
  Tags: {
    Project: "MyProject",
    Owner: "admin@example.com"
  },
  adopt: true // Adopt existing resource if it already exists
});
```

## Using Tags for Resource Management

Create a DirectoryRegistration that uses multiple tags for better resource management and identification.

```ts
const taggedDirectoryRegistration = await AWS.PCAConnectorAD.DirectoryRegistration("myTaggedDirectoryRegistration", {
  DirectoryId: "d-1122334455", // Your Active Directory ID
  Tags: {
    Environment: "Production",
    Department: "IT",
    Owner: "it-admin@example.com"
  }
});
```

## Handling Updates

Demonstrate updating an existing DirectoryRegistration by modifying its tags.

```ts
const updateDirectoryRegistration = await AWS.PCAConnectorAD.DirectoryRegistration("myUpdateDirectoryRegistration", {
  DirectoryId: "d-5566778899", // Your Active Directory ID
  Tags: {
    Environment: "Staging", // Updated tag
    Owner: "admin@example.com"
  }
});
```
