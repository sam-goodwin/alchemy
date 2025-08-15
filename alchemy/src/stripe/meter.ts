import type Stripe from "stripe";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { logger } from "../util/logger.ts";
import { createStripeClient, isStripeConflictError } from "./client.ts";

/**
 * Properties for creating or updating a Stripe Meter.
 * Note: Nested objects like defaultAggregation, customerMapping, valueSettings
 * use camelCase for keys here (e.g., eventPayloadKey), and the resource
 * implementation will map them to snake_case for Stripe API calls.
 */
export interface MeterProps {
  displayName: string;
  eventName: string;
  status?: "active" | "inactive"; // 'active' is default on create by Stripe
  defaultAggregation: {
    formula: Stripe.Billing.MeterCreateParams.DefaultAggregation.Formula;
  };
  customerMapping: {
    eventPayloadKey: string;
    type: Stripe.Billing.MeterCreateParams.CustomerMapping["type"];
  };
  valueSettings: {
    eventPayloadKey: string;
  };
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
 * Output returned after Stripe Meter creation/update.
 */
export interface Meter extends Resource<"stripe::Meter"> {
  id: string;
  object: "billing.meter";
  displayName: string;
  eventName: string;
  defaultAggregation: {
    formula: Stripe.Billing.Meter.DefaultAggregation["formula"];
  };
  customerMapping: {
    eventPayloadKey: string;
    type: Stripe.Billing.Meter.CustomerMapping["type"];
  };
  valueSettings: {
    eventPayloadKey: string;
  };
  status: "active" | "inactive";
  createdAt: number; // Unix timestamp
  updatedAt: number; // Unix timestamp
  livemode: boolean;
  statusTransitions?: {
    deactivatedAt: number | null; // Unix timestamp
  };
}

/**
 * Manages Stripe Billing Meters. Meters allow you to define how usage of a product
 * is measured and aggregated for billing purposes. You can track events and their
 * values, and Stripe will calculate the usage based on the meter's configuration.
 *
 * Stripe Meters have several properties that are immutable after creation:
 * `displayName`, `eventName`, `defaultAggregation`, `customerMapping`, and
 * `valueSettings`. Attempting to update these will result in an error.
 * The `status` of a meter (active/inactive) can be updated.
 *
 * @example
 * // Create a new active meter to track API calls, summing the 'count' field from events.
 * const apiCallMeter = await Meter("apiUsageMeter", {
 *  displayName: "API Call Usage",
 *  eventName: "api.call.recorded", // The event name Stripe will listen for
 *  defaultAggregation: {
 *    formula: "sum" // Sum up the values of events
 *  },
 *  customerMapping: {
 *    eventPayloadKey: "customer_id", // Field in the event payload that identifies the Stripe Customer
 *    type: "by_id"
 *  },
 *  valueSettings: {
 *    eventPayloadKey: "count" // Field in the event payload that represents the value to aggregate
 *  }
 *  // status defaults to 'active' if not specified
 * });
 *
 * @example
 * // Create a new meter for data storage, initially inactive.
 * // This meter will take the last reported 'gb_used' value within a billing period.
 * const dataStorageMeterInactive = await Meter("dataStorageMeter", {
 *  displayName: "Data Storage GB",
 *  eventName: "data.storage.reported",
 *  status: "inactive", // Explicitly set to inactive
 *  defaultAggregation: {
 *    formula: "last_during_period"
 *  },
 *  customerMapping: {
 *    eventPayloadKey: "user_stripe_id",
 *    type: "by_id"
 *  },
 *  valueSettings: {
 *    eventPayloadKey: "gb_used"
 *  }
 * });
 *
 * @example
 * // (Scenario: Assuming 'dataStorageMeterInactive' from the previous example was created
 * // and its ID is available, e.g., via `dataStorageMeterInactive.id`) *
 * // If dataStorageMeterInactive was previously defined and we want to activate it:
 * const activatedStorageMeter = await Meter("dataStorageMeter", { // Same logicalId
 *  displayName: "Data Storage GB", // Immutable, must match existing
 *  eventName: "data.storage.reported", // Immutable, must match existing
 *  status: "active", // Update: change status to active
 *  defaultAggregation: { // Immutable, must match existing
 *    formula: "last_during_period"
 *  },
 *  customerMapping: { // Immutable, must match existing
 *    eventPayloadKey: "user_stripe_id",
 *    type: "by_id"
 *  },
 *  valueSettings: { // Immutable, must match existing
 *    eventPayloadKey: "gb_used"
 *  }
 * });
 *
 * @example
 * // To deactivate an existing active meter (e.g. 'apiCallMeter' from first example):
 * const deactivatedApiMeter = await Meter("apiUsageMeter", { // Same logicalId
 *  displayName: "API Call Usage", // Immutable, must match existing
 *  eventName: "api.call.recorded", // Immutable, must match existing
 *  status: "inactive", // Update: change status to inactive
 *  defaultAggregation: { // Immutable, must match existing
 *    formula: "sum"
 *  },
 *  customerMapping: { // Immutable, must match existing
 *    eventPayloadKey: "customer_id",
 *    type: "by_id"
 *  },
 *  valueSettings: { // Immutable, must match existing
 *    eventPayloadKey: "count"
 *  }
 * });
 */

export const Meter = Resource(
  "stripe::Meter",
  async function (
    this: Context<Meter>,
    _logicalId: string,
    props: MeterProps,
  ): Promise<Meter> {
    const stripe = await createStripeClient({ apiKey: props.apiKey });

    const currentOutputId = this.output?.id;

    // Helper to map MeterProps (camelCase nested) to Stripe API params (snake_case nested)
    const mapPropsToStripeParams = (
      inputProps: MeterProps,
    ): Stripe.Billing.MeterCreateParams => ({
      display_name: inputProps.displayName,
      event_name: inputProps.eventName,
      default_aggregation: {
        formula: inputProps.defaultAggregation.formula,
      },
      customer_mapping: {
        event_payload_key: inputProps.customerMapping.eventPayloadKey,
        type: inputProps.customerMapping.type,
      },
      value_settings: {
        event_payload_key: inputProps.valueSettings.eventPayloadKey,
      },
    });

    // Helper to map Stripe API response (snake_case) to Meter output interface (camelCase)
    const mapStripeObjectToMeterOutput = (
      stripeMeter: Stripe.Billing.Meter,
    ): Omit<Meter, keyof Resource<"stripe::Meter">> => ({
      id: stripeMeter.id,
      object: stripeMeter.object,
      displayName: stripeMeter.display_name,
      eventName: stripeMeter.event_name,
      defaultAggregation: {
        formula: stripeMeter.default_aggregation.formula,
      },
      customerMapping: {
        eventPayloadKey: stripeMeter.customer_mapping.event_payload_key,
        type: stripeMeter.customer_mapping.type,
      },
      valueSettings: {
        eventPayloadKey: stripeMeter.value_settings.event_payload_key,
      },
      status: stripeMeter.status as "active" | "inactive",
      createdAt: stripeMeter.created,
      updatedAt: stripeMeter.updated,
      livemode: stripeMeter.livemode,
      statusTransitions: stripeMeter.status_transitions
        ? {
            deactivatedAt: stripeMeter.status_transitions.deactivated_at,
          }
        : undefined,
    });

    if (this.phase === "delete") {
      if (currentOutputId) {
        try {
          const meter = await stripe.billing.meters.retrieve(currentOutputId);
          if (meter.status === "active") {
            await stripe.billing.meters.deactivate(currentOutputId);
          }
        } catch (error: any) {
          if (error?.code !== "resource_missing") {
            throw error;
          }
        }
      }
      return this.destroy();
    }

    // --- Create or Update Phase ---
    let stripeAPIResponse: Stripe.Billing.Meter;

    if (this.phase === "update" && currentOutputId) {
      const existingStripeMeter =
        await stripe.billing.meters.retrieve(currentOutputId);

      // Normalize existingMeter's relevant fields for immutable comparison
      const existingPropsForCompare = {
        displayName: existingStripeMeter.display_name,
        eventName: existingStripeMeter.event_name,
        defaultAggregation: {
          formula: existingStripeMeter.default_aggregation.formula,
        },
        customerMapping: {
          eventPayloadKey:
            existingStripeMeter.customer_mapping.event_payload_key,
          type: existingStripeMeter.customer_mapping.type,
        },
        valueSettings: {
          eventPayloadKey: existingStripeMeter.value_settings.event_payload_key,
        },
      };

      // Check for immutable property changes (comparing against props passed to resource)
      if (
        props.displayName !== existingPropsForCompare.displayName ||
        props.eventName !== existingPropsForCompare.eventName ||
        JSON.stringify(props.defaultAggregation) !==
          JSON.stringify(existingPropsForCompare.defaultAggregation) ||
        JSON.stringify(props.customerMapping) !==
          JSON.stringify(existingPropsForCompare.customerMapping) ||
        JSON.stringify(props.valueSettings) !==
          JSON.stringify(existingPropsForCompare.valueSettings)
      ) {
        throw new Error(
          `Attempted to update immutable properties for Stripe Meter ${currentOutputId}. ` +
            "displayName, eventName, defaultAggregation, customerMapping, and valueSettings cannot be changed.",
        );
      }

      // Handle status change
      if (props.status && props.status !== existingStripeMeter.status) {
        if (
          props.status === "inactive" &&
          existingStripeMeter.status === "active"
        ) {
          stripeAPIResponse =
            await stripe.billing.meters.deactivate(currentOutputId);
        } else if (
          props.status === "active" &&
          existingStripeMeter.status === "inactive"
        ) {
          logger.log(`Reactivating Stripe Meter ${currentOutputId}.`);
          stripeAPIResponse =
            await stripe.billing.meters.reactivate(currentOutputId);
        } else {
          stripeAPIResponse = existingStripeMeter; // No change in status
        }
      } else {
        stripeAPIResponse = existingStripeMeter; // No status change requested
      }
    } else {
      // Create phase
      if (
        !props.displayName ||
        !props.eventName ||
        !props.defaultAggregation ||
        !props.customerMapping ||
        !props.valueSettings
      ) {
        throw new Error(
          "displayName, eventName, defaultAggregation, customerMapping, and valueSettings are required for creating a Stripe Meter.",
        );
      }

      const createParams = mapPropsToStripeParams(props);
      try {
        stripeAPIResponse = await stripe.billing.meters.create(createParams);
      } catch (error) {
        logger.warn("Error creating/updating meter:", error);
        if (isStripeConflictError(error) && props.adopt) {
          throw new Error(
            "Meter adoption is not supported - meters cannot be uniquely identified for adoption",
          );
        } else {
          throw error;
        }
      }

      // If status 'inactive' is requested during creation, and Stripe created it as 'active'
      if (
        props.status === "inactive" &&
        stripeAPIResponse.status === "active"
      ) {
        stripeAPIResponse = await stripe.billing.meters.deactivate(
          stripeAPIResponse.id,
        );
      } else if (props.status && props.status !== stripeAPIResponse.status) {
        logger.warn(
          `Meter ${stripeAPIResponse.id} created with status ${stripeAPIResponse.status} but requested ${props.status}. Ensure this is intended.`,
        );
      }
    }

    return this(mapStripeObjectToMeterOutput(stripeAPIResponse));
  },
);
