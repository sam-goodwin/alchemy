---
title: SnapshotBlockPublicAccess
description: Learn how to create, update, and manage AWS EC2 SnapshotBlockPublicAccesss using Alchemy Cloud Control.
---


The SnapshotBlockPublicAccess resource allows you to control the public access settings for Amazon EC2 snapshots. By configuring this resource, you can ensure that your snapshots are not publicly accessible, thereby enhancing your security posture. For more details, refer to the [AWS EC2 SnapshotBlockPublicAccess documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic SnapshotBlockPublicAccess resource with the required state property set to "enabled".

```ts
import AWS from "alchemy/aws/control";

const snapshotBlockPublicAccess = await AWS.EC2.SnapshotBlockPublicAccess("blockPublicAccess", {
  State: "enabled",
  adopt: false // By default, set to false to not adopt existing resources.
});
```

## Advanced Configuration

You can adopt an existing SnapshotBlockPublicAccess if it already exists by setting the `adopt` property to `true`.

```ts
const adoptedSnapshotBlockPublicAccess = await AWS.EC2.SnapshotBlockPublicAccess("adoptBlockPublicAccess", {
  State: "enabled",
  adopt: true // This will adopt the existing resource.
});
```

## Customizing State

You can also disable public access by setting the state to "disabled".

```ts
const snapshotBlockPublicAccessDisabled = await AWS.EC2.SnapshotBlockPublicAccess("disablePublicAccess", {
  State: "disabled"
});
```

## Checking Resource Details

After creating the SnapshotBlockPublicAccess resource, you can access additional properties such as ARN, creation time, and last update time.

```ts
const snapshotBlockPublicAccessDetails = await AWS.EC2.SnapshotBlockPublicAccess("detailsBlockPublicAccess", {
  State: "enabled"
});

// Accessing additional properties
console.log(snapshotBlockPublicAccessDetails.Arn);
console.log(snapshotBlockPublicAccessDetails.CreationTime);
console.log(snapshotBlockPublicAccessDetails.LastUpdateTime);
```
