---
title: AccountAuditConfiguration
description: Learn how to create, update, and manage AWS IoT AccountAuditConfigurations using Alchemy Cloud Control.
---


The AccountAuditConfiguration resource allows you to manage the audit configuration for AWS IoT, enabling you to set up and monitor security checks. You can find more information in the [AWS IoT AccountAuditConfigurations documentation](https://docs.aws.amazon.com/iot/latest/userguide/).

## Minimal Example

Create a basic AccountAuditConfiguration with required properties and a common optional configuration for audit notifications.

```ts
import AWS from "alchemy/aws/control";

const basicAuditConfig = await AWS.IoT.AccountAuditConfiguration("BasicAuditConfig", {
  AccountId: "123456789012",
  AuditCheckConfigurations: {
    "Cognito": {
      "enabled": true
    },
    "IotPolicy": {
      "enabled": true
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/service-role/AWSIoTAuditRole",
  AuditNotificationTargetConfigurations: {
    "SNS": {
      "enabled": true,
      "targetArn": "arn:aws:sns:us-east-1:123456789012:IoTAuditNotifications"
    }
  }
});
```

## Advanced Configuration

Configure additional audit checks and notification targets to enhance your security posture.

```ts
const advancedAuditConfig = await AWS.IoT.AccountAuditConfiguration("AdvancedAuditConfig", {
  AccountId: "123456789012",
  AuditCheckConfigurations: {
    "Cognito": {
      "enabled": true
    },
    "IotPolicy": {
      "enabled": true
    },
    "CaCertificate": {
      "enabled": true
    },
    "DeviceCertificate": {
      "enabled": false
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/service-role/AWSIoTAuditRole",
  AuditNotificationTargetConfigurations: {
    "SNS": {
      "enabled": true,
      "targetArn": "arn:aws:sns:us-east-1:123456789012:IoTAuditNotifications"
    },
    "SQS": {
      "enabled": true,
      "targetArn": "arn:aws:sqs:us-east-1:123456789012:IoTAuditQueue"
    }
  }
});
```

## Custom Role Configuration

Set up a custom IAM role for the AccountAuditConfiguration to specify permissions more granularly.

```ts
const customRoleAuditConfig = await AWS.IoT.AccountAuditConfiguration("CustomRoleAuditConfig", {
  AccountId: "123456789012",
  AuditCheckConfigurations: {
    "IotPolicy": {
      "enabled": true
    },
    "CaCertificate": {
      "enabled": true
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/custom/AWSIoTCustomAuditRole"
});
```
