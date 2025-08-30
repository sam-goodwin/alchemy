import { createDockerApi } from "../../../src/docker/api/index.ts";

const docker = createDockerApi();
console.log(await docker.networks.list());

// import { inspect } from "node:util";
// import { Agent } from "undici";

// const socket = "/var/run/docker.sock";
// const url = "http://localhost:2375/networks";
// console.log(
//   inspect(
//     await fetch(url, {
//       method: "GET",
//       // unix: socket,
//       // socketPath: socket,
//       dispatcher: new Agent({
//         socketPath: socket,
//       }),
//     }),
//     { depth: 10, colors: true },
//   ),
// );

// import alchemy from "alchemy";
// const app = await alchemy("sandbox");

// // ------------------------------------------------------------

// import { DockerHost, Network } from "alchemy/docker/api";

// const dockerHost = await DockerHost("docker", {
//   endpoint: "unix:///var/run/docker.sock",
// });

// const publicNetwork = await Network("public", {
//   Name: "public",
// });
// const privateNetwork = await Network("private", {
//   context: dockerHost,
//   Name: "privates",
// });

// // const whoamiImage = await Image("whoami", {

// // });

// // const whoamiContainer = await Container("whoami", {
// //   Network: [publicNetwork, privateNetwork],
// //   Image: whoamiImage,
// // });

// // const nginxContainer = await Container("nginx", {
// //   Network: [publicNetwork, privateNetwork],
// //   Image: nginxImage,
// // });

// // ------------------------------------------------------------

// await app.finalize();
