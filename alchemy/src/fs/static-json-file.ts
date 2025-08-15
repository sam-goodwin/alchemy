import { importPeer } from "../util/peer.ts";
import { File } from "./file.ts";

/**
 * Creates a JSON file with formatted content
 *
 * @example
 * // Create a JSON configuration file
 * const config = await StaticJsonFile("config.json", {
 *   api: {
 *     endpoint: "https://api.example.com",
 *     version: "v1"
 *   },
 *   features: ["auth", "logging"]
 * });
 */
export type StaticJsonFile = File;

export async function StaticJsonFile(
  id: string,
  ...args: [content: any] | [path: string, content: any]
): Promise<StaticJsonFile> {
  const [path, content] = args.length === 1 ? [id, args[0]] : args;
  return File(id, {
    path,
    content: await formatJson(content),
  });
}

export async function formatJson(content: any) {
  const prettier = await importPeer(
    "prettier",
    import("prettier"),
    "fs::StaticJsonFile",
  );
  return prettier.format(JSON.stringify(content), {
    parser: "json",
    editor: {
      tabWidth: 2,
      indentWidth: 2,
    },
  });
}
