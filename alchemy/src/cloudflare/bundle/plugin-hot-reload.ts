import type esbuild from "esbuild";

export interface HotReloadPluginProps {
  onBuildStart?: () => void | Promise<void>;
  onBuildEnd?: (result: esbuild.BuildResult) => void | Promise<void>;
  onBuildError?: (errors: esbuild.Message[]) => void | Promise<void>;
}

export function esbuildPluginHotReload(
  props: HotReloadPluginProps,
): esbuild.Plugin {
  return {
    name: "alchemy-hot-reload",
    setup(build) {
      if (props.onBuildStart) {
        build.onStart(props.onBuildStart);
      }
      build.onEnd(async (result) => {
        if (result.errors.length > 0) {
          await props.onBuildError?.(result.errors);
        } else {
          await props.onBuildEnd?.(result);
        }
      });
    },
  };
}
