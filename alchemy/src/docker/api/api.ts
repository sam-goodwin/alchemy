// import createClient, {
//   type ClientPathsWithMethod,
//   type MaybeOptionalInit,
//   type MethodResponse,
// } from "openapi-fetch";
// import type { HttpMethod, RequiredKeysOf } from "openapi-typescript-helpers";
// import { Agent } from "undici";
// import type { paths } from "./types.ts";

// // Extracted from openapi-fetch/dist/index.d.mts
// //
// // The final init param to accept.
// // - Determines if the param is optional or not.
// // - Performs arbitrary [key: string] addition.
// // Note: the addition MUST happen after all the inference happens (otherwise TS can't infer if init is required or not).
// type InitParam<Init> = RequiredKeysOf<Init> extends never
//   ? [(Init & { [key: string]: unknown })?]
//   : [Init & { [key: string]: unknown }];

// type ParamsOf<
//   P extends keyof paths,
//   M extends HttpMethod,
//   W extends "query" | "path" | "body",
// > = W extends "query"
//   ? // @ts-expect-error: dyncamically inferred on usage
//     NonNullable<paths[P][M]["parameters"]["query"]>
//   : W extends "path"
//     ? // @ts-expect-error: dyncamically inferred on usage
//       NonNullable<paths[P][M]["parameters"]["path"]>
//     : // @ts-expect-error: dyncamically inferred on usage
//       NonNullable<paths[P][M]["requestBody"]["content"]["application/json"]>;

// export function createDockerApi() {
//   const agent = new Agent({
//     socketPath: "/var/run/docker.sock",
//   });
//   const client = createClient<paths>({
//     baseUrl: "http://localhost:10000",
//     fetch(input) {
//       if (typeof Bun !== "undefined") {
//         // @ts-ignore: Bun specific
//         input.unix = "/var/run/docker.sock";
//       } else {
//         // @ts-ignore: dispatcher may not be typed but we know it's there
//         input.dispatcher = agent;
//       }

//       return fetch(input.url, input);
//     },
//   });

//   const createRequestFn = <M extends HttpMethod>(method: M) => {
//     return async <
//       T extends ClientPathsWithMethod<typeof client, M>,
//       Init extends MaybeOptionalInit<paths[T], M>,
//     >(
//       path: T,
//       ...init: InitParam<Init>
//     ): Promise<MethodResponse<typeof client, M, T>> => {
//       // @ts-ignore: dyncamically inferred on usage, each function is typed differently
//       const { data, error, response } = await client[method.toUpperCase()](
//         path,
//         ...init,
//       );

//       if (error) {
//         throw new Error(
//           `Failed to ${method} ${path}: ${response?.status} ${response?.statusText}: ${JSON.stringify(error, null, 2)}`,
//         );
//       }

//       return data as NonNullable<MethodResponse<typeof client, M, T>>;
//     };
//   };

//   const GET = createRequestFn("get");
//   const POST = createRequestFn("post");
//   const DELETE = createRequestFn("delete");

//   return {
//     containers: {},

//     // Images
//     images: {
//       list: (params: ListImagesParams) =>
//         GET("/images/json", {
//           params: {
//             query: {
//               ...params,
//               filters: parseFilters(params?.filters, {
//                 known: {
//                   before: {},
//                   dangling: {},
//                   label: { labels: true },
//                   reference: {},
//                   since: {},
//                   until: {},
//                 },
//               }),
//             },
//           },
//         }),
//     },

//     // Networks
//     network: (nameOrId: ParamsOf<"/networks/{id}", "get", "path">) => ({
//       inspect: async (params?: InspectNetworkParams) => {
//         const network = await GET("/networks/{id}", {
//           params: {
//             path: { id: nameOrId.id },
//             query: { verbose: params?.verbose },
//           },
//         });

