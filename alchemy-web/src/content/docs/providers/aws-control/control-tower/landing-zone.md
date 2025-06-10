---
title: LandingZone
description: Learn how to create, update, and manage AWS ControlTower LandingZones using Alchemy Cloud Control.
---


The LandingZone resource allows you to create, manage, and configure [AWS ControlTower LandingZones](https://docs.aws.amazon.com/controltower/latest/userguide/) for your AWS accounts, providing a secure and compliant environment for governance.

## Minimal Example

Create a basic LandingZone with required properties and a few common optional tags.

```ts
import AWS from "alchemy/aws/control";

const landingZone = await AWS.ControlTower.LandingZone("myLandingZone", {
  Version: "1.0.0",
  Manifest: {
    accounts: [],
    organizationalUnits: []
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "CloudMigration" }
  ]
});
```

## Advanced Configuration

Configure a LandingZone with an adoption flag to allow existing resources to be adopted.

```ts
const advancedLandingZone = await AWS.ControlTower.LandingZone("advancedLandingZone", {
  Version: "1.0.0",
  Manifest: {
    accounts: [
      { accountId: "123456789012", accountName: "DevAccount" }
    ],
    organizationalUnits: [
      { unitName: "DevOU", accounts: ["123456789012"] }
    ]
  },
  Tags: [
    { Key: "Team", Value: "DevOps" }
  ],
  adopt: true
});
```

## Example with Detailed Manifest

Create a LandingZone with a detailed manifest structure including multiple accounts and organizational units.

```ts
const detailedLandingZone = await AWS.ControlTower.LandingZone("detailedLandingZone", {
  Version: "1.0.0",
  Manifest: {
    accounts: [
      { accountId: "111111111111", accountName: "ProductionAccount" },
      { accountId: "222222222222", accountName: "StagingAccount" }
    ],
    organizationalUnits: [
      {
        unitName: "SecurityOU",
        accounts: ["111111111111"]
      },
      {
        unitName: "DevelopmentOU",
        accounts: ["222222222222"]
      }
    ]
  },
  Tags: [
    { Key: "Owner", Value: "CloudOps" }
  ]
});
```

## Example with Versioning

Create a LandingZone while specifying a version for better resource management.

```ts
const versionedLandingZone = await AWS.ControlTower.LandingZone("versionedLandingZone", {
  Version: "2.0.0",
  Manifest: {
    accounts: [],
    organizationalUnits: []
  },
  Tags: [
    { Key: "Version", Value: "2.0" },
    { Key: "Status", Value: "Active" }
  ]
});
```
