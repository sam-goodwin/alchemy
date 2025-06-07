import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import {
  createPolarClient,
  handlePolarDeleteError,
  isPolarConflictError,
} from "./client.ts";
import type { Organization } from "./organization.ts";

/**
 * Properties for creating or updating a Polar Product
 */
export interface ProductProps {
  /** 
   * Product name (required)
   */
  name: string;
  /** 
   * Product description shown to customers
   */
  description?: string;
  /** 
   * Whether this is a recurring subscription product or a one-time purchase
   * @defaultValue false
   */
  isRecurring?: boolean;
  /** 
   * Whether the product is archived (hidden from customers)
   * @defaultValue false
   */
  isArchived?: boolean;
  /** 
   * Organization that owns this product. Can be an organization ID string or Organization resource.
   */
  organization?: string | Organization;
  /** 
   * Key-value pairs for storing additional information about the product
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
 * Output from the Polar Product resource
 */
export interface Product extends Resource<"polar::Product">, ProductProps {
  /**
   * The ID of the product
   */
  id: string;
  /**
   * Time at which the product was created
   */
  createdAt: string;
  /**
   * Time at which the product was last modified
   */
  modifiedAt: string;
  /**
   * ID of the organization that owns this product
   */
  organization: string;
  /**
   * Associated pricing information for the product
   */
  prices?: any[];
}

/**
 * Create and manage Polar Products for your organization
 *
 * Products represent items that customers can purchase, either as one-time
 * purchases or recurring subscriptions. Products can have multiple pricing
 * tiers and can be configured with various benefits.
 *
 * @example
 * // Create a basic one-time product
 * const ebook = await Product("programming-ebook", {
 *   name: "Advanced Programming Guide",
 *   description: "Comprehensive guide to advanced programming concepts",
 *   isRecurring: false,
 *   metadata: {
 *     category: "education",
 *     format: "pdf",
 *     pages: "150"
 *   }
 * });
 *
 * @example
 * // Create a recurring subscription product
 * const subscription = await Product("premium-plan", {
 *   name: "Premium Plan",
 *   description: "Access to premium features and exclusive content",
 *   isRecurring: true,
 *   metadata: {
 *     tier: "premium",
 *     features: "advanced_analytics,priority_support,api_access",
 *     billing_cycle: "monthly"
 *   }
 * });
 *
 * @example
 * // Create a digital course product
 * const course = await Product("web-development-course", {
 *   name: "Complete Web Development Course",
 *   description: "Learn full-stack web development from scratch",
 *   isRecurring: false,
 *   metadata: {
 *     category: "course",
 *     duration: "40_hours",
 *     level: "beginner_to_advanced",
 *     includes: "videos,exercises,certificate"
 *   }
 * });
 *
 * @example
 * // Create a SaaS subscription product
 * const saasProduct = await Product("pro-saas-plan", {
 *   name: "Professional SaaS Plan",
 *   description: "Professional tier with advanced features and integrations",
 *   isRecurring: true,
 *   metadata: {
 *     tier: "professional",
 *     user_limit: "50",
 *     storage: "100gb",
 *     integrations: "unlimited"
 *   }
 * });
 *
 * @see https://docs.polar.sh/api-reference/products
 */
export const Product = Resource(
  "polar::Product",
  async function (
    this: Context<Product>,
    _logicalId: string,
    props: ProductProps,
  ): Promise<Product> {
    const client = createPolarClient({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          await client.patch(`/products/${this.output.id}`, {
            is_archived: true,
          });
        }
      } catch (error) {
        handlePolarDeleteError(error, "Product", this.output?.id);
      }
      return this.destroy();
    }

    let product: any;

    if (this.phase === "update" && this.output?.id) {
      const updateData: any = {};
      if (props.name !== undefined) updateData.name = props.name;
      if (props.description !== undefined)
        updateData.description = props.description;
      if (props.isRecurring !== undefined)
        updateData.is_recurring = props.isRecurring;
      if (props.isArchived !== undefined)
        updateData.is_archived = props.isArchived;
      if (props.metadata !== undefined) updateData.metadata = props.metadata;

      product = await client.patch(`/products/${this.output.id}`, updateData);
    } else {
      const createData: any = {
        name: props.name,
      };
      if (props.description !== undefined)
        createData.description = props.description;
      if (props.isRecurring !== undefined)
        createData.is_recurring = props.isRecurring;
      if (props.organization !== undefined) {
        createData.organization_id =
          typeof props.organization === "string"
            ? props.organization
            : props.organization.id;
      }
      if (props.metadata !== undefined) createData.metadata = props.metadata;

      try {
        product = await client.post("/products", createData);
      } catch (error) {
        if (isPolarConflictError(error) && props.adopt) {
          throw new Error(
            "Product adoption is not supported - products cannot be uniquely identified for adoption",
          );
        } else {
          throw error;
        }
      }
    }

    return this({
      id: product.id,
      name: product.name,
      description: product.description,
      isRecurring: product.is_recurring,
      isArchived: product.is_archived,
      organization: product.organization_id,
      metadata: product.metadata || {},
      createdAt: product.created_at,
      modifiedAt: product.modified_at,
      prices: product.prices,
    });
  },
);
