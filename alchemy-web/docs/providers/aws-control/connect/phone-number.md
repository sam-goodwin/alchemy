---
title: Managing AWS Connect PhoneNumbers with Alchemy
description: Learn how to create, update, and manage AWS Connect PhoneNumbers using Alchemy Cloud Control.
---

# PhoneNumber

The PhoneNumber resource allows you to manage [AWS Connect PhoneNumbers](https://docs.aws.amazon.com/connect/latest/userguide/) for your contact center, enabling you to configure phone number types, descriptions, and associated attributes.

## Minimal Example

Create a basic PhoneNumber with required properties and a couple of optional ones.

```ts
import AWS from "alchemy/aws/control";

const BasicPhoneNumber = await AWS.Connect.PhoneNumber("BasicPhoneNumber", {
  TargetArn: "arn:aws:connect:us-west-2:123456789012:instance/abcd1234",
  Type: "TOLL_FREE",
  Description: "Toll-free number for customer support",
  CountryCode: "US",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Support" }
  ]
});
```

## Advanced Configuration

Configure a PhoneNumber with additional attributes for enhanced functionality.

```ts
const AdvancedPhoneNumber = await AWS.Connect.PhoneNumber("AdvancedPhoneNumber", {
  TargetArn: "arn:aws:connect:us-west-2:123456789012:instance/abcd1234",
  Type: "LOCAL",
  Description: "Local number for regional support",
  Prefix: "+1",
  CountryCode: "US",
  SourcePhoneNumberArn: "arn:aws:connect:us-west-2:123456789012:phonenumber/xyz9876",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Sales" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing PhoneNumber instead of failing when it already exists, you can set the adopt property to true.

```ts
const AdoptedPhoneNumber = await AWS.Connect.PhoneNumber("AdoptedPhoneNumber", {
  TargetArn: "arn:aws:connect:us-west-2:123456789012:instance/abcd1234",
  Type: "TOLL_FREE",
  Description: "Adopting an existing toll-free number",
  adopt: true
});
```