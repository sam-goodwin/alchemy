---
title: Managing AWS IoT CertificateProviders with Alchemy
description: Learn how to create, update, and manage AWS IoT CertificateProviders using Alchemy Cloud Control.
---

# CertificateProvider

The CertificateProvider resource lets you create and manage [AWS IoT CertificateProviders](https://docs.aws.amazon.com/iot/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-certificateprovider.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const certificateprovider = await AWS.IoT.CertificateProvider("certificateprovider-example", {
  LambdaFunctionArn: "example-lambdafunctionarn",
  AccountDefaultForOperations: ["example-accountdefaultforoperations-1"],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a certificateprovider with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCertificateProvider = await AWS.IoT.CertificateProvider(
  "advanced-certificateprovider",
  {
    LambdaFunctionArn: "example-lambdafunctionarn",
    AccountDefaultForOperations: ["example-accountdefaultforoperations-1"],
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

