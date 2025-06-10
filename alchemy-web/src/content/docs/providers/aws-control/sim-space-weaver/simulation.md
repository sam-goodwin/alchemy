---
title: Simulation
description: Learn how to create, update, and manage AWS SimSpaceWeaver Simulations using Alchemy Cloud Control.
---


The Simulation resource allows you to manage [AWS SimSpaceWeaver Simulations](https://docs.aws.amazon.com/simspaceweaver/latest/userguide/) for building and running large-scale simulations in the AWS cloud.

## Minimal Example

Create a basic simulation with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicSimulation = await AWS.SimSpaceWeaver.Simulation("basicSimulation", {
  RoleArn: "arn:aws:iam::123456789012:role/SimSpaceWeaverRole",
  Name: "BasicSimulation",
  SchemaS3Location: {
    Bucket: "my-simulations-bucket",
    Key: "schemas/basic-schema.json"
  }
});
```

## Advanced Configuration

Configure a simulation with additional options such as snapshot location and maximum duration.

```ts
const advancedSimulation = await AWS.SimSpaceWeaver.Simulation("advancedSimulation", {
  RoleArn: "arn:aws:iam::123456789012:role/SimSpaceWeaverRole",
  Name: "AdvancedSimulation",
  SchemaS3Location: {
    Bucket: "my-simulations-bucket",
    Key: "schemas/advanced-schema.json"
  },
  SnapshotS3Location: {
    Bucket: "my-simulations-bucket",
    Key: "snapshots/advanced-snapshot.json"
  },
  MaximumDuration: "PT2H" // Duration of 2 hours
});
```

## Handling Existing Resources

If you need to adopt an existing simulation resource instead of failing when it already exists, you can set the adopt property to true.

```ts
const existingSimulation = await AWS.SimSpaceWeaver.Simulation("existingSimulation", {
  RoleArn: "arn:aws:iam::123456789012:role/SimSpaceWeaverRole",
  Name: "AdoptedSimulation",
  adopt: true
});
```
