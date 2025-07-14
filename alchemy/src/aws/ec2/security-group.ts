import type { AwsClient } from "aws4fetch";
import { XMLParser } from "fast-xml-parser";
import type { Context } from "../../context.ts";
import { Resource } from "../../resource.ts";
import { ignore } from "../../util/ignore.ts";
import type { TimeoutConfig } from "../../util/timeout.js";
import { retry } from "../retry.ts";
import { callEC2Api, createEC2Client } from "./utils.js";
import type { Vpc } from "./vpc.ts";

/**
 * Security Group timeout constants
 */
export const SECURITY_GROUP_TIMEOUT: TimeoutConfig = {
  maxAttempts: 30,
  delayMs: 1000, // 1 second - Security Groups are fast resources
};

/**
 * Raw XML parsing interfaces for type safety
 */
interface RawSecurityGroupXmlItem {
  groupId: string;
  groupName: string;
  groupDescription: string;
  vpcId: string;
  ownerId: string;
  ipPermissions?: {
    item?: Array<RawIpPermissionXmlItem> | RawIpPermissionXmlItem;
  };
  ipPermissionsEgress?: {
    item?: Array<RawIpPermissionXmlItem> | RawIpPermissionXmlItem;
  };
}

interface RawIpPermissionXmlItem {
  ipProtocol: string;
  fromPort?: number;
  toPort?: number;
  groups?: {
    item?:
      | Array<{ groupId: string; description?: string }>
      | { groupId: string; description?: string };
  };
  ipRanges?: {
    item?:
      | Array<{ cidrIp: string; description?: string }>
      | { cidrIp: string; description?: string };
  };
}

/**
 * Parse XML responses specifically for Security Group operations
 */
function parseSecurityGroupXmlResponse<T>(xmlText: string): T {
  const parser = new XMLParser({
    ignoreAttributes: true,
    parseAttributeValue: true,
    parseTagValue: true,
    trimValues: true,
  });

  const parsed = parser.parse(xmlText);
  const result: Record<string, unknown> = {};

  // Parse CreateSecurityGroupResponse
  if (parsed.CreateSecurityGroupResponse) {
    result.GroupId = parsed.CreateSecurityGroupResponse.groupId;
  }

  // Parse DescribeSecurityGroupsResponse
  if (parsed.DescribeSecurityGroupsResponse) {
    const securityGroupSet =
      parsed.DescribeSecurityGroupsResponse.securityGroupInfo;
    if (securityGroupSet?.item) {
      const securityGroups = Array.isArray(securityGroupSet.item)
        ? securityGroupSet.item
        : [securityGroupSet.item];
      result.SecurityGroups = securityGroups.map(
        (sg: RawSecurityGroupXmlItem) => ({
          GroupId: sg.groupId,
          GroupName: sg.groupName,
          Description: sg.groupDescription,
          VpcId: sg.vpcId,
          OwnerId: sg.ownerId,
          IpPermissions: parseIpPermissions(sg.ipPermissions),
          IpPermissionsEgress: parseIpPermissions(sg.ipPermissionsEgress),
        }),
      );
    } else {
      result.SecurityGroups = [];
    }
  }

  // Handle success responses
  if (
    parsed.AuthorizeSecurityGroupIngressResponse ||
    parsed.AuthorizeSecurityGroupEgressResponse ||
    parsed.RevokeSecurityGroupIngressResponse ||
    parsed.RevokeSecurityGroupEgressResponse ||
    parsed.DeleteSecurityGroupResponse
  ) {
    result.success = true;
  }

  return result as T;
}

/**
 * Parse IP permissions from XML structure
 */
