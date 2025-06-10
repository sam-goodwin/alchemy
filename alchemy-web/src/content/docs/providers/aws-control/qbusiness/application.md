---
title: Application
description: Learn how to create, update, and manage AWS QBusiness Applications using Alchemy Cloud Control.
---


The Application resource lets you manage [AWS QBusiness Applications](https://docs.aws.amazon.com/qbusiness/latest/userguide/) including configurations such as identity type, encryption settings, and integration with QuickSight.

## Minimal Example

Create a basic QBusiness Application with required properties and a few common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const qBusinessApplication = await AWS.QBusiness.Application("myQBusinessApp", {
  DisplayName: "My QBusiness Application",
  IdentityType: "IAM",
  Description: "This is my first QBusiness application."
});
```

## Advanced Configuration

Configure a QBusiness Application with advanced options including encryption settings and QuickSight integration.

```ts
import AWS from "alchemy/aws/control";

const advancedQBusinessApplication = await AWS.QBusiness.Application("myAdvancedQBusinessApp", {
  DisplayName: "Advanced QBusiness App",
  IdentityType: "IAM",
  Description: "An advanced QBusiness application with enhanced features.",
  EncryptionConfiguration: {
    EncryptionMode: "SSE_KMS",
    KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst"
  },
  QuickSightConfiguration: {
    QuickSightNamespace: "default",
    UserRoleArn: "arn:aws:iam::123456789012:role/QuickSightUserRole"
  }
});
```

## Integration with Identity Center

Demonstrate how to integrate the application with AWS Identity Center by specifying the Identity Center Instance ARN and IAM Identity Provider ARN.

```ts
import AWS from "alchemy/aws/control";

const identityCenterQBusinessApp = await AWS.QBusiness.Application("myIdentityCenterApp", {
  DisplayName: "Identity Center QBusiness App",
  IdentityCenterInstanceArn: "arn:aws:sso:us-west-2:123456789012:instance/ssoins-abcdef123456",
  IamIdentityProviderArn: "arn:aws:iam::123456789012:saml-provider/MySamlProvider"
});
```

## Custom Tags for Resource Management

Creating a QBusiness Application with custom tags for better resource management and identification.

```ts
import AWS from "alchemy/aws/control";

const taggedQBusinessApplication = await AWS.QBusiness.Application("myTaggedQBusinessApp", {
  DisplayName: "Tagged QBusiness Application",
  IdentityType: "IAM",
  Tags: [
    {
      Key: "Project",
      Value: "QBusinessMigration"
    },
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
``` 

This documentation provides a comprehensive overview of managing AWS QBusiness Applications with Alchemy, highlighting the essential properties and advanced configurations available to optimize your applications.
