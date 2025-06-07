---
title: Managing AWS DataZone ProjectMemberships with Alchemy
description: Learn how to create, update, and manage AWS DataZone ProjectMemberships using Alchemy Cloud Control.
---

# ProjectMembership

The ProjectMembership resource lets you create and manage [AWS DataZone ProjectMemberships](https://docs.aws.amazon.com/datazone/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datazone-projectmembership.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const projectmembership = await AWS.DataZone.ProjectMembership("projectmembership-example", {
  ProjectIdentifier: "example-projectidentifier",
  Designation: "example-designation",
  Member: "example-member",
  DomainIdentifier: "example-domainidentifier",
});
```

