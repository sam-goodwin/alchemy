---
title: App
description: Learn how to create, update, and manage AWS Pinpoint Apps using Alchemy Cloud Control.
---


The App resource lets you manage [AWS Pinpoint Apps](https://docs.aws.amazon.com/pinpoint/latest/userguide/) for sending targeted push notifications, emails, and SMS messages to your users.

## Minimal Example

Create a basic Pinpoint App with a specified name and optional tags.

```ts
import AWS from "alchemy/aws/control";

const pinpointApp = await AWS.Pinpoint.App("myPinpointApp", {
  name: "My Awesome App",
  tags: {
    environment: "production",
    team: "marketing"
  }
});
```

## Advanced Configuration

Configure an app with additional properties such as adopting an existing resource.

```ts
const existingApp = await AWS.Pinpoint.App("existingPinpointApp", {
  name: "Existing App",
  adopt: true // Adopts the existing resource if it already exists
});
```

## App with Custom Tags

Create a Pinpoint App with custom tags to help categorize resources.

```ts
const taggedApp = await AWS.Pinpoint.App("taggedPinpointApp", {
  name: "My Tagged App",
  tags: {
    project: "User Engagement",
    owner: "dev-team"
  }
});
```

## App with Adoption Logic

Handle resource adoption in a situation where the app may already exist.

```ts
const adoptedApp = await AWS.Pinpoint.App("adoptedPinpointApp", {
  name: "Adopted App",
  adopt: true,
  tags: {
    status: "active",
    department: "sales"
  }
});
```
