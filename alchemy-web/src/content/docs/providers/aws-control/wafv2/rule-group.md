---
title: RuleGroup
description: Learn how to create, update, and manage AWS WAFv2 RuleGroups using Alchemy Cloud Control.
---


The RuleGroup resource allows you to manage [AWS WAFv2 RuleGroups](https://docs.aws.amazon.com/wafv2/latest/userguide/) which define a set of rules for inspecting and controlling web traffic to your applications.

## Minimal Example

Create a basic RuleGroup with the required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicRuleGroup = await AWS.WAFv2.RuleGroup("basicRuleGroup", {
  Scope: "REGIONAL", // Use "CLOUDFRONT" for CloudFront distributions
  Capacity: 50,
  Description: "Basic Rule Group for demo purposes",
  VisibilityConfig: {
    SampledRequestsEnabled: true,
    CloudWatchMetricsEnabled: true,
    MetricName: "BasicRuleGroupMetric"
  }
});
```

## Advanced Configuration

Configure a RuleGroup with custom rules and response bodies.

```ts
const advancedRuleGroup = await AWS.WAFv2.RuleGroup("advancedRuleGroup", {
  Scope: "REGIONAL",
  Capacity: 100,
  Description: "Advanced Rule Group with custom rules",
  Rules: [
    {
      Name: "BlockBadBots",
      Priority: 1,
      Statement: {
        ByteMatchStatement: {
          SearchString: "BadBotUserAgent",
          FieldToMatch: {
            HttpHeader: {
              Name: "User-Agent"
            }
          },
          TextTransformations: [
            {
              Priority: 0,
              Type: "NONE"
            }
          ],
          PositionalConstraint: "CONTAINS"
        }
      },
      Action: {
        Block: {}
      },
      VisibilityConfig: {
        SampledRequestsEnabled: true,
        CloudWatchMetricsEnabled: true,
        MetricName: "BlockBadBotsMetric"
      }
    }
  ],
  VisibilityConfig: {
    SampledRequestsEnabled: true,
    CloudWatchMetricsEnabled: true,
    MetricName: "AdvancedRuleGroupMetric"
  },
  CustomResponseBodies: {
    "BadRequest": {
      ContentType: "TEXT_HTML",
      Content: "<html><body><h1>403 Forbidden</h1></body></html>"
    }
  }
});
```

## Specific Use Case: IP Set Integration

Create a RuleGroup that integrates with an IP Set to allow or block specific IP addresses.

```ts
const ipSet = await AWS.WAFv2.IPSet("myIpSet", {
  Scope: "REGIONAL",
  Addresses: ["192.0.2.0/24"],
  Description: "IP Set for allowing specific addresses",
  IPAddressVersion: "IPV4",
  Scope: "REGIONAL",
  VisibilityConfig: {
    SampledRequestsEnabled: true,
    CloudWatchMetricsEnabled: true,
    MetricName: "MyIpSetMetric"
  }
});

const ipSetRuleGroup = await AWS.WAFv2.RuleGroup("ipSetRuleGroup", {
  Scope: "REGIONAL",
  Capacity: 50,
  Description: "Rule Group using IP Set",
  Rules: [
    {
      Name: "AllowSpecificIP",
      Priority: 1,
      Statement: {
        IPSetReferenceStatement: {
          ARN: ipSet.Arn // Reference the IP Set ARN
        }
      },
      Action: {
        Allow: {}
      },
      VisibilityConfig: {
        SampledRequestsEnabled: true,
        CloudWatchMetricsEnabled: true,
        MetricName: "AllowSpecificIPMetric"
      }
    }
  ],
  VisibilityConfig: {
    SampledRequestsEnabled: true,
    CloudWatchMetricsEnabled: true,
    MetricName: "IpSetRuleGroupMetric"
  }
});
```
