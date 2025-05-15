import { generateText } from "ai";
import type { Context } from "../context.js";
import { StaticHTMLFile } from "../fs/static-html-file.js";
import { Resource } from "../resource.js";
import type { Secret } from "../secret.js";
import { type ModelConfig, createModel } from "./client.js";

/**
 * Properties for creating or updating an HTMLFile
 */
export interface HTMLFileProps {
  /**
   * Path to the HTML file
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
   *   Generate an HTML page using:
   *   ${alchemy.file("src/templates/base.html")}
   * `
   */
  prompt: string;

  /**
   * System prompt for the model
   * This is used to provide instructions to the model about how to format the response
   * The default system prompt instructs the model to return HTML code inside ```html fences
   * @default "You are an HTML code generator. Create HTML code based on the user's requirements. Your response MUST include only HTML code inside ```html fences. Do not include any other text, explanations, or multiple code blocks."
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
}

/**
 * An HTML file that can be created, updated, and deleted
 */
export interface HTMLFile extends HTMLFileProps, Resource<"ai::HTMLFile"> {
  /**
   * Content of the HTML file
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
 * Default system prompt for HTML file generation
 */
const DEFAULT_HTML_SYSTEM_PROMPT =
  "You are an HTML code generator. Create HTML code based on the user's requirements. Your response MUST include only HTML code inside ```html fences. Do not include any other text, explanations, or multiple code blocks.";

/**
 * Resource for generating HTML files using AI models.
 * Extracts HTML code from between ```html fences and validates the response.
 *
 * @example
 * // Create a simple landing page
 * const landingPage = await HTMLFile("landing-page", {
 *   path: "./public/index.html",
 *   prompt: await alchemy`
 *     Generate a modern landing page for a SaaS product with:
 *     - Hero section with headline and call-to-action
 *     - Features section with 3 key features
 *     - Pricing section with 3 tiers
 *     - Testimonials section with 2 customer quotes
 *     - Contact form and footer
 *   `,
 *   model: {
 *     id: "gpt-4o",
 *     provider: "openai"
 *   }
 * });
 *
 * @example
 * // Generate an HTML email template
 * const emailTemplate = await HTMLFile("welcome-email", {
 *   path: "./emails/welcome.html",
 *   prompt: await alchemy`
 *     Create an HTML email template for welcoming new users to our platform.
 *     The email should include:
 *     - Company logo and branding
 *     - Personalized welcome message (use {{name}} placeholder)
 *     - Three steps to get started
 *     - Support contact information
 *     - Unsubscribe footer
 *
 *     Make sure it's responsive and works in all major email clients.
 *   `,
 *   temperature: 0.2
 * });
 *
 * @example
 * // Generate an HTML component with custom system prompt
 * const navComponent = await HTMLFile("navigation", {
 *   path: "./components/nav.html",
 *   prompt: await alchemy`
 *     Create a responsive navigation component with:
 *     - Logo in the left corner
 *     - Navigation links: Home, Products, Services, About, Contact
 *     - Mobile hamburger menu that expands/collapses
 *     - Login/signup buttons on the right side
 *     - Dark/light mode toggle
 *   `,
 *   system: "You are an expert HTML/CSS developer specializing in responsive components. Create a single HTML file inside ```html fences with no additional text. Use modern HTML5 semantic elements and inline CSS if needed.",
 *   model: {
 *     id: "claude-3-opus-20240229",
 *     provider: "anthropic"
 *   }
 * });
 */
export const HTMLFile = Resource(
  "ai::HTMLFile",
  async function (
    this: Context<HTMLFile>,
    _id: string,
    props: HTMLFileProps,
  ): Promise<HTMLFile> {
    // Handle deletion phase
    if (this.phase === "delete") {
      return this.destroy();
    }

    // Use provided system prompt or default
    const system = props.system || DEFAULT_HTML_SYSTEM_PROMPT;

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

    // Extract and validate HTML code
    let { code, error } = await extractHTMLCode(text);

    // Re-prompt if there are validation errors
    if (error) {
      const errorSystem = `${system}\n\nERROR: ${error}\n\nPlease try again and ensure your response contains exactly one HTML code block inside \`\`\`html fences.`;

      const { text: retryText } = await generateText({
        model: createModel(props),
        prompt: props.prompt,
        system: errorSystem,
        providerOptions: props.model?.options,
        ...(props.temperature === undefined
          ? {}
          : { temperature: props.temperature }),
      });

      const retryResult = await extractHTMLCode(retryText);

      if (retryResult.error) {
        throw new Error(
          `Failed to generate valid HTML code: ${retryResult.error}`,
        );
      }

      code = retryResult.code;
    }

    // Use StaticHTMLFile to create/update the file
    const file = await StaticHTMLFile("file", props.path, code);

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
 * Extracts HTML code from between ```html fences
 * Validates that exactly one HTML code block exists
 *
 * @param text The text to extract HTML code from
 * @returns The extracted HTML code or error message
 */
async function extractHTMLCode(
  text: string,
): Promise<{ code: string; error?: string }> {
  const htmlCodeRegex = /```html\s*([\s\S]*?)```/g;
  const matches = Array.from(text.matchAll(htmlCodeRegex));

  if (matches.length === 0) {
    return {
      code: "",
      error:
        "No HTML code block found in the response. Please include your code within ```html fences.",
    };
  }

  if (matches.length > 1) {
    return {
      code: "",
      error:
        "Multiple HTML code blocks found in the response. Please provide exactly one code block within ```html fences.",
    };
  }

  return { code: matches[0][1].trim() };
}
