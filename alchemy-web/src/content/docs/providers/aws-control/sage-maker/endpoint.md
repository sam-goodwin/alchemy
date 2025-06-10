---
title: Endpoint
description: Learn how to create, update, and manage AWS SageMaker Endpoints using Alchemy Cloud Control.
---


The Endpoint resource lets you manage [AWS SageMaker Endpoints](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for deploying machine learning models. Endpoints provide a way to host your model for real-time inference, allowing applications to make predictions based on input data.

## Minimal Example

Create a basic SageMaker Endpoint with required properties and some common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const sageMakerEndpoint = await AWS.SageMaker.Endpoint("mySageMakerEndpoint", {
  EndpointConfigName: "myEndpointConfig",
  RetainAllVariantProperties: true
});
```

## Advanced Configuration

Configure a SageMaker Endpoint with a deployment configuration and tags for better management.

```ts
const advancedSageMakerEndpoint = await AWS.SageMaker.Endpoint("advancedSageMakerEndpoint", {
  EndpointConfigName: "myAdvancedEndpointConfig",
  DeploymentConfig: {
    AutoRollbackConfiguration: {
      Alarms: [
        {
          AlarmName: "EndpointErrorAlarm",
          AlarmType: "ERROR"
        }
      ]
    }
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "AIModelDeployment"
    }
  ]
});
```

## Excluding Variant Properties

Create a SageMaker Endpoint while excluding specific variant properties from the deployment.

```ts
const variantExclusionEndpoint = await AWS.SageMaker.Endpoint("variantExclusionEndpoint", {
  EndpointConfigName: "myVariantExclusionConfig",
  ExcludeRetainedVariantProperties: [
    { VariantName: "LowPriorityVariant" }
  ],
  RetainDeploymentConfig: false
});
```

## Adoption of Existing Resource

Adopt an existing SageMaker Endpoint if it already exists, preventing failure due to duplication.

```ts
const adoptExistingEndpoint = await AWS.SageMaker.Endpoint("adoptExistingEndpoint", {
  EndpointConfigName: "myExistingEndpointConfig",
  adopt: true
});
```
