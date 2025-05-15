import { exec } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";
import type { Context } from "../context.js";
import { Folder } from "../fs/folder.js";
import { StaticJsonFile } from "../fs/static-json-file.js";
import { StaticTypeScriptFile } from "../fs/static-typescript-file.js";
import { Resource } from "../resource.js";
import { ShadcnComponent } from "./shadcn-component.js";

const execAsync = promisify(exec);

/**
 * Properties for initializing Shadcn UI
 */
export interface ShadcnUIProps {
  /**
   * The working directory where Shadcn UI should be installed
   */
  cwd: string;

  /**
   * The base color to use
   * @default "neutral"
   */
  baseColor?: "neutral" | "gray" | "zinc" | "stone" | "slate";

  /**
   * Use default configuration
   * @default false
   */
  defaults?: boolean;

  /**
   * Force overwrite of existing configuration
   * @default false
   */
  force?: boolean;

  /**
   * Mute output
   * @default false
   */
  silent?: boolean;

  /**
   * Use the src directory when creating a new project
   * @default true
   */
  srcDir?: boolean;

  /**
   * Use css variables for theming
   * @default true
   */
  cssVariables?: boolean;

  /**
   * The components to add
   */
  components?: string[];

  /**
   * Whether tailwind is already installed and configured.
   * Shadcn UI requires Tailwind CSS to be installed and configured.
   * @default false
   */
  tailwind?: boolean;

  /**
   * Whether react is already installed
   * @default false
   */
  react?: boolean;
}

/**
 * Shadcn UI resource
 */
export interface ShadcnUI extends ShadcnUIProps, Resource<"project::ShadcnUI"> {
  /**
   * The working directory where Shadcn UI is installed
   */
  cwd: string;

  /**
   * The ui directory
   */
  ui: Folder;

  /**
   * The lib directory
   */
  lib: Folder;
}

/**
 * Initializes Shadcn UI in a project directory
 *
 * @example
 * // Initialize Shadcn UI with default settings
 * const shadcn = await ShadcnUI("my-shadcn", {
 *   cwd: "my-project",
 *   tailwind: true,  // Tailwind must be installed separately
 *   react: true     // React must be installed separately
 * });
 *
 * @example
 * // Initialize Shadcn UI with custom settings and components
 * const shadcn = await ShadcnUI("custom-shadcn", {
 *   cwd: "my-project",
 *   baseColor: "zinc",
 *   force: true,
 *   components: ["button", "card", "input"],
 *   tailwind: true,  // Tailwind must be installed separately
 *   react: true     // React must be installed separately
 * });
 */
export const ShadcnUI = Resource(
  "project::ShadcnUI",
  async function (
    this: Context<ShadcnUI>,
    _id: string,
    props: ShadcnUIProps,
  ): Promise<ShadcnUI> {
    if (this.phase === "delete") {
      // For a delete phase, we don't perform any action
      // as removing Shadcn UI would require removing many files
      // which could be destructive to the project
      console.log(
        "Note: ShadcnUI delete phase does not remove installed components",
      );

      return this.destroy();
    }

    // Setup execAsync with the correct cwd
    const exec = (command: string) => execAsync(command, { cwd: props.cwd });

    // Ensure React is installed if not already
    if (!props.react) {
      await exec("bun add react react-dom");
    }

    // Install shadcn dependencies
    await exec("bun add -D @types/node");

    // Create components.json directly instead of running shadcn init
    await StaticJsonFile(path.join(props.cwd, "components.json"), {
      $schema: "https://ui.shadcn.com/schema.json",
      style: props.cssVariables !== false ? "default" : "new-york",
      tsx: true,
      rsc: false,
      tailwind: {
        config: "tailwind.config.js",
        css:
          props.srcDir !== false
            ? "src/styles/globals.css"
            : "styles/globals.css",
        baseColor: props.baseColor || "neutral",
        cssVariables: props.cssVariables !== false,
      },
      aliases: {
        components: props.srcDir !== false ? "@/components" : "./components",
        utils: props.srcDir !== false ? "@/lib/utils" : "./lib/utils",
      },
    });

    // Ensure ui components directory exists
    const ui = await Folder(
      path.join(
        props.cwd,
        props.srcDir !== false ? "src" : "",
        "components",
        "ui",
      ),
    );

    // Create lib directory
    const libPath = path.join(
      props.cwd,
      props.srcDir !== false ? "src" : "",
      "lib",
    );
    const lib = await Folder(libPath);

    // Create utils.ts file
    const utilsContent = `
      import { type ClassValue, clsx } from "clsx";
      import { twMerge } from "tailwind-merge";
       
      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }
    `;

    await StaticTypeScriptFile(path.join(libPath, "utils.ts"), utilsContent);

    // Install clsx and tailwind-merge
    await exec("bun add clsx tailwind-merge");

    // Install requested components
    if (props.components && props.components.length > 0) {
      for (const componentName of props.components) {
        await ShadcnComponent(`shadcn-component-${componentName}`, {
          name: componentName,
          cwd: props.cwd,
          force: props.force,
          silent: props.silent,
        });
      }
    }

    return this({
      ...props,
      ui,
      lib,
    });
  },
);
