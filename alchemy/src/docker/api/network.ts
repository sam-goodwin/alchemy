import type { Context } from "../../context.ts";
import { Resource } from "../../resource.ts";
import type { MarkAsRequired } from "../type-utils.ts";
import { createDockerApi } from "./api.ts";
import type { components } from "./types.ts";

type Network = MarkAsRequired<components["schemas"]["Network"], "name"> &
  Resource<"docker::with-api::Network">;

export type NetworkProps = Required<Pick<Network, "name">> &
  Pick<Network, "driver" | "labels">;

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
        await docker.network({ id: props.name }).remove();
      } catch {
      } finally {
        try {
          await docker.network({ id: props.name }).inspect();
        } catch {}
      }
      return this.destroy();
    }

    if (this.phase === "update") {
      if (this.output.name !== props.name) {
        return this.replace();
      }
      return this(this.output);
    }

    const { id } = await docker.networks.create({
      name: props.name,
      driver: props.driver,
      labels: props.labels,
    });
    const network = await docker.network({ id }).inspect();
    return this(network);
  },
);
