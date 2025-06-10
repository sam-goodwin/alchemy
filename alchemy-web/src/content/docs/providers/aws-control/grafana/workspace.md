---
title: Workspace
description: Learn how to create, update, and manage AWS Grafana Workspaces using Alchemy Cloud Control.
---


The Workspace resource lets you manage [AWS Grafana Workspaces](https://docs.aws.amazon.com/grafana/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic Grafana workspace with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const grafanaWorkspace = await AWS.Grafana.Workspace("myGrafanaWorkspace", {
  PermissionType: "CUSTOMER_MANAGED",
  AccountAccessType: "CURRENT_ACCOUNT",
  Description: "My Grafana Workspace for monitoring application metrics"
});
```

## Advanced Configuration

Configure a Grafana workspace with advanced options such as authentication providers and notification destinations.

```ts
const advancedGrafanaWorkspace = await AWS.Grafana.Workspace("advancedGrafanaWorkspace", {
  PermissionType: "CUSTOMER_MANAGED",
  AccountAccessType: "CURRENT_ACCOUNT",
  AuthenticationProviders: ["AWS_SSO", "SAML"],
  NotificationDestinations: ["https://my-notification-endpoint.com"],
  VpcConfiguration: {
    VpcId: "vpc-0123456789abcdef0",
    SubnetIds: ["subnet-0123456789abcdef0", "subnet-0abcdef1234567890"],
    SecurityGroupIds: ["sg-0123456789abcdef0"]
  },
  SamlConfiguration: {
    IdpMetadata: "<Base64-encoded SAML metadata>",
    AssertionConsumerUrl: "https://my-grafana-workspace.com/saml",
    NameIdFormat: "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified"
  }
});
```

## Enhanced Data Source Configuration

Create a workspace with specific data sources configured for your Grafana dashboards.

```ts
const dataSourceGrafanaWorkspace = await AWS.Grafana.Workspace("dataSourceGrafanaWorkspace", {
  PermissionType: "CUSTOMER_MANAGED",
  AccountAccessType: "CURRENT_ACCOUNT",
  DataSources: [
    "Prometheus",
    "Amazon CloudWatch",
    "InfluxDB"
  ],
  GrafanaVersion: "8.0",
  Description: "Workspace connected to multiple data sources"
});
```

## Network Access Control

Set up a workspace with specific network access control configurations.

```ts
const networkControlledGrafanaWorkspace = await AWS.Grafana.Workspace("networkControlledGrafanaWorkspace", {
  PermissionType: "CUSTOMER_MANAGED",
  AccountAccessType: "CURRENT_ACCOUNT",
  NetworkAccessControl: {
    Egress: {
      AllowAll: false,
      AllowedIPRanges: [
        "192.168.1.0/24",
        "10.0.0.0/16"
      ]
    },
    Ingress: {
      AllowAll: false,
      AllowedIPRanges: [
        "203.0.113.0/24"
      ]
    }
  },
  Description: "Workspace with restricted network access"
});
```
