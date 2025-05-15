import { exec } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import type { Context } from "../../context.js";
import { Folder } from "../../fs/folder.js";
import { StaticJsonFile } from "../../fs/static-json-file.js";
import { StaticTextFile } from "../../fs/static-text-file.js";
import { StaticTypeScriptFile } from "../../fs/static-typescript-file.js";
import { Resource } from "../../resource.js";
import { InstallDependencies, fixedDependencies } from "./dependencies.js";

const _execAsync = promisify(exec);

export interface VitePressProjectProps {
  /**
   * The name/path of the project
   */
  name: string;

  /**
   * The title of the documentation site
   */
  title?: string;

  /**
   * The description of the documentation site
   */
  description?: string;

  /**
   * Whether to use TypeScript for config and theme files
   * @default true
   */
  typescript?: boolean;

  /**
   * The scripts to add to the project
   */
  scripts?: Record<string, string>;

  /**
   * The tsconfig to use
   */
  tsconfig?: {
    extends?: string;
    references?: string[];
    compilerOptions?: Record<string, any>;
  };

  /**
   * Force overwrite the project config files during the update phase
   * @default false
   */
  overwrite?: boolean;

  /**
   * The dependencies to install
   */
  dependencies?: Record<string, string>;

  /**
   * The dev dependencies to install
   */
  devDependencies?: Record<string, string>;

  /**
   * The theme options to use
   */
  // theme?: ThemeOptions;

  /**
   * The theme config to use
   */
  // themeConfig: DefaultTheme.Config;

  /**
   * Whether to delete the project folder during the delete phase
   * @default true
   */
  delete?: boolean;

  /**
   * The directory to initialize the project in.
   *
   * @default {@link name}
   */
  dir?: string;
}

export interface VitePressProject extends VitePressProjectProps, Resource {
  /**
   * The name/path of the project
   */
  name: string;

  /**
   * The directory of the project
   */
  dir: string;
}

