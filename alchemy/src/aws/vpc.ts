import {
  CreateVpcCommand,
  DeleteVpcCommand,
  DescribeVpcsCommand,
  EC2Client,
  ModifyVpcAttributeCommand,
  ResourceType,
  type AttributeBooleanValue,
  type Tag,
  type TagSpecification,
} from "@aws-sdk/client-ec2";
import type { Context } from "../context";
import { Resource } from "../resource";
import { ignore } from "../util/ignore";

/**
 * Properties for creating a VPC
 */
export interface VpcProps {
  /**
   * The IPv4 network range for the VPC, in CIDR notation.
   * Example: 10.0.0.0/16
   */
  cidrBlock: string;

  /**
   * The tenancy options for instances launched into the VPC.
   * Valid values: "default", "dedicated"
   * @default "default"
   */
  instanceTenancy?: "default" | "dedicated";

  /**
   * Indicates whether the instances launched in this VPC will have
   * DNS hostnames. If true, instances in the VPC get DNS hostnames;
   * otherwise, they do not.
   * @default false
   */
  enableDnsHostnames?: boolean;

  /**
   * Indicates whether the DNS resolution is supported for the VPC.
   * If true, the Amazon DNS server resolves DNS hostnames for your instances.
   * @default true
   */
  enableDnsSupport?: boolean;

  /**
   * Indicates whether a network interface can't receive a source/destination
   * check flag.
   * @default false
   */
  disableNetworkAddressUsageMetrics?: boolean;

  /**
   * The name to assign to the VPC, used to create a Name tag.
   */
  name?: string;

  /**
   * Tags to apply to the VPC
   */
  tags?: Record<string, string>;

  /**
   * The Amazon EC2 IPv4 address range
   */
  ipv4IpamPoolId?: string;

  /**
   * The netmask length of the IPv4 CIDR you want to allocate to this VPC
   * from an Amazon VPC IP Address Manager (IPAM) pool
   */
  ipv4NetmaskLength?: number;

  /**
   * The ID of an IPv6 IPAM pool
   */
  ipv6IpamPoolId?: string;

  /**
   * The netmask length of the IPv6 CIDR you want to allocate to this VPC
   * from an Amazon VPC IP Address Manager (IPAM) pool
   */
  ipv6NetmaskLength?: number;

  /**
   * The IPv6 CIDR block for the VPC
   */
  ipv6CidrBlock?: string;

  /**
   * AWS region where the VPC should be created
   */
  region?: string;
}

/**
 * AWS VPC (Virtual Private Cloud) Resource
 */
export interface Vpc extends Resource<"aws::Vpc"> {
  /**
   * The ID of the VPC
   */
  id: string;

  /**
   * The IPv4 CIDR block for the VPC
   */
  cidrBlock: string;

  /**
   * The ID of the AWS account that owns the VPC
   */
  ownerId?: string;

  /**
   * The current state of the VPC
   */
  state?: string;

  /**
   * The ID of the primary IPv6 CIDR block association
   */
  ipv6CidrBlockAssociationId?: string;

  /**
   * The IPv6 CIDR block for the VPC
   */
  ipv6CidrBlock?: string;

  /**
   * The tenancy options for instances launched into the VPC
   */
  instanceTenancy: string;

  /**
   * Indicates whether the instances launched in this VPC will have DNS hostnames
   */
  enableDnsHostnames?: boolean;

  /**
   * Indicates whether DNS resolution is supported for the VPC
   */
  enableDnsSupport?: boolean;

  /**
   * Indicates whether a network interface can't receive a source/destination check flag
   */
  disableNetworkAddressUsageMetrics?: boolean;

  /**
   * Tags applied to the VPC
   */
  tags?: Record<string, string>;

  /**
   * The name assigned to the VPC
   */
  name?: string;

  /**
   * The AWS region where this VPC was created
   */
  region?: string;

  /**
   * Creation timestamp
   */
  createdAt: number;
}

/**
 * Modifies a VPC's DNS hostname settings
 */
async function modifyVpcDnsHostnames(
  client: EC2Client,
  vpcId: string,
  enable: boolean
): Promise<void> {
  try {
    await client.send(
      new ModifyVpcAttributeCommand({
        VpcId: vpcId,
        EnableDnsHostnames: {
          Value: enable,
        } as AttributeBooleanValue,
      })
    );
  } catch (error) {
    console.error("Error modifying VPC DNS hostnames:", error);
    throw error;
  }
}

/**
 * Modifies a VPC's DNS support settings
 */
