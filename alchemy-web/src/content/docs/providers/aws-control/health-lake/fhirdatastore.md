---
title: FHIRDatastore
description: Learn how to create, update, and manage AWS HealthLake FHIRDatastores using Alchemy Cloud Control.
---


The FHIRDatastore resource allows you to create and manage [AWS HealthLake FHIR Datastores](https://docs.aws.amazon.com/healthlake/latest/userguide/) for storing and analyzing FHIR (Fast Healthcare Interoperability Resources) data.

## Minimal Example

Create a basic FHIR Datastore with the required properties and one optional property for tags.

```ts
import AWS from "alchemy/aws/control";

const fhirDatastore = await AWS.HealthLake.FHIRDatastore("myFhirDatastore", {
  DatastoreTypeVersion: "1.0",
  DatastoreName: "MyHealthData",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a FHIR Datastore with advanced security settings using SSE (Server-Side Encryption).

```ts
const secureFhirDatastore = await AWS.HealthLake.FHIRDatastore("secureFhirDatastore", {
  DatastoreTypeVersion: "1.0",
  DatastoreName: "SecureHealthData",
  SseConfiguration: {
    KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
    SseAlgorithm: "aws:kms"
  }
});
```

## Preload Data Configuration

Create a FHIR Datastore with a preload data configuration to load existing FHIR data.

```ts
const preloadDataFhirDatastore = await AWS.HealthLake.FHIRDatastore("preloadDataFhirDatastore", {
  DatastoreTypeVersion: "1.0",
  DatastoreName: "PreloadedHealthData",
  PreloadDataConfig: {
    DataSource: {
      S3: {
        Bucket: "my-fhir-data-bucket",
        Prefix: "preloaded-data/"
      }
    }
  }
});
```

## Identity Provider Configuration

Set up a FHIR Datastore with an identity provider configuration for authentication.

```ts
const identityProviderFhirDatastore = await AWS.HealthLake.FHIRDatastore("identityProviderFhirDatastore", {
  DatastoreTypeVersion: "1.0",
  DatastoreName: "AuthHealthData",
  IdentityProviderConfiguration: {
    OAuth: {
      AuthorizationEndpoint: "https://auth.example.com/authorize",
      TokenEndpoint: "https://auth.example.com/token",
      ClientId: "my-client-id",
      ClientSecret: "my-client-secret"
    }
  }
});
```
