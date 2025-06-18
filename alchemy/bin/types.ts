import { z } from "zod";

export const TemplateSchema = z
  .enum([
    "typescript",
    "vite",
    "astro",
    "react-router",
    "sveltekit",
    "tanstack-start",
    "rwsdk",
    "nuxt",
  ])
  .describe("Project template type");
export type TemplateType = z.infer<typeof TemplateSchema>;

export const PackageManagerSchema = z
  .enum(["bun", "npm", "pnpm", "yarn"])
  .describe("Package manager");
export type PackageManager = z.infer<typeof PackageManagerSchema>;

export const ProjectNameSchema = z
  .string()
  .min(1, "Project name cannot be empty")
  .max(255, "Project name must be less than 255 characters")
  .refine(
    (name) => name === "." || !name.startsWith("."),
    "Project name cannot start with a dot (except for '.')",
  )
  .refine(
    (name) => name === "." || !name.startsWith("-"),
    "Project name cannot start with a dash",
  )
  .refine((name) => {
    const invalidChars = ["<", ">", ":", '"', "|", "?", "*"];
    return !invalidChars.some((char) => name.includes(char));
  }, "Project name contains invalid characters")
  .refine(
    (name) => name.toLowerCase() !== "node_modules",
    "Project name is reserved",
  )
  .describe("Project name or path");
export type ProjectName = z.infer<typeof ProjectNameSchema>;

export interface ProjectContext {
  name: string;
  path: string;
  template: TemplateType;
  packageManager: PackageManager;
  alchemyVersion: string;
  isTest: boolean;
  options: CreateInput;
}

export interface Template {
  name: string;
  description: string;
  init: (context: ProjectContext) => Promise<void>;
}

export interface WebsiteOptions {
  entrypoint?: string;
  tsconfig?: string;
  scripts?: Record<string, string>;
  include?: string[];
  types?: string[];
  devDependencies?: string[];
  dependencies?: string[];
}

export type CreateInput = {
  name?: string;
  template?: TemplateType;
  packageManager?: PackageManager;
  /** Prefer Bun as the package manager */
  bun?: boolean;
  /** Prefer npm as the package manager */
  npm?: boolean;
  /** Prefer pnpm as the package manager */
  pnpm?: boolean;
  /** Prefer Yarn as the package manager */
  yarn?: boolean;
  yes?: boolean;
  overwrite?: boolean;
};

export type CLIInput = CreateInput & {
  projectDirectory?: string;
};
