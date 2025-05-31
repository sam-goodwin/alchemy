---
title: Managing Stripe Portal Configurations with Alchemy
description: Learn how to create and manage Stripe Customer Portal Configurations using Alchemy.
---

# PortalConfiguration

The PortalConfiguration resource lets you create and manage [Stripe Customer Portal Configurations](https://stripe.com/docs/api/customer_portal/configuration) for customizing the customer portal experience.

## Minimal Example

Create a basic portal configuration:

```ts
import { PortalConfiguration } from "alchemy/stripe";

const basicPortal = await PortalConfiguration("basic-portal", {
  businessProfile: {
    headline: "Manage your subscription",
    privacyPolicyUrl: "https://example.com/privacy",
    termsOfServiceUrl: "https://example.com/terms"
  },
  features: {
    invoiceHistory: { enabled: true },
    paymentMethodUpdate: { enabled: true }
  }
});
```

## Subscription Management Portal

Create a portal with subscription management features:

```ts
import { PortalConfiguration } from "alchemy/stripe";

const subscriptionPortal = await PortalConfiguration("subscription-portal", {
  defaultReturnUrl: "https://example.com/account",
  features: {
    subscriptionCancel: {
      enabled: true,
      mode: "at_period_end",
      prorationBehavior: "none"
    },
    subscriptionUpdate: {
      enabled: true,
      defaultAllowedUpdates: ["price", "quantity"],
      prorationBehavior: "create_prorations"
    }
  }
});
```

## Comprehensive Portal

Create a full-featured portal configuration:

```ts
import { PortalConfiguration } from "alchemy/stripe";

const fullPortal = await PortalConfiguration("full-portal", {
  businessProfile: {
    headline: "Manage your Acme Corp subscription",
    privacyPolicyUrl: "https://acme.com/privacy",
    termsOfServiceUrl: "https://acme.com/terms"
  },
  defaultReturnUrl: "https://acme.com/dashboard",
  features: {
    customerUpdate: {
      enabled: true,
      allowedUpdates: ["email", "address", "shipping", "phone", "tax_id"]
    },
    invoiceHistory: { enabled: true },
    paymentMethodUpdate: { enabled: true },
    subscriptionCancel: {
      enabled: true,
      mode: "immediately",
      cancellationReason: {
        enabled: true,
        options: ["too_expensive", "missing_features", "switched_service"]
      }
    }
  }
});
```
