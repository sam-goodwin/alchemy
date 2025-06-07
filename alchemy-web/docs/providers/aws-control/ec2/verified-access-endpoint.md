---
title: Managing AWS EC2 VerifiedAccessEndpoints with Alchemy
description: Learn how to create, update, and manage AWS EC2 VerifiedAccessEndpoints using Alchemy Cloud Control.
---

# VerifiedAccessEndpoint

The VerifiedAccessEndpoint resource lets you create and manage [AWS EC2 VerifiedAccessEndpoints](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-verifiedaccessendpoint.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const verifiedaccessendpoint = await AWS.EC2.VerifiedAccessEndpoint(
  "verifiedaccessendpoint-example",
  {
    AttachmentType: "example-attachmenttype",
    VerifiedAccessGroupId: "example-verifiedaccessgroupid",
    EndpointType: "example-endpointtype",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A verifiedaccessendpoint resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a verifiedaccessendpoint with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVerifiedAccessEndpoint = await AWS.EC2.VerifiedAccessEndpoint(
  "advanced-verifiedaccessendpoint",
  {
    AttachmentType: "example-attachmenttype",
    VerifiedAccessGroupId: "example-verifiedaccessgroupid",
    EndpointType: "example-endpointtype",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A verifiedaccessendpoint resource managed by Alchemy",
  }
);
```

