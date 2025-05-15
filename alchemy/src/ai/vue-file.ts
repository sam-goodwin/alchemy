import { generateText } from "ai";
import type { Context } from "../context.js";
import { StaticVueFile } from "../fs/static-vue-file.js";
import { Resource } from "../resource.js";
import type { Secret } from "../secret.js";
import { type ModelConfig, createModel } from "./client.js";

/**
 * Properties for creating or updating a VueFile
 */
export interface VueFileProps {
  /**
   * Path to the Vue file
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
   *   Generate a Vue component using:
   *   ${alchemy.file("src/api.ts")}
   * `
   */
  prompt: string;

  /**
   * System prompt for the model
   * This is used to provide instructions to the model about how to format the response
   * The default system prompt instructs the model to return a single Vue component inside ```vue fences
   * @default "You are a Vue component generator. Create a single Vue component based on the user's requirements. Your response MUST include only a single Vue component inside ```vue fences. Do not include any other text, explanations, or multiple code blocks."
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
 * A Vue file that can be created, updated, and deleted
 */
export interface VueFile extends VueFileProps, Resource<"ai::VueFile"> {
  /**
   * Content of the Vue file
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
 * Default system prompt for Vue file generation
 */
const DEFAULT_VUE_SYSTEM_PROMPT =
  "You are a Vue component generator. Create a single Vue component based on the user's requirements. Your response MUST include only a single Vue component inside ```vue fences. Do not include any other text, explanations, or multiple code blocks.";

/**
 * Resource for generating Vue files using AI models.
 * Extracts Vue code from between ```vue fences and validates the response.
 *
 * @example
 * // Create a simple Vue component
 * const button = await VueFile("button-component", {
 *   path: "./src/components/Button.vue",
 *   prompt: await alchemy`
 *     Generate a customizable button Vue component with:
 *     - Primary, secondary, and outline variants
 *     - Small, medium, and large sizes
 *     - Loading state with spinner
 *     - Disabled state
 *   `,
 *   model: {
 *     id: "gpt-4o",
 *     provider: "openai"
 *   }
 * });
 *
 * @example
 * // Generate a Vue component using existing files as reference
 * const userCard = await VueFile("user-card", {
 *   path: "./src/components/UserCard.vue",
 *   prompt: await alchemy`
 *     Create a UserCard Vue component that displays user information.
 *     Follow the styling patterns from:
 *     ${alchemy.file("src/components/Card.vue")}
 *
 *     Use the user type from:
 *     ${alchemy.file("src/types/User.ts")}
 *   `,
 *   temperature: 0.2
 * });
 *
 * @example
 * // Generate a complex form component with validation and custom system prompt
 * const form = await VueFile("registration-form", {
 *   path: "./src/components/RegistrationForm.vue",
 *   prompt: await alchemy`
 *     Generate a registration form Vue component with:
 *     - Email, password, and confirm password fields
 *     - Form validation using Vuelidate or similar
 *     - Error messages for each field
 *     - Submit handler that emits form data
 *
 *     Follow these style guidelines:
 *     ${alchemy.file("src/styles/guidelines.md")}
 *   `,
 *   system: "You are an expert Vue component creator specializing in form components with validation. Create a single Vue component inside ```vue fences with no additional text.",
 *   model: {
 *     id: "claude-3-opus-20240229",
 *     provider: "anthropic"
 *   }
 * });
 */
export const VueFile = Resource(
  "ai::VueFile",
  async function (
    this: Context<VueFile>,
    _id: string,
    props: VueFileProps,
  ): Promise<VueFile> {
    // Handle deletion phase
    if (this.phase === "delete") {
      return this.destroy();
    }

    // Use provided system prompt or default
    const system = props.system || DEFAULT_VUE_SYSTEM_PROMPT;

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

    // Extract and validate Vue code
    let { code, error } = await extractVueCode(text);

    // Re-prompt if there are validation errors
    if (error) {
      const errorSystem = `${system}\n\nERROR: ${error}\n\nPlease try again and ensure your response contains exactly one Vue component inside \`\`\`vue fences.`;

      const { text: retryText } = await generateText({
        model: createModel(props),
        prompt: props.prompt,
        system: errorSystem,
        providerOptions: props.model?.options,
        ...(props.temperature === undefined
          ? {}
          : { temperature: props.temperature }),
      });

      const retryResult = await extractVueCode(retryText);

      if (retryResult.error) {
        throw new Error(
          `Failed to generate valid Vue code: ${retryResult.error}`,
        );
      }

      code = retryResult.code;
    }

    // Use StaticVueFile to create/update the file
    const file = await StaticVueFile("file", props.path, code);

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
 * Extracts Vue code from between ```vue fences
 * Validates that exactly one Vue code block exists
 *
 * @param text The text to extract Vue code from
 * @returns The extracted Vue code or error message
 */
async function extractVueCode(
  text: string,
): Promise<{ code: string; error?: string }> {
  const vueCodeRegex = /```vue\s*([\s\S]*?)```/g;
  const matches = Array.from(text.matchAll(vueCodeRegex));

  if (matches.length === 0) {
    return {
      code: "",
      error:
        "No Vue code block found in the response. Please include your code within ```vue fences.",
    };
  }

  if (matches.length > 1) {
    return {
      code: "",
      error:
        "Multiple Vue code blocks found in the response. Please provide exactly one code block within ```vue fences.",
    };
  }

  return { code: matches[0][1].trim() };
}
