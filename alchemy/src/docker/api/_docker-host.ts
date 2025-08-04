import Dockerode from "dockerode";
import type { Context } from "../../context.ts";
import { Resource } from "../../resource.ts";

// export function DockerHost<T>(
//   id: string,
//   fn: (this: Scope, scope: Scope) => Promise<T>,
// ) {
//   return alchemy.run(id, async function (scope: Scope) {
//     return fn.bind(this)(scope);
//   });
// }

export type DockerHostProps = {
  /**
   * The URL of the Docker daemon.
   * @example
   * - `unix:///var/run/docker.sock`
   * - `tcp://127.0.0.1:2375`
   * - `http://127.0.0.1:2375`
   * - `https://127.0.0.1:2375`
   * - `http://127.0.0.1:2375/v1`
   */
  url?: string;
};

export type DockerHost = Resource<"docker::api::Host">;

export const DockerHost = Resource(
  "docker::api::Host",
  async function (
    this: Context<DockerHost>,
    _id: string,
    props?: DockerHostProps,
  ) {
    let url = new URL(props?.url ?? "unix:///var/run/docker.sock");
    let socketPath;
    if (url.protocol === "unix:") {
      socketPath = url.pathname;
    } else {
      url.protocol = "http:";
      url.port = url.port ?? "2375";
    }
    url.pathname = "";

    this.scope.set(
      "docker-host",
      new Dockerode({
        socketPath,
        host: url.host,
        port: url.port,
        protocol: url.protocol as "http" | "https" | "ssh",
      }),
    );
    return this({});
  },
);
