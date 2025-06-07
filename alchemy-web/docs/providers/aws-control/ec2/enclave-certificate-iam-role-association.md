---
title: Managing AWS EC2 EnclaveCertificateIamRoleAssociations with Alchemy
description: Learn how to create, update, and manage AWS EC2 EnclaveCertificateIamRoleAssociations using Alchemy Cloud Control.
---

# EnclaveCertificateIamRoleAssociation

The EnclaveCertificateIamRoleAssociation resource lets you create and manage [AWS EC2 EnclaveCertificateIamRoleAssociations](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-enclavecertificateiamroleassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const enclavecertificateiamroleassociation = await AWS.EC2.EnclaveCertificateIamRoleAssociation(
  "enclavecertificateiamroleassociation-example",
  { RoleArn: "example-rolearn", CertificateArn: "example-certificatearn" }
);
```

