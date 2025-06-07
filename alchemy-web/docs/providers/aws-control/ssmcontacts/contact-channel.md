---
title: Managing AWS SSMContacts ContactChannels with Alchemy
description: Learn how to create, update, and manage AWS SSMContacts ContactChannels using Alchemy Cloud Control.
---

# ContactChannel

The ContactChannel resource lets you create and manage [AWS SSMContacts ContactChannels](https://docs.aws.amazon.com/ssmcontacts/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ssmcontacts-contactchannel.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const contactchannel = await AWS.SSMContacts.ContactChannel("contactchannel-example", {
  ChannelName: "contactchannel-channel",
  ChannelAddress: "example-channeladdress",
  ContactId: "example-contactid",
  ChannelType: "example-channeltype",
});
```

