---
title: OriginAccessControl
description: Learn how to create, update, and manage AWS CloudFront OriginAccessControls using Alchemy Cloud Control.
---


The OriginAccessControl resource lets you manage [AWS CloudFront Origin Access Controls](https://docs.aws.amazon.com/cloudfront/latest/userguide/) which help to securely access your S3 origins by restricting access to only CloudFront.

## Minimal Example

Create a basic Origin Access Control with required properties:

```ts
import AWS from "alchemy/aws/control";

const originAccessControl = await AWS.CloudFront.OriginAccessControl("basicOriginAccessControl", {
  OriginAccessControlConfig: {
    Name: "MyOriginAccessControl",
    OriginAccessControlType: "S3",
    SigningBehavior: "always",
    SigningProtocol: "sigv4"
  }
});
```

## Advanced Configuration

Configure an Origin Access Control with additional properties for enhanced security:

```ts
const advancedOriginAccessControl = await AWS.CloudFront.OriginAccessControl("advancedOriginAccessControl", {
  OriginAccessControlConfig: {
    Name: "AdvancedOriginAccessControl",
    OriginAccessControlType: "S3",
    SigningBehavior: "always",
    SigningProtocol: "sigv4",
    Description: "This Origin Access Control allows secure access to my S3 bucket."
  },
  adopt: true // Adopt existing resource if it already exists
});
```

## Monitoring and Logging

Set up an Origin Access Control with logging enabled for monitoring access:

```ts
const monitoredOriginAccessControl = await AWS.CloudFront.OriginAccessControl("monitoredOriginAccessControl", {
  OriginAccessControlConfig: {
    Name: "MonitoredOriginAccessControl",
    OriginAccessControlType: "S3",
    SigningBehavior: "always",
    SigningProtocol: "sigv4",
    Description: "This Origin Access Control is used with logging enabled."
  },
  // Logging settings can be handled at the CloudFront distribution level
});
```
