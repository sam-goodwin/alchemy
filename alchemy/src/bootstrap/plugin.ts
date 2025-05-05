import type {
  CallExpression,
  Expression,
  VariableDeclaration,
} from "@swc/core";
import { parse, print } from "@swc/core";
import { Visitor } from "@swc/core/Visitor.js";
import type { Plugin } from "esbuild";
import fs from "node:fs/promises";

/**
 * Bundles a single Worker function entrypoint by:
 * 1. Evaluate the script and detect which resources are included in its bundle.
 * 2. Create a static map of Resource ID -> State
 * 3. Apply esbuild with {@link bootstrapPlugin} to erase Resource lifecycle operations
 * 4. The final bundle should then tree-shake away all infrastructure-code, leaving only runtime code.
 *
 * TODO(sam): should we inline the state map in the bundle or bind to a Cloudflare Worker with a blob?
 * TODO(sam): what should we do with secrets? Seems like we could auto-bind them and resolve without requiring encryption logic.
 *
 * @param file the `.ts` file containing an `export default function`
 */
export function bundleEntrypoint(file: string) {}

const stub = (
  (await parse("const __temp__ = (id) => STATE.get(id)"))
    .body[0] as VariableDeclaration
).declarations[0].init!;

/**
 * This is a plugin that bootstraps Alchemy Infrastructure into Runtime by replacing Resources
 * with a stub that loads from a statically bundled state.
 *
 * Take the following table for example:
 * ```ts
 * const Table = Resource(
 *   "dynamodb::Table",
 *   async function(this, id, props) {
 *     // lifecycle logic in here
 *   }
 * );
 * ```
 *
 * The plugin replaces the Resource with a stub:
 * ```ts
 * const Table = (id, props) => STATE.get(id)
 * ```
 */
export const bootstrapPlugin: Plugin = {
  name: "alchemy-bootstrap",
  setup(build) {
    // Add a global STATE object to bundle for resource lookup
    build.onLoad(
      {
        filter: /.*\.(ts|js)x?/,
      },
      async (args) => {
        try {
          const source = await fs.readFile(args.path, "utf-8");

          // Parse the source code using SWC
          const ast = await parse(source, {
            syntax: "typescript",
            tsx: args.path.endsWith(".tsx"),
            decorators: true,
            dynamicImport: true,
          });

          // Create visitor to transform Resource calls
          class ResourceTransformer extends Visitor {
            visitCallExpression(expr: CallExpression): Expression {
              // Check if this is a Resource call
              if (
                expr.callee.type === "Identifier" &&
                expr.callee.value === "Resource" &&
                expr.arguments.length >= 2
              ) {
                return stub;
              }

              return super.visitCallExpression(expr);
            }
          }

          // Apply the transformation
          const visitor = new ResourceTransformer();
          const transformed = visitor.visitProgram(ast);

          // Print the transformed AST back to code
          const { code } = await print(transformed, {
            sourceMaps: true,
            minify: false,
          });

          return {
            contents: code,
            loader: args.path.endsWith(".ts")
              ? args.path.endsWith(".tsx")
                ? "tsx"
                : "ts"
              : args.path.endsWith(".jsx")
                ? "jsx"
                : "js",
          };
        } catch (error: unknown) {
          console.error(`Error transforming ${args.path}:`, error);
          return {
            errors: [
              {
                text: `Failed to transform: ${error instanceof Error ? error.message : String(error)}`,
                location: { file: args.path },
              },
            ],
          };
        }
      },
    );
  },
};
