---
title: Managing AWS CloudFormation PublicTypeVersions with Alchemy
description: Learn how to create, update, and manage AWS CloudFormation PublicTypeVersions using Alchemy Cloud Control.
---

# PublicTypeVersion

The PublicTypeVersion resource lets you create and manage [AWS CloudFormation PublicTypeVersions](https://docs.aws.amazon.com/cloudformation/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudformation-publictypeversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const publictypeversion = await AWS.CloudFormation.PublicTypeVersion(
  "publictypeversion-example",
  {}
);
```

