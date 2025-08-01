import { getPackageManagerRunner } from "../../util/detect-package-manager.ts";
import type { Assets } from "../assets.ts";
import type { Bindings } from "../bindings.ts";
import { Vite, type ViteProps } from "../vite/vite.ts";
import type { Worker } from "../worker.ts";

export interface ReactRouterProps<B extends Bindings> extends ViteProps<B> {
  /**
   * @default workers/app.ts
   */
  main?: string;
}

// don't allow the ASSETS to be overriden
export type ReactRouter<B extends Bindings> = B extends { ASSETS: any }
  ? never
  : Worker<B & { ASSETS: Assets }>;

export async function ReactRouter<B extends Bindings>(
  id: string,
  props: ReactRouterProps<B> = {},
): Promise<ReactRouter<B>> {
  const runner = await getPackageManagerRunner();
  return await Vite(id, {
    ...props,
    build:
      props.build ??
      `${runner} react-router typegen && ${runner} react-router build`,
    dev:
      props.dev ??
      `${runner} react-router typegen && ${runner} react-router dev`,
    compatibility: "node",
    entrypoint: props.entrypoint ?? "build/server/index.js",
    noBundle: props.noBundle ?? true,
    assets: props.assets ?? "build/client",
    wrangler: {
      main: props.wrangler?.main ?? props.main ?? "workers/app.ts",
      transform: props.wrangler?.transform,
    },
  });
}
