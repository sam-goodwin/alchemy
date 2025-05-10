import Stripe from "stripe";
import type { Context } from "../context.js";
import { Resource } from "../resource.js";

/**
 * Properties for creating or updating a Stripe Payment Link
 */
export interface PaymentLinkProps {
  /**
   * The line items representing what is being sold
   */
  lineItems: Array<{
    /**
     * The ID of the Price object
     */
    price: string;

    /**
     * The quantity of the line item
     */
    quantity: number;
  }>;

  /**
   * Whether the payment link's URL is active
   */
  active?: boolean;

  /**
   * Set of key-value pairs that you can attach to an object
   */
  metadata?: Record<string, string>;

  /**
   * Configuration for after completion behavior
   */
  afterCompletion?: {
    /**
     * The type of completion behavior
     */
    type: "redirect" | "hosted_confirmation";

    /**
     * The URL for redirect after completion
     */
    redirect?: {
      url: string;
    };

    /**
     * Configuration for hosted confirmation page
     */
    hostedConfirmation?: {
      customMessage?: string;
    };
  };

  /**
   * Whether to allow promotion codes to be used with the payment link
   */
  allowPromotionCodes?: boolean;

  /**
   * Configuration for automatic tax calculation
   */
  automaticTax?: {
    /**
     * Whether to automatically calculate tax
     */
    enabled: boolean;
  };

  /**
   * Which address fields to collect
   */
  billingAddressCollection?: "auto" | "required";

  /**
   * The currency for the payment link
   */
  currency?: string;

  /**
   * Custom fields to collect from the customer
   */
  customFields?: Array<{
    key: string;
    label: {
      type: "custom" | "standard";
      custom?: string;
    };
    type: "text" | "numeric" | "dropdown" | "checkbox";
    optional?: boolean;
  }>;

  /**
   * Custom message to display to the customer when the link is inactive
   */
  inactiveMessage?: string;

  /**
   * Controls when customers are redirected to the payment method collection form
   */
  paymentMethodCollection?: "always" | "if_required";

  /**
   * The list of payment method types that customers can use
   */
  paymentMethodTypes?: Array<string>;

  /**
   * Configuration for phone number collection
   */
  phoneNumberCollection?: {
    enabled: boolean;
  };

  /**
   * The shipping rate or delivery method to apply to the payment link
   */
  shippingOptions?: Array<{
    shippingRate?: string;
  }>;

  /**
   * Indicates the type of action to be performed when the customer submits the payment form
   */
  submitType?: "auto" | "book" | "donate" | "pay";

  /**
   * Configuration for tax ID collection
   */
  taxIdCollection?: {
    enabled: boolean;
  };
}

/**
 * Output returned after PaymentLink creation/update
 */
export interface PaymentLink
  extends Resource<"stripe::PaymentLink">,
    PaymentLinkProps {
  /**
   * The ID of the payment link
   */
  id: string;

  /**
   * The public URL that can be shared with customers
   */
  url: string;

  /**
   * Has the value true if the object exists in live mode or false if in test mode
   */
  livemode: boolean;
}

/**
 * Create and manage Stripe payment links
 *
 * @example
 * // Create a simple one-time payment link
 * const basicLink = await PaymentLink("basic-product-link", {
 *   lineItems: [{
 *     price: "price_1234",
 *     quantity: 1
 *   }],
 *   metadata: {
 *     source: "website",
 *     campaign: "spring_sale"
 *   }
 * });
 *
 * @example
 * // Create a payment link with custom after-completion behavior
 * const redirectLink = await PaymentLink("redirect-payment", {
 *   lineItems: [{
 *     price: "price_5678",
 *     quantity: 2
 *   }],
 *   afterCompletion: {
 *     type: "redirect",
 *     redirect: {
 *       url: "https://example.com/thank-you"
 *     }
 *   },
 *   submitType: "pay"
 * });
 *
 * @example
 * // Create a payment link with multiple line items and automatic tax
 * const multiItemLink = await PaymentLink("multi-product-link", {
 *   lineItems: [
 *     { price: "price_1111", quantity: 1 },
 *     { price: "price_2222", quantity: 3 }
 *   ],
 *   automaticTax: {
 *     enabled: true
 *   },
 *   billingAddressCollection: "required",
 *   allowPromotionCodes: true
 * });
 */
