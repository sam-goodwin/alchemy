---
title: Managing AWS ManagedBlockchain Members with Alchemy
description: Learn how to create, update, and manage AWS ManagedBlockchain Members using Alchemy Cloud Control.
---

# Member

The Member resource lets you create and manage [AWS ManagedBlockchain Members](https://docs.aws.amazon.com/managedblockchain/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-managedblockchain-member.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const member = await AWS.ManagedBlockchain.Member("member-example", {
  MemberConfiguration: "example-memberconfiguration",
});
```

