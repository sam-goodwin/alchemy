// import type { Context } from "../../context.ts";
// import { Resource } from "../../resource.ts";
// import { createDockerApi } from "./api.ts";

// export type DockerHostProps = {
//   /**
//    * The endpoint to connect to the Docker daemon.
//    * @example
//    * - `unix:///var/run/docker.sock`
//    * - `tcp://127.0.0.1:2375`
//    * - `http://127.0.0.1:2375`
//    * - `https://127.0.0.1:2375`
//    * - `http://127.0.0.1:2375/v1`
//    */
//   endpoint: string;
// };

// export type DockerHost = Resource<"docker::api::Host">;

// export const DockerHost = Resource(
//   "docker::api::Host",
//   async function (
//     this: Context<DockerHost>,
//     _id: string,
//     props: DockerHostProps,
//   ) {
//     const docker = createDockerApi();

//     return this({});
//   },
// );
