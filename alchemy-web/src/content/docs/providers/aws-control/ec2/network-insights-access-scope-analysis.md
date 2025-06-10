---
title: NetworkInsightsAccessScopeAnalysis
description: Learn how to create, update, and manage AWS EC2 NetworkInsightsAccessScopeAnalysiss using Alchemy Cloud Control.
---


The NetworkInsightsAccessScopeAnalysis resource allows you to manage network insights access scope analyses in AWS EC2. This resource is crucial for evaluating access paths and their permissions for network configurations. For more details, refer to the official AWS documentation on [AWS EC2 NetworkInsightsAccessScopeAnalysiss](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic NetworkInsightsAccessScopeAnalysis with required properties.

```ts
import AWS from "alchemy/aws/control";

const networkInsightsAnalysis = await AWS.EC2.NetworkInsightsAccessScopeAnalysis("basicAnalysis", {
  NetworkInsightsAccessScopeId: "nis-1234567890abcdef0",
  Tags: [
    {
      Key: "Environment",
      Value: "Test"
    }
  ]
});
```

## Advanced Configuration

In this example, we configure the NetworkInsightsAccessScopeAnalysis with the optional `adopt` property to allow adoption of an existing resource.

```ts
const advancedAnalysis = await AWS.EC2.NetworkInsightsAccessScopeAnalysis("advancedAnalysis", {
  NetworkInsightsAccessScopeId: "nis-abcdef1234567890",
  Tags: [
    {
      Key: "Project",
      Value: "NetworkSecurity"
    }
  ],
  adopt: true
});
```

## Analysis for Multiple Access Scopes

This example shows how to analyze multiple access scopes by creating distinct analyses for different scopes.

```ts
const publicAccessAnalysis = await AWS.EC2.NetworkInsightsAccessScopeAnalysis("publicAccessAnalysis", {
  NetworkInsightsAccessScopeId: "nis-0987654321abcdef0",
  Tags: [
    {
      Key: "Type",
      Value: "Public"
    }
  ]
});

const privateAccessAnalysis = await AWS.EC2.NetworkInsightsAccessScopeAnalysis("privateAccessAnalysis", {
  NetworkInsightsAccessScopeId: "nis-fedcba9876543210",
  Tags: [
    {
      Key: "Type",
      Value: "Private"
    }
  ]
});
```

## Scheduled Analysis for Continuous Monitoring

This example demonstrates a scheduled analysis setup to enable continuous monitoring of access scopes.

```ts
const scheduledAnalysis = await AWS.EC2.NetworkInsightsAccessScopeAnalysis("scheduledAnalysis", {
  NetworkInsightsAccessScopeId: "nis-1122334455667788",
  Tags: [
    {
      Key: "Frequency",
      Value: "Daily"
    }
  ],
  adopt: true
});
```