function parseIpPermissions(ipPermissionsXml?: {
  item?: Array<RawIpPermissionXmlItem> | RawIpPermissionXmlItem;
}): IpPermission[] {
  if (!ipPermissionsXml?.item) {
    return [];
  }

  const items = Array.isArray(ipPermissionsXml.item)
    ? ipPermissionsXml.item
    : [ipPermissionsXml.item];

  return items.map((item) => {
    const permission: IpPermission = {
      IpProtocol: item.ipProtocol,
    };

    if (item.fromPort !== undefined) {
      permission.FromPort = item.fromPort;
    }
    if (item.toPort !== undefined) {
      permission.ToPort = item.toPort;
    }

    // Parse IP ranges
    if (item.ipRanges?.item) {
      const ranges = Array.isArray(item.ipRanges.item)
        ? item.ipRanges.item
        : [item.ipRanges.item];
      permission.IpRanges = ranges.map((range) => ({
        CidrIp: range.cidrIp,
        Description: range.description,
      }));
    }

    // Parse user ID group pairs
    if (item.groups?.item) {
      const groups = Array.isArray(item.groups.item)
        ? item.groups.item
        : [item.groups.item];
      permission.UserIdGroupPairs = groups.map((group) => ({
        GroupId: group.groupId,
        Description: group.description,
      }));
    }

    return permission;
  });
}

/**
 * AWS Security Group API response types
 */
interface AwsSecurityGroup {
  GroupId: string;
  GroupName: string;
  Description: string;
  VpcId: string;
  OwnerId: string;
  IpPermissions?: IpPermission[];
  IpPermissionsEgress?: IpPermission[];
}

interface CreateSecurityGroupResponse {
  GroupId: string;
}

interface DescribeSecurityGroupsResponse {
  SecurityGroups: AwsSecurityGroup[];
}

/**
 * Security group rule configuration
 */
export interface SecurityGroupRule {
  /**
   * The IP protocol (tcp, udp, icmp, or -1 for all)
   */
  protocol: string;

  /**
   * The start of the port range (or -1 for all ports)
   */
  fromPort?: number;

  /**
   * The end of the port range (or -1 for all ports)
   */
  toPort?: number;

  /**
   * CIDR blocks to allow
   */
  cidrBlocks?: string[];

  /**
   * Security group IDs to allow
   */
  securityGroups?: string[];

  /**
   * Description for the rule
   */
  description?: string;
}

/**
 * Comprehensive AWS Security Group API Parameter Types
 */

interface IpRange {
  CidrIp: string;
  Description?: string;
}

interface UserIdGroupPair {
  GroupId?: string;
  GroupName?: string;
  UserId?: string;
  Description?: string;
  VpcId?: string;
  VpcPeeringConnectionId?: string;
  PeeringStatus?: string;
}

interface IpPermission {
  IpProtocol: string;
  FromPort?: number;
  ToPort?: number;
  IpRanges?: IpRange[];
  UserIdGroupPairs?: UserIdGroupPair[];
}

/**
 * Properties for creating or updating a Security Group
 */
export interface SecurityGroupProps {
  /**
   * The VPC to create the security group in
   */
  vpc: Vpc | string;

  /**
   * The name of the security group
   */
  groupName: string;

  /**
   * The description of the security group
   */
  description: string;

  /**
   * Ingress rules (inbound traffic)
   */
  ingressRules?: SecurityGroupRule[];

  /**
   * Egress rules (outbound traffic)
   * If not specified, allows all outbound traffic
   */
  egressRules?: SecurityGroupRule[];

  /**
   * Tags to apply to the security group
   */
  tags?: Record<string, string>;

  /**
   * Timeout configuration for Security Group operations
   * @default Security Group-specific sensible defaults (30 attempts, 1000ms delay)
   */
  timeout?: Partial<TimeoutConfig>;
}

/**
 * Output returned after Security Group creation/update
 */
export interface SecurityGroup
  extends Resource<"aws::SecurityGroup">,
    SecurityGroupProps {
  /**
   * The ID of the security group
   */
  groupId: string;

  /**
   * The ID of the VPC the security group belongs to
   */
  vpcId: string;

  /**
   * The AWS account ID that owns the security group
   */
  ownerId: string;
}

