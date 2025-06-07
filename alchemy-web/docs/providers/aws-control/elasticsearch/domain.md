---
title: Managing AWS Elasticsearch Domains with Alchemy
description: Learn how to create, update, and manage AWS Elasticsearch Domains using Alchemy Cloud Control.
---

# Domain

The Domain resource lets you manage [AWS Elasticsearch Domains](https://docs.aws.amazon.com/elasticsearch/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic Elasticsearch domain with a specified domain name and access policies.

```ts
import AWS from "alchemy/aws/control";

const ElasticsearchDomain = await AWS.Elasticsearch.Domain("MyElasticsearchDomain", {
  DomainName: "my-elasticsearch-domain",
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
  ElasticsearchVersion: "7.10",
  NodeToNodeEncryptionOptions: {
    Enabled: true
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Project", Value: "SearchService" }
  ]
});
```

## Advanced Configuration

Configure an Elasticsearch domain with advanced options such as Cognito authentication and VPC settings.

```ts
const AdvancedElasticsearchDomain = await AWS.Elasticsearch.Domain("AdvancedElasticsearchDomain", {
  DomainName: "advanced-elasticsearch-domain",
  AccessPolicies: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "cognito-identity.amazonaws.com"
        },
        Action: "es:*",
        Resource: "*"
      }
    ]
  }),
  CognitoOptions: {
    Enabled: true,
    IdentityPoolId: "us-west-2:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    RoleArn: "arn:aws:iam::123456789012:role/Cognito_ESAccessRole"
  },
  VPCOptions: {
    SubnetIds: ["subnet-0bb1c79c", "subnet-0bb1c79d"],
    SecurityGroupIds: ["sg-0bb1c79e"]
  },
  AdvancedOptions: {
    "rest.action.multi.allow_explicit_index": "true"
  }
});
```

## Encrypted Domain Example

Create an Elasticsearch domain with encryption at rest enabled for enhanced security.

```ts
const EncryptedElasticsearchDomain = await AWS.Elasticsearch.Domain("EncryptedElasticsearchDomain", {
  DomainName: "encrypted-elasticsearch-domain",
  EBSOptions: {
    EBSEnabled: true,
    VolumeType: "gp2",
    VolumeSize: 10
  },
  EncryptionAtRestOptions: {
    Enabled: true,
    KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd-1234-a1b2-xyz"
  },
  SnapshotOptions: {
    AutomatedSnapshotStartHour: 0
  }
});
```