import createClient, {
  type ClientPathsWithMethod,
  type MaybeOptionalInit,
  type MethodResponse,
} from "openapi-fetch";
import type { HttpMethod, RequiredKeysOf } from "openapi-typescript-helpers";
import type { paths } from "./types.ts";

// Extracted from openapi-fetch/dist/index.d.mts
//
// The final init param to accept.
// - Determines if the param is optional or not.
// - Performs arbitrary [key: string] addition.
// Note: the addition MUST happen after all the inference happens (otherwise TS can’t infer if init is required or not).
type InitParam<Init> = RequiredKeysOf<Init> extends never
  ? [(Init & { [key: string]: unknown })?]
  : [Init & { [key: string]: unknown }];

type ParamsOf<
  P extends keyof paths,
  M extends HttpMethod,
  W extends "query" | "path" | "body",
> = W extends "query"
  ? // @ts-expect-error: dyncamically inferred on usage
    NonNullable<paths[P][M]["parameters"]["query"]>
  : W extends "path"
    ? // @ts-expect-error: dyncamically inferred on usage
      NonNullable<paths[P][M]["parameters"]["path"]>
    : // @ts-expect-error: dyncamically inferred on usage
      NonNullable<paths[P][M]["requestBody"]["content"]["application/json"]>;

export function createDockerApi() {
  const client = createClient<paths>({
    baseUrl: "http://localhost:10000",
    fetch(input) {
      if (typeof Bun !== "undefined") {
        // @ts-ignore: Bun specific
        input.unix = "/var/run/docker.sock";
      }

      return fetch(input.url, input);
    },
  });

  // TODO(manuel): Make base fetch function for the logic and use the GET, POST, ...
  // functions for typing only (current sole purpose)

  const GET = async <
    T extends ClientPathsWithMethod<typeof client, "get">,
    Init extends MaybeOptionalInit<paths[T], "get">,
  >(
    path: T,
    ...init: InitParam<Init>
  ): Promise<MethodResponse<typeof client, "get", T>> => {
    // @ts-ignore: dyncamically inferred on usage
    const { data, error, response } = await client.GET(path, ...init);

    if (error) {
      throw new Error(
        `Failed to GET ${path}: ${response?.status} ${response?.statusText}: ${JSON.stringify(error, null, 2)}`,
      );
    }

    return data as NonNullable<MethodResponse<typeof client, "get", T>>;
  };

  const POST = async <
    T extends ClientPathsWithMethod<typeof client, "post">,
    Init extends MaybeOptionalInit<paths[T], "post">,
  >(
    path: T,
    ...init: InitParam<Init>
  ): Promise<MethodResponse<typeof client, "post", T>> => {
    // @ts-ignore: dyncamically inferred on usage

    const { data, error, response } = await client.POST(path, ...init);

    if (error) {
      throw new Error(
        `Failed to POST ${path}: ${response?.status} ${response?.statusText}: ${JSON.stringify(error, null, 2)}`,
      );
    }

    return data as NonNullable<MethodResponse<typeof client, "post", T>>;
  };

  const DELETE = async <
    T extends ClientPathsWithMethod<typeof client, "delete">,
    Init extends MaybeOptionalInit<paths[T], "delete">,
  >(
    path: T,
    ...init: InitParam<Init>
  ): Promise<MethodResponse<typeof client, "delete", T>> => {
    // @ts-ignore: dyncamically inferred on usage
    const { data, error, response } = await client.DELETE(path, ...init);

    if (error) {
      throw new Error(
        `Failed to DELETE ${path}: ${response?.status} ${response?.statusText}: ${JSON.stringify(error, null, 2)}`,
      );
    }

    return data as NonNullable<MethodResponse<typeof client, "delete", T>>;
  };

  return {
    containers: {},
    network: (nameOrId: ParamsOf<"/networks/{id}", "get", "path">) => ({
      inspect: async (params?: InspectNetworkParams) => {
        const network = await GET("/networks/{id}", {
          params: {
            path: { id: nameOrId.id },
            query: { verbose: params?.verbose },
          },
        });

        return network as Omit<typeof network, "Name"> &
          Required<Pick<typeof network, "Name">>;
      },
      remove: () =>
        DELETE("/networks/{id}", {
          params: {
            path: { id: nameOrId.id },
          },
        }),
    }),
    networks: {
      // TODO(manuel): Implement filters query param
      list: (params?: ListNetworksParams) =>
        GET("/networks", {
          params: { query: { filters: params?.filters } },
        }),
      create: (params: NetworkCreateParams) =>
        POST("/networks/create", {
          body: {
            Name: params.Name,
            Driver: params.Driver,
            Labels: params.Labels,
            EnableIPv4: params.EnableIPv4,
            EnableIPv6: params.EnableIPv6,
          },
        }),
      // TODO(manuel): Implement filters query param
      prune: () => POST("/networks/prune"),
    },
  };
}

