import path from "node:path";

import "../alchemy/src/fs/index.js";
import "../alchemy/src/web/vitepress/index.js";

import { CopyFile } from "../alchemy/src/fs/copy-file.js";
import { Folder } from "../alchemy/src/fs/folder.js";
import alchemy from "../alchemy/src/index.js";
import { Providers } from "../alchemy/src/internal/docs/providers.js";
import { VitepressProject } from "../alchemy/src/web/vitepress/index.js";
import env from "./env.js";

const app = await alchemy("alchemy:docs", env);

const project = await VitepressProject("vitepress", {
  name: "alchemy-web",
  delete: true,
});

const docs = await Folder("docs", {
  path: path.join(project.dir, "docs"),
});

const [pub, _blogs, _guides, providers, _conceptsDir] = await Promise.all([
  Folder("public", {
    path: path.join(project.dir, "public"),
  }),
  Folder("blogs", {
    path: path.join(project.dir, "blogs"),
  }),
  Folder("guides", {
    path: path.join(docs.path, "guides"),
  }),
  Folder("providers", {
    path: path.join(docs.path, "providers"),
  }),
  Folder("concepts", {
    path: path.join(docs.path, "concepts"),
  }),
]);

await CopyFile("docs-public-alchemist", {
  src: path.join(process.cwd(), "public", "alchemist.webp"),
  dest: path.join(pub.path, "alchemist.webp"),
});

const filterIdx = process.argv.findIndex((arg) => arg === "--filter");

await Providers({
  srcDir: path.join("alchemy", "src"),
  outDir: providers.path,
  // anthropic throttles are painful, so we'll run them serially
  parallel: false,
  filter:
    process.argv[filterIdx + 1] === "true"
      ? true
      : filterIdx > -1
        ? Number.isNaN(Number.parseInt(process.argv[filterIdx + 1]))
          ? false
          : Number.parseInt(process.argv[filterIdx + 1])
        : false,
});

await app.finalize();
