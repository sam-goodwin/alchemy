---
title: Queue
description: Learn how to create, update, and manage AWS Deadline Queues using Alchemy Cloud Control.
---


The Queue resource allows you to manage [AWS Deadline Queues](https://docs.aws.amazon.com/deadline/latest/userguide/) which are used for job management in the AWS Deadline environment.

## Minimal Example

Create a basic Deadline Queue with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicQueue = await AWS.Deadline.Queue("basicQueue", {
  DisplayName: "Basic Render Queue",
  FarmId: "renderFarmId",
  JobRunAsUser: "defaultUser"
});
```

## Advanced Configuration

Configure a Deadline Queue with several optional properties for more control over job management.

```ts
const advancedQueue = await AWS.Deadline.Queue("advancedQueue", {
  DisplayName: "Advanced Render Queue",
  FarmId: "advancedFarmId",
  AllowedStorageProfileIds: ["storageProfile1", "storageProfile2"],
  Description: "This queue handles high-priority rendering jobs.",
  RoleArn: "arn:aws:iam::123456789012:role/DeadlineRole",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "VFX" }
  ]
});
```

## Configuring Job Attachment Settings

Set specific job attachment settings for the Deadline Queue.

```ts
const queueWithJobAttachmentSettings = await AWS.Deadline.Queue("jobAttachmentQueue", {
  DisplayName: "Job Attachment Queue",
  FarmId: "jobAttachmentFarmId",
  JobAttachmentSettings: {
    IncludeJobLogs: true,
    IncludeJobReports: true
  }
});
```

## Using Required File System Locations

Define required file system locations for jobs submitted to the queue.

```ts
const queueWithFileSystemLocations = await AWS.Deadline.Queue("fileSystemQueue", {
  DisplayName: "File System Location Queue",
  FarmId: "fileSystemFarmId",
  RequiredFileSystemLocationNames: [
    "location1",
    "location2"
  ]
});
```
