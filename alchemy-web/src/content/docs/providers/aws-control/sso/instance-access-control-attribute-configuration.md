---
title: InstanceAccessControlAttributeConfiguration
description: Learn how to create, update, and manage AWS SSO InstanceAccessControlAttributeConfigurations using Alchemy Cloud Control.
---


The `InstanceAccessControlAttributeConfiguration` resource allows you to configure access control attributes for your AWS SSO instance. This is essential for managing user access and permissions based on specific attributes. For more details, refer to the [AWS SSO InstanceAccessControlAttributeConfigurations](https://docs.aws.amazon.com/sso/latest/userguide/) documentation.

## Minimal Example

This example demonstrates how to create a basic `InstanceAccessControlAttributeConfiguration` with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const instanceAccessControlConfig = await AWS.SSO.InstanceAccessControlAttributeConfiguration("basicConfig", {
  InstanceArn: "arn:aws:sso:us-west-2:123456789012:instance/sso-ins-1234567890abcdef",
  AccessControlAttributes: [
    {
      Key: "department",
      Value: "engineering"
    }
  ]
});
```

## Advanced Configuration

This example shows how to configure multiple access control attributes for more complex authorization scenarios.

```ts
const advancedAccessControlConfig = await AWS.SSO.InstanceAccessControlAttributeConfiguration("advancedConfig", {
  InstanceArn: "arn:aws:sso:us-west-2:123456789012:instance/sso-ins-1234567890abcdef",
  AccessControlAttributes: [
    {
      Key: "department",
      Value: "marketing"
    },
    {
      Key: "location",
      Value: "office-1"
    }
  ],
  adopt: true // Adopts existing resource if it already exists
});
```

## Usage with Multiple Instances

This example demonstrates how to manage access control attributes for multiple AWS SSO instances for different use cases.

```ts
const financeAccessControlConfig = await AWS.SSO.InstanceAccessControlAttributeConfiguration("financeConfig", {
  InstanceArn: "arn:aws:sso:us-west-2:123456789012:instance/sso-ins-abcdef1234567890",
  AccessControlAttributes: [
    {
      Key: "department",
      Value: "finance"
    }
  ]
});

const hrAccessControlConfig = await AWS.SSO.InstanceAccessControlAttributeConfiguration("hrConfig", {
  InstanceArn: "arn:aws:sso:us-west-2:123456789012:instance/sso-ins-fedcba0987654321",
  AccessControlAttributes: [
    {
      Key: "department",
      Value: "human resources"
    },
    {
      Key: "location",
      Value: "remote"
    }
  ]
});
```
