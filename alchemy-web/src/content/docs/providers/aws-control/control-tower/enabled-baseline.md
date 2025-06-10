---
title: EnabledBaseline
description: Learn how to create, update, and manage AWS ControlTower EnabledBaselines using Alchemy Cloud Control.
---


The EnabledBaseline resource allows you to manage [AWS ControlTower EnabledBaselines](https://docs.aws.amazon.com/controltower/latest/userguide/) which are essential for enforcing governance and compliance across your AWS accounts.

## Minimal Example

Create a basic EnabledBaseline with required properties and one optional parameter.

```ts
import AWS from "alchemy/aws/control";

const baseline = await AWS.ControlTower.EnabledBaseline("defaultBaseline", {
  BaselineVersion: "1.0.0",
  Parameters: [
    {
      key: "encryptionEnabled",
      value: "true"
    }
  ],
  BaselineIdentifier: "myBaselineIdentifier",
  TargetIdentifier: "myTargetIdentifier"
});
```

## Advanced Configuration

Configure an EnabledBaseline with additional parameters and tags to enhance its functionality.

```ts
const advancedBaseline = await AWS.ControlTower.EnabledBaseline("advancedBaseline", {
  BaselineVersion: "1.1.0",
  Parameters: [
    {
      key: "encryptionEnabled",
      value: "true"
    },
    {
      key: "loggingLevel",
      value: "verbose"
    }
  ],
  BaselineIdentifier: "myAdvancedBaselineIdentifier",
  TargetIdentifier: "myAdvancedTargetIdentifier",
  Tags: [
    {
      key: "Environment",
      value: "Production"
    },
    {
      key: "Owner",
      value: "DevTeam"
    }
  ]
});
```

## Adoption of Existing Resources

If you want to adopt existing resources instead of failing when the resource already exists, you can set the adopt property to true.

```ts
const adoptExistingBaseline = await AWS.ControlTower.EnabledBaseline("adoptExistingBaseline", {
  BaselineVersion: "1.0.0",
  BaselineIdentifier: "existingBaselineIdentifier",
  TargetIdentifier: "existingTargetIdentifier",
  adopt: true
});
```