async function modifyVpcDnsSupport(
  client: EC2Client,
  vpcId: string,
  enable: boolean
): Promise<void> {
  try {
    await client.send(
      new ModifyVpcAttributeCommand({
        VpcId: vpcId,
        EnableDnsSupport: {
          Value: enable,
        } as AttributeBooleanValue,
      })
    );
  } catch (error) {
    console.error("Error modifying VPC DNS support:", error);
    throw error;
  }
}

/**
 * Modifies a VPC's network address usage metrics settings
 */
async function modifyVpcNetworkAddressUsageMetrics(
  client: EC2Client,
  vpcId: string,
  enable: boolean
): Promise<void> {
  try {
    await client.send(
      new ModifyVpcAttributeCommand({
        VpcId: vpcId,
        EnableNetworkAddressUsageMetrics: {
          Value: enable,
        } as AttributeBooleanValue,
      })
    );
  } catch (error) {
    console.error("Error modifying VPC network address usage metrics:", error);
    throw error;
  }
}

/**
 * AWS VPC (Virtual Private Cloud) Resource
 *
 * Creates a Virtual Private Cloud (VPC) with the specified CIDR block. A VPC is a
 * virtual network dedicated to your AWS account.
 *
 * @example
 * // Create a simple VPC with the default configuration:
 * const vpc = await Vpc("main-vpc", {
 *   cidrBlock: "10.0.0.0/16",
 *   name: "Main VPC"
 * });
 *
 * @example
 * // Create a VPC with custom DNS settings and tags:
 * const customVpc = await Vpc("custom-vpc", {
 *   cidrBlock: "172.16.0.0/16",
 *   enableDnsHostnames: true,
 *   enableDnsSupport: true,
 *   name: "Custom VPC",
 *   tags: {
 *     Environment: "Production",
 *     Project: "E-Commerce"
 *   }
 * });
 *
 * @example
 * // Create a VPC with dedicated tenancy (isolated hardware):
 * const dedicatedVpc = await Vpc("isolated-vpc", {
 *   cidrBlock: "192.168.0.0/16",
 *   instanceTenancy: "dedicated",
 *   name: "Isolated VPC",
 *   tags: {
 *     Compliance: "PCI-DSS"
 *   }
 * });
 */
