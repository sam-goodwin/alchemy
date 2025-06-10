---
title: ProvisioningTemplate
description: Learn how to create, update, and manage AWS IoT ProvisioningTemplates using Alchemy Cloud Control.
---


The ProvisioningTemplate resource allows you to create and manage [AWS IoT ProvisioningTemplates](https://docs.aws.amazon.com/iot/latest/userguide/) that define how IoT devices are provisioned in AWS IoT.

## Minimal Example

Create a basic provisioning template with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const provisioningTemplate = await AWS.IoT.ProvisioningTemplate("basicTemplate", {
  ProvisioningRoleArn: "arn:aws:iam::123456789012:role/provisioningRole",
  TemplateBody: JSON.stringify({
    Version: "2018-11-30",
    Resources: {
      MyThing: {
        Type: "AWS::IoT::Thing",
        Properties: {
          ThingName: "MyIoTDevice",
          AttributePayload: {
            Attributes: {
              key1: "value1",
              key2: "value2"
            }
          }
        }
      }
    }
  }),
  Description: "Basic provisioning template for IoT devices.",
  Enabled: true
});
```

## Advanced Configuration

Configure a provisioning template with hooks for custom pre-provisioning actions and additional tags.

```ts
const advancedTemplate = await AWS.IoT.ProvisioningTemplate("advancedTemplate", {
  ProvisioningRoleArn: "arn:aws:iam::123456789012:role/provisioningRole",
  TemplateBody: JSON.stringify({
    Version: "2018-11-30",
    Resources: {
      MyThing: {
        Type: "AWS::IoT::Thing",
        Properties: {
          ThingName: "AdvancedIoTDevice",
          AttributePayload: {
            Attributes: {
              key1: "value1",
              key2: "value2"
            }
          }
        }
      }
    }
  }),
  PreProvisioningHook: {
    TargetArn: "arn:aws:lambda:us-east-1:123456789012:function:myPreProvisioningHook",
    Payload: JSON.stringify({ key: "value" }),
    TimeoutInSeconds: 30
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "IoTDeployment" }
  ],
  Enabled: true
});
```

## Custom Template Type

Create a provisioning template with a specific template type for custom provisioning workflows.

```ts
const customTypeTemplate = await AWS.IoT.ProvisioningTemplate("customTypeTemplate", {
  ProvisioningRoleArn: "arn:aws:iam::123456789012:role/provisioningRole",
  TemplateBody: JSON.stringify({
    Version: "2018-11-30",
    Resources: {
      MyThing: {
        Type: "AWS::IoT::Thing",
        Properties: {
          ThingName: "CustomTypeIoTDevice",
          AttributePayload: {
            Attributes: {
              key1: "value1",
              key2: "value2"
            }
          }
        }
      }
    }
  }),
  TemplateType: "FLEET_PROVISIONING",
  Enabled: true
});
```
