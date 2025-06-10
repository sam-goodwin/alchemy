---
title: Environment
description: Learn how to create, update, and manage AWS DataZone Environments using Alchemy Cloud Control.
---


The Environment resource allows you to create and manage environments within AWS DataZone, enabling you to define isolated spaces for data projects and their related resources. For more information, visit the [AWS DataZone Environments documentation](https://docs.aws.amazon.com/datazone/latest/userguide/).

## Minimal Example

Create a simple DataZone environment with required properties and a few optional ones.

```ts
import AWS from "alchemy/aws/control";

const dataZoneEnvironment = await AWS.DataZone.Environment("myDataZoneEnv", {
  projectIdentifier: "myDataZoneProject",
  name: "Production Environment",
  domainIdentifier: "myDomainID",
  environmentAccountRegion: "us-east-1",
  description: "This is the production environment for my data project."
});
```

## Advanced Configuration

Configure an environment with user parameters and a specific role ARN.

```ts
const advancedDataZoneEnvironment = await AWS.DataZone.Environment("advancedDataZoneEnv", {
  projectIdentifier: "myDataZoneProject",
  name: "Staging Environment",
  domainIdentifier: "myDomainID",
  userParameters: [
    {
      name: "databaseUrl",
      value: "jdbc:mysql://mydb.example.com:3306/mydb"
    },
    {
      name: "cacheSize",
      value: "512M"
    }
  ],
  environmentRoleArn: "arn:aws:iam::123456789012:role/MyDataZoneRole",
  description: "This is the staging environment for testing."
});
```

## Adoption of Existing Resources

Create an environment that adopts existing resources instead of failing if the resource already exists.

```ts
const adoptExistingEnvironment = await AWS.DataZone.Environment("adoptExistingEnv", {
  projectIdentifier: "myDataZoneProject",
  name: "Adopted Environment",
  domainIdentifier: "myDomainID",
  adopt: true, // Enables adoption of existing resources
  description: "This environment adopts existing resources if they are found."
});
```

## Custom Glossary Terms

Set glossary terms for an environment to enhance metadata and documentation.

```ts
const glossaryTermEnvironment = await AWS.DataZone.Environment("glossaryTermEnv", {
  projectIdentifier: "myDataZoneProject",
  name: "Glossary Environment",
  domainIdentifier: "myDomainID",
  glossaryTerms: ["Data Governance", "Compliance", "Data Quality"],
  description: "This environment includes specific glossary terms."
});
```
