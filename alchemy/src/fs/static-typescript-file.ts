import { importPeer } from "../util/peer.ts";
import { File } from "./file.ts";

/**
 * Creates a TypeScript file with formatted content using prettier
 *
 * @example
 * // Create a TypeScript file
 * const component = await StaticTypeScriptFile("Component.ts", `
 *   interface Props {
 *     name: string;
 *     age: number;
 *   }
 *
 *   export function Component({ name, age }: Props) {
 *     return <div>Hello {name}, you are {age} years old</div>;
 *   }
 * `);
 */
export type StaticTypeScriptFile = File;

export async function StaticTypeScriptFile(
  id: string,
  ...args: [content: string] | [path: string, content: string]
): Promise<StaticTypeScriptFile> {
  const [path, content] = args.length === 1 ? [id, args[0]] : args;
  const prettier = await importPeer(
    "prettier",
    import("prettier"),
    "fs::StaticTypeScriptFile",
  );
  return File(id, {
    path,
    content: await prettier.format(content, {
      parser: "typescript",
      editor: {
        tabWidth: 2,
        indentWidth: 2,
      },
    }),
  });
}
