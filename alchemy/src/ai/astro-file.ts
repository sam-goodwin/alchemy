import { generateText } from "ai";
import prettier from "prettier";
import type { Context } from "../context.js";
import { StaticAstroFile } from "../fs/static-astro-file.js";
import { Resource } from "../resource.js";
import type { Secret } from "../secret.js";
import { type ModelConfig, createModel } from "./client.js";

/**
 * Properties for creating or updating an AstroFile
 */
export interface AstroFileProps {
  /**
   * Path to the Astro file
   */
  path: string;

  /**
   * Base URL for the OpenAI API
   * @default 'https://api.openai.com/v1'
   */
  baseURL?: string;

  /**
   * Prompt for generating content
   * Use alchemy template literals to include file context:
   * @example
   * prompt: await alchemy`
   *   Generate an Astro component using:
   *   ${alchemy.file("src/types.ts")}
   * `
   */
  prompt: string;

  /**
   * System prompt for the model
   * This is used to provide instructions to the model about how to format the response
   * The default system prompt instructs the model to return Astro code inside ```astro fences
   * @default "You are an Astro component generator. Create Astro components based on the user's requirements. Your response MUST include only Astro code inside ```astro fences. Do not include any other text, explanations, or multiple code blocks."
   */
  system?: string;

  /**
   * OpenAI API key to use for generating content
   * If not provided, will use OPENAI_API_KEY environment variable
   */
  apiKey?: Secret;

  /**
   * Model configuration
   */
  model?: ModelConfig;

  /**
   * Temperature for controlling randomness in generation.
   * Higher values (e.g., 0.8) make output more random,
   * lower values (e.g., 0.2) make it more deterministic.
   * @default 0.7
   */
  temperature?: number;

  /**
   * Prettier configuration to use for formatting the Astro code
   * If not provided, will use the default Prettier configuration
   */
  prettierConfig?: prettier.Options;
}

/**
 * An Astro file that can be created, updated, and deleted
 */
export interface AstroFile extends AstroFileProps, Resource<"ai::AstroFile"> {
  /**
   * Content of the Astro file
   */
  content: string;

  /**
   * Time at which the file was created
   */
  createdAt: number;

  /**
   * Time at which the file was last updated
   */
  updatedAt: number;
}

/**
 * Default system prompt for Astro file generation
 */
const DEFAULT_ASTRO_SYSTEM_PROMPT =
  "You are an Astro component generator. Create Astro components based on the user's requirements. Your response MUST include only Astro code inside ```astro fences. Do not include any other text, explanations, or multiple code blocks.";

/**
 * Resource for generating Astro files using AI models.
 * Extracts Astro code from between ```astro fences, validates the response,
 * and formats the code with Prettier.
 *
 * @example
 * // Create a simple Astro component
 * const header = await AstroFile("header", {
 *   path: "./src/components/Header.astro",
 *   prompt: await alchemy`
 *     Generate an Astro header component with:
 *     - Site logo
 *     - Navigation menu with Home, About, Services, Contact links
 *     - Mobile responsive design
 *     - Dark/light mode toggle
 *   `,
 *   model: {
 *     id: "gpt-4o",
 *     provider: "openai"
 *   }
 * });
 *
 * @example
 * // Generate an Astro page with data fetching
 * const blogPost = await AstroFile("blog-post", {
 *   path: "./src/pages/blog/[slug].astro",
 *   prompt: await alchemy`
 *     Create an Astro blog post page that:
 *     - Uses getStaticPaths to generate pages from a CMS
 *     - Renders markdown content
 *     - Includes author info, publication date, and related posts
 *     - Has social sharing buttons
 *
 *     Use the following types:
 *     ${alchemy.file("src/types/Blog.ts")}
 *   `,
 *   temperature: 0.2,
 *   prettierConfig: {
 *     semi: false,
 *     singleQuote: true,
 *     printWidth: 120
 *   }
 * });
 *
 * @example
 * // Generate a layout with custom system prompt
 * const mainLayout = await AstroFile("main-layout", {
 *   path: "./src/layouts/MainLayout.astro",
 *   prompt: await alchemy`
 *     Create the main layout for an Astro site that:
 *     - Includes common head metadata and SEO optimization
 *     - Has slots for page content, header, and footer
 *     - Imports and uses the Header and Footer components
 *     - Sets up viewport and responsive configurations
 *   `,
 *   system: "You are an expert Astro developer. Create a single Astro layout file inside ```astro fences with no additional text. Follow Astro best practices and include proper typing in the frontmatter section.",
 *   model: {
 *     id: "claude-3-opus-20240229",
 *     provider: "anthropic"
 *   }
 * });
 */
export const AstroFile = Resource(
  "ai::AstroFile",
  async function (
    this: Context<AstroFile>,
    _id: string,
    props: AstroFileProps,
  ): Promise<AstroFile> {
    // Handle deletion phase
    if (this.phase === "delete") {
      return this.destroy();
    }

    // Use provided system prompt or default
    const system = props.system || DEFAULT_ASTRO_SYSTEM_PROMPT;

    // Generate initial content
    const { text } = await generateText({
      model: createModel(props),
      prompt: props.prompt,
      system,
      providerOptions: props.model?.options,
      ...(props.temperature === undefined
        ? {}
        : { temperature: props.temperature }),
    });

    // Extract and validate Astro code
    let { code, error } = await extractAstroCode(text);

    // Re-prompt if there are validation errors
    if (error) {
      const errorSystem = `${system}\n\nERROR: ${error}\n\nPlease try again and ensure your response contains exactly one Astro code block inside \`\`\`astro fences.`;

      const { text: retryText } = await generateText({
        model: createModel(props),
        prompt: props.prompt,
        system: errorSystem,
        providerOptions: props.model?.options,
        ...(props.temperature === undefined
          ? {}
          : { temperature: props.temperature }),
      });

      const retryResult = await extractAstroCode(retryText);

      if (retryResult.error) {
        throw new Error(
          `Failed to generate valid Astro code: ${retryResult.error}`,
        );
      }

      code = retryResult.code;
    }

    // Format the code with Prettier
    try {
      // Set default parser to astro
      const prettierOptions: prettier.Options = {
        parser: "astro",
        ...props.prettierConfig,
      };

      // Format the code
      code = await prettier.format(code, prettierOptions);
    } catch (error) {
      // If Prettier formatting fails, just use the unformatted code
      console.warn("Failed to format Astro code with Prettier:", error);
    }

    // Use StaticAstroFile to create/update the file
    const file = await StaticAstroFile("file", props.path, code);

    // Return the resource
    return this({
      ...props,
      content: file.content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
);

/**
 * Extracts Astro code from between ```astro fences
 * Validates that exactly one Astro code block exists
 *
 * @param text The text to extract Astro code from
 * @returns The extracted Astro code or error message
 */
async function extractAstroCode(
  text: string,
): Promise<{ code: string; error?: string }> {
  const astroCodeRegex = /```astro\s*([\s\S]*?)```/g;
  const matches = Array.from(text.matchAll(astroCodeRegex));

  if (matches.length === 0) {
    return {
      code: "",
      error:
        "No Astro code block found in the response. Please include your code within ```astro fences.",
    };
  }

  if (matches.length > 1) {
    return {
      code: "",
      error:
        "Multiple Astro code blocks found in the response. Please provide exactly one code block within ```astro fences.",
    };
  }

  return { code: matches[0][1].trim() };
}
