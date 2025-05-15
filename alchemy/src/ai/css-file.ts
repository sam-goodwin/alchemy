import { generateText } from "ai";
import type { Context } from "../context.js";
import { StaticCSSFile } from "../fs/static-css-file.js";
import { Resource } from "../resource.js";
import type { Secret } from "../secret.js";
import { type ModelConfig, createModel } from "./client.js";

/**
 * Properties for creating or updating a CSSFile
 */
export interface CSSFileProps {
  /**
   * Path to the CSS file
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
   *   Generate CSS styles for:
   *   ${alchemy.file("src/components/Button.jsx")}
   * `
   */
  prompt: string;

  /**
   * System prompt for the model
   * This is used to provide instructions to the model about how to format the response
   * The default system prompt instructs the model to return CSS code inside ```css fences
   * @default "You are a CSS code generator. Create CSS code based on the user's requirements. Your response MUST include only CSS code inside ```css fences. Do not include any other text, explanations, or multiple code blocks."
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
 * A CSS file that can be created, updated, and deleted
 */
export interface CSSFile extends CSSFileProps, Resource<"ai::CSSFile"> {
  /**
   * Content of the CSS file
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
 * Default system prompt for CSS file generation
 */
const DEFAULT_CSS_SYSTEM_PROMPT =
  "You are a CSS code generator. Create CSS code based on the user's requirements. Your response MUST include only CSS code inside ```css fences. Do not include any other text, explanations, or multiple code blocks.";

/**
 * Resource for generating CSS files using AI models.
 * Extracts CSS code from between ```css fences and validates the response.
 *
 * @example
 * // Create styles for a website
 * const mainStyles = await CSSFile("main-styles", {
 *   path: "./public/css/main.css",
 *   prompt: await alchemy`
 *     Generate modern CSS styles for a company website with:
 *     - Clean, minimalist design
 *     - Primary color: #0062ff
 *     - Secondary color: #6c757d
 *     - Light gray background
 *     - Responsive layout for mobile, tablet, and desktop
 *     - Custom styles for buttons, cards, and navigation
 *   `,
 *   model: {
 *     id: "gpt-4o",
 *     provider: "openai"
 *   }
 * });
 *
 * @example
 * // Generate CSS based on existing HTML
 * const componentStyles = await CSSFile("component-styles", {
 *   path: "./src/styles/component.css",
 *   prompt: await alchemy`
 *     Create CSS styles for this HTML component:
 *     ${alchemy.file("src/components/Card.html")}
 *
 *     The styles should be:
 *     - Modern and clean
 *     - Include hover effects and transitions
 *     - Support both light and dark themes
 *     - Use CSS variables for colors and spacing
 *   `,
 *   temperature: 0.2
 * });
 *
 * @example
 * // Generate CSS animation with custom system prompt
 * const animationStyles = await CSSFile("animations", {
 *   path: "./src/styles/animations.css",
 *   prompt: await alchemy`
 *     Create CSS animations for:
 *     - Fade in/out
 *     - Slide in from different directions
 *     - Pulse effect
 *     - Bounce effect
 *     - Scale in/out
 *     - Rotate
 *
 *     Each animation should be reusable via class names.
 *   `,
 *   system: "You are an expert CSS animator. Create a single CSS file inside ```css fences with no additional text. Use modern CSS animation techniques and include vendor prefixes where needed for browser compatibility.",
 *   model: {
 *     id: "claude-3-opus-20240229",
 *     provider: "anthropic"
 *   }
 * });
 */
export const CSSFile = Resource(
  "ai::CSSFile",
  async function (
    this: Context<CSSFile>,
    _id: string,
    props: CSSFileProps,
  ): Promise<CSSFile> {
    // Handle deletion phase
    if (this.phase === "delete") {
      return this.destroy();
    }

    // Use provided system prompt or default
    const system = props.system || DEFAULT_CSS_SYSTEM_PROMPT;

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

    // Extract and validate CSS code
    let { code, error } = await extractCSSCode(text);

    // Re-prompt if there are validation errors
    if (error) {
      const errorSystem = `${system}\n\nERROR: ${error}\n\nPlease try again and ensure your response contains exactly one CSS code block inside \`\`\`css fences.`;

      const { text: retryText } = await generateText({
        model: createModel(props),
        prompt: props.prompt,
        system: errorSystem,
        providerOptions: props.model?.options,
        ...(props.temperature === undefined
          ? {}
          : { temperature: props.temperature }),
      });

      const retryResult = await extractCSSCode(retryText);

      if (retryResult.error) {
        throw new Error(
          `Failed to generate valid CSS code: ${retryResult.error}\n${retryText}`,
        );
      }

      code = retryResult.code;
    }

    // Use StaticCSSFile to create/update the file
    const file = await StaticCSSFile("file", props.path, code);

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
 * Extracts CSS code from between ```css fences
 * Validates that exactly one CSS code block exists
 *
 * @param text The text to extract CSS code from
 * @returns The extracted CSS code or error message
 */
async function extractCSSCode(
  text: string,
): Promise<{ code: string; error?: string }> {
  const cssCodeRegex = /```css\s*([\s\S]*?)```/g;
  const matches = Array.from(text.matchAll(cssCodeRegex));

  if (matches.length === 0) {
    return {
      code: "",
      error:
        "No CSS code block found in the response. Please include your code within ```css fences.",
    };
  }

  if (matches.length > 1) {
    return {
      code: "",
      error:
        "Multiple CSS code blocks found in the response. Please provide exactly one code block within ```css fences.",
    };
  }

  return { code: matches[0][1].trim() };
}
