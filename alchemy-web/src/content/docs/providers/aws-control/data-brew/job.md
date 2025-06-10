---
title: Job
description: Learn how to create, update, and manage AWS DataBrew Jobs using Alchemy Cloud Control.
---


The Job resource lets you manage [AWS DataBrew Jobs](https://docs.aws.amazon.com/databrew/latest/userguide/) for transforming and preparing your data visually without writing code. 

## Minimal Example

Create a basic DataBrew job with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicDataBrewJob = await AWS.DataBrew.Job("basic-data-brew-job", {
  roleArn: "arn:aws:iam::123456789012:role/DataBrew-Execution-Role",
  name: "BasicDataBrewJob",
  type: "profile", // Job type can be "profile" or "recipe"
  projectName: "MyDataBrewProject",
  recipe: {
    name: "MyRecipe",
    steps: [] // Specify the steps for the recipe
  },
  maxRetries: 3
});
```

## Advanced Configuration

Configure a DataBrew job with encryption and multiple outputs for enhanced security and data handling.

```ts
const secureDataBrewJob = await AWS.DataBrew.Job("secure-data-brew-job", {
  roleArn: "arn:aws:iam::123456789012:role/DataBrew-Execution-Role",
  name: "SecureDataBrewJob",
  type: "recipe",
  projectName: "MySecureProject",
  recipe: {
    name: "MySecureRecipe",
    steps: [] // Specify steps for the recipe
  },
  encryptionKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst",
  outputs: [{
    name: "MyOutput",
    outputLocation: {
      bucket: "my-data-brew-bucket",
      path: "output-data/"
    }
  }],
  tags: [{
    key: "Environment",
    value: "Production"
  }]
});
```

## Job Sample Configuration

Create a DataBrew job with a sample of the dataset to analyze.

```ts
const jobWithSample = await AWS.DataBrew.Job("job-with-sample", {
  roleArn: "arn:aws:iam::123456789012:role/DataBrew-Execution-Role",
  name: "JobWithSample",
  type: "recipe",
  projectName: "SampleProject",
  recipe: {
    name: "SampleRecipe",
    steps: [] // Specify recipe steps
  },
  jobSample: {
    size: 1000,
    type: "FIRST_N" // Options include FIRST_N or RANDOM
  },
  outputs: [{
    name: "SampleOutput",
    outputLocation: {
      bucket: "sample-bucket",
      path: "sample-output/"
    }
  }]
});
```

## Validation Configuration

Set up a DataBrew job with validation configurations to ensure data quality.

```ts
const jobWithValidation = await AWS.DataBrew.Job("job-with-validation", {
  roleArn: "arn:aws:iam::123456789012:role/DataBrew-Execution-Role",
  name: "JobWithValidation",
  type: "profile",
  projectName: "ValidationProject",
  recipe: {
    name: "ValidationRecipe",
    steps: [] // Specify recipe steps
  },
  validationConfigurations: [{
    columnNames: ["column1", "column2"],
    validationExpression: "column1 IS NOT NULL",
    validationAction: "WARN"
  }],
  outputs: [{
    name: "ValidationOutput",
    outputLocation: {
      bucket: "validation-bucket",
      path: "validation-output/"
    }
  }]
});
```
