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
 * Properties for creating a Stripe card
 */
export interface CardProps {
  /**
   * The ID of the customer to attach the card to
   */
  customer: string;

  /**
   * A token or source to attach to the customer
   */
  source?: string;

  /**
   * The card number, as a string without any separators
   */
  number?: string;

  /**
   * Two-digit number representing the card's expiration month
   */
  expMonth?: number;

  /**
   * Four-digit number representing the card's expiration year
   */
  expYear?: number;

  /**
   * Card security code
   */
  cvc?: string;

  /**
   * Cardholder's full name
   */
  name?: string;

  /**
   * City/District/Suburb/Town/Village
   */
  addressCity?: string;

  /**
   * Billing address country, if provided when creating card
   */
  addressCountry?: string;

  /**
   * Address line 1 (Street address/PO Box/Company name)
   */
  addressLine1?: string;

  /**
   * Address line 2 (Apartment/Suite/Unit/Building)
   */
  addressLine2?: string;

  /**
   * State/County/Province/Region
   */
  addressState?: string;

  /**
   * ZIP or postal code
   */
  addressZip?: string;

  /**
   * Required when adding a card to an account (not applicable to customers or recipients)
   */
  currency?: string;

  /**
   * Only applicable on accounts (not customers or recipients)
   */
  defaultForCurrency?: boolean;

  /**
   * Set of key-value pairs that you can attach to an object
   */
  metadata?: Record<string, string>;

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
 * Output from the Stripe card
 */
export interface Card extends Resource<"stripe::Card">, CardProps {
  /**
   * The ID of the card
   */
  id: string;

  /**
   * String representing the object's type
   */
  object: "card";

  /**
   * Card brand (Visa, American Express, MasterCard, Discover, JCB, Diners Club, or Unknown)
   */
  brand: string;

  /**
   * Two-letter ISO code representing the country of the card
   */
  country?: string;

  /**
   * The last four digits of the device account number
   */
  dynamicLast4?: string;

  /**
   * Uniquely identifies this particular card number
   */
  fingerprint?: string;

  /**
   * Card funding type (credit, debit, prepaid, or unknown)
   */
  funding: string;

  /**
   * The last four digits of the card
   */
  last4: string;

  /**
   * If the card number is tokenized, this is the method that was used
   */
  tokenizationMethod?: string;
}

/**
 * Create and manage Stripe cards attached to customers
 *
 * @example
 * // Create a card using raw card details
 * const customerCard = await Card("customer-card", {
 *   customer: "cus_xyz123",
 *   number: "4242424242424242",
 *   expMonth: 12,
 *   expYear: 2025,
 *   cvc: "123",
 *   name: "John Doe",
 *   addressLine1: "123 Main St",
 *   addressCity: "San Francisco",
 *   addressState: "CA",
 *   addressZip: "94105",
 *   addressCountry: "US"
 * });
 *
 * @example
 * // Create a card using a token
 * const tokenCard = await Card("token-card", {
 *   customer: "cus_xyz123",
 *   source: "tok_visa",
 *   metadata: {
 *     type: "primary",
 *     source: "mobile_app"
 *   }
 * });
 *
 * @example
 * // Create a card for international customer
 * const internationalCard = await Card("international-card", {
 *   customer: "cus_international456",
 *   number: "4000000000000002",
 *   expMonth: 6,
 *   expYear: 2026,
 *   name: "Maria Garcia",
 *   addressLine1: "Calle Principal 123",
 *   addressCity: "Madrid",
 *   addressCountry: "ES",
 *   addressZip: "28001",
 *   metadata: {
 *     region: "europe",
 *     currency_preference: "eur"
 *   }
 * });
 */
export const Card = Resource(
  "stripe::Card",
  async function (
    this: Context<Card>,
    _id: string,
    props: CardProps,
  ): Promise<Card> {
    const stripe = await createStripeClient({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.id && this.output?.customer) {
          await stripe.customers.deleteSource(
            this.output.customer,
            this.output.id,
          );
        }
      } catch (error) {
        handleStripeDeleteError(error, "Card", this.output?.id);
      }
      return this.destroy();
    }

    try {
      let card: Stripe.Card;

      if (this.phase === "update" && this.output?.id) {
        const updateParams = {
          name: props.name,
          address_city: props.addressCity,
          address_country: props.addressCountry,
          address_line1: props.addressLine1,
          address_line2: props.addressLine2,
          address_state: props.addressState,
          address_zip: props.addressZip,
          exp_month: props.expMonth?.toString(),
          exp_year: props.expYear?.toString(),
          metadata: props.metadata,
        };

        card = (await stripe.customers.updateSource(
          props.customer,
          this.output.id,
          updateParams,
        )) as Stripe.Card;
      } else {
        const createParams: any = {
          metadata: props.metadata,
        };

        if (props.source) {
          createParams.source = props.source;
        } else if (props.number) {
          createParams.source = {
            object: "card",
            number: props.number,
            exp_month: props.expMonth,
            exp_year: props.expYear,
            cvc: props.cvc,
            name: props.name,
            address_city: props.addressCity,
            address_country: props.addressCountry,
            address_line1: props.addressLine1,
            address_line2: props.addressLine2,
            address_state: props.addressState,
            address_zip: props.addressZip,
            currency: props.currency,
            default_for_currency: props.defaultForCurrency,
          };
        }

        try {
          card = (await stripe.customers.createSource(
            props.customer,
            createParams,
          )) as Stripe.Card;
        } catch (error) {
          if (isStripeConflictError(error) && props.adopt) {
            throw new Error(
              "Card adoption is not supported - cards cannot be uniquely identified for adoption",
            );
          } else {
            throw error;
          }
        }
      }

      return this({
        id: card.id,
        object: card.object,
        customer: props.customer,
        brand: card.brand,
        country: card.country || undefined,
        dynamicLast4: card.dynamic_last4 || undefined,
        expMonth: card.exp_month,
        expYear: card.exp_year,
        fingerprint: card.fingerprint || undefined,
        funding: card.funding,
        last4: card.last4,
        name: card.name || undefined,
        addressCity: card.address_city || undefined,
        addressCountry: card.address_country || undefined,
        addressLine1: card.address_line1 || undefined,
        addressLine2: card.address_line2 || undefined,
        addressState: card.address_state || undefined,
        addressZip: card.address_zip || undefined,
        currency: card.currency || undefined,
        defaultForCurrency: card.default_for_currency || undefined,
        metadata: card.metadata || undefined,
        tokenizationMethod: card.tokenization_method || undefined,
      });
    } catch (error) {
      logger.error("Error creating/updating card:", error);
      throw error;
    }
  },
);
