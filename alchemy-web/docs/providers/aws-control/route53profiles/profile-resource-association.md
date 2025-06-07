---
title: Managing AWS Route53Profiles ProfileResourceAssociations with Alchemy
description: Learn how to create, update, and manage AWS Route53Profiles ProfileResourceAssociations using Alchemy Cloud Control.
---

# ProfileResourceAssociation

The ProfileResourceAssociation resource lets you create and manage [AWS Route53Profiles ProfileResourceAssociations](https://docs.aws.amazon.com/route53profiles/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53profiles-profileresourceassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const profileresourceassociation = await AWS.Route53Profiles.ProfileResourceAssociation(
  "profileresourceassociation-example",
  {
    ProfileId: "example-profileid",
    ResourceArn: "example-resourcearn",
    Name: "profileresourceassociation-",
  }
);
```

