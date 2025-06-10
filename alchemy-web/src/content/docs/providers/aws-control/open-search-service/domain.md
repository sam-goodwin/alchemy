---
title: Domain
description: Learn how to create, update, and manage AWS OpenSearchService Domains using Alchemy Cloud Control.
---


The Domain resource lets you manage [AWS OpenSearchService Domains](https://docs.aws.amazon.com/opensearchservice/latest/userguide/) and their configuration settings. This resource allows you to create, update, and manage various attributes of OpenSearch domains, including security options, snapshot configurations, and logging.

## Minimal Example

Create a basic OpenSearchService Domain with a specified domain name and engine version.

```ts
import AWS from "alchemy/aws/control";

const openSearchDomain = await AWS.OpenSearchService.Domain("myOpenSearchDomain", {
  DomainName: "my-opensearch-domain",
  EngineVersion: "OpenSearch_1.0",
  AccessPolicies: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "es:*",
        Resource: "*"
      }
    ]
  })
});
```

## Advanced Configuration

Configure an OpenSearchService Domain with advanced options such as VPC settings and encryption at rest.

```ts
const advancedOpenSearchDomain = await AWS.OpenSearchService.Domain("advancedOpenSearchDomain", {
  DomainName: "advanced-opensearch-domain",
  EngineVersion: "OpenSearch_1.0",
  VPCOptions: {
    SubnetIds: ["subnet-12345678", "subnet-87654321"],
    SecurityGroupIds: ["sg-12345678"]
  },
  EncryptionAtRestOptions: {
    Enabled: true,
    KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-efgh-5678-ijkl-91011mnopqr"
  },
  LogPublishingOptions: {
    "INDEX_SLOW_LOGS": {
      CloudWatchLogsLogGroupArn: "arn:aws:logs:us-west-2:123456789012:log-group:my-log-group",
      Enabled: true
    }
  }
});
```

## Snapshot Options

Create an OpenSearchService Domain with custom snapshot options to manage automated snapshots.

```ts
const snapshotDomain = await AWS.OpenSearchService.Domain("snapshotDomain", {
  DomainName: "snapshot-opensearch-domain",
  SnapshotOptions: {
    AutomatedSnapshotStartHour: 0 // 12 AM UTC
  },
  AccessPolicies: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "es:ESHttpPut",
        Resource: "*"
      }
    ]
  })
});
```

## Logging Configuration

Set up logging for an OpenSearchService Domain to capture index and search slow logs.

```ts
const loggingDomain = await AWS.OpenSearchService.Domain("loggingDomain", {
  DomainName: "logging-opensearch-domain",
  LogPublishingOptions: {
    "SEARCH_SLOW_LOGS": {
      CloudWatchLogsLogGroupArn: "arn:aws:logs:us-west-2:123456789012:log-group:search-slow-logs",
      Enabled: true
    },
    "INDEX_SLOW_LOGS": {
      CloudWatchLogsLogGroupArn: "arn:aws:logs:us-west-2:123456789012:log-group:index-slow-logs",
      Enabled: true
    }
  }
});
```
