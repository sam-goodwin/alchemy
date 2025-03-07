import type { CoreMessage, LanguageModel } from "ai";
import { createPatch } from "diff";
import fs from "node:fs/promises";
import { z } from "zod";
import { Folder } from "../fs";
import type { Input } from "../input";
import { Design, type DesignInput } from "../markdown/design";
import { Requirements, type RequirementsInput } from "../markdown/requirements";
import {
  type Context,
  type CreateContext,
  Resource,
  type UpdateContext,
} from "../resource";
import { slugify } from "../slug";
import { TypeScriptFile, type TypeScriptFileInput } from "../typescript";
import type { PackageJson } from "../typescript/package";
import type { TypeScriptConfig } from "../typescript/tsconfig";
import { generateObject } from "./ai";
import { dependenciesAsMessages } from "./dependencies";
import type { FileContext } from "./file-context";
import { type ModelId, resolveModel } from "./model";
import { Prompts } from "./prompts";

type ProjectFileType = z.infer<typeof ProjectFileType>;
const ProjectFileType = z.enum([
  "folder",
  "design",
  "typescript",
  // "package.json",
  // "tsconfig.json",
  "css",
  "scss",
  "javascript",
  "html",
]);

const upstream = z
  .array(z.string())
  .describe(
    [
      "A list of all this file's upstream dependencies (files and folders).",
      "These files and folders must exist prior to creating or updating 'this' file.",
      "'this' meaning the file described by the key in the object.",
      "If the plan includes a type: folder to be created, and a file is contained",
      "within that folder, then it must also be listed in the upstream dependencies.",
      "Don't include files as upstream dependencies if that file's content is not relevant to this file.",
    ].join(" "),
  );

interface CreateFile extends z.infer<typeof CreateFile> {}
const CreateFile = z.object({
  type: ProjectFileType,
  upstream,
  operation: z.enum(["create"]),
});

interface UpdateFile extends z.infer<typeof UpdateFile> {}
const UpdateFile = z.object({
  type: ProjectFileType,
  upstream,
  operation: z
    .enum(["create", "update"])
    .describe(
      [
        "The operation to perform on this fle (one of: create, update, delete, noop).",
        "If the document describes a new file that needs to be created, the operation is 'create'.",
        "If the document's content has changed such that a file that was previously created must be updated, the operation is 'update'.",
        "If the document's content has changed, but not in a way that is relevant to this file, the operation is 'noop'.",
        "If a file that was previously created is no longer mentioned in the document, the operation is 'delete'.",
      ].join(" "),
    ),
});

export type CreatePlan = z.infer<typeof CreatePlan>;
export const CreatePlan = z.object({
  files: z.record(CreateFile),
});

export type UpdatePlan = z.infer<typeof UpdatePlan>;
export const UpdatePlan = z.object({
  files: z.record(z.union([UpdateFile, z.enum(["delete", "noop"])])),
});

type OutputFile =
  | TypeScriptFile
  | PackageJson
  | TypeScriptConfig
  | Folder
  | Module;

export interface ModuleOutput {
  path: string;
  content: string;
  plan: CreatePlan | UpdatePlan;
  files: Record<string, OutputFile>;
}

export interface ModuleInput {
  path: string;
  content: string;
  model?: ModelId;
  dependencies?: FileContext[];
}

export class Module extends Resource(
  "Module",
  async (
    ctx: Context<ModuleOutput>,
    props: ModuleInput,
  ): Promise<ModuleOutput | void> => {
    if (ctx.event === "delete") {
      return;
    }

    const model = await resolveModel(props.model ?? "gpt-4o");

    const plan: CreatePlan | UpdatePlan =
      ctx.event === "create"
        ? await createPlan(ctx, props, model)
        : await updatePlan(ctx, props, model);

    console.log(JSON.stringify(plan, null, 2));

    const dependencies = Object.fromEntries(
      Object.entries(plan.files).flatMap(([path, file]) =>
        file === "delete" || file === "noop" ? [] : [[path, file.upstream]],
      ),
    );

    const files: {
      [path: string]: Input<FileContext>;
    } = {};

    for (const filePath of topoSort(dependencies)) {
      const filePlan = plan.files[filePath];
      if (filePlan !== "delete") {
        const file = await createFile(
          filePath,
          filePlan === "noop"
            ? "noop"
            : (filePlan.operation as "create" | "update"),
          filePlan === "noop" ? null : filePlan,
          dependencies[filePath]?.map((dep) => files[dep]),
        );
        if (file) {
          files[filePath] = file;
        }
      }
    }

    return {
      path: props.path,
      plan,
      content: props.content,
      // @ts-ignore - TODO: fix this
      files,
    };

    async function createFile(
      filePath: string,
      op: "create" | "update" | "noop",
      filePlan: CreateFile | UpdateFile | null,
      dependencies: Input<FileContext>[],
    ): Promise<Input<FileContext> | undefined> {
      const slug = slugify(filePath);

      // cache inputs for no-ops
      async function inputs<T>(
        key: string,
        input: Input<T>,
      ): Promise<Input<T>> {
        return (op === "noop" ? await ctx.get<T>(key) : input) ?? input;
      }

      if (filePlan === null) {
        // restore the file plan from the cache for no-ops
        filePlan = (await ctx.get<CreateFile | UpdateFile>(filePath))!;
      } else {
        await ctx.set(filePath, filePlan);
      }
      if (filePlan.type === "design") {
        const design = new Design(
          `${slug}-design`,
          await inputs<DesignInput>(`${slug}-design`, {
            path: filePath,
            prompt: [
              "Context:",
              props.content,
              "",
              `Produce the design: ${filePath}`,
            ].join("\n"),
            dependencies,
            model: "o3-mini",
          }),
        );

        const module = new Module(
          slug,
          await inputs<ModuleInput>(slug, {
            model: props.model,
            path: filePath,
            content: design.content,
            dependencies,
          }),
        );

        return module;
      } else if (filePlan.type === "typescript") {
        const requirementsSlug = slug.replace(".ts", ".md");
        const requirements = new Requirements(
          requirementsSlug,
          await inputs<RequirementsInput>(requirementsSlug, {
            // file: file.path.replace(".ts", ".md").replace("src/", "design/"),
            requirements: [
              "Context:",
              props.content,
              "Define the low-level requirements for this TypeScript file:",
              filePath,
            ],
            dependencies,
          }),
        );
        return new TypeScriptFile(
          slug,
          await inputs<TypeScriptFileInput>(slug, {
            path: filePath,
            requirements: requirements.content,
            dependencies,
          }),
        );
        // } else if (filePlan.type === "package.json") {
        //   return new PackageJson(
        //     slugify(filePath),
        //     await inputs<PackageJsonInput>(slug, {
        //       path: filePath,
        //       name: "todo",
        //       requirements: [
        //         "Context:",
        //         props.content,
        //         "Create the package.json:",
        //         filePath,
        //       ],
        //       dependencies,
        //     }),
        //   );
        // } else if (filePlan.type === "tsconfig.json") {
        //   return new TypeScriptConfig(
        //     slugify(filePath),
        //     await inputs<TypeScriptConfigInput>(slug, {
        //       path: filePath,
        //       requirements: [props.content],
        //       dependencies,
        //     }),
        //   );
      } else if (filePlan.type === "folder") {
        return new Folder(slug, filePath, ...dependencies.map((d) => d.path));
      } else {
        console.error(`Unknown file type: ${filePlan.type}`);
        return undefined;
      }
    }
  },
) {}

