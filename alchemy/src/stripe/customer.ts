import type Stripe from "stripe";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { logger } from "../util/logger.ts";
import { createStripeClient, handleStripeDeleteError } from "./client.ts";

/**
 * Customer address information
 */
export interface CustomerAddress {
  /**
   * City, district, suburb, town, or village
   */
  city?: string;
  /**
   * Two-letter country code (ISO 3166-1 alpha-2)
   */
  country?: string;
  /**
   * Address line 1 (e.g., street, PO Box, or company name)
   */
  line1?: string;
  /**
   * Address line 2 (e.g., apartment, suite, unit, or building)
   */
  line2?: string;
  /**
   * ZIP or postal code
   */
  postalCode?: string;
  /**
   * State, county, province, or region
   */
  state?: string;
}

/**
 * Customer shipping information
 */
export interface CustomerShipping {
  /**
   * Customer's shipping address
   */
  address?: CustomerAddress;
  /**
   * Customer name
   */
  name?: string;
  /**
   * Customer phone number
   */
  phone?: string;
}

/**
 * Customer invoice settings
 */
export interface CustomerInvoiceSettings {
  /**
   * Default custom fields to be displayed on invoices for this customer
   */
  customFields?: Array<{
    name: string;
    value: string;
  }>;
  /**
   * ID of a payment method that's attached to the customer, to be used as the customer's default payment method for subscriptions and invoices
   */
  defaultPaymentMethod?: string;
  /**
   * Default footer to be displayed on invoices for this customer
   */
  footer?: string;
  /**
   * Default options for invoice PDF rendering for this customer
   */
  renderingOptions?: {
    amountTaxDisplay?: Stripe.CustomerCreateParams.InvoiceSettings.RenderingOptions.AmountTaxDisplay;
  };
}

/**
 * Properties for creating a Stripe customer
 */
export interface CustomerProps {
  /**
   * The customer's address
   */
  address?: CustomerAddress;
  /**
   * An integer amount in cents that represents the customer's current balance
   */
  balance?: number;
  /**
   * An arbitrary string attached to the object
   */
  description?: string;
  /**
   * Customer's email address
   */
  email?: string;
  /**
   * The prefix for the customer used to generate unique invoice numbers
   */
  invoicePrefix?: string;
  /**
   * Default invoice settings for this customer
   */
  invoiceSettings?: CustomerInvoiceSettings;
  /**
   * Set of key-value pairs that you can attach to an object
   */
  metadata?: Record<string, string>;
  /**
   * The customer's full name or business name
   */
  name?: string;
  /**
   * The sequence to be used on the customer's next invoice
   */
  nextInvoiceSequence?: number;
  /**
   * The ID of the PaymentMethod to attach to the customer
   */
  paymentMethod?: string;
  /**
   * The customer's phone number
   */
  phone?: string;
  /**
   * Customer's preferred languages, ordered by preference
   */
  preferredLocales?: string[];
  /**
   * The customer's shipping information
   */
  shipping?: CustomerShipping;
  /**
   * When using a card as a source, you can pass the card information
   */
  source?: string;
  /**
   * The customer's tax exemption status
   */
  taxExempt?: Stripe.CustomerCreateParams.TaxExempt;
  /**
   * ID of the test clock to attach to the customer
   */
  testClock?: string;

  /**
   * API key to use (overrides environment variable)
   */
  apiKey?: Secret;

  /**
   * If true, adopt existing resource if creation fails due to conflict
   */
  adopt?: boolean;
}

/**
 * Output from the Stripe customer
 */
export interface Customer extends Resource<"stripe::Customer">, CustomerProps {
  /**
   * The ID of the customer
   */
  id: string;
  /**
   * String representing the object's type
   */
  object: "customer";
  /**
   * Time at which the object was created
   */
  created: number;
  /**
   * Three-letter ISO code for the currency the customer can be charged in for recurring billing purposes
   */
  currency?: string;
  /**
   * ID of the default payment source for the customer
   */
  defaultSource?: string;
  /**
   * Whether or not the customer is currently delinquent
   */
  delinquent?: boolean;
  /**
   * Describes the current discount active on the customer, if there is one
   */
  discount?: any;
  /**
   * Has the value true if the object exists in live mode or the value false if the object exists in test mode
   */
  livemode: boolean;
  /**
   * The customer's payment sources, if any
   */
  sources?: any;
  /**
   * The customer's current subscriptions, if any
   */
  subscriptions?: any;
  /**
   * The customer's tax IDs, if any
   */
  taxIds?: any;
}

