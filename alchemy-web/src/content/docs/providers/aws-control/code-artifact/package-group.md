---
title: PackageGroup
description: Learn how to create, update, and manage AWS CodeArtifact PackageGroups using Alchemy Cloud Control.
---


The PackageGroup resource allows you to manage [AWS CodeArtifact PackageGroups](https://docs.aws.amazon.com/codeartifact/latest/userguide/), which are collections of packages that can be used together. This resource is essential for organizing and managing your software packages in a CodeArtifact domain.

## Minimal Example

Create a basic PackageGroup with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicPackageGroup = await AWS.CodeArtifact.PackageGroup("myPackageGroup", {
  Pattern: "com/mycompany/*",
  DomainName: "my-domain",
  Description: "A group for managing company packages"
});
```

## Advanced Configuration

Configure a PackageGroup with additional options such as contact information and origin configuration.

```ts
import AWS from "alchemy/aws/control";

const advancedPackageGroup = await AWS.CodeArtifact.PackageGroup("advancedPackageGroup", {
  Pattern: "com/mycompany/*",
  DomainName: "my-domain",
  Description: "A group for managing company packages with advanced settings",
  ContactInfo: "dev-team@mycompany.com",
  OriginConfiguration: {
    // Specify origin configuration if needed
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Development" }
  ]
});
```

## Adoption of Existing Resources

If you want to adopt an existing PackageGroup instead of failing when it already exists, you can set the `adopt` property to true.

```ts
import AWS from "alchemy/aws/control";

const adoptedPackageGroup = await AWS.CodeArtifact.PackageGroup("existingPackageGroup", {
  Pattern: "com/mycompany/*",
  DomainName: "my-domain",
  adopt: true // This will adopt an existing resource if it already exists
});
```

## Using Tags for Resource Management

You can manage your PackageGroups effectively using tags for better organization and tracking.

```ts
import AWS from "alchemy/aws/control";

const taggedPackageGroup = await AWS.CodeArtifact.PackageGroup("taggedPackageGroup", {
  Pattern: "com/mycompany/*",
  DomainName: "my-domain",
  Tags: [
    { Key: "Project", Value: "CodeArtifactManagement" },
    { Key: "Owner", Value: "Alice" }
  ]
});
```
