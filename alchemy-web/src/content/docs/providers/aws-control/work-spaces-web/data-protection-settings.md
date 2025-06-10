---
title: DataProtectionSettings
description: Learn how to create, update, and manage AWS WorkSpacesWeb DataProtectionSettingss using Alchemy Cloud Control.
---


The DataProtectionSettings resource allows you to configure data protection settings for AWS WorkSpaces Web, including redaction configurations and encrypted data management. For more details, refer to the [AWS WorkSpacesWeb DataProtectionSettings documentation](https://docs.aws.amazon.com/workspacesweb/latest/userguide/).

## Minimal Example

Create a basic DataProtectionSettings resource with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicDataProtectionSettings = await AWS.WorkSpacesWeb.DataProtectionSettings("basicDataProtection", {
  Description: "Basic data protection settings for the WorkSpaces Web application",
  CustomerManagedKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  DisplayName: "Basic Data Protection"
});
```

## Advanced Configuration

Configure DataProtectionSettings with inline redaction and additional encryption context.

```ts
import AWS from "alchemy/aws/control";

const advancedDataProtectionSettings = await AWS.WorkSpacesWeb.DataProtectionSettings("advancedDataProtection", {
  Description: "Advanced data protection settings with inline redaction",
  CustomerManagedKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  InlineRedactionConfiguration: {
    Redaction: {
      RedactionType: "PII",
      RedactionString: "[REDACTED]"
    }
  },
  AdditionalEncryptionContext: {
    "Project": "WorkSpacesWeb",
    "Environment": "Production"
  },
  DisplayName: "Advanced Data Protection"
});
```

## Tagging Resources

Create DataProtectionSettings with tags for better resource management.

```ts
import AWS from "alchemy/aws/control";

const taggedDataProtectionSettings = await AWS.WorkSpacesWeb.DataProtectionSettings("taggedDataProtection", {
  Description: "Data protection settings with tags for environment management",
  CustomerManagedKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    },
    {
      Key: "Owner",
      Value: "DevTeam"
    }
  ],
  DisplayName: "Tagged Data Protection"
});
```
