---
title: Managing AWS Organizations Organizations with Alchemy
description: Learn how to create, update, and manage AWS Organizations Organizations using Alchemy Cloud Control.
---

# Organization

The Organization resource lets you create and manage [AWS Organizations Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-organizations-organization.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const organization = await AWS.Organizations.Organization("organization-example", {});
```

