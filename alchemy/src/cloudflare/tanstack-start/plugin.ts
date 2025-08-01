import {
  tanstackStart,
  type TanStackStartInputConfig,
  type WithReactPlugin,
} from "@tanstack/react-start/plugin/vite";
import { cloudflareWorkersDevEnvironmentShim } from "../runtime/cloudflare-env-shim.ts";

const alchemyTanStackStart = (
  options?: TanStackStartInputConfig & WithReactPlugin,
) => {
  return [
    cloudflareWorkersDevEnvironmentShim(),
    tanstackStart({
      target: "cloudflare-module",
      customViteReactPlugin: true,
      ...options,
    }),
  ];
};

export default alchemyTanStackStart;