/**
 * Create and manage Stripe customers
 *
 * @example
 * // Create a basic customer
 * const basicCustomer = await Customer("basic-customer", {
 *   email: "john@example.com",
 *   name: "John Doe",
 *   description: "Premium customer",
 *   metadata: {
 *     tier: "premium",
 *     source: "website"
 *   }
 * });
 *
 * @example
 * // Create a customer with full address information
 * const customerWithAddress = await Customer("customer-with-address", {
 *   email: "jane@example.com",
 *   name: "Jane Smith",
 *   phone: "+1-555-123-4567",
 *   address: {
 *     line1: "123 Main St",
 *     line2: "Apt 4B",
 *     city: "San Francisco",
 *     state: "CA",
 *     postalCode: "94105",
 *     country: "US"
 *   },
 *   shipping: {
 *     name: "Jane Smith",
 *     address: {
 *       line1: "456 Oak Ave",
 *       city: "Oakland",
 *       state: "CA",
 *       postalCode: "94612",
 *       country: "US"
 *     }
 *   }
 * });
 *
 * @example
 * // Create a business customer with tax exemption
 * const businessCustomer = await Customer("business-customer", {
 *   email: "billing@acmecorp.com",
 *   name: "Acme Corporation",
 *   description: "Enterprise customer",
 *   taxExempt: "exempt",
 *   invoicePrefix: "ACME",
 *   preferredLocales: ["en"],
 *   metadata: {
 *     type: "business",
 *     industry: "technology",
 *     employees: "500+"
 *   }
 * });
 */
