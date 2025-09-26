import { getPackageManagerRunner } from "../../util/detect-package-manager.ts";
import type { Assets } from "../assets.ts";
import type { Bindings } from "../bindings.ts";
import { spreadBuildProps, spreadDevProps, Website, type WebsiteProps } from "../website.ts";
import type { Worker } from "../worker.ts";

export interface ViteProps<B extends Bindings> extends WebsiteProps<B> {}

export type Vite<B extends Bindings> = B extends { ASSETS: any }
  ? never
  : Worker<B & { ASSETS: Assets }>;

export async function Vite<B extends Bindings>(
  id: string,
  props: ViteProps<B>,
): Promise<Vite<B>> {
  const runner = await getPackageManagerRunner();
  return await Website(id, {
    spa: true,
    ...props,
    assets:
      typeof props.assets === "string"
        ? { directory: props.assets }
        : {
            ...(props.assets ?? {}),
            directory:
              props.assets?.directory ??
              (props.entrypoint || props.script ? "dist/client" : "dist"),
          },
    build: spreadBuildProps(props, `${runner} vite build`),
    dev: spreadDevProps(props, `${runner} vite dev`),
  });
}
