import type { Context } from "../../context.ts";
import { Resource } from "../../resource.ts";
import type { MarkAsRequired } from "../type-utils.ts";
import { createDockerApi } from "./api.ts";
import type { components } from "./types.ts";

type Network = MarkAsRequired<components["schemas"]["Network"], "Name"> &
  Resource<"docker::with-api::Network">;

export type NetworkProps = Required<Pick<Network, "Name">> &
  Pick<Network, "Driver" | "Labels">;

export const Network = Resource(
  "docker::api::Network",
  async function (
    this: Context<Network>,
    _id: string,
    props: NetworkProps,
  ): Promise<Network> {
    const docker = createDockerApi();
    if (this.phase === "delete") {
      try {
        await docker.network({ id: props.Name }).remove();
      } catch {
      } finally {
        try {
          await docker.network({ id: props.Name }).inspect();
        } catch {}
      }
      return this.destroy();
    }

    if (this.phase === "update") {
      if (this.output.Name !== props.Name) {
        this.replace();
      }
    }

    const { Id: id } = await docker.networks.create({
      Name: props.Name,
      Driver: props.Driver,
      Labels: props.Labels,
    });
    const network = await docker.network({ id }).inspect();
    return this(network);
  },
);
