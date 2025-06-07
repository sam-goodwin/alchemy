---
title: Managing AWS SecurityHub SecurityControls with Alchemy
description: Learn how to create, update, and manage AWS SecurityHub SecurityControls using Alchemy Cloud Control.
---

# SecurityControl

The SecurityControl resource lets you manage [AWS SecurityHub SecurityControls](https://docs.aws.amazon.com/securityhub/latest/userguide/) for your AWS account, including configuration and compliance settings.

## Minimal Example

Create a basic SecurityControl with required properties:

```ts
import AWS from "alchemy/aws/control";

const BasicSecurityControl = await AWS.SecurityHub.SecurityControl("BasicSecurityControl", {
  Parameters: {
    ControlStatus: "ENABLED",
    Severity: "HIGH"
  }
});
```

## Advanced Configuration

Configure a SecurityControl with additional options, such as a custom LastUpdateReason and SecurityControlId:

```ts
const AdvancedSecurityControl = await AWS.SecurityHub.SecurityControl("AdvancedSecurityControl", {
  SecurityControlId: "custom-security-control-123",
  LastUpdateReason: "Initial setup",
  Parameters: {
    ControlStatus: "ENABLED",
    Severity: "CRITICAL",
    Compliance: {
      Standards: ["CIS"],
      Status: "COMPLIANT"
    }
  }
});
```

## Adoption of Existing Controls

Adopt an existing SecurityControl instead of failing if it already exists:

```ts
const AdoptExistingControl = await AWS.SecurityHub.SecurityControl("AdoptExistingControl", {
  adopt: true,
  SecurityControlId: "existing-control-456",
  Parameters: {
    ControlStatus: "DISABLED",
    Severity: "LOW"
  }
});
```

## Custom Parameters

Create a SecurityControl with specific parameters tailored to your organization's needs:

```ts
const CustomParametersControl = await AWS.SecurityHub.SecurityControl("CustomParametersControl", {
  Parameters: {
    ControlStatus: "ENABLED",
    Severity: "MEDIUM",
    CustomParameter: "value"
  },
  LastUpdateReason: "Updated for compliance"
});
```