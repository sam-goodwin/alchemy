---
title: Standard
description: Learn how to create, update, and manage AWS SecurityHub Standards using Alchemy Cloud Control.
---


The Standard resource lets you manage [AWS SecurityHub Standards](https://docs.aws.amazon.com/securityhub/latest/userguide/) to enhance your security posture by enabling various compliance frameworks and security checks.

## Minimal Example

Create a basic SecurityHub Standard with required properties.

```ts
import AWS from "alchemy/aws/control";

const securityHubStandard = await AWS.SecurityHub.Standard("mySecurityHubStandard", {
  StandardsArn: "arn:aws:securityhub:us-east-1::standards/aws-foundational-security-best-practices/v/1.0.0",
  DisabledStandardsControls: [
    {
      StandardsControlArn: "arn:aws:securityhub:us-east-1::controls/aws-foundational-security-best-practices/iam.1",
      Disabled: true
    }
  ]
});
```

## Advanced Configuration

Configure a SecurityHub Standard with additional options such as adopting an existing resource.

```ts
const advancedSecurityHubStandard = await AWS.SecurityHub.Standard("advancedSecurityHubStandard", {
  StandardsArn: "arn:aws:securityhub:us-east-1::standards/aws-foundational-security-best-practices/v/1.0.0",
  DisabledStandardsControls: [
    {
      StandardsControlArn: "arn:aws:securityhub:us-east-1::controls/aws-foundational-security-best-practices/iam.2",
      Disabled: false
    }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Example with Custom Disabled Controls

Create a SecurityHub Standard with specific controls that are disabled.

```ts
const customDisabledControlsStandard = await AWS.SecurityHub.Standard("customDisabledControlsStandard", {
  StandardsArn: "arn:aws:securityhub:us-east-1::standards/aws-foundational-security-best-practices/v/1.0.0",
  DisabledStandardsControls: [
    {
      StandardsControlArn: "arn:aws:securityhub:us-east-1::controls/aws-foundational-security-best-practices/s3.1",
      Disabled: true
    },
    {
      StandardsControlArn: "arn:aws:securityhub:us-east-1::controls/aws-foundational-security-best-practices/ec2.1",
      Disabled: true
    }
  ]
});
```
