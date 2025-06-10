---
title: Workflow
description: Learn how to create, update, and manage AWS Transfer Workflows using Alchemy Cloud Control.
---


The Workflow resource lets you manage [AWS Transfer Workflows](https://docs.aws.amazon.com/transfer/latest/userguide/) for automating file transfers and processing within the AWS Transfer Family service.

## Minimal Example

Create a basic workflow that includes a step to copy files to an S3 bucket:

```ts
import AWS from "alchemy/aws/control";

const basicWorkflow = await AWS.Transfer.Workflow("basicWorkflow", {
  Steps: [
    {
      Name: "CopyToS3",
      Type: "Copy",
      CopyStepDetails: {
        Destination: {
          Bucket: "my-transfer-bucket",
          Key: "transferred-files/${transferId}/"
        }
      }
    }
  ],
  Description: "A simple workflow to copy files to S3 bucket."
});
```

## Advanced Configuration

Configure a workflow with multiple processing steps, including error handling:

```ts
const advancedWorkflow = await AWS.Transfer.Workflow("advancedWorkflow", {
  Steps: [
    {
      Name: "CopyToS3",
      Type: "Copy",
      CopyStepDetails: {
        Destination: {
          Bucket: "my-transfer-bucket",
          Key: "transferred-files/${transferId}/"
        }
      }
    },
    {
      Name: "NotifyOnSuccess",
      Type: "Lambda",
      LambdaStepDetails: {
        FunctionName: "arn:aws:lambda:us-east-1:123456789012:function:notifyFunction"
      }
    }
  ],
  OnExceptionSteps: [
    {
      Name: "NotifyOnFailure",
      Type: "Lambda",
      LambdaStepDetails: {
        FunctionName: "arn:aws:lambda:us-east-1:123456789012:function:errorHandler"
      }
    }
  ],
  Description: "A workflow that copies files and handles notifications."
});
```

## Using Tags for Organization

You can add tags to your workflows for better resource management:

```ts
const taggedWorkflow = await AWS.Transfer.Workflow("taggedWorkflow", {
  Steps: [
    {
      Name: "CopyToS3",
      Type: "Copy",
      CopyStepDetails: {
        Destination: {
          Bucket: "my-transfer-bucket",
          Key: "transferred-files/${transferId}/"
        }
      }
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "FileTransfer"
    }
  ]
});
```

## Full Workflow Example with Multiple Steps

Create a more complex workflow with multiple types of steps including a manual approval step:

```ts
const complexWorkflow = await AWS.Transfer.Workflow("complexWorkflow", {
  Steps: [
    {
      Name: "CopyToS3",
      Type: "Copy",
      CopyStepDetails: {
        Destination: {
          Bucket: "my-transfer-bucket",
          Key: "transferred-files/${transferId}/"
        }
      }
    },
    {
      Name: "ManualApproval",
      Type: "Approval",
      ApprovalStepDetails: {
        ApprovalMessage: "Please approve the transfer."
      }
    },
    {
      Name: "ProcessFiles",
      Type: "Lambda",
      LambdaStepDetails: {
        FunctionName: "arn:aws:lambda:us-east-1:123456789012:function:processFilesFunction"
      }
    }
  ],
  Description: "A complex workflow with multiple steps including manual approval."
});
```
