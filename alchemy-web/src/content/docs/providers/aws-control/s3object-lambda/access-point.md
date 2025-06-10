---
title: AccessPoint
description: Learn how to create, update, and manage AWS S3ObjectLambda AccessPoints using Alchemy Cloud Control.
---


The AccessPoint resource allows you to manage [AWS S3ObjectLambda AccessPoints](https://docs.aws.amazon.com/s3objectlambda/latest/userguide/) which provide a way to customize the retrieval of objects from S3, including the ability to modify the data returned.

## Minimal Example

Create a basic S3ObjectLambda AccessPoint with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const accessPoint = await AWS.S3ObjectLambda.AccessPoint("myAccessPoint", {
  ObjectLambdaConfiguration: {
    SupportingAccessPoint: "arn:aws:s3:us-west-2:123456789012:accesspoint:my-supporting-access-point",
    TransformationConfigurations: [
      {
        Action: "GetObject",
        ContentTransformation: {
          AwsLambda: {
            FunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:myTransformationFunction",
            FunctionPayload: "{}"
          }
        }
      }
    ]
  },
  Name: "my-custom-access-point"
});
```

## Advanced Configuration

Configure an AccessPoint with multiple transformation configurations for different actions:

```ts
const advancedAccessPoint = await AWS.S3ObjectLambda.AccessPoint("advancedAccessPoint", {
  ObjectLambdaConfiguration: {
    SupportingAccessPoint: "arn:aws:s3:us-west-2:123456789012:accesspoint:my-supporting-access-point",
    TransformationConfigurations: [
      {
        Action: "GetObject",
        ContentTransformation: {
          AwsLambda: {
            FunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:myGetObjectFunction",
            FunctionPayload: "{}"
          }
        }
      },
      {
        Action: "HeadObject",
        ContentTransformation: {
          AwsLambda: {
            FunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:myHeadObjectFunction",
            FunctionPayload: "{}"
          }
        }
      }
    ]
  },
  Name: "my-advanced-access-point"
});
```

## Custom Object Transformation

Demonstrate how to set up an AccessPoint that transforms objects dynamically based on metadata:

```ts
const dynamicTransformationAccessPoint = await AWS.S3ObjectLambda.AccessPoint("dynamicTransformationAccessPoint", {
  ObjectLambdaConfiguration: {
    SupportingAccessPoint: "arn:aws:s3:us-west-2:123456789012:accesspoint:my-supporting-access-point",
    TransformationConfigurations: [
      {
        Action: "GetObject",
        ContentTransformation: {
          AwsLambda: {
            FunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:dynamicTransformationFunction",
            FunctionPayload: JSON.stringify({
              transformationType: "dynamic",
              additionalParameters: {
                param1: "value1",
                param2: "value2"
              }
            })
          }
        }
      }
    ]
  },
  Name: "my-dynamic-transformation-access-point"
});
```
