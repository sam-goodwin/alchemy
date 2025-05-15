import type {
  CallExpression,
  Declaration,
  Expression,
  FunctionDeclaration,
  TsType,
  VariableDeclaration,
} from "@swc/core";
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
export function bundleEntrypoint(_file: string) {}

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
  async setup(build) {
    const { parse, print } = await import("@swc/core");
    const { Visitor } = await import("@swc/core/Visitor.js");

    async function expr(expr: string) {
      return (
        (await parse(`const __temp__ = ${expr}`)).body[0] as VariableDeclaration
      ).declarations[0].init!;
    }
    async function decl(decl: string) {
      return (await parse(decl)).body[0] as Declaration;
    }

    const Provider = await decl("async function Resource() {}");
    const Resource = await expr("(id) => STATE.get(id)");
    // const alchemy = await expr("(async () => {})");

    // Add a global STATE object to bundle for resource lookup
    build.onLoad(
      {
        filter: /.*\.(ts|js)x?/,
      },
      async (args) => {
        try {
          const source = await fs.readFile(args.path, "utf-8");

          function transformed(code: string) {
            return {
              contents: code,
              loader: args.path.endsWith(".ts")
                ? args.path.endsWith(".tsx")
                  ? "tsx"
                  : "ts"
                : args.path.endsWith(".jsx")
                  ? "jsx"
                  : "js",
            } as const;
          }

          // Parse the source code using SWC
          const ast = await parse(source, {
            syntax: "typescript",
            tsx: args.path.endsWith(".tsx"),
            decorators: true,
            dynamicImport: true,
          });

          // function text({ span }: HasSpan) {
          //   return source.slice(
          //     span.start - ast.span.start,
          //     span.end - ast.span.start,
          //   );
          // }

          // Create visitor to transform Resource calls
          class ResourceTransformer extends Visitor {
            visitTsType(n: TsType): TsType {
              return n;
            }
            visitFunctionDeclaration(decl: FunctionDeclaration): Declaration {
              const param = decl.params[0];
              if (
                decl.identifier.value === "Resource" &&
                param?.pat.type === "Identifier" &&
                param.pat.value === "type" &&
                decl.body
              ) {
                return Provider;
              }
              return decl;
            }
            visitCallExpression(expr: CallExpression): Expression {
              // Check if this is a Resource call
              if (
                expr.callee.type === "Identifier" &&
                expr.callee.value === "Resource" &&
                expr.arguments.length >= 2
              ) {
                return Resource;
                // } else if (
                //   expr.callee.type === "Identifier" &&
                //   expr.callee.value === "alchemy"
                // ) {
                //   return alchemy;
              }

              return super.visitCallExpression(expr);
            }
          }

          // Apply the transformation
          const visitor = new ResourceTransformer();
          const program = visitor.visitProgram(ast);

          // Print the transformed AST back to code
          const { code } = await print(program, {
            sourceMaps: true,
            minify: false,
          });

          return transformed(code);
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