export const VitepressProject = Resource(
  "project::VitepressProject",
  {
    alwaysUpdate: true,
  },
  async function (
    this: Context<VitePressProject>,
    id: string,
    props: VitePressProjectProps,
  ): Promise<VitePressProject> {
    const dir = props.dir ?? props.name;
    if (this.phase === "delete") {
      try {
        if (props.delete !== false) {
          if (await fs.exists(dir)) {
            await fs.rm(dir, { recursive: true, force: true });
            // // Delete the entire project directory
            // await execAsync(`rm -rf ${dir}`);
          }
        }
      } catch (error) {
        console.error(`Error deleting VitePress project ${id}:`, error);
      }
      return this.destroy();
    }

    const cwd = path.relative(
      process.cwd(),
      (
        await Folder("dir", {
          path: dir,
          delete: props.delete,
        })
      ).path,
    );

    // Initialize package.json
    await StaticJsonFile(path.join(cwd, "package.json"), {
      name: props.name,
      scripts: {
        "docs:gen": "bun alchemy.run.ts",
        "docs:dev": "vitepress dev",
        "docs:build": "vitepress build",
        "docs:preview": "vitepress preview",
        ...props.scripts,
      },
      dependencies: fixedDependencies(props.dependencies || {}),
      devDependencies: fixedDependencies(props.devDependencies || {}),
    });

    await InstallDependencies("dependencies", {
      cwd,
      dependencies: props.dependencies,
      devDependencies: {
        vue: "latest",
        vitepress: "latest",
        "@shikijs/vitepress-twoslash": "latest",
        "markdown-it-footnote": "latest",
        ...props.devDependencies,
      },
    });
    // Create .vitepress directory and config
    await Folder(path.join(cwd, ".vitepress"));
    await Folder(path.join(cwd, ".vitepress", "theme"));

    await Promise.all([
      StaticTextFile(path.join(cwd, ".gitignore"), ".vitepress/cache\n"),
      // StaticJsonFile(path.join(cwd, "tsconfig.json"), {
      //   extends: props.tsconfig?.extends,
      //   references: props.tsconfig?.references?.map((path) => ({ path })),
      //   compilerOptions: props.tsconfig?.compilerOptions ?? {
      //     target: "ES2020",
      //     module: "ESNext",
      //     moduleResolution: "Node",
      //     allowJs: true,
      //     skipLibCheck: true,
      //     forceConsistentCasingInFileNames: true,

      //   },
      // }),

      //       TypeScriptFile(
      //         path.join(cwd, "alchemy.run.ts"),
      //         `import alchemy from "alchemy";
      // import { Folder } from "alchemy/fs";
      // import { Document } from "alchemy/docs";
      // import path from "node:path";

      // const app = await alchemy("alchemy.run", {
      //   stage: "prod",
      //   phase: process.argv.includes("--destroy") ? "destroy" : "up",
      //   password: process.env.SECRET_PASSPHRASE,
      //   quiet: !process.argv.includes("--verbose"),
      // });

      // const docs = await Folder(path.join("alchemy.run", "docs"));

      // await Document("home.md", {
      //   path: path.join(docs.path, "home.md"),
      //   prompt: await alchemy\`Generate a landing page.\`,
      // });
      // `,
      //       ),
      StaticTypeScriptFile(
        path.join(cwd, ".vitepress", "theme", "index.ts"),
        `import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client";
import "@shikijs/vitepress-twoslash/style.css";
import type { Theme as ThemeConfig } from "vitepress";
import Theme from "vitepress/theme-without-fonts";
import "./style.css";

export default {
  extends: Theme,
  enhanceApp(ctx) {
    ctx.app.use(TwoslashFloatingVue);
  },
} satisfies ThemeConfig;
  `,
      ),
      StaticTextFile(
        path.join(cwd, ".vitepress", "theme", "style.css"),
        `/**
* Customize default theme styling by overriding CSS variables:
* https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css
*/

/**
* Colors
*
* Each colors have exact same color scale system with 3 levels of solid
* colors with different brightness, and 1 soft color.
*
* - \`XXX-1\`: The most solid color used mainly for colored text. It must
*   satisfy the contrast ratio against when used on top of \`XXX-soft\`.
*
* - \`XXX-2\`: The color used mainly for hover state of the button.
*
* - \`XXX-3\`: The color for solid background, such as bg color of the button.
*   It must satisfy the contrast ratio with pure white (#ffffff) text on
*   top of it.
*
* - \`XXX-soft\`: The color used for subtle background such as custom container
*   or badges. It must satisfy the contrast ratio when putting \`XXX-1\` colors
*   on top of it.
*
*   The soft color must be semi transparent alpha channel. This is crucial
*   because it allows adding multiple "soft" colors on top of each other
*   to create a accent, such as when having inline code block inside
*   custom containers.
*
* - \`default\`: The color used purely for subtle indication without any
*   special meanings attached to it such as bg color for menu hover state.
*
* - \`brand\`: Used for primary brand colors, such as link text, button with
*   brand theme, etc.
*
* - \`tip\`: Used to indicate useful information. The default theme uses the
*   brand color for this by default.
*
* - \`warning\`: Used to indicate warning to the users. Used in custom
*   container, badges, etc.
*
* - \`danger\`: Used to show error, or dangerous message to the users. Used
*   in custom container, badges, etc.
* -------------------------------------------------------------------------- */

:root {
  --vp-c-default-1: var(--vp-c-gray-1);
  --vp-c-default-2: var(--vp-c-gray-2);
  --vp-c-default-3: var(--vp-c-gray-3);
  --vp-c-default-soft: var(--vp-c-gray-soft);

  --vp-c-brand-1: var(--vp-c-indigo-1);
  --vp-c-brand-2: var(--vp-c-indigo-2);
  --vp-c-brand-3: var(--vp-c-indigo-3);
  --vp-c-brand-soft: var(--vp-c-indigo-soft);

  --vp-c-tip-1: var(--vp-c-brand-1);
  --vp-c-tip-2: var(--vp-c-brand-2);
  --vp-c-tip-3: var(--vp-c-brand-3);
  --vp-c-tip-soft: var(--vp-c-brand-soft);

  --vp-c-warning-1: var(--vp-c-yellow-1);
  --vp-c-warning-2: var(--vp-c-yellow-2);
  --vp-c-warning-3: var(--vp-c-yellow-3);
  --vp-c-warning-soft: var(--vp-c-yellow-soft);

  --vp-c-danger-1: var(--vp-c-red-1);
  --vp-c-danger-2: var(--vp-c-red-2);
  --vp-c-danger-3: var(--vp-c-red-3);
  --vp-c-danger-soft: var(--vp-c-red-soft);
}

/**
* Component: Button
* -------------------------------------------------------------------------- */

:root {
  --vp-button-brand-border: transparent;
  --vp-button-brand-text: var(--vp-c-white);
  --vp-button-brand-bg: var(--vp-c-brand-3);
  --vp-button-brand-hover-border: transparent;
  --vp-button-brand-hover-text: var(--vp-c-white);
  --vp-button-brand-hover-bg: var(--vp-c-brand-2);
  --vp-button-brand-active-border: transparent;
  --vp-button-brand-active-text: var(--vp-c-white);
  --vp-button-brand-active-bg: var(--vp-c-brand-1);
}

/**
* Component: Home
* -------------------------------------------------------------------------- */

:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(
    120deg,
    #bd34fe 30%,
    #41d1ff
  );

  --vp-home-hero-image-background-image: linear-gradient(
    -45deg,
    #bd34fe 50%,
    #47caff 50%
  );
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}

/**
* Component: Custom Block
* -------------------------------------------------------------------------- */

:root {
  --vp-custom-block-tip-border: transparent;
  --vp-custom-block-tip-text: var(--vp-c-text-1);
  --vp-custom-block-tip-bg: var(--vp-c-brand-soft);
  --vp-custom-block-tip-code-bg: var(--vp-c-brand-soft);
}

/**
* Component: Algolia
* -------------------------------------------------------------------------- */

.DocSearch {
  --docsearch-primary-color: var(--vp-c-brand-1) !important;
}
`,
      ),
    ]);

    return this({
      ...props,
      dir,
    });
  },
);
