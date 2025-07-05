import type { Plugin, PluginBuild } from "esbuild";
import kleur from "kleur";
import module from "node:module";
import path from "node:path";
import { logger } from "../../util/logger.ts";

const NODE_REGEX = new RegExp(
  `^(node:)?(${module.builtinModules.filter((m) => m !== "async_hooks").join("|")})$`,
);

/**
 * ESBuild plugin to detect node:* imports and warn about missing compatibility flags.
 *
 * This plugin warns when:
 * - Any node:* import is found without nodejs_compat flag
 * - node:async_hooks is imported without nodejs_compat or nodejs_als flags
 */
export function nodeJsImportWarningPlugin(mode: "als" | null): Plugin {
  return {
    name: "nodejs-import-warning",
    setup(build: PluginBuild) {
      const packages = new Set<string>();
      const nodeImporters = new Set<string>();
      const alsImporters = new Set<string>();

      build.onStart(() => {
        packages.clear();
        nodeImporters.clear();
        alsImporters.clear();
      });

      build.onResolve(
        {
          filter: NODE_REGEX,
        },
        (args) => {
          packages.add(args.path);
          nodeImporters.add(args.importer);
          return null;
        },
      );

      build.onResolve(
        {
          filter: /^(node:)?async_hooks$/,
        },
        (args) => {
          alsImporters.add(args.importer);
          return null;
        },
      );

      build.onEnd(() => {
        if (packages.size > 0) {
          const formattedImports = Array.from(packages)
            .sort()
            .map((imp) => kleur.yellow(imp))
            .join(", ");

          logger.warn(
            [
              `Detected Node.js imports (${formattedImports}) but ${kleur.red("nodejs_compat")} compatibility flag is not set. `,
              `Add ${kleur.blue("nodejs_compat")} to your compatibility flags and ensure compatibilityDate >= 2024-09-23. Imported from:`,
              formatImporters(
                nodeImporters,
                build.initialOptions.absWorkingDir ?? process.cwd(),
              ),
            ].join("\n"),
          );
        }

        if (alsImporters.size > 0 && !mode) {
          logger.warn(
            [
              `Detected Node.js imports but ${kleur.red("nodejs_als")} compatibility flag is not set. `,
              `Add ${kleur.blue("nodejs_als")} to your compatibility flags. Imported from:`,
              formatImporters(
                alsImporters,
                build.initialOptions.absWorkingDir ?? process.cwd(),
              ),
            ].join("\n"),
          );
        }
      });
    },
  };
}

function formatImporters(importers: Set<string>, cwd: string) {
  return Array.from(importers)
    .sort()
    .map((imp) => `- ${kleur.yellow(path.relative(cwd, imp))}`)
    .join("\n");
}
