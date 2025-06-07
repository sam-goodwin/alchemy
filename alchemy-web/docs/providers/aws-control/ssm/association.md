---
title: Managing AWS SSM Associations with Alchemy
description: Learn how to create, update, and manage AWS SSM Associations using Alchemy Cloud Control.
---

# Association

The Association resource allows you to manage [AWS SSM Associations](https://docs.aws.amazon.com/ssm/latest/userguide/) for automating tasks on your Amazon EC2 instances and other managed instances.

## Minimal Example

Create a basic SSM Association that targets an instance to run the `AWS-UpdateSSMAgent` document.

```ts
import AWS from "alchemy/aws/control";

const SimpleAssociation = await AWS.SSM.Association("SimpleAssociation", {
  Name: "AWS-UpdateSSMAgent",
  InstanceId: "i-0123456789abcdef0", // Replace with your EC2 instance ID
  Parameters: {
    "UpdateLevel": ["latest"]
  },
  ScheduleExpression: "cron(0 0 * * ? *)" // Runs daily at midnight UTC
});
```

## Advanced Configuration

Configure an association with additional parameters, multiple targets, and compliance settings.

```ts
const AdvancedAssociation = await AWS.SSM.Association("AdvancedAssociation", {
  Name: "AWS-RunShellScript",
  InstanceId: "i-abcdef0123456789", // Replace with your EC2 instance ID
  Parameters: {
    "commands": ["echo 'Hello, World!' > /tmp/hello.txt"],
    "executionTimeout": ["3600"] // Timeout after 1 hour
  },
  Targets: [
    {
      Key: "InstanceIds",
      Values: ["i-0123456789abcdef0", "i-abcdef0123456789"] // Multiple instance IDs
    }
  ],
  ComplianceSeverity: "CRITICAL",
  MaxConcurrency: "50%",
  MaxErrors: "0",
  WaitForSuccessTimeoutSeconds: 300 // Wait for 5 minutes
});
```

## Using Calendar Names

Create an association that runs based on specified calendar names to control execution timing.

```ts
const CalendarAssociation = await AWS.SSM.Association("CalendarAssociation", {
  Name: "AWS-RunCommand",
  InstanceId: "i-0123456789abcdef0", // Replace with your EC2 instance ID
  CalendarNames: ["MyScheduleCalendar"], // Use defined calendar names
  DocumentVersion: "$LATEST",
  Parameters: {
    "commands": ["sudo yum update -y"]
  }
});
```

## Sync Compliance Example

Set up an association that enforces sync compliance with specific output locations.

```ts
const SyncComplianceAssociation = await AWS.SSM.Association("SyncComplianceAssociation", {
  Name: "AWS-ConfigureWindowsUpdates",
  InstanceId: "i-0123456789abcdef0", // Replace with your EC2 instance ID
  SyncCompliance: "AUTO",
  OutputLocation: {
    S3Location: {
      OutputS3BucketName: "my-ssm-output-bucket", // Replace with your S3 bucket name
      OutputS3KeyPrefix: "ssm-output/"
    }
  }
});
```