/**
 * AWS Security Group Resource
 *
 * Creates and manages security groups with configurable ingress and egress rules.
 * Acts as a virtual firewall for EC2 instances and other AWS resources.
 *
 * @example
 * // Create a web server security group
 * const webSecurityGroup = await SecurityGroup("web-sg", {
 *   vpc: mainVpc,
 *   groupName: "web-server-sg",
 *   description: "Security group for web servers",
 *   ingressRules: [
 *     {
 *       protocol: "tcp",
 *       fromPort: 80,
 *       toPort: 80,
 *       cidrBlocks: ["0.0.0.0/0"],
 *       description: "HTTP access"
 *     },
 *     {
 *       protocol: "tcp",
 *       fromPort: 443,
 *       toPort: 443,
 *       cidrBlocks: ["0.0.0.0/0"],
 *       description: "HTTPS access"
 *     }
 *   ],
 *   tags: {
 *     Name: "web-server-security-group",
 *     Environment: "production"
 *   }
 * });
 *
 * @example
 * // Create a database security group
 * const dbSecurityGroup = await SecurityGroup("db-sg", {
 *   vpc: "vpc-12345678",
 *   groupName: "database-sg",
 *   description: "Security group for database servers",
 *   ingressRules: [
 *     {
 *       protocol: "tcp",
 *       fromPort: 3306,
 *       toPort: 3306,
 *       securityGroups: [webSecurityGroup.groupId],
 *       description: "MySQL access from web servers"
 *     }
 *   ],
 *   egressRules: [], // No outbound access
 *   tags: {
 *     Name: "database-security-group"
 *   }
 * });
 *
 * @example
 * // Create a security group with SSH access from specific IP
 * const sshSecurityGroup = await SecurityGroup("ssh-sg", {
 *   vpc: mainVpc,
 *   groupName: "ssh-access-sg",
 *   description: "Security group for SSH access",
 *   ingressRules: [
 *     {
 *       protocol: "tcp",
 *       fromPort: 22,
 *       toPort: 22,
 *       cidrBlocks: ["203.0.113.0/24"],
 *       description: "SSH access from office network"
 *     }
 *   ],
 *   tags: {
 *     Name: "ssh-access-security-group",
 *     Purpose: "administration"
 *   }
 * });
 *
 * @example
 * // Create a security group with custom timeout configuration
 * const customSecurityGroup = await SecurityGroup("custom-sg", {
 *   vpc: mainVpc,
 *   groupName: "custom-sg",
 *   description: "Security group with custom timeout",
 *   timeout: {
 *     maxAttempts: 60,
 *     delayMs: 2000
 *   },
 *   ingressRules: [
 *     {
 *       protocol: "tcp",
 *       fromPort: 8080,
 *       toPort: 8080,
 *       cidrBlocks: ["10.0.0.0/8"],
 *       description: "Application access from private network"
 *     }
 *   ],
 *   tags: {
 *     Name: "custom-timeout-security-group"
 *   }
 * });
 *
 * @example
 * // Create a security group allowing ICMP ping
 * const pingSecurityGroup = await SecurityGroup("ping-sg", {
 *   vpc: mainVpc,
 *   groupName: "ping-sg",
 *   description: "Security group allowing ICMP ping",
 *   ingressRules: [
 *     {
 *       protocol: "icmp",
 *       fromPort: -1,
 *       toPort: -1,
 *       cidrBlocks: ["10.0.0.0/16"],
 *       description: "ICMP ping from VPC"
 *     }
 *   ],
 *   tags: {
 *     Name: "ping-security-group"
 *   }
 * });
 */
