---
title: Managing AWS VpcLattice ServiceNetworkServiceAssociations with Alchemy
description: Learn how to create, update, and manage AWS VpcLattice ServiceNetworkServiceAssociations using Alchemy Cloud Control.
---

# ServiceNetworkServiceAssociation

The ServiceNetworkServiceAssociation resource lets you create and manage [AWS VpcLattice ServiceNetworkServiceAssociations](https://docs.aws.amazon.com/vpclattice/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-vpclattice-servicenetworkserviceassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const servicenetworkserviceassociation = await AWS.VpcLattice.ServiceNetworkServiceAssociation(
  "servicenetworkserviceassociation-example",
  { Tags: { Environment: "production", ManagedBy: "Alchemy" } }
);
```

## Advanced Configuration

Create a servicenetworkserviceassociation with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedServiceNetworkServiceAssociation =
  await AWS.VpcLattice.ServiceNetworkServiceAssociation(
    "advanced-servicenetworkserviceassociation",
    {
      Tags: {
        Environment: "production",
        Team: "DevOps",
        Project: "MyApp",
        CostCenter: "Engineering",
        ManagedBy: "Alchemy",
      },
    }
  );
```

