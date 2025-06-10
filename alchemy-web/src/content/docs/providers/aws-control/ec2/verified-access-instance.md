---
title: VerifiedAccessInstance
description: Learn how to create, update, and manage AWS EC2 VerifiedAccessInstances using Alchemy Cloud Control.
---


The VerifiedAccessInstance resource allows you to manage [AWS EC2 Verified Access Instances](https://docs.aws.amazon.com/ec2/latest/userguide/) for secure and controlled access to your applications and services.

## Minimal Example

Create a basic Verified Access Instance with essential properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicVerifiedAccessInstance = await AWS.EC2.VerifiedAccessInstance("basicVerifiedAccessInstance", {
  VerifiedAccessTrustProviders: [{
    Type: "AWS",
    Id: "provider-id-123"
  }],
  Description: "This is a basic Verified Access Instance for secure access.",
  FipsEnabled: false,
  Tags: [{
    Key: "Environment",
    Value: "Development"
  }]
});
```

## Advanced Configuration

Configure a Verified Access Instance with logging configurations and custom CIDR endpoints.

```ts
const advancedVerifiedAccessInstance = await AWS.EC2.VerifiedAccessInstance("advancedVerifiedAccessInstance", {
  VerifiedAccessTrustProviders: [{
    Type: "AWS",
    Id: "provider-id-456"
  }],
  Description: "This Verified Access Instance has advanced configurations.",
  LoggingConfigurations: {
    LogDestination: "s3://my-log-bucket/",
    LogFormat: "json"
  },
  CidrEndpointsCustomSubDomain: "custom-subdomain.example.com",
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }]
});
```

## Adopt Existing Resource

If you want to adopt an existing Verified Access Instance instead of failing when it already exists, you can set the `adopt` property to true.

```ts
const adoptVerifiedAccessInstance = await AWS.EC2.VerifiedAccessInstance("adoptVerifiedAccessInstance", {
  VerifiedAccessTrustProviders: [{
    Type: "AWS",
    Id: "provider-id-789"
  }],
  Description: "Adopting an existing Verified Access Instance.",
  adopt: true
});
```

## Logging Configuration Example

Create a Verified Access Instance with specific logging configurations to monitor access.

```ts
const loggingVerifiedAccessInstance = await AWS.EC2.VerifiedAccessInstance("loggingVerifiedAccessInstance", {
  VerifiedAccessTrustProviders: [{
    Type: "AWS",
    Id: "provider-id-101"
  }],
  Description: "This instance is configured for logging access events.",
  LoggingConfigurations: {
    LogDestination: "s3://my-logging-bucket/",
    LogFormat: "text"
  },
  Tags: [{
    Key: "Project",
    Value: "AccessControl"
  }]
});
```
