import type { BunPlugin } from "bun";
import { parseInlineMapBase64, stripAnyMapDirective } from "./source-map.ts";

export default function plugin(): BunPlugin {
  return {
    name: "als-entry-context",
    setup(build) {
      build.onLoad({ filter: /.*\.(ts|tsx|js|jsx)$/ }, async (args) => {
        const url = `file://${args.path}`;
        // if (!urlsToWrap.has(url)) return;
        const raw = await Bun.file(args.path).text();
        const { kind, payload, body } = stripAnyMapDirective(raw);
        console.log(kind, payload, body);
        let baseMap: any = null;
        if (kind === "inline") baseMap = parseInlineMapBase64(payload!);
        else if (kind === "external") {
          try {
            const mapURL = new URL(payload!, url);
            if (mapURL.protocol === "file:")
              baseMap = JSON.parse(await Bun.file(mapURL).text());
          } catch {}
        }
        const transpiler = new Bun.Transpiler({
          loader: args.path.endsWith(".tsx")
            ? "tsx"
            : args.path.endsWith(".ts")
              ? "ts"
              : args.path.endsWith(".jsx")
                ? "jsx"
                : "js",
        });
        try {
          const out = await transpiler.transform(body);
          // let map = out.map ? JSON.parse(out.map) : baseMap;
          // const pkgRoot = findPackageRootFromFileURL(url);
          // const parentUrl = entryParents.get(url);
          // const pre = `try{ globalThis.__als_enter?.(globalThis.__als_mkCtx?.(${JSON.stringify(url)}, ${JSON.stringify(parentUrl)}, ${JSON.stringify(pkgRoot || undefined)})); }catch{}\n`;
          // const post = "\n;try{}finally{ globalThis.__als_exit?.(); }\n";
          // const linesPre = countLines(pre);
          // const linesPost = countLines(post);
          // let code = pre + out.code + post;
          // if (map) {
          //   map.mappings = `${";".repeat(linesPre)}${map.mappings}${";".repeat(linesPost)}`;
          //   code =
          //     pre + out.code.replace(/\/\/# sourceMappingURL=.*$/m, "").trimEnd();
          //   code = attachInlineMap(code, map) + post;
          // }
          return {
            contents: `console.log('Hello from ${args.path}');\n${out}`,
            loader: "js",
          };
        } catch (e) {
          console.error(e);
          return { contents: body, loader: "js" };
        }
      });
    },
  };
}
