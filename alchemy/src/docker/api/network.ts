import type Dockerode from "dockerode";
import type { NetworkCreateOptions } from "dockerode";
import { inspect } from "node:util";
import type { Context } from "../../context.ts";
import { Resource } from "../../resource.ts";
import { diff } from "../../util/diff.ts";
import { logger } from "../../util/logger.ts";
import { createDockerApi } from "./api.ts";
import type { MarkOptional } from "./types.ts";

/**
 * Properties for creating a Docker network
 */
export interface NetworkProps
  extends MarkOptional<Dockerode.NetworkCreateOptions, "Name"> {}

/**
 * Docker Network resource
 */
export interface Network
  extends Resource<"docker::api::Network">,
    Dockerode.NetworkInspectInfo {}

/**
 * Create and manage a Docker Network
 * @see https://docs.docker.com/engine/network/
 */
export const Network = Resource(
  "docker::api::Network",
  async function (
    this: Context<Network>,
    _id: string,
    props: NetworkProps = {},
  ): Promise<Network> {
    // Initialize Docker API client
    const { dockerode: api } = createDockerApi();

    const networkName = props.Name ?? this.id;

    const existingNetwork = (await api
      .getNetwork(networkName)
      .inspect()
      .catch(() => null)) as Network | null;

    if (this.phase === "delete") {
      if (existingNetwork) {
        await disconnectAll(api, existingNetwork.Id);
        await api.getNetwork(existingNetwork.Id).remove();
      }

      return this.destroy();
    }

    const expectedNetwork: NetworkCreateOptions = {
      Name: networkName,
      Scope: props.Scope ?? existingNetwork?.Scope ?? "local",
      Internal: props.Internal ?? existingNetwork?.Internal ?? false,
      Attachable: props.Attachable ?? existingNetwork?.Attachable ?? false,
      Ingress: props.Ingress ?? existingNetwork?.Ingress ?? false,
      EnableIPv6: props.EnableIPv6 ?? existingNetwork?.EnableIPv6 ?? false,
      Driver: props.Driver ?? existingNetwork?.Driver ?? "bridge",
      Options: props.Options ?? existingNetwork?.Options ?? {},
      Labels: props.Labels ?? existingNetwork?.Labels ?? {},
      IPAM: {
        Driver:
          props.IPAM?.Driver ?? existingNetwork?.IPAM?.Driver ?? "default",
      },
    };

    // In some Docker Engine versions, EnableIPv4 is not present even if the engine supports v1.47 where
    // this property was introduced.
    if (existingNetwork && "EnableIPv4" in existingNetwork) {
      // @ts-expect-error - Dockerode types are not up to date
      expectedNetwork.EnableIPv4 =
        props.EnableIPv4 ?? existingNetwork?.EnableIPv4 ?? true;
    }

    if (this.phase === "update" && existingNetwork) {
      // For existing networks, we need to remove the network and create it again
      // We can't take advantage of alchemy's replace() because it behaves in
      // the create-then-destroy way.

      const preserveIp = shouldPreserveIp(existingNetwork, expectedNetwork);

      logger.task(this.fqn, {
        prefix: "disconnect",
        prefixColor: "yellowBright",
        resource: this.id,
        message: `Disconnecting containers from network ${existingNetwork.Name}`,
        status: "pending",
      });

      // Disconnect all containers from the network
      const containersSnapshot = await disconnectAll(api, existingNetwork.Id);

      // Remove the old network
      await api.getNetwork(existingNetwork.Id).remove();
      try {
        await api.createNetwork({
          Name: networkName,
          ...props,
        });
        logger.task(this.fqn, {
          prefix: "reconnect",
          prefixColor: "yellowBright",
          resource: this.id,
          message: `Connecting containers to updated network ${networkName}`,
          status: "pending",
        });
      } catch (e) {
        logger.task(this.fqn, {
          prefix: "reconnect",
          prefixColor: "yellowBright",
          resource: this.id,
          message:
            "Failed to create network with updated properties. Recreating old network and connecting containers to it.",
          status: "pending",
        });
        await api.createNetwork(this.output as NetworkCreateOptions);
        logger.task(this.fqn, {
          prefix: "reconnect",
          prefixColor: "yellowBright",
          resource: this.id,
          message: "Reconnecting containers to old network.",
          status: "pending",
        });
        throw e;
      } finally {
        await reconnectAll(api, networkName, containersSnapshot, preserveIp);
      }

      const createdNetwork = (await api
        .getNetwork(networkName)
        .inspect()) as Network;
      return this(createdNetwork);
    } else if (this.phase === "update") {
      props = this.output;
      logger.task(this.fqn, {
        prefix: "reconnect",
        prefixColor: "yellowBright",
        resource: this.id,
        message:
          "Last attempt to create network with updated properties failed. Recreating old network and connecting containers to it.",
        status: "pending",
      });
    }

    // Create new network
    await api.createNetwork({
      Name: networkName,
      ...props,
    });

    const createdNetwork = (await api
      .getNetwork(networkName)
      .inspect()) as Network;
    return this(createdNetwork);
  },
);

async function disconnectAll(
  api: Dockerode,
  networkName: string,
): Promise<Record<string, Dockerode.NetworkContainer>> {
  const existingNetwork = await api.getNetwork(networkName).inspect();
  const containers = Object.entries(existingNetwork.Containers ?? {});

  // Disconnect all containers from the network
  await Promise.all(
    containers.map(([containerId]) =>
      api
        .getNetwork(existingNetwork.Id)
        .disconnect({
          Container: containerId,
        })
        .catch((error) => {
          logger.warn(
            `Failed to disconnect container ${containerId}:`,
            error.message,
          );
        }),
    ),
  );

  return existingNetwork.Containers;
}

async function reconnectAll(
  api: Dockerode,
  networkName: string,
  containersSnapshot: Record<string, Dockerode.NetworkContainer>,
  preserveIp: boolean,
): Promise<void> {
  await Promise.all(
    Object.entries(containersSnapshot).map(async ([containerId]) => {
      const container = containersSnapshot[containerId];

      const endpoint: Dockerode.NetworkConnectOptions["EndpointConfig"] = {
        EndpointID: container.EndpointID,
        MacAddress: container.MacAddress,
        IPAMConfig: preserveIp
          ? {
              IPv4Address: container.IPv4Address.split("/")[0],
              IPv6Address: container.IPv6Address.split("/")[0],
            }
          : undefined,
      };

      await api
        .getNetwork(networkName)
        .connect({ Container: containerId, EndpointConfig: endpoint })
        .catch((error) => {
          logger.warn(
            `Failed to reconnect container ${containerId}:`,
            error.message,
          );
        });
    }),
  );
}

function shouldPreserveIp(existingNetwork: Network, newNetwork: any): boolean {
  const differences = diff(existingNetwork, newNetwork);
  console.log(inspect(differences, { depth: null, colors: true }));
  const reasons: string[] = [];
  const ipInvalidatingProperties = [
    "Scope",
    "Driver",
    "EnableIPv4",
    "EnableIPv6",
    "Internal",
    "Attachable",
    "Ingress",
    "Options",
    "IPAM",
  ];
  for (const property of ipInvalidatingProperties) {
    if (differences.check(property)) {
      reasons.push(`${property} changed`);
    }
  }

  if (differences.check("IPAM.Config")) {
    // TODO: check if IPAM.Config.IPv4Address or IPAM.Config.IPv6Address is different
  }

  if (reasons.length > 0) {
    logger.warn("IP should not be preserved because:", reasons.join(", "));
  }

  return reasons.length === 0;
}
