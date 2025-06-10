---
title: DomainConfiguration
description: Learn how to create, update, and manage AWS IoT DomainConfigurations using Alchemy Cloud Control.
---


The DomainConfiguration resource allows you to manage [AWS IoT DomainConfigurations](https://docs.aws.amazon.com/iot/latest/userguide/), enabling you to set up custom domains for your AWS IoT endpoints.

## Minimal Example

Create a basic DomainConfiguration with required properties and one common optional property:

```ts
import AWS from "alchemy/aws/control";

const domainConfig = await AWS.IoT.DomainConfiguration("myDomainConfig", {
  DomainConfigurationName: "myIoTDomains",
  DomainName: "iot.mydomain.com",
  ApplicationProtocol: "http",
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }]
});
```

## Advanced Configuration

Configure a DomainConfiguration with additional security settings, including custom certificates:

```ts
const secureDomainConfig = await AWS.IoT.DomainConfiguration("secureDomainConfig", {
  DomainConfigurationName: "secureIoTDomains",
  DomainName: "secure.iot.mydomain.com",
  ApplicationProtocol: "mqtts",
  ClientCertificateConfig: {
    // Example of client certificate configuration
    CertificateArn: "arn:aws:iot:us-west-2:123456789012:cert/abcdef12-3456-7890-abcd-ef1234567890",
    Status: "ACTIVE"
  },
  ServerCertificateConfig: {
    // Example of server certificate configuration
    ServerCertificateArn: "arn:aws:iot:us-west-2:123456789012:cert/abcdef12-3456-7890-abcd-ef1234567890",
    Status: "ACTIVE"
  }
});
```

## Custom TLS Configuration

Set up a DomainConfiguration with specific TLS settings to enhance security:

```ts
const tlsDomainConfig = await AWS.IoT.DomainConfiguration("tlsDomainConfig", {
  DomainConfigurationName: "tlsIoTDomains",
  DomainName: "tls.iot.mydomain.com",
  TlsConfig: {
    InsecureSkipVerification: false,
    ServerCertificateArns: [
      "arn:aws:iot:us-west-2:123456789012:cert/abcdef12-3456-7890-abcd-ef1234567890"
    ]
  },
  ValidationCertificateArn: "arn:aws:iot:us-west-2:123456789012:cert/abcdef12-3456-7890-abcd-ef1234567890"
});
```

## Using Tags for Organization

Create a DomainConfiguration with multiple tags for better resource organization:

```ts
const taggedDomainConfig = await AWS.IoT.DomainConfiguration("taggedDomainConfig", {
  DomainConfigurationName: "taggedIoTDomains",
  DomainName: "tagged.iot.mydomain.com",
  Tags: [
    { Key: "Project", Value: "IoTProject" },
    { Key: "Owner", Value: "DevTeam" },
    { Key: "Department", Value: "Engineering" }
  ]
});
```
