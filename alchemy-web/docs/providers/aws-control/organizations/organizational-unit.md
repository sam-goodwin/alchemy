---
title: Managing AWS Organizations OrganizationalUnits with Alchemy
description: Learn how to create, update, and manage AWS Organizations OrganizationalUnits using Alchemy Cloud Control.
---

# OrganizationalUnit

The OrganizationalUnit resource lets you manage [AWS Organizations OrganizationalUnits](https://docs.aws.amazon.com/organizations/latest/userguide/) within your AWS environment, allowing you to structure your accounts in a hierarchical manner.

## Minimal Example

Create an OrganizationalUnit under a specified parent with basic properties.

```ts
import AWS from "alchemy/aws/control";

const OrgUnit = await AWS.Organizations.OrganizationalUnit("DevOrgUnit", {
  ParentId: "ou-1234-5678", // Replace with your actual Parent ID
  Name: "Development Team",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Create an OrganizationalUnit while adopting an existing resource if it already exists.

```ts
const ProductionOrgUnit = await AWS.Organizations.OrganizationalUnit("ProdOrgUnit", {
  ParentId: "ou-1234-5678", // Replace with your actual Parent ID
  Name: "Production Team",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Operations" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Nested OrganizationalUnits

Create a nested OrganizationalUnit under an existing one to further structure your AWS accounts.

```ts
const SubTeamOrgUnit = await AWS.Organizations.OrganizationalUnit("SubTeamOrgUnit", {
  ParentId: "ou-1234-5678", // Replace with the Parent ID of the Development Team
  Name: "Sub Development Team",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "SubDev" }
  ]
});
```

## Tagging for Management

Create an OrganizationalUnit with tags for better management and cost allocation.

```ts
const MarketingOrgUnit = await AWS.Organizations.OrganizationalUnit("MarketingOrgUnit", {
  ParentId: "ou-1234-5678", // Replace with your actual Parent ID
  Name: "Marketing Team",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Marketing" },
    { Key: "Project", Value: "Q4Campaign" }
  ]
});
```