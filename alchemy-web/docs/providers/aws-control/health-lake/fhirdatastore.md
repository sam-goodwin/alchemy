---
title: Managing AWS HealthLake FHIRDatastores with Alchemy
description: Learn how to create, update, and manage AWS HealthLake FHIRDatastores using Alchemy Cloud Control.
---

# FHIRDatastore

The FHIRDatastore resource lets you create and manage [AWS HealthLake FHIRDatastores](https://docs.aws.amazon.com/healthlake/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-healthlake-fhirdatastore.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const fhirdatastore = await AWS.HealthLake.FHIRDatastore("fhirdatastore-example", {
  DatastoreTypeVersion: "example-datastoretypeversion",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a fhirdatastore with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFHIRDatastore = await AWS.HealthLake.FHIRDatastore("advanced-fhirdatastore", {
  DatastoreTypeVersion: "example-datastoretypeversion",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

