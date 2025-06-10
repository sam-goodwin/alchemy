---
title: LogStream
description: Learn how to create, update, and manage AWS Logs LogStreams using Alchemy Cloud Control.
---


The LogStream resource allows you to manage [AWS Logs LogStreams](https://docs.aws.amazon.com/logs/latest/userguide/) which are used to collect log events from your applications and services. LogStreams are associated with a LogGroup and are crucial for organizing and processing log data.

## Minimal Example

Create a basic LogStream associated with a LogGroup.

```ts
import AWS from "alchemy/aws/control";

const basicLogStream = await AWS.Logs.LogStream("basicLogStream", {
  LogGroupName: "ApplicationLogs",
  LogStreamName: "InitialLogStream" // Optional: Default name
});
```

## Advanced Configuration

Configure a LogStream with adoption of an existing resource.

```ts
const adoptedLogStream = await AWS.Logs.LogStream("adoptedLogStream", {
  LogGroupName: "ApplicationLogs",
  LogStreamName: "ExistingLogStream", // Optional: Adopt an existing log stream
  adopt: true // Set to true to adopt an existing resource
});
```

## Adding a New LogStream

Create a new LogStream for a different service within the same LogGroup.

```ts
const serviceLogStream = await AWS.Logs.LogStream("serviceLogStream", {
  LogGroupName: "ApplicationLogs",
  LogStreamName: "ServiceLogStream" // Optional: Name for new service log stream
});
```

## Updating LogStream Properties

Update the LogStream name for better identification.

```ts
const updatedLogStream = await AWS.Logs.LogStream("updatedLogStream", {
  LogGroupName: "ApplicationLogs",
  LogStreamName: "UpdatedLogStreamName" // Changing the name for clarity
});
```
