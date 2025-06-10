---
title: ModelCard
description: Learn how to create, update, and manage AWS SageMaker ModelCards using Alchemy Cloud Control.
---


The ModelCard resource lets you manage [AWS SageMaker ModelCards](https://docs.aws.amazon.com/sagemaker/latest/userguide/) which provide a structured way to document machine learning models, including information about their performance, intended use, and ethical considerations.

## Minimal Example

Create a basic ModelCard with required properties and optional fields for security configuration and tags.

```ts
import AWS from "alchemy/aws/control";

const basicModelCard = await AWS.SageMaker.ModelCard("basicModelCard", {
  ModelCardName: "CustomerChurnModel",
  ModelCardStatus: "Draft",
  Content: {
    modelOverview: {
      description: "This model predicts customer churn based on historical data."
    },
    performance: {
      metrics: {
        accuracy: 0.95
      }
    }
  },
  SecurityConfig: {
    encryptionKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst"
  },
  Tags: [
    { Key: "Project", Value: "CustomerRetention" },
    { Key: "Version", Value: "1.0" }
  ]
});
```

## Advanced Configuration

Configure a ModelCard with additional metadata and detailed performance metrics.

```ts
const advancedModelCard = await AWS.SageMaker.ModelCard("advancedModelCard", {
  ModelCardName: "SalesForecastModel",
  ModelCardStatus: "Active",
  Content: {
    modelOverview: {
      description: "This model forecasts sales based on previous trends and seasonality."
    },
    performance: {
      metrics: {
        accuracy: 0.92,
        precision: 0.88,
        recall: 0.90,
        f1Score: 0.89
      },
      validationData: {
        size: 1000,
        split: "80/20"
      }
    },
    ethicalConsiderations: {
      biasAssessment: "The model has been evaluated for gender and racial bias."
    }
  },
  LastModifiedBy: {
    userId: "user@example.com",
    userArn: "arn:aws:iam::123456789012:user/user"
  }
});
```

## Adoption of Existing ModelCard

Adopt an existing ModelCard without failing if the resource already exists.

```ts
const adoptExistingModelCard = await AWS.SageMaker.ModelCard("adoptExistingModelCard", {
  ModelCardName: "AdoptedModelCard",
  ModelCardStatus: "Published",
  adopt: true,
  Content: {
    modelOverview: {
      description: "This is an existing model card that is being adopted."
    }
  }
});
```

## Secure ModelCard with Encryption Configuration

Set up a ModelCard with a strict security configuration including encryption.

```ts
const secureModelCard = await AWS.SageMaker.ModelCard("secureModelCard", {
  ModelCardName: "SecureModel",
  ModelCardStatus: "Draft",
  Content: {
    modelOverview: {
      description: "Model that requires strict security measures."
    }
  },
  SecurityConfig: {
    encryptionKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst",
    encryptionEnabled: true
  }
});
``` 

This document provides a comprehensive overview of managing AWS SageMaker ModelCards using Alchemy, illustrating various configurations from minimal setup to advanced security features.
