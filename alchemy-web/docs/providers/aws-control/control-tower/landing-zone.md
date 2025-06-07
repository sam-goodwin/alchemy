---
title: Managing AWS ControlTower LandingZones with Alchemy
description: Learn how to create, update, and manage AWS ControlTower LandingZones using Alchemy Cloud Control.
---

# LandingZone

The LandingZone resource lets you manage [AWS ControlTower LandingZones](https://docs.aws.amazon.com/controltower/latest/userguide/) for establishing a secure and compliant multi-account AWS environment.

## Minimal Example

Create a LandingZone with required properties and a common optional tag.

```ts
import AWS from "alchemy/aws/control";

const BasicLandingZone = await AWS.ControlTower.LandingZone("BasicLandingZone", {
  Version: "1.0",
  Manifest: {
    AccountFactory: {
      Accounts: [
        {
          AccountName: "DevAccount",
          Email: "dev@example.com",
          OrganizationalUnit: "Development"
        },
        {
          AccountName: "ProdAccount",
          Email: "prod@example.com",
          OrganizationalUnit: "Production"
        }
      ]
    }
  },
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a LandingZone with a more complex manifest and additional tags for organization.

```ts
const AdvancedLandingZone = await AWS.ControlTower.LandingZone("AdvancedLandingZone", {
  Version: "1.1",
  Manifest: {
    AccountFactory: {
      Accounts: [
        {
          AccountName: "TestAccount",
          Email: "test@example.com",
          OrganizationalUnit: "Testing"
        },
        {
          AccountName: "SecurityAccount",
          Email: "security@example.com",
          OrganizationalUnit: "Security"
        }
      ],
      Guardrails: [
        {
          Name: "PreventPublicBucket",
          Description: "Prevents S3 buckets from being publicly accessible."
        }
      ]
    }
  },
  Tags: [
    { Key: "Project", Value: "CloudMigration" },
    { Key: "Owner", Value: "CloudTeam" }
  ]
});
```

## Policy Configuration

Create a LandingZone demonstrating IAM policy configurations for security controls.

```ts
const PolicyLandingZone = await AWS.ControlTower.LandingZone("PolicyLandingZone", {
  Version: "1.2",
  Manifest: {
    AccountFactory: {
      Accounts: [
        {
          AccountName: "ComplianceAccount",
          Email: "compliance@example.com",
          OrganizationalUnit: "Compliance",
          Policies: [
            {
              PolicyName: "S3PublicAccessBlock",
              PolicyDocument: {
                Version: "2012-10-17",
                Statement: [
                  {
                    Effect: "Deny",
                    Action: "s3:PutBucketPolicy",
                    Resource: "*",
                    Condition: {
                      Bool: {
                        "s3:BlockPublicAcls": "true"
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  }
});
```