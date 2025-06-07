---
title: Managing AWS SSM Documents with Alchemy
description: Learn how to create, update, and manage AWS SSM Documents using Alchemy Cloud Control.
---

# Document

The Document resource lets you manage [AWS SSM Documents](https://docs.aws.amazon.com/ssm/latest/userguide/) for defining actions that can be performed on managed instances.

## Minimal Example

Create a basic SSM Document with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicDocument = await AWS.SSM.Document("BasicDocument", {
  Content: {
    schemaVersion: "0.3",
    description: "A simple document for executing commands",
    mainSteps: [{
      action: "aws:runCommand",
      name: "runShellScript",
      inputs: {
        DocumentType: "Command",
        Parameters: {
          commands: ["echo Hello World"]
        }
      }
    }]
  },
  DocumentType: "Command",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```

## Advanced Configuration

Configure an SSM Document with more advanced settings, including attachments and versioning.

```ts
const advancedDocument = await AWS.SSM.Document("AdvancedDocument", {
  Content: {
    schemaVersion: "0.3",
    description: "An advanced SSM document with attachments",
    mainSteps: [{
      action: "aws:runCommand",
      name: "runShellScript",
      inputs: {
        DocumentType: "Command",
        Parameters: {
          commands: ["echo Running advanced script"]
        }
      }
    }]
  },
  DocumentType: "Command",
  VersionName: "v1.0.0",
  Attachments: [{
    Key: "myAttachment",
    Values: ["attachmentValue"]
  }],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "OpsTeam" }
  ]
});
```

## Using Custom Parameters

Demonstrate how to use custom parameters in the document content.

```ts
const paramDocument = await AWS.SSM.Document("ParamDocument", {
  Content: {
    schemaVersion: "0.3",
    description: "Document with custom parameters",
    mainSteps: [{
      action: "aws:runCommand",
      name: "runParameterizedScript",
      inputs: {
        DocumentType: "Command",
        Parameters: {
          commands: ["echo Parameter value is {{ scriptParam }}"],
          scriptParam: ["Hello Parameter"]
        }
      }
    }]
  },
  DocumentType: "Command",
  Tags: [
    { Key: "Environment", Value: "Testing" },
    { Key: "Owner", Value: "QA" }
  ]
});
```

## Versioning and Update Method

Create a document with versioning and a specified update method.

```ts
const versionedDocument = await AWS.SSM.Document("VersionedDocument", {
  Content: {
    schemaVersion: "0.3",
    description: "Versioned document example",
    mainSteps: [{
      action: "aws:runCommand",
      name: "runVersionedScript",
      inputs: {
        DocumentType: "Command",
        Parameters: {
          commands: ["echo Versioned Document Running"]
        }
      }
    }]
  },
  DocumentType: "Command",
  VersionName: "v2.0.0",
  UpdateMethod: "Overwrite",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Owner", Value: "ReleaseTeam" }
  ]
});
```