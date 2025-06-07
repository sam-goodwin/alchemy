---
title: Managing AWS IAM ServiceLinkedRoles with Alchemy
description: Learn how to create, update, and manage AWS IAM ServiceLinkedRoles using Alchemy Cloud Control.
---

# ServiceLinkedRole

The ServiceLinkedRole resource allows you to create and manage [AWS IAM ServiceLinkedRoles](https://docs.aws.amazon.com/iam/latest/userguide/) which are specific types of IAM roles that are linked to AWS services. These roles are pre-defined by AWS services and contain permissions that allow those services to perform actions on your behalf.

## Minimal Example

This example demonstrates how to create a basic ServiceLinkedRole with the required properties and a custom suffix.

```ts
import AWS from "alchemy/aws/control";

const BasicServiceLinkedRole = await AWS.IAM.ServiceLinkedRole("BasicServiceLinkedRole", {
  AWSServiceName: "elasticbeanstalk.amazonaws.com",
  CustomSuffix: "MyCustomSuffix"
});
```

## Advanced Configuration

In this example, we configure a ServiceLinkedRole with additional properties such as a description.

```ts
const AdvancedServiceLinkedRole = await AWS.IAM.ServiceLinkedRole("AdvancedServiceLinkedRole", {
  AWSServiceName: "cloudwatch.amazonaws.com",
  CustomSuffix: "Monitoring",
  Description: "Role for CloudWatch service linked role."
});
```

## Adoption of Existing Resource

This example shows how to adopt an existing ServiceLinkedRole if it already exists, rather than failing the operation.

```ts
const AdoptExistingServiceLinkedRole = await AWS.IAM.ServiceLinkedRole("AdoptExistingServiceLinkedRole", {
  AWSServiceName: "ec2.amazonaws.com",
  adopt: true
});
```