export const SecurityGroup = Resource(
  "aws::SecurityGroup",
  async function (
    this: Context<SecurityGroup>,
    _id: string,
    props: SecurityGroupProps,
  ): Promise<SecurityGroup> {
    const client = await createEC2Client();
    const vpcId = typeof props.vpc === "string" ? props.vpc : props.vpc.vpcId;

    if (this.phase === "delete") {
      if (this.output?.groupId) {
        await retry(async () => {
          await ignore("InvalidGroupId.NotFound", async () => {
            await callEC2Api(
              client,
              "DeleteSecurityGroup",
              parseSecurityGroupXmlResponse,
              {
                GroupId: this.output!.groupId,
              },
            );
          });
        });
      }
      return this.destroy();
    }

    let securityGroup: AwsSecurityGroup;

    if (this.phase === "update" && this.output?.groupId) {
      // Get existing security group
      const response = await callEC2Api<DescribeSecurityGroupsResponse>(
        client,
        "DescribeSecurityGroups",
        parseSecurityGroupXmlResponse,
        {
          "GroupId.1": this.output.groupId,
        },
      );

      if (!response.SecurityGroups?.[0]) {
        throw new Error(`Security Group ${this.output.groupId} not found`);
      }

      securityGroup = response.SecurityGroups[0];

      // Update rules by comparing current vs desired
      await updateSecurityGroupRules(
        client,
        securityGroup,
        props.ingressRules || [],
        props.egressRules || [],
      );
    } else {
      // Create new security group
      const createParams: Record<string, any> = {
        GroupName: props.groupName,
        GroupDescription: props.description,
        VpcId: vpcId,
      };

      // Add tags if specified
      if (props.tags) {
        createParams["TagSpecification.1.ResourceType"] = "security-group";
        Object.entries(props.tags).forEach(([key, value], index) => {
          createParams[`TagSpecification.1.Tag.${index + 1}.Key`] = key;
          createParams[`TagSpecification.1.Tag.${index + 1}.Value`] = value;
        });
      }

      const response = await callEC2Api<CreateSecurityGroupResponse>(
        client,
        "CreateSecurityGroup",
        parseSecurityGroupXmlResponse,
        createParams,
      );

      if (!response.GroupId) {
        throw new Error("Failed to create security group");
      }

      // Get the created security group
      const sgResponse = await callEC2Api<DescribeSecurityGroupsResponse>(
        client,
        "DescribeSecurityGroups",
        parseSecurityGroupXmlResponse,
        {
          "GroupId.1": response.GroupId,
        },
      );

      if (!sgResponse.SecurityGroups?.[0]) {
        throw new Error("Failed to retrieve created security group");
      }

      securityGroup = sgResponse.SecurityGroups[0];

      // Add ingress rules
      if (props.ingressRules && props.ingressRules.length > 0) {
        await authorizeSecurityGroupIngress(
          client,
          securityGroup.GroupId,
          props.ingressRules,
        );
      }

      // Handle egress rules (remove default allow-all if custom rules specified)
      if (props.egressRules) {
        // Remove default egress rule (allow all outbound)
        if (
          securityGroup.IpPermissionsEgress &&
          securityGroup.IpPermissionsEgress.length > 0
        ) {
          await revokeSecurityGroupEgress(
            client,
            securityGroup.GroupId,
            securityGroup.IpPermissionsEgress,
          );
        }

        // Add custom egress rules
        if (props.egressRules.length > 0) {
          await authorizeSecurityGroupEgress(
            client,
            securityGroup.GroupId,
            props.egressRules,
          );
        }
      }
    }

    return this({
      groupId: securityGroup.GroupId!,
      vpcId: securityGroup.VpcId!,
      ownerId: securityGroup.OwnerId!,
      ...props,
      vpc: vpcId,
    });
  },
);

/**
 * Authorize security group ingress rules
 */
async function authorizeSecurityGroupIngress(
  client: AwsClient,
  groupId: string,
  rules: SecurityGroupRule[],
): Promise<void> {
  const params = convertRulesToApiParams(rules, "IpPermissions");
  await callEC2Api(
    client,
    "AuthorizeSecurityGroupIngress",
    parseSecurityGroupXmlResponse,
    {
      GroupId: groupId,
      ...params,
    },
  );
}

/**
 * Authorize security group egress rules
 */
async function authorizeSecurityGroupEgress(
  client: AwsClient,
  groupId: string,
  rules: SecurityGroupRule[],
): Promise<void> {
  const params = convertRulesToApiParams(rules, "IpPermissions");
  await callEC2Api(
    client,
    "AuthorizeSecurityGroupEgress",
    parseSecurityGroupXmlResponse,
    {
      GroupId: groupId,
      ...params,
    },
  );
}

/**
 * Revoke security group egress rules
 */
async function revokeSecurityGroupEgress(
  client: AwsClient,
  groupId: string,
  permissions: IpPermission[],
): Promise<void> {
  const params = convertIpPermissionsToApiParams(permissions, "IpPermissions");
  await callEC2Api(
    client,
    "RevokeSecurityGroupEgress",
    parseSecurityGroupXmlResponse,
    {
      GroupId: groupId,
      ...params,
    },
  );
}

