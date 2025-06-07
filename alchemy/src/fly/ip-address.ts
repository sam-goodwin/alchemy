import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { handleApiError } from "./api-error.ts";
import { createFlyApi, type FlyApiOptions } from "./api.ts";
import type { App } from "./app.ts";

/**
 * Properties for creating or updating a Fly.io IP address
 */
export interface IpAddressProps extends FlyApiOptions {
  /**
   * App this IP address belongs to (app name string or App resource)
   */
  app: string | App;

  /**
   * IP address type
   */
  type: "v4" | "v6";

  /**
   * Region where the IP address will be allocated
   * @default "global"
   */
  region?: string;

  /**
   * Whether this is a shared IP address
   * @default false
   */
  shared?: boolean;
}

/**
 * A Fly.io static IP address
 */
export interface IpAddress
  extends Resource<"fly::IpAddress">,
    Omit<IpAddressProps, "apiToken"> {
  /**
   * The ID of the IP address
   */
  id: string;

  /**
   * The IP address value
   */
  address: string;

  /**
   * IP address type (v4 or v6)
   */
  type: "v4" | "v6";

  /**
   * Region where the IP address is allocated
   */
  region: string;

  /**
   * Time at which the IP address was created
   */
  created_at: string;

  /**
   * Whether this is a shared IP address
   */
  shared: boolean;

  /**
   * Network information
   */
  network?: string;
}

/**
 * Creates a Fly.io static IP address for applications.
 *
 * @example
 * ## Create a static IPv4 address
 *
 * Create a static IPv4 address for your application:
 *
 * ```ts
 * const ipv4 = await IpAddress("static-ipv4", {
 *   app: "my-app",
 *   type: "v4"
 * });
 * ```
 *
 * @example
 * ## Create regional IP addresses
 *
 * Create IP addresses in specific regions:
 *
 * ```ts
 * const eastCoastIp = await IpAddress("east-ip", {
 *   app: myApp,
 *   type: "v4",
 *   region: "iad"
 * });
 *
 * const westCoastIp = await IpAddress("west-ip", {
 *   app: myApp,
 *   type: "v4",
 *   region: "sea"
 * });
 * ```
 *
 * @example
 * ## Create both IPv4 and IPv6 addresses
 *
 * Create both types of IP addresses for full connectivity:
 *
 * ```ts
 * const ipv4 = await IpAddress("app-ipv4", {
 *   app: myApp,
 *   type: "v4"
 * });
 *
 * const ipv6 = await IpAddress("app-ipv6", {
 *   app: myApp,
 *   type: "v6"
 * });
 * ```
 */
export const IpAddress = Resource(
  "fly::IpAddress",
  async function (
    this: Context<IpAddress>,
    id: string,
    props: IpAddressProps,
  ): Promise<IpAddress> {
    const api = createFlyApi(props);
    const appName = typeof props.app === "string" ? props.app : props.app.name;
    const ipAddressId = this.output?.id;

    if (this.phase === "delete") {
      try {
        if (ipAddressId) {
          const deleteResponse = await api.delete(
            `/apps/${appName}/ip-addresses/${ipAddressId}`
          );
          if (!deleteResponse.ok && deleteResponse.status !== 404) {
            await handleApiError(deleteResponse, "deleting", "IP address", ipAddressId);
          }
        }
      } catch (error) {
        console.error(`Error deleting Fly.io IP address ${ipAddressId}:`, error);
        throw error;
      }
      return this.destroy();
    }

    try {
      let ipData: any;

      if (this.phase === "update" && ipAddressId) {
        // IP addresses are generally immutable, just get current data
        const getResponse = await api.get(`/apps/${appName}/ip-addresses/${ipAddressId}`);
        if (!getResponse.ok) {
          await handleApiError(getResponse, "getting", "IP address", ipAddressId);
        }
        ipData = await getResponse.json();
      } else {
        // Create new IP address
        const createPayload: any = {
          type: props.type,
        };

        if (props.region && props.region !== "global") {
          createPayload.region = props.region;
        }

        if (props.shared !== undefined) {
          createPayload.shared = props.shared;
        }

        const createResponse = await api.post(
          `/apps/${appName}/ip-addresses`,
          createPayload
        );

        if (!createResponse.ok) {
          await handleApiError(createResponse, "creating", "IP address", `${props.type}`);
        }

        ipData = await createResponse.json();

        // IP addresses are allocated immediately, no need to wait
      }

      return this({
        id: ipData.id,
        address: ipData.address,
        type: ipData.type,
        region: ipData.region || "global",
        created_at: ipData.created_at,
        shared: ipData.shared || false,
        network: ipData.network,
        // Pass through props
        app: props.app,
        baseUrl: props.baseUrl,
      });
    } catch (error) {
      console.error(`Error ${this.phase} Fly.io IP address '${id}':`, error);
      throw error;
    }
  },
);