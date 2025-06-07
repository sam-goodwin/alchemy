---
title: Managing AWS Inspector ResourceGroups with Alchemy
description: Learn how to create, update, and manage AWS Inspector ResourceGroups using Alchemy Cloud Control.
---

# ResourceGroup

The ResourceGroup resource lets you manage [AWS Inspector ResourceGroups](https://docs.aws.amazon.com/inspector/latest/userguide/) that group AWS resources for assessment. This helps you streamline the process of identifying and assessing security vulnerabilities across your resources.

## Minimal Example

Create a basic AWS Inspector ResourceGroup with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicResourceGroup = await AWS.Inspector.ResourceGroup("BasicResourceGroup", {
  ResourceGroupTags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Security" }
  ],
  adopt: true
});
```

## Advanced Configuration

Configure a ResourceGroup to adopt existing resources and include additional tags for more granular management.

```ts
const AdvancedResourceGroup = await AWS.Inspector.ResourceGroup("AdvancedResourceGroup", {
  ResourceGroupTags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "DevOps" },
    { Key: "Project", Value: "SecurityAudit" }
  ],
  adopt: true
});
```

## Grouping Multiple Resources

Create a ResourceGroup that groups multiple types of resources for comprehensive security assessments.

```ts
const MultiResourceGroup = await AWS.Inspector.ResourceGroup("MultiResourceGroup", {
  ResourceGroupTags: [
    { Key: "Environment", Value: "Testing" },
    { Key: "Service", Value: "WebApp" }
  ],
  adopt: false
});

// Add logic to associate EC2 instances and Lambda functions to this ResourceGroup
```

## Using ResourceGroup in Security Assessments

Demonstrate how to use the ResourceGroup in conducting security assessments.

```ts
const SecurityAssessmentGroup = await AWS.Inspector.ResourceGroup("SecurityAssessmentGroup", {
  ResourceGroupTags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Compliance", Value: "PCI-DSS" }
  ],
  adopt: true
});

// Logic for triggering an assessment run goes here
```