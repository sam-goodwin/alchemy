---
title: FlowTemplate
description: Learn how to create, update, and manage AWS IoTThingsGraph FlowTemplates using Alchemy Cloud Control.
---


The FlowTemplate resource allows you to define and manage [AWS IoTThingsGraph FlowTemplates](https://docs.aws.amazon.com/iotthingsgraph/latest/userguide/) which represent a reusable and versioned set of workflows in your IoT applications.

## Minimal Example

This example demonstrates how to create a basic FlowTemplate with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const simpleFlowTemplate = await AWS.IoTThingsGraph.FlowTemplate("SimpleFlowTemplate", {
  Definition: {
    // Basic definition document structure
    language: "EN",
    schema: {
      // Define your schema here
    }
  },
  CompatibleNamespaceVersion: 1 // Optional property
});
```

## Advanced Configuration

This example shows how to create a FlowTemplate with a more complex definition and adoption of existing resources.

```ts
const complexFlowTemplate = await AWS.IoTThingsGraph.FlowTemplate("ComplexFlowTemplate", {
  Definition: {
    language: "EN",
    schema: {
      // Define your schema here
      entities: [
        {
          name: "TemperatureSensor",
          type: "Sensor",
          properties: {
            temperature: {
              type: "Number"
            }
          }
        }
      ]
    }
  },
  CompatibleNamespaceVersion: 2, // Optional property
  adopt: true // Adopt existing resource if it exists
});
```

## Utilizing FlowTemplates in Applications

This example demonstrates how to utilize the created FlowTemplate in an IoT application context.

```ts
const appFlowTemplate = await AWS.IoTThingsGraph.FlowTemplate("AppFlowTemplate", {
  Definition: {
    language: "EN",
    schema: {
      entities: [
        {
          name: "DoorLock",
          type: "Actuator",
          properties: {
            lockState: {
              type: "Boolean"
            }
          }
        }
      ]
    }
  }
});

// Further application logic using the FlowTemplate
const deployApp = async () => {
  // Logic to deploy the flow template
  console.log(`FlowTemplate ${appFlowTemplate.id} deployed successfully.`);
};

deployApp();
``` 

## Managing FlowTemplate Updates

This example illustrates how to update an existing FlowTemplate with new definitions.

```ts
const updatedFlowTemplate = await AWS.IoTThingsGraph.FlowTemplate("UpdatedFlowTemplate", {
  Definition: {
    language: "EN",
    schema: {
      entities: [
        {
          name: "UpdatedSensor",
          type: "Sensor",
          properties: {
            humidity: {
              type: "Number"
            }
          }
        }
      ]
    }
  },
  CompatibleNamespaceVersion: 3 // Update to a new compatible version
});
```