//         return network as Omit<typeof network, "name"> &
//           Required<Pick<typeof network, "name">>;
//       },
//       remove: () =>
//         DELETE("/networks/{id}", {
//           params: {
//             path: { id: nameOrId.id },
//           },
//         }),
//     }),
//     networks: {
//       // TODO(manuel): Implement filters query param
//       list: (params?: ListNetworksParams) =>
//         GET("/networks", {
//           params: { query: { filters: params?.filters } },
//         }),
//       create: (params: NetworkCreateParams) =>
//         POST("/networks/create", {
//           body: params,
//         }),
//       // TODO(manuel): Implement filters query param
//       prune: () => POST("/networks/prune"),
//     },
//   };
// }

// type FilterOptions = {
//   // /**
//   //  * If false, will not wrap the value in an array if it is not already an array.
//   //  * Use it for filters that accept single values.
//   //  * @default true
//   //  */
//   // wrap?: boolean;

//   // /**
//   //  * If true, will stringify the value.
//   //  * @default true
//   //  */
//   // stringify?: boolean;

//   /**
//    * If true, will parse the value as a label filter.
//    * @default false
//    */
//   labels?: boolean;
// };

// function parseFilters<Filters extends Record<string, any> | undefined>(
//   filters?: Filters | string,
//   properties?: {
//     known?: {
//       [K in keyof Filters]: FilterOptions;
//     };
//     unknown?: FilterOptions;
//   },
// ): string | undefined {
//   if (filters === undefined) return undefined;
//   if (typeof filters === "string") return filters;

//   for (let [key, value] of Object.entries(filters)) {
//     if (properties?.known?.[key as keyof Filters]) {
//       // const options = properties.known[key as keyof Filters];
//       // const shouldWrap = options.wrap ?? true;
//       // const shouldStringify = options.stringify ?? true;

//       if (/* shouldStringify && */ typeof value !== "string") {
//         if (value instanceof Date) {
//           value = value.toISOString();
//         } else if (Array.isArray(value)) {
//           value = value.map((v) => `${v}`);
//         } else if (properties.known[key as keyof Filters]?.labels) {
//           value = parseLabelFilter(value);
//         } else {
//           value = `${value}`;
//         }
//       }

//       if (/* shouldWrap && */ !Array.isArray(value)) {
//         filters[key] = [value];
//       } else {
//         filters[key] = value;
//       }

//       continue;
//     }

//     // const options = properties?.unknown ?? { wrap: true, stringify: true };
//     // const shouldWrap = options.wrap ?? true;
//     // const shouldStringify = options.stringify ?? true;

//     if (typeof value !== "string") {
//       if (value instanceof Date) {
//         value = value.toISOString();
//       } else if (Array.isArray(value)) {
//         value = value.map((v) => `${v}`);
//       } else {
//         value = `${value}`;
//       }
//     }

//     if (!Array.isArray(value)) {
//       filters[key] = [value];
//     }
//   }

//   return JSON.stringify(filters);
// }

// function parseLabelFilter(label: string | Record<string, any>) {
//   if (typeof label === "string") {
//     return label;
//   }

//   return Object.entries(label)
//     .flatMap(([key, value]) => {
//       if (typeof value === "string") {
//         return `${key}=${value}`;
//       } else if (Array.isArray(value)) {
//         return value.map((v) => `${key}=${v}`);
//       } else if (value === true) {
//         return key;
//       } else if (value instanceof Date) {
//         return `${key}=${value.toISOString()}`;
//       }

//       return `${key}=${value}`;
//     })
//     .filter(Boolean);
// }

// // Images

