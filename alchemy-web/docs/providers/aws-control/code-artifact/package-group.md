---
title: Managing AWS CodeArtifact PackageGroups with Alchemy
description: Learn how to create, update, and manage AWS CodeArtifact PackageGroups using Alchemy Cloud Control.
---

# PackageGroup

The PackageGroup resource lets you create and manage [AWS CodeArtifact PackageGroups](https://docs.aws.amazon.com/codeartifact/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codeartifact-packagegroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const packagegroup = await AWS.CodeArtifact.PackageGroup("packagegroup-example", {
  Pattern: "example-pattern",
  DomainName: "packagegroup-domain",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A packagegroup resource managed by Alchemy",
});
```

## Advanced Configuration

Create a packagegroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPackageGroup = await AWS.CodeArtifact.PackageGroup("advanced-packagegroup", {
  Pattern: "example-pattern",
  DomainName: "packagegroup-domain",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A packagegroup resource managed by Alchemy",
});
```

