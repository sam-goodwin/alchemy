---
title: EnabledControl
description: Learn how to create, update, and manage AWS ControlTower EnabledControls using Alchemy Cloud Control.
---


The EnabledControl resource allows you to manage [AWS ControlTower EnabledControls](https://docs.aws.amazon.com/controltower/latest/userguide/) in your AWS environment. This resource enables you to specify controls to be enforced on accounts within your organization.

## Minimal Example

Create an EnabledControl with required properties and one optional parameter.

```ts
import AWS from "alchemy/aws/control";

const enabledControl = await AWS.ControlTower.EnabledControl("myEnabledControl", {
  ControlIdentifier: "aws-control-sample-control",
  TargetIdentifier: "account-123456789012",
  Parameters: [
    {
      parameterKey: "sampleParameter",
      parameterValue: "sampleValue"
    }
  ]
});
```

## Advanced Configuration

Configure an EnabledControl with additional parameters and tags for better organization.

```ts
const advancedEnabledControl = await AWS.ControlTower.EnabledControl("advancedEnabledControl", {
  ControlIdentifier: "aws-control-sample-control",
  TargetIdentifier: "account-098765432109",
  Parameters: [
    {
      parameterKey: "sampleParameter",
      parameterValue: "advancedSampleValue"
    },
    {
      parameterKey: "anotherParameter",
      parameterValue: "anotherSampleValue"
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Department",
      Value: "Finance"
    }
  ],
  adopt: true
});
```

## Adoption of Existing Control

Adopt an existing control without failing if it already exists.

```ts
const adoptExistingControl = await AWS.ControlTower.EnabledControl("adoptExistingControl", {
  ControlIdentifier: "aws-control-sample-control",
  TargetIdentifier: "account-112233445566",
  adopt: true
});
```

## Custom Control Parameters

Create an EnabledControl with custom control parameters tailored to specific needs.

```ts
const customParamControl = await AWS.ControlTower.EnabledControl("customParamControl", {
  ControlIdentifier: "aws-control-compliance-control",
  TargetIdentifier: "account-556677889900",
  Parameters: [
    {
      parameterKey: "complianceLevel",
      parameterValue: "high"
    },
    {
      parameterKey: "auditFrequency",
      parameterValue: "monthly"
    }
  ],
  Tags: [
    {
      Key: "Compliance",
      Value: "High"
    }
  ]
});
```
