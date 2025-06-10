---
title: Member
description: Learn how to create, update, and manage AWS ManagedBlockchain Members using Alchemy Cloud Control.
---


The Member resource lets you manage [AWS ManagedBlockchain Members](https://docs.aws.amazon.com/managedblockchain/latest/userguide/) within a blockchain network.

## Minimal Example

Create a basic ManagedBlockchain Member with required properties.

```ts
import AWS from "alchemy/aws/control";

const blockchainMember = await AWS.ManagedBlockchain.Member("myBlockchainMember", {
  MemberConfiguration: {
    Name: "MyBlockchainMember",
    Description: "This member participates in the blockchain network.",
    Framework: "Hyperledger Fabric",
    FrameworkVersion: "1.4",
    LogPublishingConfiguration: {
      Fabric: {
        Chaincode: {
          Cloudwatch: {
            Enabled: true,
            LogGroup: "my-log-group"
          }
        }
      }
    }
  },
  NetworkId: "n-1234567890abcdef0",
  InvitationId: "invitation-1234567890abcdef0"
});
```

## Advanced Configuration

Configure a member with network settings and additional properties for enhanced customization.

```ts
const advancedBlockchainMember = await AWS.ManagedBlockchain.Member("advancedBlockchainMember", {
  MemberConfiguration: {
    Name: "AdvancedBlockchainMember",
    Description: "This member participates in an advanced blockchain network configuration.",
    Framework: "Hyperledger Fabric",
    FrameworkVersion: "2.2",
    LogPublishingConfiguration: {
      Fabric: {
        Chaincode: {
          Cloudwatch: {
            Enabled: true,
            LogGroup: "advanced-log-group"
          }
        },
        Peer: {
          Cloudwatch: {
            Enabled: true,
            LogGroup: "peer-log-group"
          }
        }
      }
    }
  },
  NetworkId: "n-abcdef1234567890",
  NetworkConfiguration: {
    Framework: "Hyperledger Fabric",
    FrameworkVersion: "2.2",
    VotingPolicy: {
      ApprovalThresholdPolicy: {
        ApprovalThreshold: 2,
        ProposalDurationInHours: 24
      }
    }
  }
});
```

## Invitation Handling

Demonstrate how to manage invitations when creating a member.

```ts
const memberWithInvitation = await AWS.ManagedBlockchain.Member("memberWithInvitation", {
  MemberConfiguration: {
    Name: "MemberWithInvitation",
    Description: "This member was created with an invitation.",
    Framework: "Hyperledger Fabric",
    FrameworkVersion: "1.4"
  },
  InvitationId: "invitation-abcdef1234567890"
});
```

## Resource Adoption

Show how to adopt an existing member instead of failing if it already exists.

```ts
const adoptExistingMember = await AWS.ManagedBlockchain.Member("adoptExistingMember", {
  MemberConfiguration: {
    Name: "AdoptedMember",
    Description: "This member adopts an existing resource.",
    Framework: "Hyperledger Fabric",
    FrameworkVersion: "1.4"
  },
  NetworkId: "n-1234567890abcdef0",
  adopt: true
});
```
