---
title: Integration
description: Learn how to create, update, and manage AWS CustomerProfiles Integrations using Alchemy Cloud Control.
---


The Integration resource allows you to manage [AWS CustomerProfiles Integrations](https://docs.aws.amazon.com/customerprofiles/latest/userguide/) that define how data is connected and integrated into your customer profiles.

## Minimal Example

Create a basic CustomerProfiles integration with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const basicIntegration = await AWS.CustomerProfiles.Integration("basicIntegration", {
  DomainName: "customer-profiles-domain",
  ObjectTypeNames: [{ name: "Customer" }],
  EventTriggerNames: ["DataUpdated"]
});
```

## Advanced Configuration

Configure an integration with a flow definition and multiple object type names:

```ts
const advancedIntegration = await AWS.CustomerProfiles.Integration("advancedIntegration", {
  DomainName: "customer-profiles-domain",
  ObjectTypeNames: [{ name: "Customer" }, { name: "Order" }],
  EventTriggerNames: ["DataUpdated", "DataDeleted"],
  FlowDefinition: {
    FlowName: "CustomerDataFlow",
    FlowDescription: "Flow to sync customer data",
    Source: {
      ConnectorType: "Salesforce",
      ObjectTypeName: "Account"
    },
    Destination: {
      ConnectorType: "AmazonS3",
      ObjectTypeName: "CustomerData"
    }
  },
  Tags: [{ Key: "Environment", Value: "Production" }]
});
```

## Specific Use Case: URI Configuration

Create an integration with a specific URI for data retrieval:

```ts
const uriIntegration = await AWS.CustomerProfiles.Integration("uriIntegration", {
  DomainName: "customer-profiles-domain",
  ObjectTypeName: "Customer",
  Uri: "https://api.example.com/customers",
  EventTriggerNames: ["DataUpdated", "DataCreated"]
});
```

## Adoption of Existing Resource

Configure the integration to adopt an existing resource if it already exists:

```ts
const adoptIntegration = await AWS.CustomerProfiles.Integration("adoptIntegration", {
  DomainName: "customer-profiles-domain",
  ObjectTypeNames: [{ name: "Customer" }],
  adopt: true // This will adopt the existing resource instead of failing
});
```
