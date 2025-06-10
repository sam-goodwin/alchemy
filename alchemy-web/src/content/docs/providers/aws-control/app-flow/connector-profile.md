---
title: ConnectorProfile
description: Learn how to create, update, and manage AWS AppFlow ConnectorProfiles using Alchemy Cloud Control.
---


The ConnectorProfile resource lets you manage [AWS AppFlow ConnectorProfiles](https://docs.aws.amazon.com/appflow/latest/userguide/) for connecting applications and services through data flows.

## Minimal Example

Create a basic ConnectorProfile with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicConnectorProfile = await AWS.AppFlow.ConnectorProfile("basicProfile", {
  ConnectorProfileName: "SalesforceProfile",
  ConnectorType: "Salesforce",
  ConnectionMode: "Public",
  KMSArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst"
});
```

## Advanced Configuration

Configure a ConnectorProfile with additional settings for a more complex use case.

```ts
const advancedConnectorProfile = await AWS.AppFlow.ConnectorProfile("advancedProfile", {
  ConnectorProfileName: "CustomAPIProfile",
  ConnectorType: "CustomConnector",
  ConnectionMode: "Private",
  ConnectorLabel: "Custom API Connector",
  KMSArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst",
  ConnectorProfileConfig: {
    ConnectorProfileProperties: {
      apiUrl: "https://api.customservice.com",
      oauth2: {
        accessToken: "your-access-token",
        refreshToken: "your-refresh-token"
      }
    }
  }
});
```

## Using with KMS for Encryption

Create a ConnectorProfile that utilizes AWS KMS for data encryption.

```ts
const secureConnectorProfile = await AWS.AppFlow.ConnectorProfile("secureProfile", {
  ConnectorProfileName: "SecureSalesforceProfile",
  ConnectorType: "Salesforce",
  ConnectionMode: "Public",
  KMSArn: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst"
});
```

## Adopting an Existing ConnectorProfile

If you want to adopt an existing ConnectorProfile instead of failing when it already exists, you can set the `adopt` property.

```ts
const adoptedConnectorProfile = await AWS.AppFlow.ConnectorProfile("adoptedProfile", {
  ConnectorProfileName: "ExistingProfile",
  ConnectorType: "Salesforce",
  ConnectionMode: "Public",
  adopt: true
});
```
