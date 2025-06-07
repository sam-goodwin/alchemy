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
 * Benefit type enum for supported benefit types in Polar
 * 
 * @see https://docs.polar.sh/api-reference/benefits#benefit-types
 */
export type BenefitType =
  | "custom"
  | "articles"
  | "discord"
  | "github_repository"
  | "downloadables"
  | "license_keys";

/**
 * Properties for creating or updating a Polar Benefit
 */
export interface BenefitProps {
  /** 
   * Type of benefit to create
   * 
   * @see https://docs.polar.sh/api-reference/benefits#benefit-types
   */
  type: BenefitType;
  /** 
   * Description of the benefit that will be shown to customers
   */
  description: string;
  /** 
   * Whether customers can select this benefit during checkout
   * @defaultValue true
   */
  selectable?: boolean;
  /** 
   * Whether this benefit can be deleted
   * @defaultValue true
   */
  deletable?: boolean;
  /** 
   * Organization that owns this benefit. Can be an organization ID string or Organization resource.
   */
  organization?: string | Organization;
  /** 
   * Type-specific configuration properties. The structure depends on the benefit type.
   * 
   * For Discord benefits: `{ guild_id: string, role_id: string }`
   * For GitHub repository benefits: `{ repository_owner: string, repository_name: string, permission: "pull" | "push" | "admin" }`
   * For custom benefits: any key-value pairs
   * 
   * @see https://docs.polar.sh/api-reference/benefits#benefit-properties
   */
  properties?: Record<string, any>;
  /** 
   * Key-value pairs for storing additional information about the benefit
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
 * Output from the Polar Benefit resource
 */
export interface Benefit extends Resource<"polar::Benefit">, BenefitProps {
  /**
   * The ID of the benefit
   */
  id: string;
  /**
   * Time at which the benefit was created
   */
  createdAt: string;
  /**
   * Time at which the benefit was last modified
   */
  modifiedAt: string;
  /**
   * Type of benefit
   */
  type: BenefitType;
  /**
   * Description of the benefit
   */
  description: string;
  /**
   * Whether customers can select this benefit
   */
  selectable: boolean;
  /**
   * Whether this benefit can be deleted
   */
  deletable: boolean;
  /**
   * ID of the organization that owns this benefit
   */
  organization: string;
  /**
   * Type-specific configuration properties
   */
  properties?: Record<string, any>;
}

/**
 * Create and manage Polar Benefits that can be granted to customers
 *
 * Benefits represent perks, access rights, or digital goods that customers
 * receive when they purchase products or subscribe to services. Different
 * benefit types provide various integrations and capabilities.
 *
 * @example
 * // Create a Discord access benefit
 * const discordBenefit = await Benefit("discord-access", {
 *   type: "discord",
 *   description: "Access to premium Discord server",
 *   selectable: true,
 *   properties: {
 *     guild_id: "123456789",
 *     role_id: "987654321"
 *   },
 *   metadata: {
 *     server_name: "Premium Community",
 *     access_level: "premium"
 *   }
 * });
 *
 * @example
 * // Create a custom benefit for priority support
 * const customBenefit = await Benefit("priority-support", {
 *   type: "custom",
 *   description: "Priority customer support with 24h response time",
 *   selectable: false,
 *   deletable: true,
 *   metadata: {
 *     category: "support",
 *     priority: "high",
 *     response_time: "24h"
 *   }
 * });
 *
 * @example
 * // Create a GitHub repository access benefit
 * const githubBenefit = await Benefit("private-repo-access", {
 *   type: "github_repository",
 *   description: "Access to private repository with source code",
 *   selectable: true,
 *   properties: {
 *     repository_owner: "mycompany",
 *     repository_name: "premium-source-code",
 *     permission: "pull"
 *   },
 *   metadata: {
 *     repo_type: "source_code",
 *     language: "typescript"
 *   }
 * });
 *
 * @example
 * // Create a downloadable content benefit
 * const downloadableBenefit = await Benefit("ebook-download", {
 *   type: "downloadables",
 *   description: "Premium eBook and additional resources",
 *   selectable: true,
 *   properties: {
 *     file_count: 5,
 *     total_size_mb: 25
 *   },
 *   metadata: {
 *     format: "pdf",
 *     pages: "150",
 *     category: "education"
 *   }
 * });
 *
 * @example
 * // Create a license key benefit
 * const licenseBenefit = await Benefit("software-license", {
 *   type: "license_keys",
 *   description: "Software license for premium application",
 *   selectable: false,
 *   properties: {
 *     license_type: "perpetual",
 *     max_activations: 3
 *   },
 *   metadata: {
 *     software: "premium_app",
 *     version: "2.0"
 *   }
 * });
 *
 * @see https://docs.polar.sh/api-reference/benefits
 */
export const Benefit = Resource(
  "polar::Benefit",
  async function (
    this: Context<Benefit>,
    _logicalId: string,
    props: BenefitProps,
  ): Promise<Benefit> {
    const client = createPolarClient({ apiKey: props.apiKey });

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          await client.delete(`/benefits/${this.output.id}`);
        }
      } catch (error) {
        handlePolarDeleteError(error, "Benefit", this.output?.id);
      }
      return this.destroy();
    }

    let benefit: any;

    if (this.phase === "update" && this.output?.id) {
      const updateData: any = {};
      if (props.description !== undefined)
        updateData.description = props.description;
      if (props.selectable !== undefined)
        updateData.selectable = props.selectable;
      if (props.deletable !== undefined) updateData.deletable = props.deletable;
      if (props.properties !== undefined)
        updateData.properties = props.properties;
      if (props.metadata !== undefined) updateData.metadata = props.metadata;

      benefit = await client.patch(`/benefits/${this.output.id}`, updateData);
    } else {
      const createData: any = {
        type: props.type,
        description: props.description,
      };
      if (props.selectable !== undefined)
        createData.selectable = props.selectable;
      if (props.deletable !== undefined) createData.deletable = props.deletable;
      if (props.organization !== undefined) {
        createData.organization_id =
          typeof props.organization === "string"
            ? props.organization
            : props.organization.id;
      }
      if (props.properties !== undefined)
        createData.properties = props.properties;
      if (props.metadata !== undefined) createData.metadata = props.metadata;

      try {
        benefit = await client.post("/benefits", createData);
      } catch (error) {
        if (isPolarConflictError(error) && props.adopt) {
          throw new Error(
            "Benefit adoption is not supported - benefits cannot be uniquely identified for adoption",
          );
        } else {
          throw error;
        }
      }
    }

    return this({
      id: benefit.id,
      type: benefit.type,
      description: benefit.description,
      selectable: benefit.selectable,
      deletable: benefit.deletable,
      organization: benefit.organization_id,
      properties: benefit.properties,
      metadata: benefit.metadata || {},
      createdAt: benefit.created_at,
      modifiedAt: benefit.modified_at,
    });
  },
);
