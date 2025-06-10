---
title: GroupVersion
description: Learn how to create, update, and manage AWS Greengrass GroupVersions using Alchemy Cloud Control.
---


The GroupVersion resource allows you to create, update, and manage AWS Greengrass GroupVersions. This resource is essential for defining the configuration of your Greengrass groups, including devices, functions, subscriptions, and more. For further details, refer to the [AWS Greengrass GroupVersions documentation](https://docs.aws.amazon.com/greengrass/latest/userguide/).

## Minimal Example

Create a basic Greengrass GroupVersion with required properties and a few common optional ones.

```ts
import AWS from "alchemy/aws/control";

const greengrassGroupVersion = await AWS.Greengrass.GroupVersion("myGreengrassGroupVersion", {
  GroupId: "greengrass-group-id",
  FunctionDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:functiondef:myFunctionDefinition",
  DeviceDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:devicedef:myDeviceDefinition"
});
```

## Advanced Configuration

Configure a GroupVersion with additional resources such as Logger and Resource definitions.

```ts
const advancedGreengrassGroupVersion = await AWS.Greengrass.GroupVersion("advancedGreengrassGroupVersion", {
  GroupId: "greengrass-group-id",
  FunctionDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:functiondef:myFunctionDefinition",
  DeviceDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:devicedef:myDeviceDefinition",
  LoggerDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:loggerdef:myLoggerDefinition",
  ResourceDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:resourcedef:myResourceDefinition"
});
```

## Complete Setup Example

Create a comprehensive GroupVersion that includes a Connector and Subscription definition.

```ts
const completeGreengrassGroupVersion = await AWS.Greengrass.GroupVersion("completeGreengrassGroupVersion", {
  GroupId: "greengrass-group-id",
  FunctionDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:functiondef:myFunctionDefinition",
  DeviceDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:devicedef:myDeviceDefinition",
  LoggerDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:loggerdef:myLoggerDefinition",
  ResourceDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:resourcedef:myResourceDefinition",
  ConnectorDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:connectordef:myConnectorDefinition",
  SubscriptionDefinitionVersionArn: "arn:aws:greengrass:us-west-2:123456789012:subscriptiondef:mySubscriptionDefinition"
});
```
