---
title: Analyzer
description: Learn how to create, update, and manage AWS AccessAnalyzer Analyzers using Alchemy Cloud Control.
---


The Analyzer resource allows you to manage [AWS AccessAnalyzer Analyzers](https://docs.aws.amazon.com/accessanalyzer/latest/userguide/) that help you identify potential resource access issues across your AWS environment.

## Minimal Example

Create a basic AccessAnalyzer with a specified type and an optional name.

```ts
import AWS from "alchemy/aws/control";

const basicAnalyzer = await AWS.AccessAnalyzer.Analyzer("myBasicAnalyzer", {
  Type: "ACCOUNT",
  AnalyzerName: "MyBasicAnalyzer"
});
```

## Advanced Configuration

Configure an AccessAnalyzer with archive rules and tags for better resource management.

```ts
const advancedAnalyzer = await AWS.AccessAnalyzer.Analyzer("myAdvancedAnalyzer", {
  Type: "ORGANIZATION",
  AnalyzerName: "MyAdvancedAnalyzer",
  ArchiveRules: [
    {
      Filter: {
        "accountId": "123456789012",
        "resourceType": "AWS::S3::Bucket"
      },
      RuleName: "ArchiveS3BucketRules"
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Department",
      Value: "Engineering"
    }
  ]
});
```

## Adopting Existing Resources

Create an AccessAnalyzer that adopts an existing resource if it already exists.

```ts
const adoptExistingAnalyzer = await AWS.AccessAnalyzer.Analyzer("myAdoptAnalyzer", {
  Type: "ACCOUNT",
  AnalyzerName: "MyAdoptAnalyzer",
  adopt: true
});
```

## Configuring Analyzer with Specific Settings

Set up an AccessAnalyzer with specific configuration settings for enhanced analysis.

```ts
const configuredAnalyzer = await AWS.AccessAnalyzer.Analyzer("myConfiguredAnalyzer", {
  Type: "ORGANIZATION",
  AnalyzerConfiguration: {
    ArchiveRules: [
      {
        RuleName: "MyArchiveRule",
        Filter: {
          "resourceType": "AWS::IAM::Role"
        }
      }
    ]
  }
});
```
