---
title: Managing AWS LakeFormation DataLakeSettingss with Alchemy
description: Learn how to create, update, and manage AWS LakeFormation DataLakeSettingss using Alchemy Cloud Control.
---

# DataLakeSettings

The DataLakeSettings resource lets you create and manage [AWS LakeFormation DataLakeSettingss](https://docs.aws.amazon.com/lakeformation/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-datalakesettings.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const datalakesettings = await AWS.LakeFormation.DataLakeSettings("datalakesettings-example", {});
```

