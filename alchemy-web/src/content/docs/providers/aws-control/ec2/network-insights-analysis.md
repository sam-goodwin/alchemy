---
title: NetworkInsightsAnalysis
description: Learn how to create, update, and manage AWS EC2 NetworkInsightsAnalysiss using Alchemy Cloud Control.
---


The NetworkInsightsAnalysis resource allows you to analyze network paths within your Amazon EC2 environment, providing insights into connectivity and performance. For more details, refer to the [AWS EC2 NetworkInsightsAnalysiss documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic Network Insights Analysis with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const networkInsightsAnalysis = await AWS.EC2.NetworkInsightsAnalysis("basicAnalysis", {
  NetworkInsightsPathId: "nip-0123456789abcdef0", // Network Insights Path ID
  FilterInArns: ["arn:aws:ec2:us-east-1:123456789012:filter/myFilter"] // Optional filter
});
```

## Advanced Configuration

Configure a more complex Network Insights Analysis with additional accounts and tags.

```ts
const advancedAnalysis = await AWS.EC2.NetworkInsightsAnalysis("advancedAnalysis", {
  NetworkInsightsPathId: "nip-0123456789abcdef1", // Network Insights Path ID
  AdditionalAccounts: ["123456789012", "987654321098"], // Additional AWS accounts to include
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ] // Tags for resource management
});
```

## Analysis with Adoption

Create an analysis that adopts an existing resource instead of failing if it already exists.

```ts
const adoptAnalysis = await AWS.EC2.NetworkInsightsAnalysis("adoptAnalysis", {
  NetworkInsightsPathId: "nip-0123456789abcdef2", // Network Insights Path ID
  adopt: true // Adopt existing resource
});
```

## Detailed Path Analysis

Perform a detailed analysis with multiple filters and tags for enhanced insights.

```ts
const detailedAnalysis = await AWS.EC2.NetworkInsightsAnalysis("detailedAnalysis", {
  NetworkInsightsPathId: "nip-0123456789abcdef3", // Network Insights Path ID
  FilterInArns: [
    "arn:aws:ec2:us-east-1:123456789012:filter/filter1",
    "arn:aws:ec2:us-east-1:123456789012:filter/filter2"
  ], // Multiple filters
  AdditionalAccounts: ["123456789012"], // Including another AWS account
  Tags: [
    { Key: "Purpose", Value: "Network Analysis" },
    { Key: "Owner", Value: "NetworkTeam" }
  ] // Additional tags
});
```
