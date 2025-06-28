import { type } from "arktype";
import fs from "node:fs/promises";
import path from "node:path";
import { Data } from "../../ai/data.ts";
import { Document } from "../../ai/document.ts";
import { alchemy } from "../../alchemy.ts";
import { Folder } from "../../fs/folder.ts";

function getArg(arg: string) {
  const idx = process.argv.findIndex((a) => a === arg);
  return idx > -1 ? process.argv[idx + 1] : undefined;
}

const onlyProviderName = getArg("--provider");
const onlyResourceName = getArg("--resource");

export interface DocsProps {
  /**
   * The output directory for the docs.
   */
  outDir: string | Folder;

  /**
   * The source directory for the docs.
   */
  srcDir: string;

  /**
   * Whether to filter the docs.
   * If true, include all docs.
   * If false, include none.
   * If a number, include that many providers.
   *
   * @default true (all docs)
   */
  filter?: boolean | number;

  /**
   * Whether to run in parallel.
   *
   * @default true
   */
  parallel?: boolean;
}

export type Providers = {
  dir: string;
  provider: string;
  documents: Document[];
}[];

export async function Providers({
  srcDir,
  outDir,
  // filter,
  parallel = true,
}: DocsProps): Promise<Providers> {
  outDir = typeof outDir === "string" ? outDir : outDir.path;

  const exclude = [
    "util",
    "test",
    "vitepress",
    "vite",
    "shadcn",
    "internal",
    "web",
  ];

  // Get all folders in the alchemy/src directory
  const providers = (
    await fs.readdir(srcDir, {
      withFileTypes: true,
    })
  )
    .filter((dirent) => dirent.isDirectory() && !exclude.includes(dirent.name))
    .map((dirent) => path.join(dirent.parentPath, dirent.name));

  if (parallel) {
    return await Promise.all(
      providers.map((provider) =>
        generateProviderDocs({ provider, outDir, parallel }),
      ),
    );
  }
  const generatedProviders = [];
  for (const provider of providers) {
    generatedProviders.push(
      await generateProviderDocs({ provider, outDir, parallel }),
    );
  }
  return generatedProviders;
}

