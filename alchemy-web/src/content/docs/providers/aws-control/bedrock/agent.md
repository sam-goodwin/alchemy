---
title: Agent
description: Learn how to create, update, and manage AWS Bedrock Agents using Alchemy Cloud Control.
---


The Agent resource lets you manage [AWS Bedrock Agents](https://docs.aws.amazon.com/bedrock/latest/userguide/) for building and deploying machine learning applications.

## Resource Documentation

This resource provides capabilities to configure various parameters for agents, including collaborators, memory configuration, orchestration types, and more.

## Minimal Example

Create a basic Bedrock Agent with required properties and one optional property for description.

```ts
import AWS from "alchemy/aws/control";

const basicAgent = await AWS.Bedrock.Agent("basicAgent", {
  AgentName: "MyFirstAgent",
  Description: "This is my first Bedrock Agent",
  AutoPrepare: true
});
```

## Advanced Configuration

Configure an agent with advanced settings such as memory configuration and guardrail settings.

```ts
const advancedAgent = await AWS.Bedrock.Agent("advancedAgent", {
  AgentName: "AdvancedAgent",
  MemoryConfiguration: {
    MemoryLimitInMB: 2048,
    MemoryType: "standard"
  },
  GuardrailConfiguration: {
    MaxRequestsPerSecond: 10,
    MaxConcurrentSessions: 5
  },
  AgentCollaborators: [
    {
      CollaboratorId: "collab123",
      Role: "ADMIN"
    }
  ]
});
```

## Custom Orchestration and Encryption

Demonstrate how to create an agent with custom orchestration and customer encryption key settings.

```ts
const customOrchestratedAgent = await AWS.Bedrock.Agent("customOrchestratedAgent", {
  AgentName: "CustomOrchAgent",
  CustomOrchestration: {
    Steps: [
      {
        Action: "Step1",
        Parameters: {
          Input: "data/input.json"
        }
      },
      {
        Action: "Step2",
        Parameters: {
          Output: "data/output.json"
        }
      }
    ]
  },
  CustomerEncryptionKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcdefg-hijk-lmno-pqrst-uvwxyz123456"
});
```

## Idle Session Timeout Configuration

Set an idle session timeout for the agent to manage sessions effectively.

```ts
const idleSessionAgent = await AWS.Bedrock.Agent("idleSessionAgent", {
  AgentName: "IdleTimeoutAgent",
  IdleSessionTTLInSeconds: 300, // 5 minutes
  Description: "Agent with idle session timeout"
});
```
