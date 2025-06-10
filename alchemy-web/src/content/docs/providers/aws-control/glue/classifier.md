---
title: Classifier
description: Learn how to create, update, and manage AWS Glue Classifiers using Alchemy Cloud Control.
---


The Classifier resource allows you to manage [AWS Glue Classifiers](https://docs.aws.amazon.com/glue/latest/userguide/) which are used to categorize the data in AWS Glue Data Catalog. Classifiers help AWS Glue to infer the schema of the data you are working with, making it easier to transform and analyze data.

## Minimal Example

Create a basic JSON classifier for your data.

```ts
import AWS from "alchemy/aws/control";

const jsonClassifier = await AWS.Glue.Classifier("myJsonClassifier", {
  JsonClassifier: {
    Name: "myJsonClassifier",
    JsonPath: "$.data[*]",
    Classification: "json"
  }
});
```

## Advanced Configuration

Create a Grok classifier with additional settings for pattern matching.

```ts
const grokClassifier = await AWS.Glue.Classifier("myGrokClassifier", {
  GrokClassifier: {
    Name: "myGrokClassifier",
    Classification: "log",
    GrokPattern: "%{COMBINEDAPACHELOG}",
    CustomPatterns: "MYCUSTOMPATTERN %{GREEDYDATA:message}"
  }
});
```

## XML Classifier Example

Create an XML classifier to help with XML data parsing.

```ts
const xmlClassifier = await AWS.Glue.Classifier("myXmlClassifier", {
  XMLClassifier: {
    Name: "myXmlClassifier",
    Classification: "xml",
    RowTag: "record"
  }
});
```

## CSV Classifier Example

Set up a CSV classifier that can recognize CSV formatted data.

```ts
const csvClassifier = await AWS.Glue.Classifier("myCsvClassifier", {
  CsvClassifier: {
    Name: "myCsvClassifier",
    Classification: "csv",
    Delimiter: ",",
    QuoteSymbol: "\"",
    ContainsHeader: "PRESENT"
  }
});
```
