---
title: Managing AWS DataZone DataSources with Alchemy
description: Learn how to create, update, and manage AWS DataZone DataSources using Alchemy Cloud Control.
---

# DataSource

The DataSource resource lets you create and manage [AWS DataZone DataSources](https://docs.aws.amazon.com/datazone/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datazone-datasource.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const datasource = await AWS.DataZone.DataSource("datasource-example", {
  ProjectIdentifier: "example-projectidentifier",
  Name: "datasource-",
  Type: "example-type",
  DomainIdentifier: "example-domainidentifier",
  Description: "A datasource resource managed by Alchemy",
});
```

## Advanced Configuration

Create a datasource with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataSource = await AWS.DataZone.DataSource("advanced-datasource", {
  ProjectIdentifier: "example-projectidentifier",
  Name: "datasource-",
  Type: "example-type",
  DomainIdentifier: "example-domainidentifier",
  Description: "A datasource resource managed by Alchemy",
  Configuration: "example-configuration",
});
```

