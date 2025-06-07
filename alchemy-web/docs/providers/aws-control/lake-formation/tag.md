---
title: Managing AWS LakeFormation Tags with Alchemy
description: Learn how to create, update, and manage AWS LakeFormation Tags using Alchemy Cloud Control.
---

# Tag

The Tag resource allows you to manage [AWS LakeFormation Tags](https://docs.aws.amazon.com/lakeformation/latest/userguide/) for organizing and controlling access to your data lake resources.

## Minimal Example

Create a basic LakeFormation Tag with required properties:

```ts
import AWS from "alchemy/aws/control";

const DataGovernanceTag = await AWS.LakeFormation.Tag("DataGovernanceTag", {
  TagKey: "DataGovernance",
  TagValues: ["PII", "Confidential"],
  CatalogId: "123456789012" // Your AWS Account ID
});
```

## Advanced Configuration

Create a LakeFormation Tag while adopting an existing resource:

```ts
const SecurityTag = await AWS.LakeFormation.Tag("SecurityTag", {
  TagKey: "SecurityLevel",
  TagValues: ["High", "Medium"],
  CatalogId: "123456789012", // Your AWS Account ID
  adopt: true // Adopt existing resource if it already exists
});
```

## Use Case: Tagging Data Assets

Create a tag to classify data assets for regulatory compliance:

```ts
const ComplianceTag = await AWS.LakeFormation.Tag("ComplianceTag", {
  TagKey: "Compliance",
  TagValues: ["GDPR", "HIPAA"],
  CatalogId: "123456789012" // Your AWS Account ID
});
```

## Use Case: Tagging for Data Lifecycle Management

Create a tag for managing data lifecycle:

```ts
const LifecycleTag = await AWS.LakeFormation.Tag("LifecycleTag", {
  TagKey: "DataLifecycle",
  TagValues: ["Archive", "Active"],
  CatalogId: "123456789012" // Your AWS Account ID
});
```