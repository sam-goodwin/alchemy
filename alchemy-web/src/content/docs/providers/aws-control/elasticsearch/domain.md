---
title: Domain
description: Learn how to create, update, and manage AWS Elasticsearch Domains using Alchemy Cloud Control.
---


The Domain resource lets you manage [AWS Elasticsearch Domains](https://docs.aws.amazon.com/elasticsearch/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic Elasticsearch Domain with essential properties.

```ts
import AWS from "alchemy/aws/control";

const elasticsearchDomain = await AWS.Elasticsearch.Domain("myElasticsearchDomain", {
  DomainName: "my-elasticsearch-domain",
  ElasticsearchVersion: "7.10",
  EBSOptions: {
    EBSEnabled: true,
    VolumeType: "gp2",
    VolumeSize: 10
  },
  VPCOptions: {
    SubnetIds: ["subnet-0abcd1234efgh5678"],
    SecurityGroupIds: ["sg-01234abcd567efgh8"]
  },
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "SearchService" }
  ]
});
```

## Advanced Configuration

Configure an Elasticsearch Domain with advanced security options and logging.

```ts
const advancedElasticsearchDomain = await AWS.Elasticsearch.Domain("secureElasticsearchDomain", {
  DomainName: "secure-elasticsearch-domain",
  ElasticsearchVersion: "7.10",
  AdvancedSecurityOptions: {
    Enabled: true,
    InternalUserDatabaseEnabled: true,
    MasterUserOptions: {
      MasterUserName: "admin",
      MasterUserPassword: alchemy.secret(process.env.ES_MASTER_PASSWORD!)
    }
  },
  LogPublishingOptions: {
    SearchSlowLog: {
      Enabled: true,
      CloudWatchLogGroupArn: "arn:aws:logs:us-west-2:123456789012:log-group:/aws/elasticsearch/my-slow-log",
      LogType: "All"
    }
  }
});
```

## Using Cognito for Authentication

Create an Elasticsearch Domain that uses Amazon Cognito for user authentication.

```ts
const cognitoElasticsearchDomain = await AWS.Elasticsearch.Domain("cognitoElasticsearchDomain", {
  DomainName: "cognito-elasticsearch-domain",
  ElasticsearchVersion: "7.10",
  CognitoOptions: {
    Enabled: true,
    UserPoolId: "us-west-2_aBcDeFgHi",
    IdentityPoolId: "us-west-2:12345678-abcd-1234-abcd-1234567890ab",
    RoleArn: "arn:aws:iam::123456789012:role/CognitoAccessRole"
  }
});
```

## Snapshot Configuration

Configure an Elasticsearch Domain with snapshot options for data backup.

```ts
const snapshotElasticsearchDomain = await AWS.Elasticsearch.Domain("snapshotElasticsearchDomain", {
  DomainName: "snapshot-elasticsearch-domain",
  ElasticsearchVersion: "7.10",
  SnapshotOptions: {
    AutomatedSnapshotStartHour: 0 // Set to midnight UTC
  }
});
```

## Encryption at Rest

Create an Elasticsearch Domain with encryption at rest enabled.

```ts
const encryptedElasticsearchDomain = await AWS.Elasticsearch.Domain("encryptedElasticsearchDomain", {
  DomainName: "encrypted-elasticsearch-domain",
  ElasticsearchVersion: "7.10",
  EncryptionAtRestOptions: {
    Enabled: true,
    KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst"
  }
});
```