export const PaymentLink = Resource(
  "stripe::PaymentLink",
  async function (
    this: Context<PaymentLink>,
    id: string,
    props: PaymentLinkProps
  ): Promise<PaymentLink> {
    // Get Stripe API key from environment
    const apiKey = process.env.STRIPE_API_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_API_KEY environment variable is required");
    }

    // Initialize Stripe client
    const stripe = new Stripe(apiKey);

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          // Deactivate payment link instead of deleting (Stripe doesn't allow deletion)
          await stripe.paymentLinks.update(this.output.id, { active: false });
        }
      } catch (error) {
        console.error("Error deactivating payment link:", error);
      }

      // Return destroyed state
      return this.destroy();
    } else {
      try {
        let paymentLink: Stripe.PaymentLink;

        // Map line items to the format expected by Stripe API
        const lineItems = props.lineItems.map((item) => ({
          price: item.price,
          quantity: item.quantity,
        }));

        // Create common parameters for both create and update operations
        const params: any = {
          active: props.active,
          metadata: props.metadata,
          allow_promotion_codes: props.allowPromotionCodes,
          billing_address_collection: props.billingAddressCollection,
          phone_number_collection: props.phoneNumberCollection,
          submit_type: props.submitType,
        };

        // Add after_completion if provided
        if (props.afterCompletion) {
          params.after_completion = {
            type: props.afterCompletion.type,
          };

          if (props.afterCompletion.redirect) {
            params.after_completion.redirect = {
              url: props.afterCompletion.redirect.url,
            };
          }

          if (props.afterCompletion.hostedConfirmation) {
            params.after_completion.hosted_confirmation = {
              custom_message:
                props.afterCompletion.hostedConfirmation.customMessage,
            };
          }
        }

        // Add automatic_tax if provided
        if (props.automaticTax) {
          params.automatic_tax = {
            enabled: props.automaticTax.enabled,
          };
        }

        // Add payment_method_types if provided
        if (props.paymentMethodTypes && props.paymentMethodTypes.length > 0) {
          params.payment_method_types = props.paymentMethodTypes;
        }

        // Add custom_fields if provided
        if (props.customFields && props.customFields.length > 0) {
          params.custom_fields = props.customFields;
        }

        // Add shipping_options if provided
        if (props.shippingOptions && props.shippingOptions.length > 0) {
          params.shipping_options = props.shippingOptions;
        }

        // Add tax_id_collection if provided
        if (props.taxIdCollection) {
          params.tax_id_collection = props.taxIdCollection;
        }

        // Add inactive_message if provided
        if (props.inactiveMessage) {
          params.inactive_message = props.inactiveMessage;
        }

        if (this.phase === "update" && this.output?.id) {
          // Update existing payment link
          paymentLink = await stripe.paymentLinks.update(
            this.output.id,
            params
          );
        } else {
          // Create new payment link - line_items is required for creation
          paymentLink = await stripe.paymentLinks.create({
            ...params,
            line_items: lineItems,
          });
        }

        // Map response from Stripe API to our interface
        return this({
          id: paymentLink.id,
          url: paymentLink.url,
          active: paymentLink.active,
          lineItems: props.lineItems, // Use the input lineItems since the response structure differs
          metadata: paymentLink.metadata || undefined,
          allowPromotionCodes: paymentLink.allow_promotion_codes,
          billingAddressCollection: paymentLink.billing_address_collection as
            | "auto"
            | "required"
            | undefined,
          submitType: paymentLink.submit_type as
            | "auto"
            | "book"
            | "donate"
            | "pay"
            | undefined,
          livemode: paymentLink.livemode,

          // Map optional properties
          afterCompletion: paymentLink.after_completion
            ? {
                type: paymentLink.after_completion.type as
                  | "redirect"
                  | "hosted_confirmation",
                redirect: paymentLink.after_completion.redirect
                  ? {
                      url: paymentLink.after_completion.redirect.url,
                    }
                  : undefined,
                hostedConfirmation: paymentLink.after_completion
                  .hosted_confirmation
                  ? {
                      customMessage:
                        paymentLink.after_completion.hosted_confirmation
                          .custom_message || undefined,
                    }
                  : undefined,
              }
            : undefined,

          automaticTax: paymentLink.automatic_tax
            ? {
                enabled: paymentLink.automatic_tax.enabled,
              }
            : undefined,

          phoneNumberCollection: paymentLink.phone_number_collection
            ? {
                enabled: paymentLink.phone_number_collection.enabled,
              }
            : undefined,

          paymentMethodCollection: paymentLink.payment_method_collection as
            | "always"
            | "if_required"
            | undefined,
          paymentMethodTypes: paymentLink.payment_method_types as
            | string[]
            | undefined,
          inactiveMessage: paymentLink.inactive_message || undefined,

          taxIdCollection: paymentLink.tax_id_collection
            ? {
                enabled: paymentLink.tax_id_collection.enabled,
              }
            : undefined,

          currency: paymentLink.currency || undefined,
        });
      } catch (error) {
        console.error("Error creating/updating payment link:", error);
        throw error;
      }
    }
  }
);
