---
title: ApplicationFleetAssociation
description: Learn how to create, update, and manage AWS AppStream ApplicationFleetAssociations using Alchemy Cloud Control.
---


The ApplicationFleetAssociation resource lets you associate an application with a fleet in AWS AppStream. This is crucial for deploying applications to users in a managed environment. For more details, visit the [AWS AppStream ApplicationFleetAssociations documentation](https://docs.aws.amazon.com/appstream/latest/userguide/).

## Minimal Example

Create a basic association between an application and a fleet using required properties.

```ts
import AWS from "alchemy/aws/control";

const appFleetAssociation = await AWS.AppStream.ApplicationFleetAssociation("appFleetAssociation", {
  FleetName: "myAppStreamFleet",
  ApplicationArn: "arn:aws:appstream:us-west-2:123456789012:application/myApplication"
});
```

## Advanced Configuration

This example demonstrates how to create an association while adopting an existing resource if it already exists.

```ts
const advancedAppFleetAssociation = await AWS.AppStream.ApplicationFleetAssociation("advancedAppFleetAssociation", {
  FleetName: "myAppStreamFleet",
  ApplicationArn: "arn:aws:appstream:us-west-2:123456789012:application/myApplication",
  adopt: true
});
```

## Use Case: Updating an Existing Association

If you need to update an existing application-fleet association, you can do so by specifying the same `FleetName` and `ApplicationArn`.

```ts
const updateAppFleetAssociation = await AWS.AppStream.ApplicationFleetAssociation("updateAppFleetAssociation", {
  FleetName: "myAppStreamFleet",
  ApplicationArn: "arn:aws:appstream:us-west-2:123456789012:application/myApplication"
});
```

## Example: Checking Resource Attributes

You can retrieve the ARN and creation times of the application-fleet association after it has been created.

```ts
const { Arn, CreationTime } = await AWS.AppStream.ApplicationFleetAssociation("appFleetAssociation", {
  FleetName: "myAppStreamFleet",
  ApplicationArn: "arn:aws:appstream:us-west-2:123456789012:application/myApplication"
});

// Log the ARN and creation time
console.log(`ARN: ${Arn}, Created At: ${CreationTime}`);
```
