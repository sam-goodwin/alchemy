import type { Assets } from "../assets.ts";
import type { Bindings } from "../bindings.ts";
import { Vite, type ViteProps } from "../vite/vite.ts";
import type { Worker } from "../worker.ts";

export interface TanStackStartProps<B extends Bindings> extends ViteProps<B> {}

// don't allow the ASSETS to be overriden
export type TanStackStart<B extends Bindings> = B extends { ASSETS: any }
  ? never
  : Worker<B & { ASSETS: Assets }>;

export async function TanStackStart<B extends Bindings>(
  id: string,
  props?: Partial<TanStackStartProps<B>>,
): Promise<TanStackStart<B>> {
  return await Vite(id, {
    entrypoint: "dist/server/server.js", // points to default server entrypoint after build
    assets: "dist/client",

    compatibility: "node", // (note: same as compatibility_flags: ["nodejs_compat"] with latest compatibility date)

    // Disable not_found_handling: "single-page-application", which is default for Vite
    spa: false,

    // By default, Alchemy does NOT re-bundle Vite build outputs;
    // however if we don't bundle here, we get `No such module "@tanstack/history"`
    noBundle: false,

    // Configures generated wrangler.json, which we use to integrate with the Cloudflare Vite plugin for local development
    wrangler: {
      // Delete `main` field to prevent error caused by entrypoint not existing prior to build
      transform: (spec) => {
        delete spec.main;
        return spec;
      },
    },
    ...props,
  });
}
