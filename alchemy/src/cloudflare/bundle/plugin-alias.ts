import type { Plugin } from "esbuild";

export function esbuildPluginAlias(alias: Record<string, string>): Plugin {
  return {
    name: "alias",
    setup: (build) => {
      // filter the hook calls to only those that match the alias keys
      // this should avoid slowing down builds which don't use aliasing
      const filter = new RegExp(
        Object.keys(alias)
          .map((key) => escapeRegex(key))
          .join("|"),
      );

      // reimplement module aliasing as an esbuild plugin onResolve hook
      build.onResolve({ filter }, (args) => {
        const aliasPath = alias[args.path];
        if (aliasPath) {
          return {
            // resolve with node resolution
            path: require.resolve(aliasPath, {
              // From the esbuild alias docs: "Note that when an import path is substituted using an alias, the resulting import path is resolved in the working directory instead of in the directory containing the source file with the import path."
              // https://esbuild.github.io/api/#alias:~:text=Note%20that%20when%20an%20import%20path%20is%20substituted%20using%20an%20alias%2C%20the%20resulting%20import%20path%20is%20resolved%20in%20the%20working%20directory%20instead%20of%20in%20the%20directory%20containing%20the%20source%20file%20with%20the%20import%20path.
              paths: [build.initialOptions.absWorkingDir ?? process.cwd()],
            }),
          };
        }
      });
    },
  };
}

// Taken from https://stackoverflow.com/a/3561711
// which is everything from the tc39 proposal, plus the following two characters: ^/
// It's also everything included in the URLPattern escape (https://wicg.github.io/urlpattern/#escape-a-regexp-string), plus the following: -
// As the answer says, there's no downside to escaping these extra characters, so better safe than sorry
const ESCAPE_REGEX_CHARACTERS = /[-/\\^$*+?.()|[\]{}]/g;
const escapeRegex = (str: string) => {
  return str.replace(ESCAPE_REGEX_CHARACTERS, "\\$&");
};
