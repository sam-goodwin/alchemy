---
title: WebACL
description: Learn how to create, update, and manage AWS WAFv2 WebACLs using Alchemy Cloud Control.
---


The WebACL resource allows you to manage [AWS WAFv2 WebACLs](https://docs.aws.amazon.com/wafv2/latest/userguide/) for controlling access to your web applications and services.

## Minimal Example

Create a basic WebACL with a default action to allow all traffic.

```ts
import AWS from "alchemy/aws/control";

const basicWebAcl = await AWS.WAFv2.WebACL("basicWebAcl", {
  name: "basic-web-acl",
  scope: "REGIONAL",
  defaultAction: {
    allow: {}
  },
  visibilityConfig: {
    sampledRequestsEnabled: true,
    cloudWatchMetricsEnabled: true,
    metricName: "basicWebAclMetric"
  }
});
```

## Advanced Configuration

Configure a WebACL with rules to block specific IP addresses and log requests.

```ts
const advancedWebAcl = await AWS.WAFv2.WebACL("advancedWebAcl", {
  name: "advanced-web-acl",
  scope: "REGIONAL",
  defaultAction: {
    block: {}
  },
  rules: [
    {
      name: "BlockSpecificIP",
      priority: 1,
      statement: {
        ipSetReferenceStatement: {
          arn: "arn:aws:wafv2:us-east-1:123456789012:regional/ipset/blocked-ips"
        }
      },
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: "blockSpecificIPMetric"
      }
    }
  ],
  visibilityConfig: {
    sampledRequestsEnabled: true,
    cloudWatchMetricsEnabled: true,
    metricName: "advancedWebAclMetric"
  }
});
```

## Using CAPTCHA Configuration

Set up a WebACL that challenges users with CAPTCHA for certain requests.

```ts
const captchaWebAcl = await AWS.WAFv2.WebACL("captchaWebAcl", {
  name: "captcha-web-acl",
  scope: "REGIONAL",
  defaultAction: {
    allow: {}
  },
  rules: [
    {
      name: "ChallengeWithCaptcha",
      priority: 1,
      statement: {
        byteMatchStatement: {
          searchString: "malicious",
          fieldToMatch: {
            body: {}
          },
          positionalConstraint: "CONTAINS",
          textTransformations: [
            {
              priority: 0,
              type: "NONE"
            }
          ]
        }
      },
      action: {
        captcha: {
          challengeConfig: {
            failureAction: {
              block: {}
            },
            successAction: {
              allow: {}
            }
          }
        }
      },
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: "captchaChallengeMetric"
      }
    }
  ],
  visibilityConfig: {
    sampledRequestsEnabled: true,
    cloudWatchMetricsEnabled: true,
    metricName: "captchaWebAclMetric"
  }
});
```

## Token Domains for Custom Responses

Implement a WebACL that utilizes token domains for custom responses.

```ts
const tokenDomainWebAcl = await AWS.WAFv2.WebACL("tokenDomainWebAcl", {
  name: "token-domain-web-acl",
  scope: "REGIONAL",
  defaultAction: {
    allow: {}
  },
  tokenDomains: ["example.com", "another-example.com"],
  visibilityConfig: {
    sampledRequestsEnabled: true,
    cloudWatchMetricsEnabled: true,
    metricName: "tokenDomainWebAclMetric"
  }
});
``` 

This documentation provides a comprehensive guide on how to utilize AWS WAFv2 WebACLs effectively using Alchemy. For further details, please refer to the official AWS documentation linked above.
