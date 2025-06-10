---
title: HoursOfOperation
description: Learn how to create, update, and manage AWS Connect HoursOfOperations using Alchemy Cloud Control.
---


The HoursOfOperation resource allows you to manage the operational hours for an AWS Connect instance, defining when your contact center is available to handle customer interactions. For more details, visit the [AWS Connect HoursOfOperations documentation](https://docs.aws.amazon.com/connect/latest/userguide/).

## Minimal Example

Create a basic HoursOfOperation resource with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const hoursOfOperation = await AWS.Connect.HoursOfOperation("businessHours", {
  TimeZone: "America/New_York",
  Description: "Operational hours for the customer support team",
  Config: [
    {
      Day: "MONDAY",
      StartTime: "09:00",
      EndTime: "17:00"
    },
    {
      Day: "TUESDAY",
      StartTime: "09:00",
      EndTime: "17:00"
    },
    {
      Day: "WEDNESDAY",
      StartTime: "09:00",
      EndTime: "17:00"
    },
    {
      Day: "THURSDAY",
      StartTime: "09:00",
      EndTime: "17:00"
    },
    {
      Day: "FRIDAY",
      StartTime: "09:00",
      EndTime: "17:00"
    }
  ],
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-1234-5678-90ab-cdefghijklm",
  Name: "Business Hours"
});
```

## Advanced Configuration

Set up operational hours with overrides for specific dates or times outside of regular hours.

```ts
const extendedHoursOfOperation = await AWS.Connect.HoursOfOperation("extendedBusinessHours", {
  TimeZone: "America/New_York",
  Description: "Extended operational hours and holiday overrides",
  Config: [
    {
      Day: "MONDAY",
      StartTime: "09:00",
      EndTime: "20:00"
    },
    {
      Day: "TUESDAY",
      StartTime: "09:00",
      EndTime: "20:00"
    },
    {
      Day: "WEDNESDAY",
      StartTime: "09:00",
      EndTime: "20:00"
    },
    {
      Day: "THURSDAY",
      StartTime: "09:00",
      EndTime: "20:00"
    },
    {
      Day: "FRIDAY",
      StartTime: "09:00",
      EndTime: "20:00"
    },
    {
      Day: "SATURDAY",
      StartTime: "10:00",
      EndTime: "15:00"
    }
  ],
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-1234-5678-90ab-cdefghijklm",
  Name: "Extended Business Hours",
  HoursOfOperationOverrides: [
    {
      Name: "Holiday Hours",
      StartTime: "09:00",
      EndTime: "13:00",
      Date: "2023-12-25"
    }
  ]
});
```

## Adoption of Existing Resource

If a resource with the same name exists, you can adopt it rather than failing the operation.

```ts
const adoptHoursOfOperation = await AWS.Connect.HoursOfOperation("existingBusinessHours", {
  TimeZone: "America/New_York",
  Description: "Adopting existing hours of operation",
  Config: [
    {
      Day: "MONDAY",
      StartTime: "09:00",
      EndTime: "17:00"
    },
    {
      Day: "TUESDAY",
      StartTime: "09:00",
      EndTime: "17:00"
    }
  ],
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-1234-5678-90ab-cdefghijklm",
  Name: "Existing Business Hours",
  adopt: true // Enables adoption of an existing resource
});
```
