---
title: Managing AWS SSM PatchBaselines with Alchemy
description: Learn how to create, update, and manage AWS SSM PatchBaselines using Alchemy Cloud Control.
---

# PatchBaseline

The PatchBaseline resource lets you manage [AWS SSM PatchBaselines](https://docs.aws.amazon.com/ssm/latest/userguide/) for automating the process of patching your managed instances. Patch baselines specify which patches are approved for installation and provide rules for patch compliance.

## Minimal Example

Create a basic patch baseline with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const BasicPatchBaseline = await AWS.SSM.PatchBaseline("BasicPatchBaseline", {
  Name: "MyPatchBaseline",
  OperatingSystem: "WINDOWS",
  ApprovalRules: {
    PatchRules: [
      {
        PatchFilterGroup: {
          PatchFilters: [
            {
              Key: "PRODUCT",
              Values: ["WindowsServer2019"]
            }
          ]
        },
        ApproveAfterDays: 7,
        ComplianceLevel: "CRITICAL"
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a patch baseline with advanced settings, including rejected patches and global filters.

```ts
const AdvancedPatchBaseline = await AWS.SSM.PatchBaseline("AdvancedPatchBaseline", {
  Name: "MyAdvancedPatchBaseline",
  OperatingSystem: "LINUX",
  ApprovalRules: {
    PatchRules: [
      {
        PatchFilterGroup: {
          PatchFilters: [
            {
              Key: "PRODUCT",
              Values: ["AmazonLinux2"]
            }
          ]
        },
        ApproveAfterDays: 5,
        ComplianceLevel: "HIGH"
      }
    ]
  },
  RejectedPatches: ["Patch-ID-1234"],
  GlobalFilters: {
    PatchFilters: [
      {
        Key: "CLASSIFICATION",
        Values: ["Security"]
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Infrastructure" }
  ]
});
```

## Custom Patch Groups

Create a patch baseline tailored for specific patch groups.

```ts
const CustomPatchGroupBaseline = await AWS.SSM.PatchBaseline("CustomPatchGroupBaseline", {
  Name: "MyCustomPatchGroupBaseline",
  OperatingSystem: "WINDOWS",
  PatchGroups: ["MyWindowsPatchGroup"],
  ApprovalRules: {
    PatchRules: [
      {
        PatchFilterGroup: {
          PatchFilters: [
            {
              Key: "CLASSIFICATION",
              Values: ["CriticalUpdates"]
            }
          ]
        },
        ApproveAfterDays: 10,
        ComplianceLevel: "CRITICAL"
      }
    ]
  },
  ApprovedPatches: ["Patch-ID-5678"],
  Tags: [
    { Key: "Environment", Value: "qa" },
    { Key: "Team", Value: "QA" }
  ]
});
```