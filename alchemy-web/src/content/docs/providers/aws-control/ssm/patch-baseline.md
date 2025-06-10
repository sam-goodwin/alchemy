---
title: PatchBaseline
description: Learn how to create, update, and manage AWS SSM PatchBaselines using Alchemy Cloud Control.
---


The PatchBaseline resource allows you to manage [AWS SSM PatchBaselines](https://docs.aws.amazon.com/ssm/latest/userguide/) for automating the patching of your managed instances. Patch baselines define which patches should be approved for installation on your instances, helping ensure that they remain secure and up-to-date.

## Minimal Example

Create a basic PatchBaseline with the required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicPatchBaseline = await AWS.SSM.PatchBaseline("basicPatchBaseline", {
  Name: "MyPatchBaseline",
  OperatingSystem: "WINDOWS",
  Description: "A baseline for Windows patches",
  ApprovedPatches: ["KB4484070", "KB4474419"],
  RejectedPatches: ["KB4487018"]
});
```

## Advanced Configuration

Configure a PatchBaseline with advanced settings, including approval rules and global filters.

```ts
const advancedPatchBaseline = await AWS.SSM.PatchBaseline("advancedPatchBaseline", {
  Name: "AdvancedPatchBaseline",
  OperatingSystem: "LINUX",
  Description: "An advanced baseline for Linux patches",
  ApprovalRules: {
    PatchRules: [{
      PatchFilterGroup: {
        PatchFilters: [{
          Key: "PRODUCT",
          Values: ["Amazon Linux 2"]
        }]
      },
      ApproveAfterDays: 7
    }]
  },
  ApprovedPatches: ["kernel-4.14.209-160.646.amzn2.x86_64"],
  RejectedPatchesAction: "ALLOW_AS_DEPENDENCY",
  GlobalFilters: {
    PatchFilters: [{
      Key: "CLASSIFICATION",
      Values: ["Security"]
    }]
  }
});
```

## Using Patch Groups

Create a PatchBaseline specifically for a set of instances grouped together.

```ts
const patchGroupBaseline = await AWS.SSM.PatchBaseline("patchGroupBaseline", {
  Name: "PatchGroupBaseline",
  OperatingSystem: "WINDOWS",
  Description: "A baseline for a specific patch group",
  PatchGroups: ["MyPatchGroup"],
  ApprovedPatches: ["KB5003637"],
  RejectedPatches: ["KB5003645"]
});
```

## Default Baseline Configuration

Set a PatchBaseline as the default baseline for your environment.

```ts
const defaultPatchBaseline = await AWS.SSM.PatchBaseline("defaultPatchBaseline", {
  Name: "DefaultPatchBaseline",
  OperatingSystem: "WINDOWS",
  Description: "Default baseline for Windows instances",
  DefaultBaseline: true,
  ApprovedPatches: ["KB5003637", "KB5003640"],
  RejectedPatches: ["KB5003638"]
});
```
