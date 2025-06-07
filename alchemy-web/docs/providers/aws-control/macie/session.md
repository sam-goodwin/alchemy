---
title: Managing AWS Macie Sessions with Alchemy
description: Learn how to create, update, and manage AWS Macie Sessions using Alchemy Cloud Control.
---

# Session

The Session resource lets you create and manage [AWS Macie Sessions](https://docs.aws.amazon.com/macie/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-macie-session.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const session = await AWS.Macie.Session("session-example", {});
```

