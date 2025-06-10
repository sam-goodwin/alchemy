---
title: Document
description: Learn how to create, update, and manage AWS SSM Documents using Alchemy Cloud Control.
---


The Document resource allows you to create and manage [AWS SSM Documents](https://docs.aws.amazon.com/ssm/latest/userguide/) which define actions for AWS Systems Manager. These documents can be used to automate tasks such as software installation, configuration, and execution of scripts on managed instances.

## Minimal Example

Create a basic SSM Document to run a shell command on an EC2 instance.

```ts
import AWS from "alchemy/aws/control";

const shellCommandDocument = await AWS.SSM.Document("ShellCommandDocument", {
  Content: {
    schemaVersion: "2.2",
    description: "Run a simple shell command",
    mainSteps: [{
      action: "aws:runCommand",
      name: "runShellCommand",
      inputs: {
        DocumentName: "AWS-RunShellScript",
        Parameters: {
          commands: ["echo Hello World"]
        }
      }
    }]
  },
  DocumentType: "Command",
  TargetType: "/AWS::EC2::Instance",
  Name: "HelloWorldCommand"
});
```

## Advanced Configuration

Define a more complex SSM Document with multiple commands and parameters.

```ts
const complexDocument = await AWS.SSM.Document("ComplexDocument", {
  Content: {
    schemaVersion: "2.2",
    description: "Run multiple shell commands",
    mainSteps: [{
      action: "aws:runCommand",
      name: "runMultipleCommands",
      inputs: {
        DocumentName: "AWS-RunShellScript",
        Parameters: {
          commands: [
            "yum update -y",
            "yum install -y httpd",
            "service httpd start"
          ]
        }
      }
    }]
  },
  DocumentType: "Command",
  TargetType: "/AWS::EC2::Instance",
  Name: "InstallAndStartHttpd"
});
```

## Versioning and Update Method

Create an SSM Document with versioning and a specified update method.

```ts
const versionedDocument = await AWS.SSM.Document("VersionedDocument", {
  Content: {
    schemaVersion: "2.2",
    description: "Run a versioned shell command",
    mainSteps: [{
      action: "aws:runCommand",
      name: "runVersionedCommand",
      inputs: {
        DocumentName: "AWS-RunShellScript",
        Parameters: {
          commands: ["echo Version 1.0"]
        }
      }
    }]
  },
  DocumentType: "Command",
  TargetType: "/AWS::EC2::Instance",
  Name: "VersionedShellCommand",
  VersionName: "1.0",
  UpdateMethod: "Overwrite" // Overwrite existing document with the same name
});
```

## Adding Tags

Create an SSM Document and include tags for better resource management.

```ts
const taggedDocument = await AWS.SSM.Document("TaggedDocument", {
  Content: {
    schemaVersion: "2.2",
    description: "Run a shell command with tags",
    mainSteps: [{
      action: "aws:runCommand",
      name: "runTaggedCommand",
      inputs: {
        DocumentName: "AWS-RunShellScript",
        Parameters: {
          commands: ["echo Tagged Command"]
        }
      }
    }]
  },
  DocumentType: "Command",
  TargetType: "/AWS::EC2::Instance",
  Name: "ShellCommandWithTags",
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }, {
    Key: "Department",
    Value: "Engineering"
  }]
});
```
