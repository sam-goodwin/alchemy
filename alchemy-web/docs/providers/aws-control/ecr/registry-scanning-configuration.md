---
title: Managing AWS ECR RegistryScanningConfigurations with Alchemy
description: Learn how to create, update, and manage AWS ECR RegistryScanningConfigurations using Alchemy Cloud Control.
---

# RegistryScanningConfiguration

The RegistryScanningConfiguration resource lets you create and manage [AWS ECR RegistryScanningConfigurations](https://docs.aws.amazon.com/ecr/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecr-registryscanningconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const registryscanningconfiguration = await AWS.ECR.RegistryScanningConfiguration(
  "registryscanningconfiguration-example",
  { ScanType: "example-scantype", Rules: [] }
);
```

