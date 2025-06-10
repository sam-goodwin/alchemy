---
title: IPSet
description: Learn how to create, update, and manage AWS WAFRegional IPSets using Alchemy Cloud Control.
---


The IPSet resource allows you to manage [AWS WAFRegional IPSets](https://docs.aws.amazon.com/wafregional/latest/userguide/) that contain a set of IP addresses. This resource is essential for controlling access to your applications based on IP address filtering.

## Minimal Example

Create a basic IPSet with a couple of IP address descriptors.

```ts
import AWS from "alchemy/aws/control";

const basicIPSet = await AWS.WAFRegional.IPSet("basicIPSet", {
  name: "BasicIPSet",
  IPSetDescriptors: [
    { Type: "IPV4", Value: "192.0.2.0/24" },
    { Type: "IPV4", Value: "203.0.113.0/24" }
  ]
});
```

## Advanced Configuration

Configure an IPSet to include a broader range of IP addresses with additional settings.

```ts
const advancedIPSet = await AWS.WAFRegional.IPSet("advancedIPSet", {
  name: "AdvancedIPSet",
  IPSetDescriptors: [
    { Type: "IPV4", Value: "198.51.100.0/24" },
    { Type: "IPV6", Value: "2001:0db8:85a3:0000:0000:8a2e:0370:7334/64" },
    { Type: "IPV4", Value: "10.0.0.0/8" }
  ]
});
```

## Dynamic Updates

Create an IPSet that you can update dynamically to respond to changing security requirements.

```ts
const dynamicIPSet = await AWS.WAFRegional.IPSet("dynamicIPSet", {
  name: "DynamicIPSet",
  IPSetDescriptors: [
    { Type: "IPV4", Value: "192.168.1.0/24" }
  ],
  adopt: true // Allows adoption of existing resource if it already exists
});

// Later update to add more IP addresses
await AWS.WAFRegional.IPSet.update(dynamicIPSet.id, {
  IPSetDescriptors: [
    ...dynamicIPSet.IPSetDescriptors,
    { Type: "IPV4", Value: "172.16.0.0/12" }
  ]
});
```

## Example of Resource Usage in a Web ACL

Demonstrate how to utilize the IPSet as part of a Web ACL for enhanced security.

```ts
import AWS from "alchemy/aws/control";

const webACL = await AWS.WAFRegional.WebACL("webAcl", {
  name: "WebACLForMyApp",
  defaultAction: { Type: "ALLOW" },
  rules: [
    {
      name: "BlockSpecificIPs",
      priority: 1,
      action: { Type: "BLOCK" },
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: "blockSpecificIPs"
      },
      statement: {
        ipSetReferenceStatement: {
          arn: dynamicIPSet.Arn
        }
      }
    }
  ]
});
```
