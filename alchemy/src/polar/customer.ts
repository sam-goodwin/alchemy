import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import {
  createPolarClient,
  handlePolarDeleteError,
  isPolarConflictError,
} from "./client.ts";

/**
 * Properties for creating or updating a Polar Customer
 */
export interface CustomerProps {
  /** 
   * Customer's email address (required for customer creation)
   */
  email: string;
  /** 
   * Customer's display name or full name
   */
  name?: string;
  /** 
   * Key-value pairs for storing additional information about the customer
   */
  metadata?: Record<string, string>;
  /** 
   * Polar API key (overrides environment variable)
   */
  apiKey?: Secret;
  /** 
   * If true, adopt existing resource if creation fails due to conflict
   */
  adopt?: boolean;
}

/**
 * Output from the Polar Customer resource
 */
export interface Customer extends Resource<"polar::Customer">, CustomerProps {
  /**
   * The ID of the customer
   */
  id: string;
  /**
   * Time at which the customer was created
   */
  createdAt: string;
  /**
   * Time at which the customer was last modified
   */
  modifiedAt: string;
  /**
   * ID of the organization that owns this customer
   */
  organization: string;
}

/**
 * Create and manage Polar Customers for your organization
 *
 * Customers represent individuals or entities that can purchase products,
 * subscribe to services, and receive benefits in your Polar organization.
 * Each customer is uniquely identified by their email address.
 *
 * @example
 * // Create a basic customer
 * const customer = await Customer("john-doe", {
 *   email: "john@example.com",
 *   name: "John Doe"
 * });
 *
 * @example
 * // Create a customer with comprehensive metadata
 * const enterpriseCustomer = await Customer("enterprise-client", {
 *   email: "billing@acmecorp.com",
 *   name: "Acme Corporation",
 *   metadata: {
 *     company: "Acme Corporation",
 *     industry: "Technology",
 *     plan: "enterprise",
 *     source: "sales_team",
 *     account_manager: "jane_smith"
 *   }
 * });
 *
 * @example
 * // Create a customer for tracking trial users
 * const trialCustomer = await Customer("trial-user", {
 *   email: "trial@startup.com",
 *   name: "Trial User",
 *   metadata: {
 *     status: "trial",
 *     trial_start: "2024-01-15",
 *     trial_end: "2024-01-29",
 *     conversion_target: "premium_plan"
 *   }
 * });
 *
 * @example
 * // Create a customer with adoption enabled (will find existing if email matches)
 * const adoptableCustomer = await Customer("existing-customer", {
 *   email: "existing@customer.com",
 *   name: "Existing Customer",
 *   adopt: true,
 *   metadata: {
 *     updated_via: "api",
 *     import_source: "legacy_system"
 *   }
 * });
 *
 * @see https://docs.polar.sh/api-reference/customers
 */
export const Customer = Resource(
  "polar::Customer",
  async function (
    this: Context<Customer>,
    _logicalId: string,
    props: CustomerProps,
  ): Promise<Customer> {
    const client = createPolarClient({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          await client.delete(`/customers/${this.output.id}`);
        }
      } catch (error) {
        handlePolarDeleteError(error, "Customer", this.output?.id);
      }
      return this.destroy();
    }

    let customer: any;

    if (this.phase === "update" && this.output?.id) {
      const updateData: any = {};
      if (props.name !== undefined) updateData.name = props.name;
      if (props.metadata !== undefined) updateData.metadata = props.metadata;

      customer = await client.patch(`/customers/${this.output.id}`, updateData);
    } else {
      const createData: any = {
        email: props.email,
      };
      if (props.name !== undefined) createData.name = props.name;
      if (props.metadata !== undefined) createData.metadata = props.metadata;

      try {
        customer = await client.post("/customers", createData);
      } catch (error) {
        if (isPolarConflictError(error) && props.adopt) {
          const existingCustomers = await client.get(
            `/customers?email=${encodeURIComponent(props.email)}`,
          );
          if (existingCustomers.items && existingCustomers.items.length > 0) {
            customer = existingCustomers.items[0];
          } else {
            throw error;
          }
        } else {
          throw error;
        }
      }
    }

    return this({
      id: customer.id,
      email: customer.email,
      name: customer.name,
      metadata: customer.metadata || {},
      createdAt: customer.created_at,
      modifiedAt: customer.modified_at,
      organization: customer.organization_id,
    });
  },
);
