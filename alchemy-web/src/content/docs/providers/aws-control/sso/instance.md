---
title: Instance
description: Learn how to create, update, and manage AWS SSO Instances using Alchemy Cloud Control.
---


The Instance resource lets you manage [AWS SSO Instances](https://docs.aws.amazon.com/sso/latest/userguide/) and their configurations.

## Minimal Example

Create a basic AWS SSO Instance with a name and some tags.

```ts
import AWS from "alchemy/aws/control";

const ssoInstance = await AWS.SSO.Instance("mySsoInstance", {
  Name: "MySSOInstance",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "Alchemy" }
  ]
});
```

## Advanced Configuration

Configure an SSO Instance with the option to adopt an existing resource.

```ts
const existingSsoInstance = await AWS.SSO.Instance("existingSsoInstance", {
  Name: "ExistingSSOInstance",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ],
  adopt: true // Adopt an existing resource instead of failing
});
```

## Updating Instance Tags

Update the tags for an existing SSO Instance to reflect a change in project status.

```ts
const updatedSsoInstance = await AWS.SSO.Instance("updateSsoInstance", {
  Name: "MySSOInstance",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Project", Value: "Alchemy-Updated" }
  ]
});
```

## Retrieving Instance Information

Fetch and log the ARN and creation time of an AWS SSO Instance.

```ts
const ssoInstanceInfo = await AWS.SSO.Instance("mySsoInstance", {
  Name: "MySSOInstance"
});

console.log(`SSO Instance ARN: ${ssoInstanceInfo.Arn}`);
console.log(`Creation Time: ${ssoInstanceInfo.CreationTime}`);
```
