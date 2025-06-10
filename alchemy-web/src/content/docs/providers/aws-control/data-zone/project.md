---
title: Project
description: Learn how to create, update, and manage AWS DataZone Projects using Alchemy Cloud Control.
---


The Project resource lets you manage [AWS DataZone Projects](https://docs.aws.amazon.com/datazone/latest/userguide/) to facilitate data management and collaboration across your organization.

## Minimal Example

Create a basic DataZone project with required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const dataZoneProject = await AWS.DataZone.Project("myDataZoneProject", {
  domainIdentifier: "my-domain",
  name: "Marketing Data Project",
  description: "A project to manage marketing data assets."
});
```

## Advanced Configuration

Configure a project with glossary terms for enhanced data classification.

```ts
const advancedDataZoneProject = await AWS.DataZone.Project("advancedDataZoneProject", {
  domainIdentifier: "my-domain",
  name: "Sales Data Project",
  description: "A project dedicated to managing sales-related data.",
  glossaryTerms: ["Sales", "Customer", "Revenue"]
});
```

## Adoption of Existing Resources

Create a project and set the adopt property to true to handle existing resources gracefully.

```ts
const adoptedDataZoneProject = await AWS.DataZone.Project("adoptedDataZoneProject", {
  domainIdentifier: "my-domain",
  name: "Finance Data Project",
  description: "Project focused on financial data analysis.",
  adopt: true
});
```
