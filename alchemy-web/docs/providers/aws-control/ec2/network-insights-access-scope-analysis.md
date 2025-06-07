---
title: Managing AWS EC2 NetworkInsightsAccessScopeAnalysiss with Alchemy
description: Learn how to create, update, and manage AWS EC2 NetworkInsightsAccessScopeAnalysiss using Alchemy Cloud Control.
---

# NetworkInsightsAccessScopeAnalysis

The NetworkInsightsAccessScopeAnalysis resource allows you to analyze the access scope of your AWS EC2 resources, providing insights into network connectivity and ensuring proper configuration. For more information, refer to the [AWS EC2 NetworkInsightsAccessScopeAnalysiss documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic Network Insights Access Scope Analysis with required properties.

```ts
import AWS from "alchemy/aws/control";

const BasicNetworkInsightsAnalysis = await AWS.EC2.NetworkInsightsAccessScopeAnalysis("BasicAnalysis", {
  NetworkInsightsAccessScopeId: "nis-12345678", // Replace with your actual Access Scope ID
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```

## Advanced Configuration

Configure a Network Insights Access Scope Analysis with additional options.

```ts
const AdvancedNetworkInsightsAnalysis = await AWS.EC2.NetworkInsightsAccessScopeAnalysis("AdvancedAnalysis", {
  NetworkInsightsAccessScopeId: "nis-87654321", // Replace with your actual Access Scope ID
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "NetworkOps" }
  ],
  adopt: true // Allows adoption of existing resource instead of failing
});
```

## Using with Additional Properties

Analyze the access scope and gain insights into network paths for specific resources.

```ts
const PathAnalysis = await AWS.EC2.NetworkInsightsAccessScopeAnalysis("PathAnalysis", {
  NetworkInsightsAccessScopeId: "nis-11223344", // Replace with your actual Access Scope ID
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Project", Value: "NetworkAnalysis" }
  ],
  adopt: false // Default behaviour, will fail if resource already exists
});
```