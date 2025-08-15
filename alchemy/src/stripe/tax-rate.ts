import type Stripe from "stripe";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { logger } from "../util/logger.ts";
import {
  createStripeClient,
  handleStripeDeleteError,
  isStripeConflictError,
} from "./client.ts";

/**
 * Properties for creating a Stripe tax rate
 */
export interface TaxRateProps {
  /**
   * The display name of the tax rate, which will be shown to users
   */
  displayName: string;
  /**
   * This represents the tax rate percent out of 100
   */
  percentage: number;
  /**
   * This specifies if the tax rate is inclusive or exclusive
   */
  inclusive: boolean;
  /**
   * Flag determining whether the tax rate is active or inactive
   */
  active?: boolean;
  /**
   * Two-letter country code (ISO 3166-1 alpha-2)
   */
  country?: string;
  /**
   * An arbitrary string attached to the tax rate for your internal use only
   */
  description?: string;
  /**
   * The jurisdiction for the tax rate
   */
  jurisdiction?: string;
  /**
   * Set of key-value pairs that you can attach to an object
   */
  metadata?: Record<string, string>;
  /**
   * ISO 3166-2 subdivision code, without country prefix
   */
  state?: string;
  /**
   * The high-level tax type, such as vat or sales_tax
   */
  taxType?: Stripe.TaxRateCreateParams.TaxType;
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
 * Output from the Stripe tax rate
 */
export interface TaxRate extends Resource<"stripe::TaxRate">, TaxRateProps {
  /**
   * The ID of the tax rate
   */
  id: string;
  /**
   * String representing the object's type
   */
  object: "tax_rate";
  /**
   * Time at which the object was created
   */
  created: number;
  /**
   * Has the value true if the object exists in live mode or the value false if the object exists in test mode
   */
  livemode: boolean;
}

/**
 * Create and manage Stripe tax rates
 *
 * @example
 * // Create a basic sales tax rate
 * const salesTax = await TaxRate("ca-sales-tax", {
 *   displayName: "CA Sales Tax",
 *   percentage: 8.5,
 *   inclusive: false,
 *   active: true,
 *   country: "US",
 *   state: "CA",
 *   description: "California sales tax",
 *   taxType: "sales_tax"
 * });
 *
 * @example
 * // Create a VAT tax rate
 * const vatTax = await TaxRate("uk-vat", {
 *   displayName: "UK VAT",
 *   percentage: 20.0,
 *   inclusive: true,
 *   active: true,
 *   country: "GB",
 *   description: "United Kingdom Value Added Tax",
 *   taxType: "vat",
 *   metadata: {
 *     region: "europe",
 *     tax_authority: "hmrc"
 *   }
 * });
 *
 * @example
 * // Create a city tax rate
 * const cityTax = await TaxRate("nyc-tax", {
 *   displayName: "NYC Local Tax",
 *   percentage: 4.5,
 *   inclusive: false,
 *   active: true,
 *   country: "US",
 *   state: "NY",
 *   jurisdiction: "New York City",
 *   description: "New York City local sales tax",
 *   taxType: "sales_tax",
 *   metadata: {
 *     locality: "nyc",
 *     tax_level: "city"
 *   }
 * });
 */
export const TaxRate = Resource(
  "stripe::TaxRate",
  async function (
    this: Context<TaxRate>,
    _id: string,
    props: TaxRateProps,
  ): Promise<TaxRate> {
    const stripe = await createStripeClient({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          await stripe.taxRates.update(this.output.id, { active: false });
        }
      } catch (error) {
        handleStripeDeleteError(error, "TaxRate", this.output?.id);
      }
      return this.destroy();
    }

    try {
      let taxRate: Stripe.TaxRate;

      if (this.phase === "update" && this.output?.id) {
        taxRate = await stripe.taxRates.update(this.output.id, {
          active: props.active,
          country: props.country,
          description: props.description,
          display_name: props.displayName,
          jurisdiction: props.jurisdiction,
          metadata: props.metadata,
          state: props.state,
          tax_type: props.taxType,
        });
      } else {
        try {
          taxRate = await stripe.taxRates.create({
            display_name: props.displayName,
            percentage: props.percentage,
            inclusive: props.inclusive,
            active: props.active,
            country: props.country,
            description: props.description,
            jurisdiction: props.jurisdiction,
            metadata: props.metadata,
            state: props.state,
            tax_type: props.taxType,
          });
        } catch (error) {
          if (isStripeConflictError(error) && props.adopt) {
            throw new Error(
              "TaxRate adoption is not supported - tax rates cannot be uniquely identified for adoption",
            );
          } else {
            throw error;
          }
        }
      }

      return this({
        id: taxRate.id,
        object: taxRate.object,
        displayName: taxRate.display_name,
        percentage: taxRate.percentage,
        inclusive: taxRate.inclusive,
        active: taxRate.active,
        country: taxRate.country || undefined,
        description: taxRate.description || undefined,
        jurisdiction: taxRate.jurisdiction || undefined,
        metadata: taxRate.metadata || undefined,
        state: taxRate.state || undefined,
        taxType: taxRate.tax_type || undefined,
        created: taxRate.created,
        livemode: taxRate.livemode,
      });
    } catch (error) {
      logger.error("Error creating/updating tax rate:", error);
      throw error;
    }
  },
);
