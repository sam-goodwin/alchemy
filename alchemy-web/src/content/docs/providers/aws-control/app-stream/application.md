---
title: Application
description: Learn how to create, update, and manage AWS AppStream Applications using Alchemy Cloud Control.
---


The Application resource lets you manage [AWS AppStream Applications](https://docs.aws.amazon.com/appstream/latest/userguide/) for delivering desktop applications to users over the internet.

## Minimal Example

Create a basic AWS AppStream application with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const appStreamApplication = await AWS.AppStream.Application("basicApp", {
  name: "BasicApp",
  appBlockArn: "arn:aws:appstream:us-east-1:123456789012:app-block/basic-app-block",
  launchPath: "C:\\Program Files\\BasicApp\\basic.exe",
  platforms: ["WINDOWS"],
  instanceFamilies: ["stream.standard"],
  iconS3Location: {
    bucket: "my-app-icons",
    key: "basic-app-icon.png"
  }
});
```

## Advanced Configuration

Configure an AWS AppStream application with additional optional properties for enhanced functionality.

```ts
const advancedAppStreamApplication = await AWS.AppStream.Application("advancedApp", {
  name: "AdvancedApp",
  appBlockArn: "arn:aws:appstream:us-east-1:123456789012:app-block/advanced-app-block",
  launchPath: "C:\\Program Files\\AdvancedApp\\advanced.exe",
  platforms: ["WINDOWS"],
  instanceFamilies: ["stream.standard"],
  description: "An advanced application for demonstration purposes.",
  displayName: "Advanced Application",
  launchParameters: "--mode=development",
  workingDirectory: "C:\\Program Files\\AdvancedApp\\",
  iconS3Location: {
    bucket: "my-app-icons",
    key: "advanced-app-icon.png"
  },
  tags: [
    { key: "Environment", value: "Development" },
    { key: "Project", value: "Demo" }
  ]
});
```

## Updating Application Properties

Demonstrate how to update the properties of an existing application by modifying its description and tags.

```ts
const updatedAppStreamApplication = await AWS.AppStream.Application("advancedApp", {
  description: "Updated advanced application description.",
  attributesToDelete: ["tags"],
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "Demo" }
  ]
});
```

## Deleting an Application

Show how to delete an existing application from AWS AppStream.

```ts
const deleteAppStreamApplication = await AWS.AppStream.Application("advancedApp", {
  adopt: true // Allows the deletion of an existing resource
});
```