/**
 * Convert security group rules to API parameters
 */
function convertRulesToApiParams(
  rules: SecurityGroupRule[],
  prefix: string,
): Record<string, string> {
  const params: Record<string, string> = {};

  rules.forEach((rule, ruleIndex) => {
    const rulePrefix = `${prefix}.${ruleIndex + 1}`;
    params[`${rulePrefix}.IpProtocol`] = rule.protocol;

    if (rule.fromPort !== undefined) {
      params[`${rulePrefix}.FromPort`] = rule.fromPort.toString();
    }
    if (rule.toPort !== undefined) {
      params[`${rulePrefix}.ToPort`] = rule.toPort.toString();
    }

    // Add CIDR blocks
    if (rule.cidrBlocks) {
      rule.cidrBlocks.forEach((cidr, cidrIndex) => {
        params[`${rulePrefix}.IpRanges.${cidrIndex + 1}.CidrIp`] = cidr;
        if (rule.description) {
          params[`${rulePrefix}.IpRanges.${cidrIndex + 1}.Description`] =
            rule.description;
        }
      });
    }

    // Add security group references
    if (rule.securityGroups) {
      rule.securityGroups.forEach((groupId, groupIndex) => {
        params[`${rulePrefix}.Groups.${groupIndex + 1}.GroupId`] = groupId;
        if (rule.description) {
          params[`${rulePrefix}.Groups.${groupIndex + 1}.Description`] =
            rule.description;
        }
      });
    }
  });

  return params;
}

/**
 * Convert IpPermissions to API parameters
 */
function convertIpPermissionsToApiParams(
  permissions: IpPermission[],
  prefix: string,
): Record<string, string> {
  const params: Record<string, string> = {};

  permissions.forEach((permission, permIndex) => {
    const permPrefix = `${prefix}.${permIndex + 1}`;
    params[`${permPrefix}.IpProtocol`] = permission.IpProtocol;

    if (permission.FromPort !== undefined) {
      params[`${permPrefix}.FromPort`] = permission.FromPort.toString();
    }
    if (permission.ToPort !== undefined) {
      params[`${permPrefix}.ToPort`] = permission.ToPort.toString();
    }

    // Add IP ranges
    if (permission.IpRanges) {
      permission.IpRanges.forEach((range, rangeIndex) => {
        params[`${permPrefix}.IpRanges.${rangeIndex + 1}.CidrIp`] =
          range.CidrIp;
        if (range.Description) {
          params[`${permPrefix}.IpRanges.${rangeIndex + 1}.Description`] =
            range.Description;
        }
      });
    }

    // Add group pairs
    if (permission.UserIdGroupPairs) {
      permission.UserIdGroupPairs.forEach((pair, pairIndex) => {
        if (pair.GroupId) {
          params[`${permPrefix}.Groups.${pairIndex + 1}.GroupId`] =
            pair.GroupId;
        }
        if (pair.Description) {
          params[`${permPrefix}.Groups.${pairIndex + 1}.Description`] =
            pair.Description;
        }
      });
    }
  });

  return params;
}

/**
 * Update security group rules by comparing current vs desired state
 */
