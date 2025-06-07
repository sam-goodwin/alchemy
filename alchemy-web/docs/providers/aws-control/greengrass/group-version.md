---
title: Managing AWS Greengrass GroupVersions with Alchemy
description: Learn how to create, update, and manage AWS Greengrass GroupVersions using Alchemy Cloud Control.
---

# GroupVersion

The GroupVersion resource lets you manage [AWS Greengrass GroupVersions](https://docs.aws.amazon.com/greengrass/latest/userguide/) and their associated definitions, such as devices, functions, and resources.

## Minimal Example

Create a basic Greengrass GroupVersion with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicGroupVersion = await AWS.Greengrass.GroupVersion("BasicGroupVersion", {
  GroupId: "my-greengrass-group",
  DeviceDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:devicedef:my-device-def",
  FunctionDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:functiondef:my-function-def"
});
```

## Advanced Configuration

Configure a GroupVersion with additional optional properties for logging and resources.

```ts
const advancedGroupVersion = await AWS.Greengrass.GroupVersion("AdvancedGroupVersion", {
  GroupId: "my-advanced-greengrass-group",
  DeviceDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:devicedef:my-device-def",
  FunctionDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:functiondef:my-function-def",
  LoggerDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:loggerdef:my-logger-def",
  ResourceDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:resourcedef:my-resource-def"
});
```

## Using Connectors and Subscriptions

Create a GroupVersion that includes connectors and subscription definitions.

```ts
const connectorGroupVersion = await AWS.Greengrass.GroupVersion("ConnectorGroupVersion", {
  GroupId: "my-connector-greengrass-group",
  DeviceDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:devicedef:my-device-def",
  FunctionDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:functiondef:my-function-def",
  ConnectorDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:connectordef:my-connector-def",
  SubscriptionDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:subscriptiondef:my-subscription-def"
});
```

## Adopting Existing Resources

Create a GroupVersion and adopt existing resources if they are already present.

```ts
const adoptGroupVersion = await AWS.Greengrass.GroupVersion("AdoptGroupVersion", {
  GroupId: "my-adopt-greengrass-group",
  DeviceDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:devicedef:my-device-def",
  FunctionDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:functiondef:my-function-def",
  adopt: true
});
```