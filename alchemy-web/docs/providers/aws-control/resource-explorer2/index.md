---
title: Managing AWS ResourceExplorer2 Indexs with Alchemy
description: Learn how to create, update, and manage AWS ResourceExplorer2 Indexs using Alchemy Cloud Control.
---

# Index

The Index resource allows you to manage [AWS ResourceExplorer2 Indexes](https://docs.aws.amazon.com/resourceexplorer2/latest/userguide/) which are used to index resources in AWS accounts for easier searching and management.

## Minimal Example

Create a basic Index with required properties and some common optional tags.

```ts
import AWS from "alchemy/aws/control";

const basicIndex = await AWS.ResourceExplorer2.Index("BasicIndex", {
  Type: "AWS::ResourceExplorer2::Index",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "ResourceManagement" }
  ]
});
```

## Advanced Configuration

Configure an Index with the adoption feature enabled, allowing you to adopt an existing resource instead of failing if it already exists.

```ts
const advancedIndex = await AWS.ResourceExplorer2.Index("AdvancedIndex", {
  Type: "AWS::ResourceExplorer2::Index",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Operations" }
  ],
  adopt: true
});
```

## Custom Index with Detailed Tags

Create a custom Index with detailed tagging for better resource organization.

```ts
const customTaggedIndex = await AWS.ResourceExplorer2.Index("CustomTaggedIndex", {
  Type: "AWS::ResourceExplorer2::Index",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Owner", Value: "DevTeam" },
    { Key: "Application", Value: "WebApp" }
  ]
});
```

## Using the Index Resource

This example demonstrates how to utilize the created Index in conjunction with other resources.

```ts
const myResourceIndex = await AWS.ResourceExplorer2.Index("MyResourceIndex", {
  Type: "AWS::ResourceExplorer2::Index",
  Tags: [
    { Key: "Environment", Value: "Test" },
    { Key: "Service", Value: "API" }
  ]
});

// Further usage of the resource index can be done here
console.log(`Created Index ARN: ${myResourceIndex.Arn}`);
```