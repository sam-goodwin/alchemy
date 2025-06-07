---
title: Managing AWS Proton ServiceTemplates with Alchemy
description: Learn how to create, update, and manage AWS Proton ServiceTemplates using Alchemy Cloud Control.
---

# ServiceTemplate

The ServiceTemplate resource lets you manage [AWS Proton ServiceTemplates](https://docs.aws.amazon.com/proton/latest/userguide/) for defining service infrastructure and configuration.

## Minimal Example

Create a basic service template with required properties.

```ts
import AWS from "alchemy/aws/control";

const BasicServiceTemplate = await AWS.Proton.ServiceTemplate("BasicServiceTemplate", {
  Name: "MyServiceTemplate",
  Description: "A simple service template for deployment.",
  DisplayName: "Simple Service Template",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Engineering" }
  ]
});
```

## Advanced Configuration

Configure a service template with additional features and encryption settings.

```ts
const AdvancedServiceTemplate = await AWS.Proton.ServiceTemplate("AdvancedServiceTemplate", {
  Name: "SecureServiceTemplate",
  Description: "A secure service template with encryption.",
  DisplayName: "Secure Service Template",
  PipelineProvisioning: "SERVICE_MANAGED",
  EncryptionKey: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-efgh-5678-ijkl-90mnopqrst",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Adoption of Existing Resources

Create a service template that adopts existing resources without failing.

```ts
const AdoptExistingServiceTemplate = await AWS.Proton.ServiceTemplate("AdoptExistingServiceTemplate", {
  Name: "ExistingServiceTemplate",
  Description: "This service template adopts existing resources.",
  DisplayName: "Adopted Service Template",
  adopt: true,
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```