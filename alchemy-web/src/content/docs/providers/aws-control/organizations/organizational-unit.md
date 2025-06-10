---
title: OrganizationalUnit
description: Learn how to create, update, and manage AWS Organizations OrganizationalUnits using Alchemy Cloud Control.
---


The OrganizationalUnit resource lets you manage [AWS Organizations OrganizationalUnits](https://docs.aws.amazon.com/organizations/latest/userguide/) within your AWS account, allowing you to organize accounts in a hierarchical structure.

## Minimal Example

Create a basic organizational unit under a specified parent organizational unit.

```ts
import AWS from "alchemy/aws/control";

const organizationalUnit = await AWS.Organizations.OrganizationalUnit("basicOU", {
  ParentId: "ou-1234-abcdef",
  Name: "Finance",
  Tags: [
    {
      Key: "Department",
      Value: "Finance"
    }
  ]
});
```

## Advanced Configuration

Create an organizational unit with additional tags for better organization and identification.

```ts
const advancedOU = await AWS.Organizations.OrganizationalUnit("advancedOU", {
  ParentId: "ou-5678-ghijkl",
  Name: "Engineering",
  Tags: [
    {
      Key: "Team",
      Value: "DevOps"
    },
    {
      Key: "Project",
      Value: "Infrastructure"
    }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Nested Organizational Units

Create a nested organizational unit under an existing one to facilitate better account management.

```ts
const nestedOU = await AWS.Organizations.OrganizationalUnit("nestedOU", {
  ParentId: "ou-1234-abcdef", // ID of the parent OU
  Name: "Cloud Services",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Bulk Organizational Unit Creation

Demonstrate how to create multiple organizational units in a loop for batch processing.

```ts
const ouNames = ["HR", "Marketing", "Sales"];
const parentOUId = "ou-5678-ghijkl";

for (const ouName of ouNames) {
  await AWS.Organizations.OrganizationalUnit(`ou-${ouName}`, {
    ParentId: parentOUId,
    Name: ouName,
    Tags: [
      {
        Key: "Department",
        Value: ouName
      }
    ]
  });
}
```
