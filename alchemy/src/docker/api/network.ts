import type { Context } from "../../context.ts";
import { Resource } from "../../resource.ts";
import type { DockerHost } from "./_docker-host.ts";
import type { components, paths } from "./types.ts";

export type Network = Resource<"docker::api::Network"> &
  components["schemas"]["Network"];

export type NetworkProps =
  paths["/networks/create"]["post"]["requestBody"]["content"]["application/json"];

export const Network = Resource(
  "docker::api::Network",
  async function (
    this: Context<Network>,
    _id: string,
    props?: NetworkProps,
  ): Promise<Network> {
    const docker = (await this.scope.get("docker-host")) as DockerHost;
    console.log("docker", docker);
    // if (this.phase === "delete") {
    //   try {
    //     await docker.network({ id: props.name }).remove();
    //   } catch {
    //   } finally {
    //     try {
    //       await docker.network({ id: props.name }).inspect();
    //     } catch {}
    //   }
    //   return this.destroy();
    // }

    // if (this.phase === "update") {
    //   if (this.output.Name !== props.name) {
    //     return this.replace();
    //   }
    //   return this(this.output);
    // }

    // const { id } = await docker.networks.create({
    //   name: props.name,
    //   driver: props.driver,
    //   labels: props.labels,
    // });
    // const network = await docker.network({ id }).inspect();
    return this({} as Network);
  },
  {
    listConnected() {
      return [1, 2, 3];
    },
  },
);
