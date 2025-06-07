---
title: Managing AWS Glue DataCatalogEncryptionSettingss with Alchemy
description: Learn how to create, update, and manage AWS Glue DataCatalogEncryptionSettingss using Alchemy Cloud Control.
---

# DataCatalogEncryptionSettings

The DataCatalogEncryptionSettings resource lets you create and manage [AWS Glue DataCatalogEncryptionSettingss](https://docs.aws.amazon.com/glue/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-datacatalogencryptionsettings.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const datacatalogencryptionsettings = await AWS.Glue.DataCatalogEncryptionSettings(
  "datacatalogencryptionsettings-example",
  {
    DataCatalogEncryptionSettings: "example-datacatalogencryptionsettings",
    CatalogId: "example-catalogid",
  }
);
```