// interface ListImagesParams
//   extends Omit<ParamsOf<"/images/json", "get", "query">, "filters"> {
//   /** @description A JSON encoded value of the filters (a `map[string][]string`) to
//    *     process on the images list.
//    *
//    *     Available filters:
//    *     - `before`=(`<image-name>[:<tag>]`,  `<image id>` or `<image@digest>`)
//    *     - `dangling=true`
//    *     - `label=key` or `label="key=value"` of an image label
//    *     - `reference`=(`<image-name>[:<tag>]`)
//    *     - `since`=(`<image-name>[:<tag>]`,  `<image id>` or `<image@digest>`)
//    *     - `until=<timestamp>`
//    *      */
//   filters?:
//     | {
//         /** @description Filter for dangling images only.
//          * When set to `true`, returns only images that are not tagged and not referenced by any container.
//          */
//         dangling?: boolean;
//         /** @description Filter images by reference (name and tag).
//          * Specified as `<image-name>[:<tag>]` where:
//          * - `<image-name>` is the name of the image
//          * - `[:<tag>]` is an optional tag (if omitted, matches all tags for the image)
//          * Multiple references can be specified as an array.
//          * You can use the `*` wildcard to match any string of characters or '?' to match a single character.
//          * @example
//          * - `nginx` - Filter images named `nginx`
//          * - `nginx:latest` - Filter images named `nginx` with the tag `latest`
//          * - `nginx:*` - Filter images named `nginx` with any tag
//          * - `nginx:*-alpine` - Filter images named `nginx` with a tag that ends with `alpine`
//          * - `*:1.*` - Filter all images with a tag that starts with `1.`
//          * - `*:1.?.?` - Filter all images with a tag that starts with `1.` and has two more characters
//          */
//         reference?: string | string[];
//         /** @description Filter images created before a specific image.
//          * Can be specified as:
//          * - `<image-name>[:<tag>]` - Filter images created before the specified image name and tag
//          * - `<image id>` - Filter images created before the specified image ID
//          * - `<image@digest>` - Filter images created before the specified image digest
//          */
//         before?: string[];
//         /** @description Filter images created since a specific image.
//          * Can be specified as:
//          * - `<image-name>[:<tag>]` - Filter images created since the specified image name and tag
//          * - `<image id>` - Filter images created since the specified image ID
//          * - `<image@digest>` - Filter images created since the specified image digest
//          */
//         since?: string | string[];
//         /** @description Filter images created before a specific timestamp.
//          * Can be specified as a Unix timestamp (seconds since epoch), a date string or ISO 8601 date string.
//          */
//         until?: string | number | Date;
//         /** @description Filter images by label.
//          * Can be specified as:
//          * - `key` - Filter images that have a label with the specified key
//          * - `"key=value"` - Filter images that have a label with the specified key-value pair
//          * Multiple labels can be specified as an array.
//          * An object can be used to filter images by multiple labels (for checking presence of labels use `true` as value).
//          * @example
//          * - `label=key` - Filter images that have a label with the specified key
//          * - `["key1", "key2"]` - Filter images that have a label with the specified keys
//          * - `{ key1: "value1", key2: "value2" }` - Filter images that have a label with the specified key-value pairs
//          * - `{ key1: "value1", key2: true }` - Filter images that have a label with the specified key-value pairs
//          */
//         label?: string | string[] | Record<string, string | true | Date>;
//         /** @description Additional filter properties not explicitly defined.
//          * Any other filter property should be a string array.
//          */
//         [key: string]: any;
//       }
//     | string;
// }

// // Network
// interface InspectNetworkParams
//   extends ParamsOf<"/networks/{id}", "get", "query"> {}

// interface ListNetworksParams extends ParamsOf<"/networks", "get", "query"> {}

// interface NetworkCreateParams
//   extends ParamsOf<"/networks/create", "post", "body"> {}

