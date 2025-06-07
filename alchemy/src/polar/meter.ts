import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import {
  createPolarClient,
  handlePolarDeleteError,
  isPolarConflictError,
} from "./client.ts";

/**
 * Individual filter clause for meter event filtering.
 *
 * @see https://docs.polar.sh/api-reference/meters#meter-filters
 */
export interface MeterFilterClause {
  /** Property name to filter on */
  property: string;
  /** Comparison operator */
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte";
  /** Value to compare against */
  value: string;
}

/**
 * Filter configuration for specifying which events to track in a meter.
 *
 * Filters use a conjunction (AND/OR) with multiple clauses to determine
 * which events should be included in the meter calculations.
 *
 * @see https://docs.polar.sh/api-reference/meters#meter-filters
 */
export interface MeterFilter {
  /** Logical conjunction between clauses */
  conjunction: "and" | "or";
  /** Array of filter clauses */
  clauses: Array<MeterFilterClause>;
}

/**
 * Aggregation configuration for calculating meter values.
 *
 * Determines how the filtered events should be aggregated into
 * a single meter value.
 *
 * @see https://docs.polar.sh/api-reference/meters#meter-aggregation
 */
export interface MeterAggregation {
  /** Aggregation method */
  type: "count" | "sum" | "avg" | "max" | "min";
  /** Property to aggregate (required for sum, avg, max, min) */
  property?: string;
}

/**
 * Properties for creating or updating a Polar Meter.
 */
export interface MeterProps {
  /** Meter name (required) */
  name: string;
  /** Filter configuration to specify which events to track */
  filter?: MeterFilter;
  /** Aggregation method for calculating meter values */
  aggregation?: MeterAggregation;
  /** Key-value pairs for storing additional information */
  metadata?: Record<string, string>;
  /** Polar API key (overrides environment variable) */
  apiKey?: Secret;
  /** If true, adopt existing resource if creation fails due to conflict */
  adopt?: boolean;
}

/**
 * Manages Polar Meters for tracking usage events with filtering and aggregation.
 *
 * Meters allow you to track and aggregate usage data from events in your Polar organization.
 * You can configure filters to specify which events to track and aggregation methods
 * to determine how the data should be calculated.
 *
 * @example
 * // Create a simple count meter
 * const apiCallMeter = await Meter("api-calls", {
 *   name: "API Calls",
 *   aggregation: { type: "count" }
 * });
 *
 * @example
 * // Create a meter with filtering and sum aggregation
 * const premiumUsageMeter = await Meter("premium-usage", {
 *   name: "Premium Feature Usage",
 *   filter: {
 *     conjunction: "and",
 *     clauses: [
 *       { property: "plan", operator: "eq", value: "premium" },
 *       { property: "feature", operator: "eq", value: "advanced_analytics" }
 *     ]
 *   },
 *   aggregation: { type: "sum", property: "usage_count" }
 * });
 *
 * @example
 * // Create a meter for tracking data usage with average aggregation
 * const dataUsageMeter = await Meter("data-usage", {
 *   name: "Data Usage Tracking",
 *   filter: {
 *     conjunction: "or",
 *     clauses: [
 *       { property: "event_type", operator: "eq", value: "data_upload" },
 *       { property: "event_type", operator: "eq", value: "data_download" }
 *     ]
 *   },
 *   aggregation: { type: "avg", property: "bytes_transferred" }
 * });
 *
 * @see https://docs.polar.sh/api-reference/meters
 */
export interface Meter extends Resource<"polar::Meter">, MeterProps {
  id: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  filter?: MeterFilter;
  aggregation?: MeterAggregation;
}

export const Meter = Resource(
  "polar::Meter",
  async function (
    this: Context<Meter>,
    _logicalId: string,
    props: MeterProps,
  ): Promise<Meter> {
    const client = createPolarClient({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          await client.delete(`/meters/${this.output.id}`);
        }
      } catch (error) {
        handlePolarDeleteError(error, "Meter", this.output?.id);
      }
      return this.destroy();
    }

    let meter: any;

    if (this.phase === "update" && this.output?.id) {
      const updateData: any = {};
      if (props.name !== undefined) updateData.name = props.name;
      if (props.filter !== undefined) updateData.filter = props.filter;
      if (props.aggregation !== undefined)
        updateData.aggregation = props.aggregation;
      if (props.metadata !== undefined) updateData.metadata = props.metadata;

      meter = await client.patch(`/meters/${this.output.id}`, updateData);
    } else {
      const createData: any = {
        name: props.name,
      };
      if (props.filter !== undefined) createData.filter = props.filter;
      if (props.aggregation !== undefined)
        createData.aggregation = props.aggregation;
      if (props.metadata !== undefined) createData.metadata = props.metadata;

      try {
        meter = await client.post("/meters", createData);
      } catch (error) {
        if (isPolarConflictError(error) && props.adopt) {
          throw new Error(
            "Meter adoption is not supported - meters cannot be uniquely identified for adoption",
          );
        } else {
          throw error;
        }
      }
    }

    return this({
      id: meter.id,
      name: meter.name,
      filter: meter.filter,
      aggregation: meter.aggregation,
      metadata: meter.metadata || {},
      createdAt: meter.created_at,
      modifiedAt: meter.modified_at,
    });
  },
);