export const Vpc = Resource(
  "aws::Vpc",
  async function (
    this: Context<Vpc>,
    id: string,
    props: VpcProps
  ): Promise<Vpc> {
    // Create EC2 client with region if specified
    const client = new EC2Client({
      region: props.region,
    });

    if (this.phase === "delete") {
      try {
        if (this.output?.id) {
          // Handle multiple possible error types during deletion
          await ignore(
            ["VpcNotFound", "InvalidVpcID.NotFound", "InvalidVpcID.Malformed"],
            () =>
              client.send(
                new DeleteVpcCommand({
                  VpcId: this.output.id,
                })
              )
          );
        }
      } catch (error) {
        console.error("Error deleting VPC:", error);
      }

      return this.destroy();
    } else {
      try {
        // Format tags for AWS API
        const tagSpecifications: TagSpecification[] = [];
        const tags: Tag[] = [];

        if (props.name) {
          tags.push({
            Key: "Name",
            Value: props.name,
          });
        }

        if (props.tags) {
          for (const [key, value] of Object.entries(props.tags)) {
            tags.push({
              Key: key,
              Value: value,
            });
          }
        }

        if (tags.length > 0) {
          tagSpecifications.push({
            ResourceType: ResourceType.vpc,
            Tags: tags,
          });
        }

        let vpcId: string;
        let existingVpc;

        if (this.phase === "update" && this.output?.id) {
          // VPC core properties like CIDR block can't be directly modified
          // But we can modify attributes and tags
          const describeResponse = await client.send(
            new DescribeVpcsCommand({
              VpcIds: [this.output.id],
            })
          );

          if (!describeResponse.Vpcs || describeResponse.Vpcs.length === 0) {
            throw new Error(`VPC with ID ${this.output.id} not found`);
          }

          existingVpc = describeResponse.Vpcs[0];
          vpcId = this.output.id;

          // Update modifiable attributes
          // DNS Hostnames
          if (props.enableDnsHostnames !== undefined) {
            await modifyVpcDnsHostnames(
              client,
              vpcId,
              props.enableDnsHostnames
            );
          }

          // DNS Support
          if (props.enableDnsSupport !== undefined) {
            await modifyVpcDnsSupport(client, vpcId, props.enableDnsSupport);
          }

          // Network Address Usage Metrics (note the inverse logic)
          if (props.disableNetworkAddressUsageMetrics !== undefined) {
            await modifyVpcNetworkAddressUsageMetrics(
              client,
              vpcId,
              !props.disableNetworkAddressUsageMetrics
            );
          }

          // Tags handling would be done here in a full implementation
          // This would require CreateTags/DeleteTags commands

          // IPv6 CIDR block association would be handled here
          // This would require DisassociateVpcCidrBlock/AssociateVpcCidrBlock commands
        } else {
          // Create a new VPC
          const createResponse = await client.send(
            new CreateVpcCommand({
              CidrBlock: props.cidrBlock,
              InstanceTenancy: props.instanceTenancy,
              TagSpecifications:
                tagSpecifications.length > 0 ? tagSpecifications : undefined,
              AmazonProvidedIpv6CidrBlock: props.ipv6CidrBlock
                ? true
                : undefined,
              Ipv6CidrBlock: props.ipv6CidrBlock,
              Ipv6Pool: props.ipv6IpamPoolId,
              Ipv6CidrBlockNetworkBorderGroup: undefined, // Could be added as a prop if needed
              Ipv4IpamPoolId: props.ipv4IpamPoolId,
              Ipv4NetmaskLength: props.ipv4NetmaskLength,
              Ipv6IpamPoolId: props.ipv6IpamPoolId,
              Ipv6NetmaskLength: props.ipv6NetmaskLength,
            })
          );

          if (!createResponse.Vpc) {
            throw new Error(
              "Failed to create VPC: No VPC returned from AWS API"
            );
          }

          vpcId = createResponse.Vpc.VpcId!;

          // Set additional attributes if specified
          if (props.enableDnsHostnames !== undefined) {
            await modifyVpcDnsHostnames(
              client,
              vpcId,
              props.enableDnsHostnames
            );
          }

          if (props.enableDnsSupport !== undefined) {
            await modifyVpcDnsSupport(client, vpcId, props.enableDnsSupport);
          }

          if (props.disableNetworkAddressUsageMetrics !== undefined) {
            await modifyVpcNetworkAddressUsageMetrics(
              client,
              vpcId,
              !props.disableNetworkAddressUsageMetrics
            );
          }
        }

        // Retrieve the full details of the VPC
        const describeResponse = await client.send(
          new DescribeVpcsCommand({
            VpcIds: [vpcId],
          })
        );

        if (!describeResponse.Vpcs || describeResponse.Vpcs.length === 0) {
          throw new Error(
            `Failed to retrieve VPC details for VPC ID: ${vpcId}`
          );
        }

        const vpc = describeResponse.Vpcs[0];

        // Extract IPv6 CIDR block if available
        let ipv6CidrBlock: string | undefined;
        let ipv6CidrBlockAssociationId: string | undefined;

        if (
          vpc.Ipv6CidrBlockAssociationSet &&
          vpc.Ipv6CidrBlockAssociationSet.length > 0
        ) {
          // Find an associated IPv6 CIDR block
          const ipv6Association =
            vpc.Ipv6CidrBlockAssociationSet.find(
              (association) =>
                association.Ipv6CidrBlockState?.State === "associated"
            ) || vpc.Ipv6CidrBlockAssociationSet[0];

          ipv6CidrBlock = ipv6Association.Ipv6CidrBlock;
          ipv6CidrBlockAssociationId = ipv6Association.AssociationId;
        }

        // Extract tags as a Record
        const outputTags: Record<string, string> = {};
        if (vpc.Tags) {
          for (const tag of vpc.Tags) {
            if (tag.Key && tag.Value) {
              outputTags[tag.Key] = tag.Value;
            }
          }
        }

        // Get the VPC name from tags if available
        const name = outputTags["Name"] || props.name;

        // Determine attribute values
        // For some VPC attributes, we need to query the attributes directly in a full implementation
        // This would require DescribeVpcAttribute commands
        // For now, we'll use the provided values or defaults

        const enableDnsHostnames =
          props.enableDnsHostnames !== undefined
            ? props.enableDnsHostnames
            : false; // Default value per AWS

        const enableDnsSupport =
          props.enableDnsSupport !== undefined ? props.enableDnsSupport : true; // Default value per AWS

        const disableNetworkAddressUsageMetrics =
          props.disableNetworkAddressUsageMetrics !== undefined
            ? props.disableNetworkAddressUsageMetrics
            : false; // Default value per AWS

        return this({
          id: vpc.VpcId!,
          cidrBlock: vpc.CidrBlock!,
          ownerId: vpc.OwnerId,
          state: vpc.State,
          ipv6CidrBlock,
          ipv6CidrBlockAssociationId,
          instanceTenancy: vpc.InstanceTenancy || "default",
          enableDnsHostnames,
          enableDnsSupport,
          disableNetworkAddressUsageMetrics,
          tags: outputTags,
          name,
          region: props.region,
          createdAt: this.output?.createdAt || Date.now(),
        });
      } catch (error) {
        console.error("Error creating/updating VPC:", error);
        throw error;
      }
    }
  }
);
