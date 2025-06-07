---
title: Managing AWS SES EmailIdentitys with Alchemy
description: Learn how to create, update, and manage AWS SES EmailIdentitys using Alchemy Cloud Control.
---

# EmailIdentity

The EmailIdentity resource lets you create and manage [AWS SES EmailIdentitys](https://docs.aws.amazon.com/ses/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-emailidentity.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const emailidentity = await AWS.SES.EmailIdentity("emailidentity-example", {
  EmailIdentity: "example-emailidentity",
});
```