interface InspectNetworkParams
  extends ParamsOf<"/networks/{id}", "get", "query"> {}

interface ListNetworksParams extends ParamsOf<"/networks", "get", "query"> {}

interface NetworkCreateParams
  extends ParamsOf<"/networks/create", "post", "body"> {}

// const createPicker =
//   <
//     P extends keyof paths,
//     M extends HttpMethod,
//     W extends "query" | "path" | "body",
//     K extends (W extends "query"
//       ? // @ts-expect-error: dyncamically inferred on usage
//         keyof NonNullable<paths[P][M]["parameters"]["query"]>
//       : W extends "path"
//         ? // @ts-expect-error: dyncamically inferred on usage
//           keyof NonNullable<paths[P][M]["parameters"]["path"]>
//         : keyof NonNullable<
//             // @ts-ignore: dyncamically inferred on usage
//             paths[P][M]["requestBody"]["content"]["application/json"]
//           >)[],
//   >(
//     path: P,
//     method: M,
//     type: W,
//     keys: K,
//   ) =>
//   (
//     params: W extends "query"
//       ? // @ts-expect-error: dyncamically inferred on usage
//         NonNullable<paths[P][M]["parameters"]["query"]>
//       : W extends "path"
//         ? // @ts-expect-error: dyncamically inferred on usage
//           NonNullable<paths[P][M]["parameters"]["path"]>
//         : NonNullable<
//             // @ts-ignore: dyncamically inferred on usage
//             paths[P][M]["requestBody"]["content"]["application/json"]
//           >,
//     // @ts-ignore: dyncamically inferred on usage
//   ): Pick<typeof params, K[number]> =>
//     // @ts-ignore: dyncamically inferred on usage
//     Object.fromEntries(
//       Object.entries(params).filter(([key]) => keys.includes(key as K[number])),
//     );

// type ListNetworksParams = PickQueryParam<"/networks", "get", "filters">;

// const pickNetworkCreateParams = createPicker("/networks/create", "post", [
//   "Name",
//   "Driver",
//   "Labels",
//   "EnableIPv4",
//   "EnableIPv6",
// ] as const);
// type NetworkCreateParams = ReturnType<typeof pickNetworkCreateParams>;

// class DockerHttpClient {
//   constructor(private props: DockerHttpClientProps) {}

//   /**
//    * Make a fetch request to the Cloudflare API
//    *
//    * @param path API path (without base URL)
//    * @param init Fetch init options
//    * @returns Raw Response object from fetch
//    */
//   async fetch(path: string, init: RequestInit = {}): Promise<Response> {
//     let headers: Record<string, string> = {};
//     if (Array.isArray(init.headers)) {
//       init.headers.forEach(([key, value]) => {
//         headers[key] = value;
//       });
//     } else if (init.headers instanceof Headers) {
//       init.headers.forEach((value, key) => {
//         headers[key] = value;
//       });
//     } else if (init.headers) {
//       headers = init.headers;
//     }

//     // Use withExponentialBackoff for automatic retry on network errors
//     return withExponentialBackoff(
//       async () => {
//         const response = await fetch(`http://localhost${path}`, {
//           ...init,
//           unix: this.props.socketPath,
//           headers,
//         });

//         if (response.status.toString().startsWith("5")) {
//           throw new InternalError(response.statusText);
//         }
//         return response;
//       },
//       // transient errors should be retried aggressively
//       (error) => error instanceof InternalError,
//       10, // Maximum 10 attempts (1 initial + 9 retries)
//       1000, // Start with 1s delay, will exponentially increase
//     );
//   }

//   async get(path: string, init: RequestInit = {}): Promise<Response> {
//     return this.fetch(path, { ...init, method: "GET" });
//   }

//   // async post(path: string, body: any, init: RequestInit = {}): Promise<Response> {
//   //   return this.fetch(path, { ...init, method: "POST", body });
//   // }

//   // async put(path: string, body: any, init: RequestInit = {}): Promise<Response> {
//   //   return this.fetch(path, { ...init, method: "PUT", body });
//   // }

//   // async delete(path: string, init: RequestInit = {}): Promise<Response> {
//   //   return this.fetch(path, { ...init, method: "DELETE" });
//   // }
// }

// class InternalError extends Error {}

// console.log(
//   await new DockerHttpClient({ socketPath: "/var/run/docker.sock" })
//     .fetch("/info")
//     .then((r) => r.json()),
// );
