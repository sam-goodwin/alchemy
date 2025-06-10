---
title: Application
description: Learn how to create, update, and manage AWS SystemsManagerSAP Applications using Alchemy Cloud Control.
---


The Application resource lets you manage [AWS SystemsManagerSAP Applications](https://docs.aws.amazon.com/systemsmanagersap/latest/userguide/) and their associated configurations.

## Minimal Example

Create a basic SAP application with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const sapApplication = await AWS.SystemsManagerSAP.Application("mySapApplication", {
  ApplicationId: "sap-app-123",
  ApplicationType: "S4HANA",
  Instances: ["i-0abcd1234efgh5678"],
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }]
});
```

## Advanced Configuration

Configure an SAP application with additional optional properties, such as credentials and a database ARN.

```ts
const advancedSapApplication = await AWS.SystemsManagerSAP.Application("advancedSapApplication", {
  ApplicationId: "sap-app-456",
  ApplicationType: "S4HANA",
  Instances: ["i-0abcd1234efgh5678"],
  DatabaseArn: "arn:aws:rds:us-west-2:123456789012:db:mysql-db",
  Credentials: [{
    Username: "admin",
    Password: "securePassword123!"
  }],
  ComponentsInfo: [{
    Name: "ApplicationServer",
    Version: "1.0.0"
  }]
});
```

## Adoption of Existing Resources

This example demonstrates how to adopt an existing SAP application instead of failing when the resource already exists.

```ts
const adoptedSapApplication = await AWS.SystemsManagerSAP.Application("existingSapApplication", {
  ApplicationId: "sap-app-789",
  ApplicationType: "S4HANA",
  Instances: ["i-0abcd1234efgh5678"],
  adopt: true // Adopts the existing resource
});
```

## Configuration with Multiple Instances

Create an SAP application configured with multiple instances for enhanced availability.

```ts
const multiInstanceSapApplication = await AWS.SystemsManagerSAP.Application("multiInstanceSapApplication", {
  ApplicationId: "sap-app-101",
  ApplicationType: "S4HANA",
  Instances: ["i-0abcd1234efgh5678", "i-0abcd1234ijklmnop"],
  Tags: [{
    Key: "Environment",
    Value: "Staging"
  }]
});
```
