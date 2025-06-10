---
title: Application
description: Learn how to create, update, and manage AWS OpenSearchService Applications using Alchemy Cloud Control.
---


The Application resource lets you manage [AWS OpenSearchService Applications](https://docs.aws.amazon.com/opensearchservice/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic OpenSearchService application with required properties and a data source.

```ts
import AWS from "alchemy/aws/control";

const openSearchApp = await AWS.OpenSearchService.Application("myOpenSearchApp", {
  name: "MySearchApplication",
  dataSources: [{
    type: "s3",
    uri: "s3://my-data-source-bucket/data"
  }],
  endpoint: "https://mysearchapp.us-west-2.es.amazonaws.com",
  tags: [{
    key: "Environment",
    value: "Development"
  }]
});
```

## Advanced Configuration

Configure an OpenSearchService application with IAM Identity Center options and multiple data sources.

```ts
const advancedOpenSearchApp = await AWS.OpenSearchService.Application("advancedOpenSearchApp", {
  name: "AdvancedSearchApplication",
  dataSources: [
    {
      type: "s3",
      uri: "s3://my-data-source-bucket/data"
    },
    {
      type: "dynamoDB",
      uri: "dynamodb://my-dynamodb-table"
    }
  ],
  iamIdentityCenterOptions: {
    enabled: true,
    identityStore: "my-identity-store"
  },
  tags: [{
    key: "Project",
    value: "SearchOptimization"
  }]
});
```

## Adoption of Existing Resources

Create an OpenSearchService application that adopts existing resources if available.

```ts
const adoptOpenSearchApp = await AWS.OpenSearchService.Application("adoptOpenSearchApp", {
  name: "ExistingSearchApp",
  adopt: true, // Adopt existing resource instead of failing
  endpoint: "https://existingsearchapp.us-west-2.es.amazonaws.com",
  tags: [{
    key: "Purpose",
    value: "Data Analysis"
  }]
});
```

## Custom Application Configurations

Demonstrate how to configure application settings and retrieve specific metadata.

```ts
const customAppConfig = await AWS.OpenSearchService.Application("customAppConfig", {
  name: "CustomAppWithConfig",
  appConfigs: [{
    key: "maxResultSize",
    value: "100"
  }],
  tags: [{
    key: "Owner",
    value: "Team Alpha"
  }]
});

// Access application ARN and creation time
console.log(`Application ARN: ${customAppConfig.arn}`);
console.log(`Created on: ${customAppConfig.creationTime}`);
```