// // const createPicker =
// //   <
// //     P extends keyof paths,
// //     M extends HttpMethod,
// //     W extends "query" | "path" | "body",
// //     K extends (W extends "query"
// //       ? // @ts-expect-error: dyncamically inferred on usage
// //         keyof NonNullable<paths[P][M]["parameters"]["query"]>
// //       : W extends "path"
// //         ? // @ts-expect-error: dyncamically inferred on usage
// //           keyof NonNullable<paths[P][M]["parameters"]["path"]>
// //         : keyof NonNullable<
// //             // @ts-ignore: dyncamically inferred on usage
// //             paths[P][M]["requestBody"]["content"]["application/json"]
// //           >)[],
// //   >(
// //     path: P,
// //     method: M,
// //     type: W,
// //     keys: K,
// //   ) =>
// //   (
// //     params: W extends "query"
// //       ? // @ts-expect-error: dyncamically inferred on usage
// //         NonNullable<paths[P][M]["parameters"]["query"]>
// //       : W extends "path"
// //         ? // @ts-expect-error: dyncamically inferred on usage
// //           NonNullable<paths[P][M]["parameters"]["path"]>
// //         : NonNullable<
// //             // @ts-ignore: dyncamically inferred on usage
// //             paths[P][M]["requestBody"]["content"]["application/json"]
// //           >,
// //     // @ts-ignore: dyncamically inferred on usage
// //   ): Pick<typeof params, K[number]> =>
// //     // @ts-ignore: dyncamically inferred on usage
// //     Object.fromEntries(
// //       Object.entries(params).filter(([key]) => keys.includes(key as K[number])),
// //     );

// // type ListNetworksParams = PickQueryParam<"/networks", "get", "filters">;

// // const pickNetworkCreateParams = createPicker("/networks/create", "post", [
// //   "Name",
// //   "Driver",
// //   "Labels",
// //   "EnableIPv4",
// //   "EnableIPv6",
// // ] as const);
// // type NetworkCreateParams = ReturnType<typeof pickNetworkCreateParams>;

// // class DockerHttpClient {
// //   constructor(private props: DockerHttpClientProps) {}

// //   /**
// //    * Make a fetch request to the Cloudflare API
// //    *
// //    * @param path API path (without base URL)
// //    * @param init Fetch init options
// //    * @returns Raw Response object from fetch
// //    */
// //   async fetch(path: string, init: RequestInit = {}): Promise<Response> {
// //     let headers: Record<string, string> = {};
// //     if (Array.isArray(init.headers)) {
// //       init.headers.forEach(([key, value]) => {
// //         headers[key] = value;
// //       });
// //     } else if (init.headers instanceof Headers) {
// //       init.headers.forEach((value, key) => {
// //         headers[key] = value;
// //       });
// //     } else if (init.headers) {
// //       headers = init.headers;
// //     }

// //     // Use withExponentialBackoff for automatic retry on network errors
// //     return withExponentialBackoff(
// //       async () => {
// //         const response = await fetch(`http://localhost${path}`, {
// //           ...init,
// //           unix: this.props.socketPath,
// //           headers,
// //         });

// //         if (response.status.toString().startsWith("5")) {
// //           throw new InternalError(response.statusText);
// //         }
// //         return response;
// //       },
// //       // transient errors should be retried aggressively
// //       (error) => error instanceof InternalError,
// //       10, // Maximum 10 attempts (1 initial + 9 retries)
// //       1000, // Start with 1s delay, will exponentially increase
// //     );
// //   }

// //   async get(path: string, init: RequestInit = {}): Promise<Response> {
// //     return this.fetch(path, { ...init, method: "GET" });
// //   }

// //   // async post(path: string, body: any, init: RequestInit = {}): Promise<Response> {
// //   //   return this.fetch(path, { ...init, method: "POST", body });
// //   // }

// //   // async put(path: string, body: any, init: RequestInit = {}): Promise<Response> {
// //   //   return this.fetch(path, { ...init, method: "PUT", body });
// //   // }

// //   // async delete(path: string, init: RequestInit = {}): Promise<Response> {
// //   //   return this.fetch(path, { ...init, method: "DELETE" });
// //   // }
// // }

// // class InternalError extends Error {}

// // console.log(
// //   await new DockerHttpClient({ socketPath: "/var/run/docker.sock" })
// //     .fetch("/info")
// //     .then((r) => r.json()),
// // );
