---
title: AnalysisTemplate
description: Learn how to create, update, and manage AWS CleanRooms AnalysisTemplates using Alchemy Cloud Control.
---


The AnalysisTemplate resource allows you to create and manage [AWS CleanRooms AnalysisTemplates](https://docs.aws.amazon.com/cleanrooms/latest/userguide/) for conducting collaborative analytics in a secure environment.

## Minimal Example

Create a basic AnalysisTemplate with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicTemplate = await AWS.CleanRooms.AnalysisTemplate("basic-template", {
  MembershipIdentifier: "membership-12345",
  Description: "A basic analysis template for collaboration.",
  Format: "JSON",
  Source: {
    Type: "data_source_type",
    Properties: {
      SourceIdentifier: "source-identifier"
    }
  },
  Name: "BasicAnalysisTemplate"
});
```

## Advanced Configuration

Configure an AnalysisTemplate with additional parameters including schema and tags for better organization.

```ts
const advancedTemplate = await AWS.CleanRooms.AnalysisTemplate("advanced-template", {
  MembershipIdentifier: "membership-67890",
  Description: "An advanced analysis template with detailed parameters.",
  Format: "Parquet",
  Source: {
    Type: "data_source_type",
    Properties: {
      SourceIdentifier: "source-identifier"
    }
  },
  Schema: {
    Columns: [
      { Name: "column1", Type: "string" },
      { Name: "column2", Type: "int" }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DataScience" }
  ],
  Name: "AdvancedAnalysisTemplate"
});
```

## Using Source Metadata

Create an AnalysisTemplate that includes source metadata for detailed data analytics.

```ts
const templateWithSourceMetadata = await AWS.CleanRooms.AnalysisTemplate("template-with-metadata", {
  MembershipIdentifier: "membership-54321",
  Format: "CSV",
  SourceMetadata: {
    SourceType: "external_database",
    ConnectionDetails: {
      Host: "database.example.com",
      Port: 5432,
      Database: "analytics_db",
      User: "db_user",
      Password: "db_password"
    }
  },
  Source: {
    Type: "data_source_type",
    Properties: {
      SourceIdentifier: "source-identifier"
    }
  },
  Name: "TemplateWithSourceMetadata"
});
```

## Including Analysis Parameters

Create an AnalysisTemplate that includes specific analysis parameters tailored to your analytical needs.

```ts
const templateWithParameters = await AWS.CleanRooms.AnalysisTemplate("template-with-parameters", {
  MembershipIdentifier: "membership-67890",
  Format: "JSON",
  AnalysisParameters: [
    { Name: "parameter1", Value: "value1" },
    { Name: "parameter2", Value: "value2" }
  ],
  Source: {
    Type: "data_source_type",
    Properties: {
      SourceIdentifier: "source-identifier"
    }
  },
  Name: "TemplateWithParameters"
});
``` 

This documentation provides a comprehensive overview of how to manage AWS CleanRooms AnalysisTemplates using Alchemy, showcasing practical examples for various use cases.
