import * as Effect from "effect/Effect";
import esbuild from "esbuild";

export const bundle = (props: esbuild.BuildOptions) =>
  Effect.promise(() => esbuild.build(props));
