---
title: VpcOrigin
description: Learn how to create, update, and manage AWS CloudFront VpcOrigins using Alchemy Cloud Control.
---


The VpcOrigin resource allows you to manage [AWS CloudFront VpcOrigins](https://docs.aws.amazon.com/cloudfront/latest/userguide/) for serving content from Amazon VPC endpoints.

## Minimal Example

Create a basic VpcOrigin with the required properties and a common optional tag.

```ts
import AWS from "alchemy/aws/control";

const vpcOrigin = await AWS.CloudFront.VpcOrigin("myVpcOrigin", {
  VpcOriginEndpointConfig: {
    endpoint: "my-vpc-endpoint.amazonaws.com",
    originPath: "/path/to/content",
    customOriginConfig: {
      httpPort: 80,
      httpsPort: 443,
      originProtocolPolicy: "https-only"
    }
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Customize the VpcOrigin with additional settings for performance and security.

```ts
const advancedVpcOrigin = await AWS.CloudFront.VpcOrigin("advancedVpcOrigin", {
  VpcOriginEndpointConfig: {
    endpoint: "secure-vpc-endpoint.amazonaws.com",
    originPath: "/secure-content",
    customOriginConfig: {
      httpPort: 80,
      httpsPort: 443,
      originProtocolPolicy: "match-viewer",
      originSslProtocols: {
        items: ["TLSv1.2"],
        quantity: 1
      }
    }
  },
  Tags: [
    {
      Key: "Project",
      Value: "MyProject"
    }
  ],
  adopt: true
});
```

## Secured Access with IAM Policies

Define IAM policies to control access to your VpcOrigin.

```ts
const vpcOriginWithPolicy = await AWS.CloudFront.VpcOrigin("securedVpcOrigin", {
  VpcOriginEndpointConfig: {
    endpoint: "protected-vpc-endpoint.amazonaws.com",
    originPath: "/protected-content",
    customOriginConfig: {
      httpPort: 80,
      httpsPort: 443,
      originProtocolPolicy: "https-only"
    }
  },
  Tags: [
    {
      Key: "Access",
      Value: "Restricted"
    }
  ],
  adopt: false
});

// Example IAM Policy
const iamPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: "cloudfront:GetDistribution",
      Resource: "*"
    }
  ]
};
```

## Handling Multiple Origins

Set up multiple VpcOrigins for different content sources.

```ts
const primaryVpcOrigin = await AWS.CloudFront.VpcOrigin("primaryVpcOrigin", {
  VpcOriginEndpointConfig: {
    endpoint: "primary-vpc-endpoint.amazonaws.com",
    originPath: "/primary-content"
  }
});

const secondaryVpcOrigin = await AWS.CloudFront.VpcOrigin("secondaryVpcOrigin", {
  VpcOriginEndpointConfig: {
    endpoint: "secondary-vpc-endpoint.amazonaws.com",
    originPath: "/secondary-content"
  }
});
```
