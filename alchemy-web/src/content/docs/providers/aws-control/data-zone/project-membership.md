---
title: ProjectMembership
description: Learn how to create, update, and manage AWS DataZone ProjectMemberships using Alchemy Cloud Control.
---


The ProjectMembership resource allows you to manage [AWS DataZone ProjectMemberships](https://docs.aws.amazon.com/datazone/latest/userguide/) for collaboration on data projects within your organization.

## Minimal Example

Create a basic ProjectMembership with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const projectMembership = await AWS.DataZone.ProjectMembership("myProjectMembership", {
  ProjectIdentifier: "project-12345",
  Designation: "Data Analyst",
  Member: {
    Type: "User",
    Id: "user-67890"
  },
  DomainIdentifier: "domain-abcde",
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a ProjectMembership with additional settings that may be relevant for larger teams.

```ts
const advancedProjectMembership = await AWS.DataZone.ProjectMembership("advancedProjectMembership", {
  ProjectIdentifier: "project-54321",
  Designation: "Project Manager",
  Member: {
    Type: "User",
    Id: "user-09876"
  },
  DomainIdentifier: "domain-edcba",
  adopt: false, // Will throw an error if a resource already exists
});
```

## Collaborating with Multiple Members

Demonstrate how to add multiple members to a project with distinct roles.

```ts
const dataEngineerMembership = await AWS.DataZone.ProjectMembership("dataEngineerMembership", {
  ProjectIdentifier: "project-13579",
  Designation: "Data Engineer",
  Member: {
    Type: "User",
    Id: "user-24680"
  },
  DomainIdentifier: "domain-zyxwv",
  adopt: true
});

const dataScientistMembership = await AWS.DataZone.ProjectMembership("dataScientistMembership", {
  ProjectIdentifier: "project-13579",
  Designation: "Data Scientist",
  Member: {
    Type: "User",
    Id: "user-11223"
  },
  DomainIdentifier: "domain-zyxwv",
  adopt: true
});
```
