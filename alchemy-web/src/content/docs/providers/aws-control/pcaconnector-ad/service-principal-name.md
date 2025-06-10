---
title: ServicePrincipalName
description: Learn how to create, update, and manage AWS PCAConnectorAD ServicePrincipalNames using Alchemy Cloud Control.
---


The ServicePrincipalName resource lets you manage [AWS PCAConnectorAD ServicePrincipalNames](https://docs.aws.amazon.com/pcaconnectorad/latest/userguide/) for integrating AWS Private Certificate Authority with Active Directory.

## Minimal Example

Create a basic ServicePrincipalName resource with required properties.

```ts
import AWS from "alchemy/aws/control";

const servicePrincipalName = await AWS.PCAConnectorAD.ServicePrincipalName("myServicePrincipalName", {
  ConnectorArn: "arn:aws:pcaconnectorad:us-west-2:123456789012:connector/my-connector",
  DirectoryRegistrationArn: "arn:aws:pcaconnectorad:us-west-2:123456789012:directory/my-directory",
  adopt: false // Default false: Will fail if resource already exists
});
```

## Advanced Configuration

Configure a ServicePrincipalName resource to adopt an existing resource if it already exists.

```ts
const existingServicePrincipalName = await AWS.PCAConnectorAD.ServicePrincipalName("existingServicePrincipalName", {
  ConnectorArn: "arn:aws:pcaconnectorad:us-west-2:123456789012:connector/my-existing-connector",
  DirectoryRegistrationArn: "arn:aws:pcaconnectorad:us-west-2:123456789012:directory/my-existing-directory",
  adopt: true // Will adopt the existing resource instead of failing
});
```

## Usage in a Complex Configuration

Instantiate multiple ServicePrincipalName resources for different connectors.

```ts
const servicePrincipalNameOne = await AWS.PCAConnectorAD.ServicePrincipalName("servicePrincipalOne", {
  ConnectorArn: "arn:aws:pcaconnectorad:us-west-2:123456789012:connector/connector-one",
  DirectoryRegistrationArn: "arn:aws:pcaconnectorad:us-west-2:123456789012:directory/registration-one"
});

const servicePrincipalNameTwo = await AWS.PCAConnectorAD.ServicePrincipalName("servicePrincipalTwo", {
  ConnectorArn: "arn:aws:pcaconnectorad:us-west-2:123456789012:connector/connector-two",
  DirectoryRegistrationArn: "arn:aws:pcaconnectorad:us-west-2:123456789012:directory/registration-two"
});
```
