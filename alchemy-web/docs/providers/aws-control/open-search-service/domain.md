---
title: Managing AWS OpenSearchService Domains with Alchemy
description: Learn how to create, update, and manage AWS OpenSearchService Domains using Alchemy Cloud Control.
---

# Domain

The Domain resource lets you manage [AWS OpenSearchService Domains](https://docs.aws.amazon.com/opensearchservice/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic OpenSearchService domain with a specified domain name and access policies.

```ts
import AWS from "alchemy/aws/control";

const OpenSearchDomain = await AWS.OpenSearchService.Domain("MyOpenSearchDomain", {
  DomainName: "my-opensearch-domain",
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
  }),
  VPCOptions: {
    SubnetIds: ["subnet-0123456789abcdef0"],
    SecurityGroupIds: ["sg-0123456789abcdef0"]
  }
});
```

## Advanced Configuration

Configure an OpenSearchService domain with advanced security options and snapshot settings.

```ts
const AdvancedOpenSearchDomain = await AWS.OpenSearchService.Domain("AdvancedOpenSearchDomain", {
  DomainName: "advanced-opensearch-domain",
  AdvancedSecurityOptions: {
    Enabled: true,
    InternalUserDatabaseEnabled: true,
    MasterUserOptions: {
      MasterUserName: "admin",
      MasterUserPassword: "SecurePassword123!"
    }
  },
  SnapshotOptions: {
    AutomatedSnapshotStartHour: 0
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Enhanced Security with Node-to-Node Encryption

Create a domain that enables node-to-node encryption for enhanced security.

```ts
const SecureOpenSearchDomain = await AWS.OpenSearchService.Domain("SecureOpenSearchDomain", {
  DomainName: "secure-opensearch-domain",
  NodeToNodeEncryptionOptions: {
    Enabled: true
  },
  EncryptionAtRestOptions: {
    Enabled: true,
    KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-ef56-78gh-90ij-klmnopqrstu"
  }
});
```

## Custom Logging Options

Set up logging for your OpenSearchService domain to monitor access and performance.

```ts
const LoggingOpenSearchDomain = await AWS.OpenSearchService.Domain("LoggingOpenSearchDomain", {
  DomainName: "logging-opensearch-domain",
  LogPublishingOptions: {
    IndexSlowLogs: {
      CloudWatchLogsLogGroupArn: "arn:aws:logs:us-west-2:123456789012:log-group:my-log-group",
      Enabled: true
    },
    SearchSlowLogs: {
      CloudWatchLogsLogGroupArn: "arn:aws:logs:us-west-2:123456789012:log-group:my-log-group",
      Enabled: true
    },
    AuditLogs: {
      CloudWatchLogsLogGroupArn: "arn:aws:logs:us-west-2:123456789012:log-group:my-log-group",
      Enabled: true
    }
  }
});
```