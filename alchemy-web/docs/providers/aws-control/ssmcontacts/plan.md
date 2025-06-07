---
title: Managing AWS SSMContacts Plans with Alchemy
description: Learn how to create, update, and manage AWS SSMContacts Plans using Alchemy Cloud Control.
---

# Plan

The Plan resource lets you create and manage [AWS SSMContacts Plans](https://docs.aws.amazon.com/ssmcontacts/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ssmcontacts-plan.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const plan = await AWS.SSMContacts.Plan("plan-example", { ContactId: "example-contactid" });
```

