---
title: EnclaveCertificateIamRoleAssociation
description: Learn how to create, update, and manage AWS EC2 EnclaveCertificateIamRoleAssociations using Alchemy Cloud Control.
---


The EnclaveCertificateIamRoleAssociation resource allows you to associate an IAM role with an AWS EC2 Enclave Certificate, enabling secure communications for EC2 instances. For more details, refer to the [AWS EC2 EnclaveCertificateIamRoleAssociations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic Enclave Certificate IAM Role Association with the required properties.

```ts
import AWS from "alchemy/aws/control";

const enclaveCertificateAssociation = await AWS.EC2.EnclaveCertificateIamRoleAssociation("myEnclaveAssociation", {
  RoleArn: "arn:aws:iam::123456789012:role/MyEC2Role",
  CertificateArn: "arn:aws:ec2:us-west-2:123456789012:enclave-certificate/my-certificate",
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Advanced Configuration

This example demonstrates how to create an Enclave Certificate IAM Role Association with additional properties for more control over the resource.

```ts
const advancedEnclaveAssociation = await AWS.EC2.EnclaveCertificateIamRoleAssociation("advancedEnclaveAssociation", {
  RoleArn: "arn:aws:iam::123456789012:role/MyAdvancedEC2Role",
  CertificateArn: "arn:aws:ec2:us-west-2:123456789012:enclave-certificate/my-advanced-certificate",
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Use Case: Updating an Existing Association

In this example, we demonstrate how to update an existing Enclave Certificate IAM Role Association by specifying the same properties.

```ts
const updatedEnclaveAssociation = await AWS.EC2.EnclaveCertificateIamRoleAssociation("myEnclaveAssociation", {
  RoleArn: "arn:aws:iam::123456789012:role/MyUpdatedEC2Role",
  CertificateArn: "arn:aws:ec2:us-west-2:123456789012:enclave-certificate/my-updated-certificate",
  adopt: false // Optional: Do not adopt existing resource, will fail if it exists
});
```
