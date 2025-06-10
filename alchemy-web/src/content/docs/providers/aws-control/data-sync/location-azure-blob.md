---
title: LocationAzureBlob
description: Learn how to create, update, and manage AWS DataSync LocationAzureBlobs using Alchemy Cloud Control.
---


The LocationAzureBlob resource allows you to manage [AWS DataSync LocationAzureBlobs](https://docs.aws.amazon.com/datasync/latest/userguide/) for transferring data between AWS and Azure Blob Storage.

## Minimal Example

Create a basic Azure Blob location with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const azureBlobLocation = await AWS.DataSync.LocationAzureBlob("myAzureBlobLocation", {
  AzureBlobContainerUrl: "https://myaccount.blob.core.windows.net/mycontainer",
  AzureBlobAuthenticationType: "SAS",
  AgentArns: ["arn:aws:datasync:us-east-1:123456789012:agent/my-agent"],
  AzureBlobSasConfiguration: {
    SasToken: "my-sas-token"
  }
});
```

## Advanced Configuration

Configure an Azure Blob location with additional options such as access tier and subdirectory.

```ts
const advancedAzureBlobLocation = await AWS.DataSync.LocationAzureBlob("advancedAzureBlobLocation", {
  AzureBlobContainerUrl: "https://myaccount.blob.core.windows.net/mycontainer",
  AzureBlobAuthenticationType: "SAS",
  AgentArns: ["arn:aws:datasync:us-east-1:123456789012:agent/my-agent"],
  AzureAccessTier: "Hot",
  Subdirectory: "/data",
  AzureBlobSasConfiguration: {
    SasToken: "my-sas-token"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DataMigration" }
  ]
});
```

## Using Access Tiers

Demonstrate creating an Azure Blob location with a specific access tier for cost optimization.

```ts
const costOptimizedAzureBlobLocation = await AWS.DataSync.LocationAzureBlob("costOptimizedAzureBlobLocation", {
  AzureBlobContainerUrl: "https://myaccount.blob.core.windows.net/mycontainer",
  AzureBlobAuthenticationType: "SAS",
  AgentArns: ["arn:aws:datasync:us-east-1:123456789012:agent/my-agent"],
  AzureAccessTier: "Cool",
  AzureBlobSasConfiguration: {
    SasToken: "my-sas-token"
  }
});
```
