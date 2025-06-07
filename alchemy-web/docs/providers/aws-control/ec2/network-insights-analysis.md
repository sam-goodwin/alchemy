---
title: Managing AWS EC2 NetworkInsightsAnalysiss with Alchemy
description: Learn how to create, update, and manage AWS EC2 NetworkInsightsAnalysiss using Alchemy Cloud Control.
---

# NetworkInsightsAnalysis

The NetworkInsightsAnalysis resource lets you analyze network paths in your AWS EC2 instances, providing insights into any network connectivity issues. For more information, refer to the official AWS documentation: [AWS EC2 NetworkInsightsAnalysiss](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic Network Insights Analysis with the required properties and a couple of optional ones.

```ts
import AWS from "alchemy/aws/control";

const BasicNetworkInsightsAnalysis = await AWS.EC2.NetworkInsightsAnalysis("BasicNetworkInsightsAnalysis", {
  NetworkInsightsPathId: "nip-12345678", // Replace with your Network Insights Path ID
  FilterInArns: ["arn:aws:ec2:us-east-1:123456789012:network-interface/eni-12345678"], // Replace with your ARNs
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Networking" }
  ]
});
```

## Advanced Configuration

Configure a more complex Network Insights Analysis with additional accounts and filter options.

```ts
const AdvancedNetworkInsightsAnalysis = await AWS.EC2.NetworkInsightsAnalysis("AdvancedNetworkInsightsAnalysis", {
  NetworkInsightsPathId: "nip-87654321", // Replace with your Network Insights Path ID
  AdditionalAccounts: ["123456789012", "987654321098"], // Additional AWS Account IDs
  FilterOutArns: ["arn:aws:ec2:us-east-1:123456789012:network-interface/eni-87654321"], // ARNs to filter out
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Use Case: Analyzing Multi-Account Network Paths

Create a Network Insights Analysis that includes multiple AWS accounts and custom filtering.

```ts
const MultiAccountNetworkInsightsAnalysis = await AWS.EC2.NetworkInsightsAnalysis("MultiAccountNetworkInsightsAnalysis", {
  NetworkInsightsPathId: "nip-12345678", // Replace with your Network Insights Path ID
  AdditionalAccounts: ["111111111111", "222222222222"], // Include multiple AWS Account IDs for analysis
  FilterInArns: [
    "arn:aws:ec2:us-east-1:123456789012:network-interface/eni-12345678",
    "arn:aws:ec2:us-east-1:123456789012:network-interface/eni-87654321"
  ],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Analytics" }
  ]
});
```