async function updateSecurityGroupRules(
  client: AwsClient,
  securityGroup: AwsSecurityGroup,
  desiredIngressRules: SecurityGroupRule[],
  desiredEgressRules: SecurityGroupRule[],
): Promise<void> {
  const groupId = securityGroup.GroupId!;

  // Update ingress rules
  const currentIngress = securityGroup.IpPermissions || [];
  const desiredIngress = convertRulesToIpPermissions(desiredIngressRules);

  // Remove rules that are no longer needed
  const ingressToRemove = currentIngress.filter(
    (current) =>
      !desiredIngress.some((desired) => ipPermissionsEqual(current, desired)),
  );
  if (ingressToRemove.length > 0) {
    await revokeSecurityGroupIngress(client, groupId, ingressToRemove);
  }

  // Add new rules
  const ingressToAdd = desiredIngress.filter(
    (desired) =>
      !currentIngress.some((current) => ipPermissionsEqual(current, desired)),
  );
  if (ingressToAdd.length > 0) {
    await authorizeSecurityGroupIngress(
      client,
      groupId,
      convertIpPermissionsToRules(ingressToAdd),
    );
  }

  // Update egress rules
  const currentEgress = securityGroup.IpPermissionsEgress || [];
  const desiredEgress = convertRulesToIpPermissions(desiredEgressRules);

  // Remove rules that are no longer needed
  const egressToRemove = currentEgress.filter(
    (current) =>
      !desiredEgress.some((desired) => ipPermissionsEqual(current, desired)),
  );
  if (egressToRemove.length > 0) {
    await revokeSecurityGroupEgress(client, groupId, egressToRemove);
  }

  // Add new rules
  const egressToAdd = desiredEgress.filter(
    (desired) =>
      !currentEgress.some((current) => ipPermissionsEqual(current, desired)),
  );
  if (egressToAdd.length > 0) {
    await authorizeSecurityGroupEgress(
      client,
      groupId,
      convertIpPermissionsToRules(egressToAdd),
    );
  }
}

/**
 * Revoke security group ingress rules
 */
async function revokeSecurityGroupIngress(
  client: AwsClient,
  groupId: string,
  permissions: IpPermission[],
): Promise<void> {
  const params = convertIpPermissionsToApiParams(permissions, "IpPermissions");
  await callEC2Api(
    client,
    "RevokeSecurityGroupIngress",
    parseSecurityGroupXmlResponse,
    {
      GroupId: groupId,
      ...params,
    },
  );
}

/**
 * Convert security group rules to AWS IpPermissions format
 */
function convertRulesToIpPermissions(
  rules: SecurityGroupRule[],
): IpPermission[] {
  return rules.map((rule) => {
    const ipPermission: IpPermission = {
      IpProtocol: rule.protocol,
    };

    if (rule.fromPort !== undefined) {
      ipPermission.FromPort = rule.fromPort;
    }
    if (rule.toPort !== undefined) {
      ipPermission.ToPort = rule.toPort;
    }

    if (rule.cidrBlocks) {
      ipPermission.IpRanges = rule.cidrBlocks.map((cidr) => ({
        CidrIp: cidr,
        Description: rule.description,
      }));
    }

    if (rule.securityGroups) {
      ipPermission.UserIdGroupPairs = rule.securityGroups.map((groupId) => ({
        GroupId: groupId,
        Description: rule.description,
      }));
    }

    return ipPermission;
  });
}

/**
 * Convert IpPermissions back to SecurityGroupRules
 */
function convertIpPermissionsToRules(
  permissions: IpPermission[],
): SecurityGroupRule[] {
  return permissions.map((permission) => {
    const rule: SecurityGroupRule = {
      protocol: permission.IpProtocol,
    };

    if (permission.FromPort !== undefined) {
      rule.fromPort = permission.FromPort;
    }
    if (permission.ToPort !== undefined) {
      rule.toPort = permission.ToPort;
    }

    if (permission.IpRanges && permission.IpRanges.length > 0) {
      rule.cidrBlocks = permission.IpRanges.map((range) => range.CidrIp);
      rule.description = permission.IpRanges[0].Description;
    }

    if (permission.UserIdGroupPairs && permission.UserIdGroupPairs.length > 0) {
      rule.securityGroups = permission.UserIdGroupPairs.map(
        (pair) => pair.GroupId,
      ).filter((groupId): groupId is string => groupId !== undefined);
      rule.description = permission.UserIdGroupPairs[0].Description;
    }

    return rule;
  });
}

/**
 * Compare two IpPermission objects for equality
 */
function ipPermissionsEqual(a: IpPermission, b: IpPermission): boolean {
  return (
    a.IpProtocol === b.IpProtocol &&
    a.FromPort === b.FromPort &&
    a.ToPort === b.ToPort &&
    JSON.stringify(a.IpRanges?.sort()) === JSON.stringify(b.IpRanges?.sort()) &&
    JSON.stringify(a.UserIdGroupPairs?.sort()) ===
      JSON.stringify(b.UserIdGroupPairs?.sort())
  );
}