async function createPlan(
  ctx: CreateContext,
  props: ModuleInput,
  model: LanguageModel,
): Promise<CreatePlan> {
  const result = await generateObject({
    model,
    schema: CreatePlan,
    temperature: 0.1,
    messages: [
      {
        role: "system",
        content: Prompts.program,
      },
      ...excludeDependenciesFromPlan(props.dependencies),
      {
        role: "user",
        content: [
          "Derive the execution plan for this document:",
          "```md",
          props.content,
          "```",
          "You must only include files explicitly mentioned in the document.",
          "Do not preemptively assume that any other files are needed.",
        ].join("\n\n"),
      },
    ],
  });

  return result.object;
}

async function updatePlan(
  ctx: UpdateContext<ModuleOutput>,
  props: ModuleInput,
  model: LanguageModel,
): Promise<UpdatePlan> {
  const newContent = await fs.readFile(props.path, "utf-8");
  const oldContent = ctx.output.content;
  const patch = createPatch(props.path, oldContent, newContent);
  console.log({
    role: "assistant",
    content: JSON.stringify(ctx.output.plan),
  });
  try {
    const result = await generateObject({
      model,
      schema: UpdatePlan,
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content: Prompts.program,
        },
        ...excludeDependenciesFromPlan(props.dependencies),
        {
          role: "user",
          content: [
            "Derive the execution plan for this document:",
            "```md",
            oldContent,
            "```",
          ].join("\n\n"),
        } satisfies CoreMessage,
        {
          role: "assistant",
          content: JSON.stringify(ctx.output.plan),
        } satisfies CoreMessage,
        {
          role: "user",
          content: [
            "I've made the following changes to the document:",
            "```diff",
            patch,
            "```",
            "Please update the plan to reflect the changes.",
            "You must only include files explicitly mentioned in the document.",
            "Do not preemptively assume that any other files are needed.",
          ].join("\n"),
        } satisfies CoreMessage,
      ],
    });

    return result.object;
  } catch (error) {
    console.log("Failed to update plan");
    console.error(error);
    throw error;
  }
}

function excludeDependenciesFromPlan(dependencies: FileContext[] | undefined) {
  if (dependencies) {
    return [
      ...dependenciesAsMessages(dependencies),
      ...(dependencies
        ? [
            {
              role: "user" as const,
              content: [
                "Remember that these files don't need to be create",
                ...dependencies.map((dep) => `- ${dep.path}`),
              ].join("\n"),
            },
            {
              role: "assistant" as const,
              content: [
                "Got it, I acknowledge that the following files will not be included as create/update/delete/noop nodes in the plan",
                ...dependencies.map((dep) => `- ${dep.path}`),
              ].join("\n"),
            },
          ]
        : []),
    ];
  } else {
    return [];
  }
}

function topoSort(dependencies: Record<string, string[]>): string[] {
  const visited = new Set<string>();
  const temp = new Set<string>();
  const order: string[] = [];

  function visit(file: string) {
    if (temp.has(file)) {
      throw new Error(`Circular dependency detected involving ${file}`);
    }
    if (visited.has(file)) {
      return;
    }

    temp.add(file);

    const deps = dependencies[file] || [];
    for (const dep of deps) {
      visit(dep);
    }

    temp.delete(file);
    visited.add(file);
    order.push(file);
  }

  const files = Object.keys(dependencies);
  for (const file of files) {
    if (!visited.has(file)) {
      visit(file);
    }
  }

  return order;
}
