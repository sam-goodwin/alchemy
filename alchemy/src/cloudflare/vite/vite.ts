import { getPackageManagerRunner } from "../../util/detect-package-manager.ts";
import type { Assets } from "../assets.ts";
import type { Bindings } from "../bindings.ts";
import { Website, type WebsiteProps } from "../website.ts";
import type { Worker } from "../worker.ts";

export interface ViteProps<B extends Bindings>
  extends Omit<WebsiteProps<B>, "spa"> {}

export type Vite<B extends Bindings> = B extends { ASSETS: any }
  ? never
  : Worker<B & { ASSETS: Assets }>;

export async function Vite<B extends Bindings>(
  id: string,
  props: ViteProps<B>,
): Promise<Vite<B>> {
  const runner = await getPackageManagerRunner();
  return await Website(id, {
    ...props,
    spa: true,
    assets:
      typeof props.assets === "string"
        ? { directory: props.assets }
        : {
            ...(props.assets ?? {}),
            directory:
              props.assets?.directory ??
              (props.entrypoint || props.script ? "dist/client" : "dist"),
          },
    build: props.build ?? `${runner} vite build`,
    dev: props.dev ?? `${runner} vite dev`,
  });
}
