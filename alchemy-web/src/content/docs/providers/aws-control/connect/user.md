---
title: User
description: Learn how to create, update, and manage AWS Connect Users using Alchemy Cloud Control.
---


The User resource lets you manage [AWS Connect Users](https://docs.aws.amazon.com/connect/latest/userguide/) and their associated settings in your AWS Connect instance.

## Minimal Example

Create a basic AWS Connect User with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const connectUser = await AWS.Connect.User("basicConnectUser", {
  RoutingProfileArn: "arn:aws:connect:us-east-1:123456789012:routing-profile/abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  Username: "john.doe",
  PhoneConfig: {
    PhoneType: "SOFT_PHONE",
    AutoAccept: true,
    AfterContactWorkTimeLimit: 0,
    PhoneNumber: "+15555551234"
  },
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  SecurityProfileArns: [
    "arn:aws:connect:us-east-1:123456789012:security-profile/abcdefgh-ijkl-mnop-qrst-uvwxyz123456"
  ],
  Tags: [
    { Key: "Department", Value: "Sales" },
    { Key: "Location", Value: "New York" }
  ]
});
```

## Advanced Configuration

Configure an AWS Connect User with additional optional properties such as identity information and user proficiencies.

```ts
const advancedConnectUser = await AWS.Connect.User("advancedConnectUser", {
  RoutingProfileArn: "arn:aws:connect:us-east-1:123456789012:routing-profile/abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  Username: "jane.smith",
  PhoneConfig: {
    PhoneType: "DESK_PHONE",
    AutoAccept: true,
    AfterContactWorkTimeLimit: 0,
    PhoneNumber: "+15555559876"
  },
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  DirectoryUserId: "user-123456",
  IdentityInfo: {
    FirstName: "Jane",
    LastName: "Smith",
    Email: "jane.smith@example.com",
    SecondaryEmail: "jane.secondary@example.com"
  },
  HierarchyGroupArn: "arn:aws:connect:us-east-1:123456789012:hierarchy-group/abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  SecurityProfileArns: [
    "arn:aws:connect:us-east-1:123456789012:security-profile/abcdefgh-ijkl-mnop-qrst-uvwxyz123456"
  ],
  UserProficiencies: [
    { Language: "English", Proficiency: "Fluent" },
    { Language: "Spanish", Proficiency: "Conversational" }
  ]
});
```

## User Adoption

Create a user while adopting an existing resource if it already exists.

```ts
const adoptedUser = await AWS.Connect.User("adoptedConnectUser", {
  RoutingProfileArn: "arn:aws:connect:us-east-1:123456789012:routing-profile/abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  Username: "existing.user",
  PhoneConfig: {
    PhoneType: "SOFT_PHONE",
    AutoAccept: true,
    AfterContactWorkTimeLimit: 0,
    PhoneNumber: "+15555554321"
  },
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  SecurityProfileArns: [
    "arn:aws:connect:us-east-1:123456789012:security-profile/abcdefgh-ijkl-mnop-qrst-uvwxyz123456"
  ],
  adopt: true
});
``` 

This documentation provides a comprehensive overview of how to manage AWS Connect Users using the Alchemy framework, showcasing practical examples to facilitate user creation and customization.
