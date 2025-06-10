---
title: Capability
description: Learn how to create, update, and manage AWS B2BI Capabilitys using Alchemy Cloud Control.
---


The Capability resource lets you manage [AWS B2BI Capabilitys](https://docs.aws.amazon.com/b2bi/latest/userguide/) for enabling various integration functionalities within the B2B Integration service.

## Minimal Example

Create a basic B2BI capability with required properties and a couple of optional ones.

```ts
import AWS from "alchemy/aws/control";

const b2biCapability = await AWS.B2BI.Capability("basicCapability", {
  name: "BasicIntegrationCapability",
  type: "Integration",
  configuration: {
    // Example configuration settings
    setting1: "value1",
    setting2: "value2"
  },
  instructionsDocuments: [{
    bucket: "my-bucket",
    key: "instructions/integration-guide.pdf"
  }],
  tags: [{
    key: "Environment",
    value: "Production"
  }]
});
```

## Advanced Configuration

Configure a B2BI capability with advanced settings and more detailed configurations.

```ts
const advancedCapability = await AWS.B2BI.Capability("advancedCapability", {
  name: "AdvancedIntegrationCapability",
  type: "AdvancedIntegration",
  configuration: {
    setting1: "advancedValue1",
    setting2: "advancedValue2",
    retryPolicy: {
      maxAttempts: 5,
      delay: 3000 // delay in milliseconds
    }
  },
  instructionsDocuments: [{
    bucket: "my-bucket",
    key: "instructions/advanced-integration-guide.pdf"
  }],
  tags: [{
    key: "Environment",
    value: "Staging"
  }, {
    key: "Version",
    value: "v1.0"
  }],
  adopt: true // Adopt existing resource if it exists
});
```

## Custom Configuration

Create a B2BI capability with a custom configuration tailored for specific integration scenarios.

```ts
const customCapability = await AWS.B2BI.Capability("customCapability", {
  name: "CustomIntegrationCapability",
  type: "CustomIntegration",
  configuration: {
    customSetting: "customValue",
    webhookUrl: "https://api.example.com/webhook",
    timeout: 60000 // timeout in milliseconds
  },
  instructionsDocuments: [{
    bucket: "my-bucket",
    key: "instructions/custom-integration-guide.pdf"
  }],
  tags: [{
    key: "Environment",
    value: "Development"
  }]
});
```
