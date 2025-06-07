---
title: Managing AWS CloudFormation Publishers with Alchemy
description: Learn how to create, update, and manage AWS CloudFormation Publishers using Alchemy Cloud Control.
---

# Publisher

The Publisher resource allows you to create and manage AWS CloudFormation Publishers, enabling you to publish your CloudFormation templates for use in AWS. For more details, refer to the [AWS CloudFormation Publishers documentation](https://docs.aws.amazon.com/cloudformation/latest/userguide/).

## Minimal Example

Create a basic CloudFormation Publisher with the required properties:

```ts
import AWS from "alchemy/aws/control";

const basicPublisher = await AWS.CloudFormation.Publisher("BasicPublisher", {
  AcceptTermsAndConditions: true // Accept the terms and conditions
});
```

## Advanced Configuration

Configure a CloudFormation Publisher with additional options, including a connection ARN:

```ts
const advancedPublisher = await AWS.CloudFormation.Publisher("AdvancedPublisher", {
  AcceptTermsAndConditions: true, // Accept the terms and conditions
  ConnectionArn: "arn:aws:codestar-connections:us-east-1:123456789012:connection/abcd1234-5678-90ab-cdef-EXAMPLE11111"
});
```

## Adoption of Existing Resources

Use the adoption feature to manage an existing CloudFormation Publisher without failing if it already exists:

```ts
const adoptedPublisher = await AWS.CloudFormation.Publisher("AdoptedPublisher", {
  AcceptTermsAndConditions: true,
  adopt: true // Adopt existing resource instead of failing
});
```

## Publisher with Additional Metadata

Create a CloudFormation Publisher while also retrieving its ARN and creation time:

```ts
const publisherWithMetadata = await AWS.CloudFormation.Publisher("PublisherWithMetadata", {
  AcceptTermsAndConditions: true
});

// Accessing the ARN and creation time
const publisherArn = publisherWithMetadata.Arn;
const creationTime = publisherWithMetadata.CreationTime;
console.log(`Publisher ARN: ${publisherArn}, Created At: ${creationTime}`);
```