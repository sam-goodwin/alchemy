---
title: ConfigurationManager
description: Learn how to create, update, and manage AWS SSMQuickSetup ConfigurationManagers using Alchemy Cloud Control.
---


The ConfigurationManager resource allows you to create and manage AWS SSMQuickSetup Configuration Managers, which help in setting up and managing configurations for AWS resources. For more details, please refer to the [AWS SSMQuickSetup ConfigurationManagers documentation](https://docs.aws.amazon.com/ssmquicksetup/latest/userguide/).

## Minimal Example

Create a basic Configuration Manager with required properties and a common optional description:

```ts
import AWS from "alchemy/aws/control";

const configManager = await AWS.SSMQuickSetup.ConfigurationManager("basicConfigManager", {
  ConfigurationDefinitions: [
    {
      // Example configuration definition
      Key: "InstanceType",
      Value: "t2.micro"
    },
    {
      Key: "KeyName",
      Value: "my-key-pair"
    }
  ],
  Description: "Basic Configuration Manager for EC2 Setup"
});
```

## Advanced Configuration

Set up a Configuration Manager with additional tags and a name for better organization:

```ts
const advancedConfigManager = await AWS.SSMQuickSetup.ConfigurationManager("advancedConfigManager", {
  ConfigurationDefinitions: [
    {
      Key: "InstanceType",
      Value: "t3.medium"
    },
    {
      Key: "SecurityGroupIds",
      Value: "sg-12345678"
    }
  ],
  Tags: {
    Environment: "Production",
    Purpose: "Web Server"
  },
  Name: "ProductionWebServerConfig"
});
```

## Resource Adoption

Create a Configuration Manager that adopts an existing resource if it already exists:

```ts
const adoptConfigManager = await AWS.SSMQuickSetup.ConfigurationManager("adoptConfigManager", {
  ConfigurationDefinitions: [
    {
      Key: "InstanceType",
      Value: "t3.large"
    }
  ],
  adopt: true, // Adopt existing resource if it exists
  Name: "AdoptedConfigManager"
});
```

## Detailed Configuration Definitions

Configure a manager with multiple configuration definitions for a more complex setup:

```ts
const detailedConfigManager = await AWS.SSMQuickSetup.ConfigurationManager("detailedConfigManager", {
  ConfigurationDefinitions: [
    {
      Key: "InstanceType",
      Value: "m5.xlarge"
    },
    {
      Key: "SubnetId",
      Value: "subnet-12345678"
    },
    {
      Key: "SecurityGroupIds",
      Value: "sg-87654321"
    },
    {
      Key: "UserData",
      Value: "#!/bin/bash\nyum update -y\n"
    }
  ],
  Description: "Detailed Configuration for Application Deployment",
  Tags: {
    Application: "MyApp",
    Version: "1.0"
  }
});
```
