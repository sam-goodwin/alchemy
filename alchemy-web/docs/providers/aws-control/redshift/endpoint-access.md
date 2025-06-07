---
title: Managing AWS Redshift EndpointAccesss with Alchemy
description: Learn how to create, update, and manage AWS Redshift EndpointAccesss using Alchemy Cloud Control.
---

# EndpointAccess

The EndpointAccess resource lets you create and manage [AWS Redshift EndpointAccesss](https://docs.aws.amazon.com/redshift/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointaccess.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const endpointaccess = await AWS.Redshift.EndpointAccess("endpointaccess-example", {
  EndpointName: "endpointaccess-endpoint",
  VpcSecurityGroupIds: ["example-vpcsecuritygroupids-1"],
  SubnetGroupName: "endpointaccess-subnetgroup",
  ClusterIdentifier: "example-clusteridentifier",
});
```

