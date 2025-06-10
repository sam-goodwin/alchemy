---
title: SecurityControl
description: Learn how to create, update, and manage AWS SecurityHub SecurityControls using Alchemy Cloud Control.
---


The SecurityControl resource lets you manage [AWS SecurityHub SecurityControls](https://docs.aws.amazon.com/securityhub/latest/userguide/) for enhancing your cloud security posture.

## Minimal Example

Create a basic SecurityControl with required properties and some optional ones.

```ts
import AWS from "alchemy/aws/control";

const securityControl = await AWS.SecurityHub.SecurityControl("basicSecurityControl", {
  Parameters: {
    severity: "HIGH",
    description: "Ensure that MFA is enabled for all IAM users."
  },
  LastUpdateReason: "Initial creation of the security control."
});
```

## Advanced Configuration

Configure a SecurityControl with additional parameters and adopt existing resources.

```ts
const advancedSecurityControl = await AWS.SecurityHub.SecurityControl("advancedSecurityControl", {
  SecurityControlId: "mfa-enabled-control",
  Parameters: {
    severity: "CRITICAL",
    description: "This control ensures that MFA is enabled for all IAM users.",
    remediation: {
      instructions: "Enable MFA for all IAM users in your AWS account."
    }
  },
  LastUpdateReason: "Updated to include remediation instructions.",
  adopt: true
});
```

## Custom Control with Specific Parameters

Demonstrate creating a SecurityControl that includes custom parameters for a specific compliance requirement.

```ts
const complianceSecurityControl = await AWS.SecurityHub.SecurityControl("complianceSecurityControl", {
  SecurityControlId: "compliance-1234",
  Parameters: {
    complianceStandard: "CIS AWS Foundations Benchmark",
    checks: [
      {
        id: "check-1",
        description: "Check for IAM password policy compliance."
      },
      {
        id: "check-2",
        description: "Ensure CloudTrail is enabled in all regions."
      }
    ]
  },
  LastUpdateReason: "Initial creation for compliance checks."
});
```