export const Customer = Resource(
  "stripe::Customer",
  async function (
    this: Context<Customer>,
    _id: string,
    props: CustomerProps,
  ): Promise<Customer> {
    const stripe = await createStripeClient({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          await stripe.customers.del(this.output.id);
        }
      } catch (error) {
        handleStripeDeleteError(error, "Customer", this.output?.id);
      }
      return this.destroy();
    }

    try {
      let customer: Stripe.Customer;

      if (this.phase === "update" && this.output?.id) {
        const updateParams: Stripe.CustomerUpdateParams = {
          address: props.address
            ? {
                city: props.address.city,
                country: props.address.country,
                line1: props.address.line1,
                line2: props.address.line2,
                postal_code: props.address.postalCode,
                state: props.address.state,
              }
            : undefined,
          balance: props.balance,
          description: props.description,
          email: props.email,
          invoice_prefix: props.invoicePrefix,
          metadata: props.metadata,
          name: props.name,
          next_invoice_sequence: props.nextInvoiceSequence,
          phone: props.phone,
          preferred_locales: props.preferredLocales,
          shipping: props.shipping as any,
          source: props.source,
          tax_exempt: props.taxExempt,
        };

        if (props.invoiceSettings) {
          updateParams.invoice_settings = {
            custom_fields: props.invoiceSettings.customFields,
            default_payment_method: props.invoiceSettings.defaultPaymentMethod,
            footer: props.invoiceSettings.footer,
            rendering_options: props.invoiceSettings.renderingOptions
              ? {
                  amount_tax_display:
                    props.invoiceSettings.renderingOptions.amountTaxDisplay,
                }
              : null,
          };
        }

        customer = await stripe.customers.update(this.output.id, updateParams);
      } else {
        const createParams: Stripe.CustomerCreateParams = {
          address: props.address
            ? {
                city: props.address.city,
                country: props.address.country,
                line1: props.address.line1,
                line2: props.address.line2,
                postal_code: props.address.postalCode,
                state: props.address.state,
              }
            : undefined,
          balance: props.balance,
          description: props.description,
          email: props.email,
          invoice_prefix: props.invoicePrefix,
          metadata: props.metadata,
          name: props.name,
          next_invoice_sequence: props.nextInvoiceSequence,
          payment_method: props.paymentMethod,
          phone: props.phone,
          preferred_locales: props.preferredLocales,
          shipping: props.shipping as any,
          source: props.source,
          tax_exempt: props.taxExempt,
          test_clock: props.testClock,
        };

        if (props.invoiceSettings) {
          createParams.invoice_settings = {
            custom_fields: props.invoiceSettings.customFields,
            default_payment_method: props.invoiceSettings.defaultPaymentMethod,
            footer: props.invoiceSettings.footer,
            rendering_options: props.invoiceSettings.renderingOptions
              ? {
                  amount_tax_display:
                    props.invoiceSettings.renderingOptions.amountTaxDisplay,
                }
              : null,
          };
        }

        if ((props.adopt ?? this.scope.adopt) && props.email) {
          const existingCustomers = await stripe.customers.list({
            email: props.email,
            limit: 1,
          });
          if (existingCustomers.data.length > 0) {
            const existingCustomer = existingCustomers.data[0];
            const adoptUpdateParams: Stripe.CustomerUpdateParams = {
              address: props.address
                ? {
                    city: props.address.city,
                    country: props.address.country,
                    line1: props.address.line1,
                    line2: props.address.line2,
                    postal_code: props.address.postalCode,
                    state: props.address.state,
                  }
                : undefined,
              balance: props.balance,
              description: props.description,
              email: props.email,
              invoice_prefix: props.invoicePrefix,
              metadata: props.metadata,
              name: props.name,
              next_invoice_sequence: props.nextInvoiceSequence,
              phone: props.phone,
              preferred_locales: props.preferredLocales,
              shipping: props.shipping as any,
              source: props.source,
              tax_exempt: props.taxExempt,
            };

            if (props.invoiceSettings) {
              adoptUpdateParams.invoice_settings = {
                custom_fields: props.invoiceSettings.customFields,
                default_payment_method:
                  props.invoiceSettings.defaultPaymentMethod,
                footer: props.invoiceSettings.footer,
                rendering_options: props.invoiceSettings.renderingOptions
                  ? {
                      amount_tax_display:
                        props.invoiceSettings.renderingOptions.amountTaxDisplay,
                    }
                  : null,
              };
            }

            customer = await stripe.customers.update(
              existingCustomer.id,
              adoptUpdateParams,
            );
          } else {
            customer = await stripe.customers.create(createParams);
          }
        } else {
          customer = await stripe.customers.create(createParams);
        }
      }

      return this({
        id: customer.id,
        object: customer.object,
        address: customer.address
          ? {
              city: customer.address.city || undefined,
              country: customer.address.country || undefined,
              line1: customer.address.line1 || undefined,
              line2: customer.address.line2 || undefined,
              postalCode: customer.address.postal_code || undefined,
              state: customer.address.state || undefined,
            }
          : undefined,
        balance: customer.balance || undefined,
        created: customer.created,
        currency: customer.currency || undefined,
        defaultSource:
          typeof customer.default_source === "string"
            ? customer.default_source
            : undefined,
        delinquent: customer.delinquent || undefined,
        description: customer.description || undefined,
        discount: customer.discount || undefined,
        email: customer.email || undefined,
        invoicePrefix: customer.invoice_prefix || undefined,
        invoiceSettings: customer.invoice_settings
          ? {
              customFields:
                customer.invoice_settings.custom_fields?.map((field) => ({
                  name: field.name,
                  value: field.value,
                })) || undefined,
              defaultPaymentMethod:
                typeof customer.invoice_settings.default_payment_method ===
                "string"
                  ? customer.invoice_settings.default_payment_method
                  : customer.invoice_settings.default_payment_method?.id ||
                    undefined,
              footer: customer.invoice_settings.footer || undefined,
              renderingOptions: customer.invoice_settings.rendering_options
                ? {
                    amountTaxDisplay: customer.invoice_settings
                      .rendering_options.amount_tax_display as any,
                  }
                : undefined,
            }
          : undefined,
        livemode: customer.livemode,
        metadata: customer.metadata || undefined,
        name: customer.name || undefined,
        nextInvoiceSequence: customer.next_invoice_sequence || undefined,
        phone: customer.phone || undefined,
        preferredLocales: customer.preferred_locales || undefined,
        shipping: customer.shipping
          ? {
              address: customer.shipping.address
                ? {
                    city: customer.shipping.address.city || undefined,
                    country: customer.shipping.address.country || undefined,
                    line1: customer.shipping.address.line1 || undefined,
                    line2: customer.shipping.address.line2 || undefined,
                    postalCode:
                      customer.shipping.address.postal_code || undefined,
                    state: customer.shipping.address.state || undefined,
                  }
                : undefined,
              name: customer.shipping.name || undefined,
              phone: customer.shipping.phone || undefined,
            }
          : undefined,
        sources: customer.sources || undefined,
        subscriptions: customer.subscriptions || undefined,
        taxExempt: customer.tax_exempt || undefined,
        taxIds: customer.tax_ids || undefined,
      });
    } catch (error) {
      logger.error("Error creating/updating customer:", error);
      throw error;
    }
  },
);
