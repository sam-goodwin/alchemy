---
title: Managing AWS Detective OrganizationAdmins with Alchemy
description: Learn how to create, update, and manage AWS Detective OrganizationAdmins using Alchemy Cloud Control.
---

# OrganizationAdmin

The OrganizationAdmin resource allows you to manage AWS Detective OrganizationAdmins, facilitating the administration of AWS Detective across your organization. For more detailed information, refer to the [AWS Detective OrganizationAdmins documentation](https://docs.aws.amazon.com/detective/latest/userguide/).

## Minimal Example

Create a basic OrganizationAdmin resource with required properties.

```ts
import AWS from "alchemy/aws/control";

const BasicOrganizationAdmin = await AWS.Detective.OrganizationAdmin("BasicOrgAdmin", {
  AccountId: "123456789012",
  adopt: true
});
```

## Advanced Configuration

Configure an OrganizationAdmin resource with additional properties to better manage your setup.

```ts
const AdvancedOrganizationAdmin = await AWS.Detective.OrganizationAdmin("AdvancedOrgAdmin", {
  AccountId: "123456789012",
  adopt: false
});
```

## Additional Example: Using IAM Policy

Demonstrate setting up an OrganizationAdmin with IAM policies by integrating the necessary permissions.

```ts
const PolicyOrganizationAdmin = await AWS.Detective.OrganizationAdmin("PolicyOrgAdmin", {
  AccountId: "123456789012",
  adopt: true
});

// Example IAM policy structure for the OrganizationAdmin
const iamPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: "detective:*",
      Resource: "*"
    }
  ]
};
```