---
title: Managing AWS Deadline Farms with Alchemy
description: Learn how to create, update, and manage AWS Deadline Farms using Alchemy Cloud Control.
---

# Farm

The Farm resource lets you manage [AWS Deadline Farms](https://docs.aws.amazon.com/deadline/latest/userguide/) for rendering workloads in a cloud environment.

## Minimal Example

Create a basic Deadline Farm with a display name and an optional description.

```ts
import AWS from "alchemy/aws/control";

const BasicFarm = await AWS.Deadline.Farm("BasicFarm", {
  DisplayName: "MyBasicFarm",
  Description: "This is a basic Deadline Farm for rendering tasks."
});
```

## Advanced Configuration

Configure a Deadline Farm with a KMS key for encryption and tags for resource management.

```ts
const EncryptedFarm = await AWS.Deadline.Farm("EncryptedFarm", {
  DisplayName: "MyEncryptedFarm",
  KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Render" }
  ]
});
```

## Adoption of Existing Resource

Create a Deadline Farm that adopts an existing resource if it already exists.

```ts
const AdoptedFarm = await AWS.Deadline.Farm("AdoptedFarm", {
  DisplayName: "MyAdoptedFarm",
  adopt: true // This will adopt the existing resource instead of failing
});
```

## Farm with Detailed Tags

Set up a Deadline Farm with detailed tagging for better resource management.

```ts
const TaggedFarm = await AWS.Deadline.Farm("TaggedFarm", {
  DisplayName: "MyTaggedFarm",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Owner", Value: "DevOps" },
    { Key: "Project", Value: "Rendering" }
  ]
});
```