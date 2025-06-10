---
title: ServiceTemplate
description: Learn how to create, update, and manage AWS Proton ServiceTemplates using Alchemy Cloud Control.
---


The ServiceTemplate resource lets you manage [AWS Proton ServiceTemplates](https://docs.aws.amazon.com/proton/latest/userguide/) that define how services are built and managed within AWS Proton.

## Minimal Example

Create a basic ServiceTemplate with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicServiceTemplate = await AWS.Proton.ServiceTemplate("basicServiceTemplate", {
  name: "MyServiceTemplate",
  description: "A simple service template for managing microservices.",
  displayName: "My Service Template",
  pipelineProvisioning: "CUSTOM",
  tags: [
    { key: "Environment", value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a ServiceTemplate with additional options including encryption and a custom pipeline provisioning strategy.

```ts
const advancedServiceTemplate = await AWS.Proton.ServiceTemplate("advancedServiceTemplate", {
  name: "AdvancedServiceTemplate",
  description: "An advanced service template with custom pipeline provisioning.",
  displayName: "Advanced Service Template",
  pipelineProvisioning: "CUSTOM",
  encryptionKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrstuv",
  tags: [
    { key: "Project", value: "ProtonDemo" },
    { key: "Owner", value: "TeamA" }
  ]
});
```

## Adoption of Existing Resources

Create a ServiceTemplate that adopts existing resources instead of failing when resources already exist.

```ts
const adoptServiceTemplate = await AWS.Proton.ServiceTemplate("adoptServiceTemplate", {
  name: "AdoptedServiceTemplate",
  description: "This service template adopts existing resources.",
  displayName: "Adopted Service Template",
  adopt: true,
  tags: [
    { key: "UseCase", value: "Migration" }
  ]
});
```

## Tagging for Resource Management

Create a ServiceTemplate with specific tags for better resource management and categorization.

```ts
const taggedServiceTemplate = await AWS.Proton.ServiceTemplate("taggedServiceTemplate", {
  name: "TaggedServiceTemplate",
  description: "Service template with detailed tagging for resource management.",
  displayName: "Tagged Service Template",
  tags: [
    { key: "Department", value: "Engineering" },
    { key: "CostCenter", value: "R&D" }
  ]
});
```
