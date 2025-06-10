---
title: TrustStore
description: Learn how to create, update, and manage AWS WorkSpacesWeb TrustStores using Alchemy Cloud Control.
---


The TrustStore resource allows you to manage [AWS WorkSpacesWeb TrustStores](https://docs.aws.amazon.com/workspacesweb/latest/userguide/), which are used to store SSL/TLS certificates for secure communication.

## Minimal Example

Create a basic TrustStore with a list of certificates:

```ts
import AWS from "alchemy/aws/control";

const basicTrustStore = await AWS.WorkSpacesWeb.TrustStore("basicTrustStore", {
  CertificateList: [
    "-----BEGIN CERTIFICATE-----\nMIIDdzCCAl+gAwIBAgIEU5G6NjANBgkqhkiG9w0BAQUFADB...",
    "-----BEGIN CERTIFICATE-----\nMIIDdzCCAl+gAwIBAgIEU5F6NjANBgkqhkiG9w0BAQUFADB..."
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "WebAccess" }
  ]
});
```

## Advanced Configuration

Configure a TrustStore with additional properties such as adopting existing resources:

```ts
const advancedTrustStore = await AWS.WorkSpacesWeb.TrustStore("advancedTrustStore", {
  CertificateList: [
    "-----BEGIN CERTIFICATE-----\nMIIDdzCCAl+gAwIBAgIEU5G6NjANBgkqhkiG9w0BAQUFADB...",
    "-----BEGIN CERTIFICATE-----\nMIIDdzCCAl+gAwIBAgIEU5F6NjANBgkqhkiG9w0BAQUFADB..."
  ],
  Tags: [
    { Key: "Environment", Value: "Staging" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Certificate Management

Update an existing TrustStore with a new set of certificates:

```ts
const updatedTrustStore = await AWS.WorkSpacesWeb.TrustStore("updatedTrustStore", {
  CertificateList: [
    "-----BEGIN CERTIFICATE-----\nMIIDdzCCAl+gAwIBAgIEU5G6NjANBgkqhkiG9w0BAQUFADB...",
    "-----BEGIN CERTIFICATE-----\nMIIDdzCCAl+gAwIBAgIEU5F6NjANBgkqhkiG9w0BAQUFADB...",
    "-----BEGIN CERTIFICATE-----\nMIIDdzCCAl+gAwIBAgIEU5G7NjANBgkqhkiG9w0BAQUFADB..."
  ],
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```
