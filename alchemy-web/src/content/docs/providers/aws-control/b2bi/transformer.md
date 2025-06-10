---
title: Transformer
description: Learn how to create, update, and manage AWS B2BI Transformers using Alchemy Cloud Control.
---


The Transformer resource allows you to create, update, and manage AWS B2BI Transformers for processing and transforming business documents. For more details, refer to the [AWS B2BI Transformers documentation](https://docs.aws.amazon.com/b2bi/latest/userguide/).

## Minimal Example

Create a basic B2BI Transformer with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicTransformer = await AWS.B2BI.Transformer("myBasicTransformer", {
  Name: "BasicTransformer",
  Status: "ACTIVE",
  Mapping: {
    // Example mapping configuration
    Source: "source-schema",
    Target: "target-schema"
  }
});
```

## Advanced Configuration

Configure a transformer with additional options including input and output conversions.

```ts
const advancedTransformer = await AWS.B2BI.Transformer("myAdvancedTransformer", {
  Name: "AdvancedTransformer",
  Status: "ACTIVE",
  Mapping: {
    Source: "source-schema",
    Target: "target-schema"
  },
  InputConversion: {
    // Example input conversion settings
    Type: "JSON",
    Schema: "input-schema"
  },
  OutputConversion: {
    // Example output conversion settings
    Type: "XML",
    Schema: "output-schema"
  },
  SampleDocuments: {
    // Example sample documents
    DocumentList: [
      { DocumentName: "SampleDoc1", Content: "<xml>sample content</xml>" },
      { DocumentName: "SampleDoc2", Content: "<xml>another sample</xml>" }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Using Existing Resources

Create a transformer that adopts an existing resource instead of failing.

```ts
const existingTransformer = await AWS.B2BI.Transformer("myExistingTransformer", {
  Name: "ExistingTransformer",
  Status: "ACTIVE",
  Mapping: {
    Source: "existing-source-schema",
    Target: "existing-target-schema"
  },
  adopt: true // Adopt existing resource if it already exists
});
```

## Complete Configuration Example

Define a transformer with all properties for a comprehensive setup.

```ts
const completeTransformer = await AWS.B2BI.Transformer("myCompleteTransformer", {
  Name: "CompleteTransformer",
  Status: "ACTIVE",
  Mapping: {
    Source: "complete-source-schema",
    Target: "complete-target-schema"
  },
  InputConversion: {
    Type: "CSV",
    Schema: "complete-input-schema"
  },
  OutputConversion: {
    Type: "JSON",
    Schema: "complete-output-schema"
  },
  SampleDocuments: {
    DocumentList: [
      { DocumentName: "CompleteSample1", Content: "sample,content" },
      { DocumentName: "CompleteSample2", Content: "another,sample" }
    ]
  },
  Tags: [
    { Key: "Department", Value: "Finance" },
    { Key: "Project", Value: "B2BIntegration" }
  ]
});
```
