---
title: VerifiedAccessTrustProvider
description: Learn how to create, update, and manage AWS EC2 VerifiedAccessTrustProviders using Alchemy Cloud Control.
---


The VerifiedAccessTrustProvider resource allows you to create and manage [AWS EC2 Verified Access Trust Providers](https://docs.aws.amazon.com/ec2/latest/userguide/). This resource is essential for implementing secure access policies for your applications.

## Minimal Example

Create a basic Verified Access Trust Provider with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicTrustProvider = await AWS.EC2.VerifiedAccessTrustProvider("basicTrustProvider", {
  PolicyReferenceName: "MyTrustPolicy",
  TrustProviderType: "AWS",
  Description: "A basic Verified Access Trust Provider for AWS services"
});
```

## Advanced Configuration

Configure a Verified Access Trust Provider with advanced options such as device options and OIDC settings.

```ts
const advancedTrustProvider = await AWS.EC2.VerifiedAccessTrustProvider("advancedTrustProvider", {
  PolicyReferenceName: "MyAdvancedTrustPolicy",
  TrustProviderType: "AWS",
  DeviceOptions: {
    DeviceTrustProviderType: "AWS",
    DevicePolicy: {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: "iot:Publish",
          Resource: "*"
        }
      ]
    }
  },
  OidcOptions: {
    AuthorizationEndpoint: "https://my-oidc-provider.com/auth",
    TokenEndpoint: "https://my-oidc-provider.com/token",
    ClientId: "my-client-id",
    ClientSecret: "my-client-secret"
  },
  Description: "An advanced Verified Access Trust Provider with device and OIDC options"
});
```

## Device Trust Configuration

Create a Verified Access Trust Provider specifically for device trust configurations.

```ts
const deviceTrustProvider = await AWS.EC2.VerifiedAccessTrustProvider("deviceTrustProvider", {
  PolicyReferenceName: "DeviceTrustPolicy",
  TrustProviderType: "Device",
  DeviceOptions: {
    DeviceTrustProviderType: "Custom",
    DevicePolicy: {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: "device:Authenticate",
          Resource: "*"
        }
      ]
    }
  },
  Description: "A Verified Access Trust Provider focused on device trust."
});
```

## OIDC Configuration

Set up a Verified Access Trust Provider that uses OIDC for authentication.

```ts
const oidcTrustProvider = await AWS.EC2.VerifiedAccessTrustProvider("oidcTrustProvider", {
  PolicyReferenceName: "OIDCAuthPolicy",
  TrustProviderType: "OIDC",
  OidcOptions: {
    AuthorizationEndpoint: "https://example-oidc.com/auth",
    TokenEndpoint: "https://example-oidc.com/token",
    ClientId: "my-oidc-client-id",
    ClientSecret: "my-oidc-client-secret"
  },
  Description: "A Verified Access Trust Provider using OIDC for authentication."
});
```
