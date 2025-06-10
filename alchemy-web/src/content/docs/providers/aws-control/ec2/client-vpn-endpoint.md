---
title: ClientVpnEndpoint
description: Learn how to create, update, and manage AWS EC2 ClientVpnEndpoints using Alchemy Cloud Control.
---


The ClientVpnEndpoint resource lets you create and manage [AWS EC2 ClientVpnEndpoints](https://docs.aws.amazon.com/ec2/latest/userguide/) for providing secure access to your AWS resources. 

## Minimal Example

Create a basic ClientVpnEndpoint with required properties and some common optional configurations:

```ts
import AWS from "alchemy/aws/control";

const basicClientVpnEndpoint = await AWS.EC2.ClientVpnEndpoint("BasicClientVpn", {
  ClientCidrBlock: "10.0.0.0/16",
  AuthenticationOptions: [
    {
      Type: "directory-service-authentication",
      ActiveDirectory: {
        DirectoryId: "d-1234567890"
      }
    }
  ],
  ServerCertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  ConnectionLogOptions: {
    Enabled: true,
    CloudWatchLogGroup: "vpn-connection-logs",
    CloudWatchLogStream: "vpn-access-logs"
  },
  DnsServers: ["8.8.8.8", "8.8.4.4"],
  TagSpecifications: [{
    ResourceType: "client-vpn-endpoint",
    Tags: [{
      Key: "Environment",
      Value: "Production"
    }]
  }]
});
```

## Advanced Configuration

Configure a ClientVpnEndpoint with enhanced security options and session timeout settings:

```ts
const advancedClientVpnEndpoint = await AWS.EC2.ClientVpnEndpoint("AdvancedClientVpn", {
  ClientCidrBlock: "10.1.0.0/16",
  AuthenticationOptions: [
    {
      Type: "federated-authentication",
      FederatedAuthentication: {
        SAML: {
          Idp: "https://idp.example.com/saml",
          Name: "Example SAML IdP"
        }
      }
    }
  ],
  ServerCertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  ConnectionLogOptions: {
    Enabled: true,
    CloudWatchLogGroup: "vpn-connection-logs",
    CloudWatchLogStream: "vpn-access-logs"
  },
  SessionTimeoutHours: 1,
  DisconnectOnSessionTimeout: true,
  SplitTunnel: true,
  ClientRouteEnforcementOptions: {
    Enforce: true
  }
});
```

## Custom Client Login Banner

Create a ClientVpnEndpoint that includes a custom client login banner:

```ts
const clientVpnWithBanner = await AWS.EC2.ClientVpnEndpoint("ClientVpnWithBanner", {
  ClientCidrBlock: "10.2.0.0/16",
  AuthenticationOptions: [
    {
      Type: "certificate-authentication",
      MutualAuthentication: {
        ClientRootCertificateChainArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcdef12-3456-78ab-cdef-ghijklmnopqr"
      }
    }
  ],
  ServerCertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  ConnectionLogOptions: {
    Enabled: true,
    CloudWatchLogGroup: "vpn-connection-logs",
    CloudWatchLogStream: "vpn-access-logs"
  },
  ClientLoginBannerOptions: {
    BannerText: "Welcome to the secure VPN. Please adhere to company policies.",
    Enabled: true
  }
});
```

## DNS Server Configuration

Set up a ClientVpnEndpoint with custom DNS servers:

```ts
const dnsConfiguredClientVpnEndpoint = await AWS.EC2.ClientVpnEndpoint("DnsConfiguredClientVpn", {
  ClientCidrBlock: "10.3.0.0/16",
  AuthenticationOptions: [{
    Type: "directory-service-authentication",
    ActiveDirectory: {
      DirectoryId: "d-1234567890"
    }
  }],
  ServerCertificateArn: "arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  ConnectionLogOptions: {
    Enabled: true,
    CloudWatchLogGroup: "vpn-connection-logs",
    CloudWatchLogStream: "vpn-access-logs"
  },
  DnsServers: ["1.1.1.1", "1.0.0.1"],
  SplitTunnel: false
});
```
