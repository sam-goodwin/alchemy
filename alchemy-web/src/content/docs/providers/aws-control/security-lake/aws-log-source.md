---
title: AwsLogSource
description: Learn how to create, update, and manage AWS SecurityLake AwsLogSources using Alchemy Cloud Control.
---


The AwsLogSource resource lets you manage [AWS SecurityLake AwsLogSources](https://docs.aws.amazon.com/securitylake/latest/userguide/) for integrating log data from various AWS accounts and services into AWS Security Lake.

## Minimal Example

Create a basic AwsLogSource with required properties and a couple of common optional ones.

```ts
import AWS from "alchemy/aws/control";

const logSource = await AWS.SecurityLake.AwsLogSource("myLogSource", {
  SourceName: "MyLogSource",
  SourceVersion: "1.0",
  Accounts: ["123456789012", "987654321098"],
  DataLakeArn: "arn:aws:securitylake:us-east-1:123456789012:data-lake"
});
```

## Advanced Configuration

Configure an AwsLogSource with existing resource adoption.

```ts
const advancedLogSource = await AWS.SecurityLake.AwsLogSource("advancedLogSource", {
  SourceName: "AdvancedLogSource",
  SourceVersion: "1.1",
  Accounts: ["123456789012"],
  DataLakeArn: "arn:aws:securitylake:us-east-1:123456789012:data-lake",
  adopt: true // Adopts an existing resource instead of failing
});
```

## Multi-Account Configuration

Create an AwsLogSource that pulls logs from multiple AWS accounts.

```ts
const multiAccountLogSource = await AWS.SecurityLake.AwsLogSource("multiAccountLogSource", {
  SourceName: "MultiAccountLogSource",
  SourceVersion: "1.2",
  Accounts: ["123456789012", "234567890123", "345678901234"],
  DataLakeArn: "arn:aws:securitylake:us-east-1:123456789012:data-lake"
});
```

## Updating an Existing Source

Demonstrate updating an existing AwsLogSource with a new version.

```ts
const updatedLogSource = await AWS.SecurityLake.AwsLogSource("existingLogSource", {
  SourceName: "ExistingLogSource",
  SourceVersion: "1.3", // Updated version
  Accounts: ["123456789012"],
  DataLakeArn: "arn:aws:securitylake:us-east-1:123456789012:data-lake"
});
```
