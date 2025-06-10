---
title: ZonalAutoshiftConfiguration
description: Learn how to create, update, and manage AWS ARCZonalShift ZonalAutoshiftConfigurations using Alchemy Cloud Control.
---


The ZonalAutoshiftConfiguration resource allows you to manage the configurations for AWS ARCZonalShift, enabling automatic shifting of resources between availability zones. This can help improve the availability and resilience of your applications. For more details, refer to the [AWS ARCZonalShift ZonalAutoshiftConfigurations documentation](https://docs.aws.amazon.com/arczonalshift/latest/userguide/).

## Minimal Example

Create a basic ZonalAutoshiftConfiguration with the required properties.

```ts
import AWS from "alchemy/aws/control";

const zonalAutoshiftConfig = await AWS.ARCZonalShift.ZonalAutoshiftConfiguration("basicZonalShiftConfig", {
  ResourceIdentifier: "arn:aws:service:region:account-id:resource-type/resource-id",
  ZonalAutoshiftStatus: "ENABLED" // Optional property to set the status
});
```

## Advanced Configuration

Configure a ZonalAutoshiftConfiguration with a practice run setup to test the configuration before applying it.

```ts
import AWS from "alchemy/aws/control";

const practiceRunZonalShiftConfig = await AWS.ARCZonalShift.ZonalAutoshiftConfiguration("practiceRunZonalShiftConfig", {
  ResourceIdentifier: "arn:aws:service:region:account-id:resource-type/resource-id",
  ZonalAutoshiftStatus: "ENABLED",
  PracticeRunConfiguration: {
    // Example configuration for practice run
    DryRun: true,
    Duration: 3600 // Duration for the practice run in seconds
  }
});
```

## Resource Adoption

Create a ZonalAutoshiftConfiguration that adopts an existing resource if it already exists, preventing failure.

```ts
import AWS from "alchemy/aws/control";

const adoptZonalShiftConfig = await AWS.ARCZonalShift.ZonalAutoshiftConfiguration("adoptZonalShiftConfig", {
  ResourceIdentifier: "arn:aws:service:region:account-id:resource-type/resource-id",
  adopt: true // This will adopt the existing resource instead of failing
});
```