async function generateProviderDocs({
  provider,
  outDir,
  parallel,
}: {
  provider: string;
  outDir: string;
  parallel: boolean;
}) {
  const providerName = path.basename(provider);
  const files = (
    await fs.readdir(path.resolve(provider), {
      withFileTypes: true,
    })
  )
    .filter((dirent) => dirent.isFile())
    .map((dirent) =>
      path.relative(process.cwd(), path.resolve(provider, dirent.name)),
    )
    .filter((file) => file.endsWith(".ts") && !file.endsWith("index.ts"));

  type Group = (typeof groups)[number];

  const {
    object: { groups },
  } = await Data(`docs/${providerName}`, {
    model: {
      id: "o3-mini",
      provider: "openai",
      options: {
        reasoningEffort: "high",
      },
    },
    freeze: onlyProviderName === undefined || onlyProviderName !== providerName,
    temperature: 0.1,
    schema: type({
      groups: type({
        identifier: type("string").describe(
          "The identifier of the file's primary exported Resource/Function/Type, e.g. Bucket or StaticSite, AstroFile, TypeScriptFile",
        ),
        filename: type("string").describe(
          "The filename of the Resource's Document, e.g. bucket.md or static-site.md",
        ),
        category: type("'Resource'|'Client'|'Utility'|'Types'").describe(
          "The classification of the Resource's Document, one of: Resource, Client, Utility, or Types.",
        ),
      }).array(),
    }),
    system: await alchemy`
      You are a technical writer tasked with identifying the distinct documents that need to be written for a document group (folder) in a documentation site.
      You will be provided with a list of documents and instructions on how to classify them.
      Each document has a title, file name, and category.
    `,
    prompt: await alchemy`
      Identify and classify the documents that need to be written for the '${provider}' Service's Alchemy Resources.
      For background knowledge on Alchemy, see ${alchemy.file("./README.md")}.
      For background knowledge on the structure of an Alchemy Resource, see ${alchemy.file("./.cursorrules")}.

      The ${provider} Service has the following resources:
      ${alchemy.files(files)}

      A file is considered a "Resource" if it contains a const <ResourceName> = Resource(...) call or if it is a function that calls a Resource function, e.g. const TypeScriptFile = () => File(...), or it is the Workflow or DurableObject classes.
      A file is considered a "Client" if it exposes a wrapper around creating a SDK client or fetch.
      A file is considered a "Utility" if it contains utility functions that are not resources or clients.
      A file is considered a "Types" if it contains just type definitions and maybe helpers around working with those types.

      The title should be simply the name of the resource's const in code (with spaces added in between each word), e.g. "Bucket" or "Function", except with spaces, e.g. "StaticSite" for "const StaticSite". Maintain all other casing.

      // "Resource Name"
      const ResourceName = Resource(...)
    `,
  });

  const providerDocsDir = (await Folder(path.join(outDir, providerName))).path;

  let documents: Document[] = [];
  if (parallel) {
    documents = await Promise.all(
      groups.filter((g) => g.category === "Resource").map(generateDocument),
    );
  } else {
    for (const g of groups.filter((g) => g.category === "Resource")) {
      documents.push(await generateDocument(g));
    }
  }

  async function generateDocument(g: Group) {
    return Document(`docs/${providerName}/${g.identifier}`, {
      title: g.identifier,
      path: path.join(
        providerDocsDir,
        `${g.filename.replace(".ts", "").replace(".md", "")}.md`,
      ),
      freeze:
        onlyResourceName !== undefined && onlyResourceName !== g.identifier,
      model: {
        id: "claude-3-5-sonnet-latest",
        provider: "anthropic",
        // options: {
        //   reasoningEffort: "high",
        // },
      },
      prompt: await alchemy`
        You are a technical writer writing API documentation for an Alchemy IaC Resource.
        See ${alchemy.file("./README.md")} to understand the overview of Alchemy.
        See ${alchemy.file("./.cursorrules")} to better understand the structure and convention of an Alchemy Resource.

        Documentation should be written in the mdx format for an Astro Starlight documentation site.

        Relevant files for the ${providerName} Service:
        ${alchemy.files(files)}
        
        Write concise documentation for the "${g.identifier}" Resource.

        > [!CAUTION]
        > Avoid the temptation to over explain or over describe. Focus on concise, simple, high value snippets. One heading and 0-1 descriptions per snippet.
        
        > [!TIP]
        > Make sure the examples follow a natural progression from the minimal example to logical next steps of how the Resource might be used.

        Each document must follow the following format:
        
        # ${g.identifier}

        (simple description with an external link to the provider's website)
        e.g.
        The Efs component lets you add [Amazon Elastic File System (EFS)](https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html) to your app.

        # Minimal Example

        (brief 1-2 sentences of what it does)

        \`\`\`ts
        import { ${g.identifier.replaceAll(" ", "")} } from "alchemy/${providerName}";

        (example)
        \`\`\`

        # (one heading per variation)

        (brief 1-2 sentences of what it does)

        \`\`\`ts
        import { ${g.identifier.replaceAll(" ", "")} } from "alchemy/${providerName}";

        (example)
        \`\`\`

        Before writing the document, think through:
        1. What is the minimal, most common example use case for this resource?
        2. What are the variations (e.g. combination of different options) that are also commonly used, e.g. specifying the memory size of a lambda function.
        3. Make sure to draw from the examples and your understanding of Alchemy.

        Refer to alchemy docs to understand the context of how this documentation is consumed:
        - ${alchemy.file("./alchemy-web/docs/what-is-alchemy.md")}
        - ${alchemy.file("./alchemy-web/docs/getting-started.md")}
        - ${alchemy.folder("./alchemy-web/docs/concepts/")}
        
        ${
          providerName === "cloudflare"
            ? await alchemy`# Bind to a Worker
        (if it is a Cloudflare Resource)

        (brief 1-2 sentences of what it does)

        \`\`\`ts
        import { Worker, ${g.identifier.replaceAll(" ", "")} } from "alchemy/${providerName}";

        const myResource = await ${g.identifier.replaceAll(" ", "")}("my-resource", {
          // ...
        });

        await Worker("my-worker", {
          name: "my-worker",
          script: "console.log('Hello, world!')",
          bindings: {
            myResource,
          },
        });
        \`\`\``
            : ""
        }
      `,
    });
  }

  return {
    dir: providerDocsDir,
    provider: providerName,
    documents,
  };
}
