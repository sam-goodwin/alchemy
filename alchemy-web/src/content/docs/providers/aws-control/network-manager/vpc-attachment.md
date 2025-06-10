---
title: VpcAttachment
description: Learn how to create, update, and manage AWS NetworkManager VpcAttachments using Alchemy Cloud Control.
---


The VpcAttachment resource allows you to manage Virtual Private Cloud (VPC) attachments within AWS Network Manager. For more details, refer to the [AWS NetworkManager VpcAttachments documentation](https://docs.aws.amazon.com/networkmanager/latest/userguide/).

## Minimal Example

Create a basic VPC attachment with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const vpcAttachment = await AWS.NetworkManager.VpcAttachment("myVpcAttachment", {
  SubnetArns: [
    "arn:aws:ec2:us-west-2:123456789012:subnet/subnet-0abcd1234efgh5678",
    "arn:aws:ec2:us-west-2:123456789012:subnet/subnet-1abcd1234efgh5678"
  ],
  CoreNetworkId: "cn-0abcd1234efgh5678",
  VpcArn: "arn:aws:ec2:us-west-2:123456789012:vpc/vpc-0abcd1234efgh5678",
  Options: {
    // Optional properties can be added here
    Autonomous: true
  }
});
```

## Advanced Configuration

Configure a VPC attachment with additional properties for advanced use cases.

```ts
const advancedVpcAttachment = await AWS.NetworkManager.VpcAttachment("advancedVpcAttachment", {
  SubnetArns: [
    "arn:aws:ec2:us-west-2:123456789012:subnet/subnet-0abcd1234efgh5678"
  ],
  CoreNetworkId: "cn-0abcd1234efgh5678",
  VpcArn: "arn:aws:ec2:us-west-2:123456789012:vpc/vpc-0abcd1234efgh5678",
  ProposedSegmentChange: {
    SegmentName: "mySegment",
    SegmentId: "seg-0abcd1234efgh5678"
  },
  ProposedNetworkFunctionGroupChange: {
    NetworkFunctionGroupId: "nfg-0abcd1234efgh5678",
    NetworkFunctionGroupName: "myNetworkFunctionGroup"
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "MyProject"
    }
  ]
});
```

## Adoption of Existing Resources

Use the adopt flag to adopt an existing VPC attachment instead of failing if it already exists.

```ts
const adoptVpcAttachment = await AWS.NetworkManager.VpcAttachment("adoptVpcAttachment", {
  SubnetArns: [
    "arn:aws:ec2:us-west-2:123456789012:subnet/subnet-0abcd1234efgh5678"
  ],
  CoreNetworkId: "cn-0abcd1234efgh5678",
  VpcArn: "arn:aws:ec2:us-west-2:123456789012:vpc/vpc-0abcd1234efgh5678",
  adopt: true // Adopt existing resource
});
```
