---
title: Managing AWS AppStream DirectoryConfigs with Alchemy
description: Learn how to create, update, and manage AWS AppStream DirectoryConfigs using Alchemy Cloud Control.
---

# DirectoryConfig

The DirectoryConfig resource lets you create and manage [AWS AppStream DirectoryConfigs](https://docs.aws.amazon.com/appstream/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-directoryconfig.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const directoryconfig = await AWS.AppStream.DirectoryConfig("directoryconfig-example", {
  OrganizationalUnitDistinguishedNames: "directoryconfig-organizationalunitdistinguisheds",
  ServiceAccountCredentials: "example-serviceaccountcredentials",
  DirectoryName: "directoryconfig-directory",
});
```

