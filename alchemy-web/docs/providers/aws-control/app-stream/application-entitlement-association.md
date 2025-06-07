---
title: Managing AWS AppStream ApplicationEntitlementAssociations with Alchemy
description: Learn how to create, update, and manage AWS AppStream ApplicationEntitlementAssociations using Alchemy Cloud Control.
---

# ApplicationEntitlementAssociation

The ApplicationEntitlementAssociation resource lets you create and manage [AWS AppStream ApplicationEntitlementAssociations](https://docs.aws.amazon.com/appstream/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-applicationentitlementassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const applicationentitlementassociation = await AWS.AppStream.ApplicationEntitlementAssociation(
  "applicationentitlementassociation-example",
  {
    EntitlementName: "applicationentitlementassociation-entitlement",
    ApplicationIdentifier: "example-applicationidentifier",
    StackName: "applicationentitlementassociation-stack",
  }
);
```

