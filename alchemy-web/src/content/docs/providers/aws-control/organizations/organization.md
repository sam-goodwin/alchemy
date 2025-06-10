---
title: Organization
description: Learn how to create, update, and manage AWS Organizations Organizations using Alchemy Cloud Control.
---


The Organization resource lets you manage your AWS Organizations, which allows you to consolidate multiple AWS accounts into an organization that you can centrally manage. For more information, visit the [AWS Organizations Organizations documentation](https://docs.aws.amazon.com/organizations/latest/userguide/).

## Minimal Example

Create a basic AWS Organization with the default feature set.

```ts
import AWS from "alchemy/aws/control";

const organization = await AWS.Organizations.Organization("myOrganization", {
  FeatureSet: "ALL" // Optional: Choose between "ALL" or "CONSOLIDATED_BILLING"
});
```

## Advanced Configuration

Configure an organization that adopts an existing resource if it already exists.

```ts
const existingOrganization = await AWS.Organizations.Organization("existingOrg", {
  FeatureSet: "ALL",
  adopt: true // Optional: If true, adopts existing resource instead of failing
});
```

## Managing Features

Create an organization with specific feature set configurations.

```ts
const featureConfiguredOrganization = await AWS.Organizations.Organization("featureOrg", {
  FeatureSet: "CONSOLIDATED_BILLING" // Use consolidated billing features
});
```

## Handling Organization Updates

Update an existing organization to change its feature set.

```ts
const updatedOrganization = await AWS.Organizations.Organization("updateOrg", {
  FeatureSet: "ALL", // Changing feature set from CONSOIDATED_BILLING to ALL
  adopt: true
});
```
