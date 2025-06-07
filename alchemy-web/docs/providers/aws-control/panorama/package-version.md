---
title: Managing AWS Panorama PackageVersions with Alchemy
description: Learn how to create, update, and manage AWS Panorama PackageVersions using Alchemy Cloud Control.
---

# PackageVersion

The PackageVersion resource lets you create and manage [AWS Panorama PackageVersions](https://docs.aws.amazon.com/panorama/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-panorama-packageversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const packageversion = await AWS.Panorama.PackageVersion("packageversion-example", {
  PatchVersion: "example-patchversion",
  PackageId: "example-packageid",
  PackageVersion: "example-packageversion",
});
```

