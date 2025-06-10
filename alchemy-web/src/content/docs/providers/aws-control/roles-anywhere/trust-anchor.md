---
title: TrustAnchor
description: Learn how to create, update, and manage AWS RolesAnywhere TrustAnchors using Alchemy Cloud Control.
---


The TrustAnchor resource lets you manage [AWS RolesAnywhere TrustAnchors](https://docs.aws.amazon.com/rolesanywhere/latest/userguide/) which are used to establish trust between AWS and external identities.

## Minimal Example

Create a basic TrustAnchor with required properties and one optional property for notifications.

```ts
import AWS from "alchemy/aws/control";

const basicTrustAnchor = await AWS.RolesAnywhere.TrustAnchor("basicTrustAnchor", {
  name: "MyTrustAnchor",
  source: {
    sourceType: "Cognito", // Example source type
    sourceDetails: {
      cognitoUserPoolId: "us-west-2_aBcDeFgHi"
    }
  },
  notificationSettings: [{
    sns: {
      topicArn: "arn:aws:sns:us-west-2:123456789012:MyTopic"
    }
  }],
  enabled: true
});
```

## Advanced Configuration

Configure a TrustAnchor with additional settings, including tags and enabling the resource.

```ts
const advancedTrustAnchor = await AWS.RolesAnywhere.TrustAnchor("advancedTrustAnchor", {
  name: "AdvancedTrustAnchor",
  source: {
    sourceType: "SAML",
    sourceDetails: {
      samlProviderArn: "arn:aws:iam::123456789012:saml-provider/MySAMLProvider"
    }
  },
  tags: [{
    key: "Environment",
    value: "Production"
  }],
  enabled: true,
  notificationSettings: [{
    sns: {
      topicArn: "arn:aws:sns:us-west-2:123456789012:NotificationTopic"
    }
  }]
});
```

## Adoption of Existing Resources

If you need to adopt an existing TrustAnchor without failing, you can set the adopt property to true.

```ts
const adoptedTrustAnchor = await AWS.RolesAnywhere.TrustAnchor("adoptTrustAnchor", {
  name: "ExistingTrustAnchor",
  source: {
    sourceType: "OIDC",
    sourceDetails: {
      openIdConnectProviderArn: "arn:aws:iam::123456789012:oidc-provider/my-oidc-provider"
    }
  },
  adopt: true
});
```

## Enabling and Disabling TrustAnchors

You can easily toggle the enabled property to manage the TrustAnchor's state.

```ts
const toggleTrustAnchor = await AWS.RolesAnywhere.TrustAnchor("toggleTrustAnchor", {
  name: "ToggleTrustAnchor",
  source: {
    sourceType: "Cognito",
    sourceDetails: {
      cognitoUserPoolId: "us-east-1_aBcDeFgHi"
    }
  },
  enabled: false // Disable the TrustAnchor
});

// Enable it later
toggleTrustAnchor.enabled = true;
```
