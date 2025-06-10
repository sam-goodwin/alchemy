---
title: CertificateProvider
description: Learn how to create, update, and manage AWS IoT CertificateProviders using Alchemy Cloud Control.
---


The CertificateProvider resource allows you to manage [AWS IoT CertificateProviders](https://docs.aws.amazon.com/iot/latest/userguide/) which are used to create and manage device certificates for secure communication in IoT applications.

## Minimal Example

Create a basic CertificateProvider with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicCertificateProvider = await AWS.IoT.CertificateProvider("basicCertificateProvider", {
  LambdaFunctionArn: "arn:aws:lambda:us-east-1:123456789012:function:MyCertificateFunction",
  AccountDefaultForOperations: ["account1", "account2"],
  CertificateProviderName: "MyCertificateProvider"
});
```

## Advanced Configuration

Configure a CertificateProvider with tags and the adoption flag for existing resources.

```ts
const advancedCertificateProvider = await AWS.IoT.CertificateProvider("advancedCertificateProvider", {
  LambdaFunctionArn: "arn:aws:lambda:us-east-1:123456789012:function:MyAdvancedCertificateFunction",
  AccountDefaultForOperations: ["account3"],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "IoTDeployment" }
  ],
  adopt: true
});
```

## Using Multiple Accounts

Create a CertificateProvider that operates across multiple accounts to streamline certificate management.

```ts
const multiAccountCertificateProvider = await AWS.IoT.CertificateProvider("multiAccountCertificateProvider", {
  LambdaFunctionArn: "arn:aws:lambda:us-east-1:123456789012:function:MultiAccountCertFunction",
  AccountDefaultForOperations: ["accountA", "accountB", "accountC"],
  CertificateProviderName: "MultiAccountProvider"
});
```

## Integration with Other IoT Resources

Demonstrate how to integrate the CertificateProvider with other AWS IoT resources, such as an IoT Policy.

```ts
import AWS from "alchemy/aws/control";

const iotPolicy = await AWS.IoT.Policy("devicePolicy", {
  PolicyName: "DeviceIoTPolicy",
  PolicyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "iot:Connect",
        Resource: "*"
      },
      {
        Effect: "Allow",
        Action: "iot:Publish",
        Resource: "arn:aws:iot:us-east-1:123456789012:topic/+/status"
      }
    ]
  })
});

const integratedCertificateProvider = await AWS.IoT.CertificateProvider("integratedCertificateProvider", {
  LambdaFunctionArn: "arn:aws:lambda:us-east-1:123456789012:function:IntegratedCertFunction",
  AccountDefaultForOperations: ["accountX"],
  CertificateProviderName: "IntegratedProvider"
});
```
