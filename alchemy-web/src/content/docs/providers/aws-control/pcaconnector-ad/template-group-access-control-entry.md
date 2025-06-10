---
title: TemplateGroupAccessControlEntry
description: Learn how to create, update, and manage AWS PCAConnectorAD TemplateGroupAccessControlEntrys using Alchemy Cloud Control.
---


The TemplateGroupAccessControlEntry resource allows you to manage access control entries (ACEs) for templates in AWS PCAConnectorAD, enabling fine-grained access control to your template resources. For more information, refer to the [AWS PCAConnectorAD TemplateGroupAccessControlEntrys](https://docs.aws.amazon.com/pcaconnectorad/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic TemplateGroupAccessControlEntry with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const accessControlEntry = await AWS.PCAConnectorAD.TemplateGroupAccessControlEntry("basicAccessControlEntry", {
  AccessRights: {
    "Create": true,
    "Read": true,
    "Update": false,
    "Delete": false
  },
  GroupDisplayName: "Developers",
  TemplateArn: "arn:aws:pcaconnectorad:us-west-2:123456789012:template/DevCertTemplate"
});
```

## Advanced Configuration

In this example, we configure a TemplateGroupAccessControlEntry with all properties, including the optional `GroupSecurityIdentifier` and `adopt` flag.

```ts
const advancedAccessControlEntry = await AWS.PCAConnectorAD.TemplateGroupAccessControlEntry("advancedAccessControlEntry", {
  AccessRights: {
    "Create": true,
    "Read": true,
    "Update": true,
    "Delete": true
  },
  GroupDisplayName: "Admins",
  GroupSecurityIdentifier: "S-1-5-21-1234567890-0987654321-1234567890-1001",
  TemplateArn: "arn:aws:pcaconnectorad:us-west-2:123456789012:template/AdminCertTemplate",
  adopt: true
});
```

## Example with Restricted Access

This example shows how to set up a TemplateGroupAccessControlEntry that restricts access to only read permissions.

```ts
const restrictedAccessControlEntry = await AWS.PCAConnectorAD.TemplateGroupAccessControlEntry("restrictedAccessControlEntry", {
  AccessRights: {
    "Create": false,
    "Read": true,
    "Update": false,
    "Delete": false
  },
  GroupDisplayName: "ReadOnlyUsers",
  TemplateArn: "arn:aws:pcaconnectorad:us-west-2:123456789012:template/ReadOnlyCertTemplate"
});
```

## Example for Group Security Identifier

In this example, we create a TemplateGroupAccessControlEntry with a specific `GroupSecurityIdentifier` for better tracking of access control.

```ts
const securityIdentifierAccessControlEntry = await AWS.PCAConnectorAD.TemplateGroupAccessControlEntry("securityIdentifierAccessControlEntry", {
  AccessRights: {
    "Create": true,
    "Read": true,
    "Update": true,
    "Delete": false
  },
  GroupDisplayName: "SecurityAdmins",
  GroupSecurityIdentifier: "S-1-5-21-1234567890-0987654321-1234567890-1002",
  TemplateArn: "arn:aws:pcaconnectorad:us-west-2:123456789012:template/SecurityCertTemplate"
});
```
