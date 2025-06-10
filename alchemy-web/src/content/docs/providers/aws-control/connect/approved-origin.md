---
title: ApprovedOrigin
description: Learn how to create, update, and manage AWS Connect ApprovedOrigins using Alchemy Cloud Control.
---


The ApprovedOrigin resource allows you to manage [AWS Connect ApprovedOrigins](https://docs.aws.amazon.com/connect/latest/userguide/) which are essential for controlling the origins that can connect to your Amazon Connect instance.

## Minimal Example

Create a basic ApprovedOrigin resource with required properties:

```ts
import AWS from "alchemy/aws/control";

const approvedOrigin = await AWS.Connect.ApprovedOrigin("basicApprovedOrigin", {
  Origin: "https://my-web-app.example.com",
  InstanceId: "abc12345-6789-0abc-defg-1234567890ab"
});
```

## Advanced Configuration

Create an ApprovedOrigin resource while adopting an existing resource, preventing failure if it already exists:

```ts
const existingApprovedOrigin = await AWS.Connect.ApprovedOrigin("existingApprovedOrigin", {
  Origin: "https://another-web-app.example.com",
  InstanceId: "abc12345-6789-0abc-defg-1234567890ab",
  adopt: true
});
```

## Multiple Origins

Manage multiple origins by creating multiple ApprovedOrigin resources for the same instance:

```ts
const firstApprovedOrigin = await AWS.Connect.ApprovedOrigin("firstApprovedOrigin", {
  Origin: "https://first-app.example.com",
  InstanceId: "abc12345-6789-0abc-defg-1234567890ab"
});

const secondApprovedOrigin = await AWS.Connect.ApprovedOrigin("secondApprovedOrigin", {
  Origin: "https://second-app.example.com",
  InstanceId: "abc12345-6789-0abc-defg-1234567890ab"
});
```

## Updating an Approved Origin

Update the origin for an existing ApprovedOrigin resource:

```ts
const updatedApprovedOrigin = await AWS.Connect.ApprovedOrigin("updateApprovedOrigin", {
  Origin: "https://updated-app.example.com",
  InstanceId: "abc12345-6789-0abc-defg-1234567890ab"
});
```
