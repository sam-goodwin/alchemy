---
title: Managing AWS CloudFormation ResourceDefaultVersions with Alchemy
description: Learn how to create, update, and manage AWS CloudFormation ResourceDefaultVersions using Alchemy Cloud Control.
---

# ResourceDefaultVersion

The ResourceDefaultVersion resource lets you create and manage [AWS CloudFormation ResourceDefaultVersions](https://docs.aws.amazon.com/cloudformation/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudformation-resourcedefaultversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resourcedefaultversion = await AWS.CloudFormation.ResourceDefaultVersion(
  "resourcedefaultversion-example",
  {}
);
```

