---
title: Managing AWS ARCZonalShift ZonalAutoshiftConfigurations with Alchemy
description: Learn how to create, update, and manage AWS ARCZonalShift ZonalAutoshiftConfigurations using Alchemy Cloud Control.
---

# ZonalAutoshiftConfiguration

The ZonalAutoshiftConfiguration resource lets you create and manage [AWS ARCZonalShift ZonalAutoshiftConfigurations](https://docs.aws.amazon.com/arczonalshift/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-arczonalshift-zonalautoshiftconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const zonalautoshiftconfiguration = await AWS.ARCZonalShift.ZonalAutoshiftConfiguration(
  "zonalautoshiftconfiguration-example",
  { ResourceIdentifier: "example-resourceidentifier" }
);
```

