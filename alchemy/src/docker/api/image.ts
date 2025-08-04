// import type { Context } from "../../context.ts";
// import { Resource } from "../../resource.ts";
// import { createDockerApi } from "./api.ts";
// import type { components } from "./types.ts";

// export type Image = components["schemas"]["ImageInspect"] &
//   Resource<"docker::with-api::Image">;

// export type ImageProps = Required<Pick<Image, "Id">>;

// export const Image = Resource(
//   "docker::api::Image",
//   async function (
//     this: Context<Image>,
//     _id: string,
//     props: ImageProps,
//   ): Promise<Image> {
//     const docker = createDockerApi();

//     //   if (this.phase === "delete") {
//     //     try {
//     //       await docker.image({ id: props.Id }).remove();
//     //     } catch {
//     //     } finally {
//     //       try {}
//     //     }
//     //   }

//     return this({});
//   },
// );
