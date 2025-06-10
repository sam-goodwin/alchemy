---
title: PhoneNumber
description: Learn how to create, update, and manage AWS Connect PhoneNumbers using Alchemy Cloud Control.
---


The PhoneNumber resource allows you to manage [AWS Connect PhoneNumbers](https://docs.aws.amazon.com/connect/latest/userguide/) for your Amazon Connect instances, enabling you to assign phone numbers to your contact center for handling communications.

## Minimal Example

Create a basic phone number with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicPhoneNumber = await AWS.Connect.PhoneNumber("basicPhoneNumber", {
  TargetArn: "arn:aws:connect:us-west-2:123456789012:instance/abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  Type: "TOLL_FREE",
  Description: "Basic toll-free number for customer support"
});
```

## Advanced Configuration

Configure a phone number with additional optional settings such as prefix and country code.

```ts
const advancedPhoneNumber = await AWS.Connect.PhoneNumber("advancedPhoneNumber", {
  TargetArn: "arn:aws:connect:us-west-2:123456789012:instance/abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  Type: "DIRECT_DIAL",
  Description: "Direct dial number for sales department",
  Prefix: "+1",
  CountryCode: "US"
});
```

## Adoption of Existing Phone Number

Adopt an existing phone number instead of failing when it already exists.

```ts
const adoptExistingPhoneNumber = await AWS.Connect.PhoneNumber("adoptExistingPhoneNumber", {
  TargetArn: "arn:aws:connect:us-west-2:123456789012:instance/abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  Type: "TOLL_FREE",
  Description: "Adopting existing toll-free number",
  adopt: true
});
```

## Using Tags for Organization

Create a phone number with tags for better resource organization.

```ts
const taggedPhoneNumber = await AWS.Connect.PhoneNumber("taggedPhoneNumber", {
  TargetArn: "arn:aws:connect:us-west-2:123456789012:instance/abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  Type: "DIRECT_DIAL",
  Description: "Tagged number for marketing team",
  Tags: [
    { Key: "Department", Value: "Marketing" },
    { Key: "Environment", Value: "Production" }
  ]
});
```
