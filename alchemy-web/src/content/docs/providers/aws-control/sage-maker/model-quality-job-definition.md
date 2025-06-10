---
title: ModelQualityJobDefinition
description: Learn how to create, update, and manage AWS SageMaker ModelQualityJobDefinitions using Alchemy Cloud Control.
---


The ModelQualityJobDefinition resource allows you to define and manage model quality monitoring jobs in AWS SageMaker. For more details, refer to the [AWS SageMaker ModelQualityJobDefinitions](https://docs.aws.amazon.com/sagemaker/latest/userguide/) documentation.

## Minimal Example

Create a basic ModelQualityJobDefinition with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const modelQualityJobDefinition = await AWS.SageMaker.ModelQualityJobDefinition("basicModelQualityJob", {
  ModelQualityAppSpecification: {
    ContainerSpecifications: [{
      ImageUri: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-model-quality-image:latest",
      Environment: {
        "MODEL_S3_PATH": "s3://my-models/model.tar.gz"
      }
    }]
  },
  ModelQualityJobInput: {
    EndpointName: "my-endpoint",
    GroundTruthS3Input: {
      S3Uri: "s3://my-groundtruth-data/",
      ContentType: "application/json"
    }
  },
  JobResources: {
    ClusterConfig: {
      InstanceType: "ml.m5.large",
      InstanceCount: 1,
      VolumeSizeInGB: 30
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/my-sagemaker-role",
  StoppingCondition: {
    MaxRuntimeInSeconds: 3600
  }
});
```

## Advanced Configuration

Define a ModelQualityJobDefinition that includes advanced settings such as baseline configuration and network settings.

```ts
const advancedModelQualityJobDefinition = await AWS.SageMaker.ModelQualityJobDefinition("advancedModelQualityJob", {
  ModelQualityAppSpecification: {
    ContainerSpecifications: [{
      ImageUri: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-advanced-model-quality-image:latest",
      Environment: {
        "MODEL_S3_PATH": "s3://my-models/advanced-model.tar.gz"
      }
    }]
  },
  ModelQualityJobInput: {
    EndpointName: "my-advanced-endpoint",
    GroundTruthS3Input: {
      S3Uri: "s3://my-advanced-groundtruth-data/",
      ContentType: "application/json"
    }
  },
  JobResources: {
    ClusterConfig: {
      InstanceType: "ml.m5.xlarge",
      InstanceCount: 2,
      VolumeSizeInGB: 50
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/my-advanced-sagemaker-role",
  ModelQualityBaselineConfig: {
    BaselineS3Uri: "s3://my-baseline-data/",
    Constraints: {
      Video: {
        S3Uri: "s3://my-constraints-data/"
      }
    }
  },
  NetworkConfig: {
    EnableNetworkIsolation: true,
    VpcConfig: {
      SecurityGroupIds: ["sg-0123456789abcdef0"],
      Subnets: ["subnet-0123456789abcdef0"]
    }
  },
  Tags: [{
    Key: "Project",
    Value: "ModelQualityMonitoring"
  }],
  StoppingCondition: {
    MaxRuntimeInSeconds: 7200
  }
});
```

## Custom Tags

Create a ModelQualityJobDefinition with custom tags for better resource management.

```ts
const taggedModelQualityJobDefinition = await AWS.SageMaker.ModelQualityJobDefinition("taggedModelQualityJob", {
  ModelQualityAppSpecification: {
    ContainerSpecifications: [{
      ImageUri: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-tagged-model-quality-image:latest",
      Environment: {
        "MODEL_S3_PATH": "s3://my-models/tagged-model.tar.gz"
      }
    }]
  },
  ModelQualityJobInput: {
    EndpointName: "my-tagged-endpoint",
    GroundTruthS3Input: {
      S3Uri: "s3://my-tagged-groundtruth-data/",
      ContentType: "application/json"
    }
  },
  JobResources: {
    ClusterConfig: {
      InstanceType: "ml.t3.medium",
      InstanceCount: 1,
      VolumeSizeInGB: 20
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/my-tagged-sagemaker-role",
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }, {
    Key: "Owner",
    Value: "DataScienceTeam"
  }]
});
```
