---
title: Cluster
description: Learn how to create, update, and manage AWS EMR Clusters using Alchemy Cloud Control.
---


The Cluster resource lets you manage [AWS EMR Clusters](https://docs.aws.amazon.com/emr/latest/userguide/) for processing large amounts of data using tools such as Apache Hadoop and Apache Spark.

## Minimal Example

Create a basic EMR cluster with the required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const emrCluster = await AWS.EMR.Cluster("basic-emr-cluster", {
  Name: "BasicEMRCluster",
  Instances: {
    MasterInstanceType: "m5.xlarge",
    SlaveInstanceType: "m5.xlarge",
    InstanceCount: 3
  },
  JobFlowRole: "EMR_EC2_DefaultRole",
  ServiceRole: "EMR_DefaultRole"
});
```

## Advanced Configuration

Configure an EMR cluster with additional features such as bootstrap actions and logging.

```ts
const advancedEmrCluster = await AWS.EMR.Cluster("advanced-emr-cluster", {
  Name: "AdvancedEMRCluster",
  Instances: {
    MasterInstanceType: "m5.xlarge",
    SlaveInstanceType: "m5.xlarge",
    InstanceCount: 3
  },
  JobFlowRole: "EMR_EC2_DefaultRole",
  ServiceRole: "EMR_DefaultRole",
  BootstrapActions: [
    {
      Name: "Install Apache Spark",
      ScriptBootstrapAction: {
        Path: "s3://my-bucket/bootstrap-actions/install-spark.sh"
      }
    }
  ],
  LogUri: "s3://my-bucket/logs/"
});
```

## Using Auto-Scaling

Create a cluster with managed scaling policies for dynamic resource management.

```ts
const autoScalingCluster = await AWS.EMR.Cluster("auto-scaling-emr-cluster", {
  Name: "AutoScalingEMRCluster",
  Instances: {
    MasterInstanceType: "m5.xlarge",
    SlaveInstanceType: "m5.xlarge",
    InstanceCount: 3,
    AutoScalingRole: "EMR_AutoScaling_DefaultRole"
  },
  JobFlowRole: "EMR_EC2_DefaultRole",
  ServiceRole: "EMR_DefaultRole",
  ManagedScalingPolicy: {
    ComputeLimits: {
      MinimumCapacityUnits: 2,
      MaximumCapacityUnits: 10,
      UnitType: "Instances"
    }
  }
});
```

## Configuring Kerberos Authentication

Set up a cluster with Kerberos authentication for enhanced security.

```ts
const kerberosCluster = await AWS.EMR.Cluster("kerberos-emr-cluster", {
  Name: "KerberosEMRCluster",
  Instances: {
    MasterInstanceType: "m5.xlarge",
    SlaveInstanceType: "m5.xlarge",
    InstanceCount: 3
  },
  JobFlowRole: "EMR_EC2_DefaultRole",
  ServiceRole: "EMR_DefaultRole",
  KerberosAttributes: {
    Realm: "EXAMPLE.COM",
    KdcAdminPassword: "MyKdcAdminPassword",
    CrossRealmTrustPrincipalPassword: "MyCrossRealmTrustPassword",
    EnableKerberos: true
  }
});
```
