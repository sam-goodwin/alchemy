---
title: ResourceGroup
description: Learn how to create, update, and manage AWS Inspector ResourceGroups using Alchemy Cloud Control.
---


The ResourceGroup resource lets you manage [AWS Inspector ResourceGroups](https://docs.aws.amazon.com/inspector/latest/userguide/) for organizing resources to be assessed for security vulnerabilities.

## Minimal Example

Create a basic ResourceGroup with required tags:

```ts
import AWS from "alchemy/aws/control";

const resourceGroup = await AWS.Inspector.ResourceGroup("myResourceGroup", {
  ResourceGroupTags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "WebApp" }
  ],
  adopt: false // Optional: Set to true to adopt existing resource
});
```

## Advanced Configuration

Configure a ResourceGroup with additional tags and the adopt property set to true:

```ts
const advancedResourceGroup = await AWS.Inspector.ResourceGroup("advancedResourceGroup", {
  ResourceGroupTags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Compliance", Value: "PCI-DSS" }
  ],
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Resource Group with Multiple Tags

Create a ResourceGroup that includes multiple tags for better organization:

```ts
const multiTagResourceGroup = await AWS.Inspector.ResourceGroup("multiTagResourceGroup", {
  ResourceGroupTags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "DevOps" },
    { Key: "Application", Value: "APIService" }
  ],
  adopt: false
});
```

## Resource Group for Specific Assessment

Set up a ResourceGroup specifically for an assessment of a web application:

```ts
const webAppResourceGroup = await AWS.Inspector.ResourceGroup("webAppResourceGroup", {
  ResourceGroupTags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Application", Value: "ECommerce" },
    { Key: "Criticality", Value: "High" }
  ],
  adopt: false
});
```
