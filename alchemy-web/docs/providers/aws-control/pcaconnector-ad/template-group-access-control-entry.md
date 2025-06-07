---
title: Managing AWS PCAConnectorAD TemplateGroupAccessControlEntrys with Alchemy
description: Learn how to create, update, and manage AWS PCAConnectorAD TemplateGroupAccessControlEntrys using Alchemy Cloud Control.
---

# TemplateGroupAccessControlEntry

The TemplateGroupAccessControlEntry resource lets you create and manage [AWS PCAConnectorAD TemplateGroupAccessControlEntrys](https://docs.aws.amazon.com/pcaconnectorad/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pcaconnectorad-templategroupaccesscontrolentry.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const templategroupaccesscontrolentry = await AWS.PCAConnectorAD.TemplateGroupAccessControlEntry(
  "templategroupaccesscontrolentry-example",
  {
    AccessRights: "example-accessrights",
    GroupDisplayName: "templategroupaccesscontrolentry-groupdisplay",
  }
);
```

