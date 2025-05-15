import { generateText } from "ai";
import type { Context } from "../context.js";
import { StaticTypeScriptFile } from "../fs/static-typescript-file.js";
import { Resource } from "../resource.js";
import type { Secret } from "../secret.js";
import { createModel, type ModelConfig } from "./client.js";

/**
 * Properties for creating or updating a TypeScriptFile
 */
export interface TypeScriptFileProps {
  /**
   * Path to the TypeScript file
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
   *   Generate a TypeScript utility function using:
   *   ${alchemy.file("src/types.ts")}
   * `
   */
  prompt: string;

  /**
   * System prompt for the model
   * This is used to provide instructions to the model about how to format the response
   * The default system prompt instructs the model to return TypeScript code inside ```ts fences
   * @default "You are a TypeScript code generator. Create TypeScript code based on the user's requirements. Your response MUST include only TypeScript code inside ```ts fences. Do not include any other text, explanations, or multiple code blocks."
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
   * Prettier configuration to use for formatting the TypeScript code
   * If not provided, will use the default Prettier configuration
   */
  prettierConfig?: object;
}

/**
 * A TypeScript file that can be created, updated, and deleted
 */
export interface TypeScriptFile
  extends TypeScriptFileProps,
    Resource<"ai::TypeScriptFile"> {
  /**
   * Content of the TypeScript file
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
 * Default system prompt for TypeScript file generation
 */
const DEFAULT_TS_SYSTEM_PROMPT =
  "You are a TypeScript code generator. Create TypeScript code based on the user's requirements. Your response MUST include only TypeScript code inside ```ts fences. Do not include any other text, explanations, or multiple code blocks.";

/**
 * Resource for generating TypeScript files using AI models.
 * Extracts TypeScript code from between ```ts fences, validates the response,
 * and formats the code with Prettier.
 *
 * @example
 * // Create a utility function
 * const utils = await TypeScriptFile("string-utils", {
 *   path: "./src/utils/string-utils.ts",
 *   prompt: await alchemy`
 *     Generate TypeScript utility functions for string manipulation:
 *     - Capitalize first letter
 *     - Truncate with ellipsis
 *     - Convert to camelCase and kebab-case
 *     - Remove special characters
 *   `,
 *   model: {
 *     id: "gpt-4o",
 *     provider: "openai"
 *   }
 * });
 *
 * @example
 * // Generate a TypeScript class with custom formatting
 * const userService = await TypeScriptFile("user-service", {
 *   path: "./src/services/UserService.ts",
 *   prompt: await alchemy`
 *     Create a UserService class that handles user authentication and profile management.
 *     The service should use the User type from:
 *     ${alchemy.file("src/types/User.ts")}
 *
 *     Include methods for:
 *     - login(email, password)
 *     - register(user)
 *     - updateProfile(userId, profileData)
 *     - deleteAccount(userId)
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
 * // Generate a React hook with custom system prompt
 * const useFormHook = await TypeScriptFile("use-form", {
 *   path: "./src/hooks/useForm.ts",
 *   prompt: await alchemy`
 *     Create a custom React hook called useForm that handles form state, validation, and submission.
 *     It should support:
 *     - Initial values
 *     - Validation rules
 *     - Field errors
 *     - Form submission with loading state
 *     - Reset functionality
 *   `,
 *   system: "You are an expert React developer specializing in TypeScript hooks. Create a single TypeScript file inside ```ts fences with no additional text. Follow React best practices and include proper typing.",
 *   model: {
 *     id: "claude-3-opus-20240229",
 *     provider: "anthropic"
 *   }
 * });
 */
export const TypeScriptFile = Resource(
  "ai::TypeScriptFile",
  async function (
    this: Context<TypeScriptFile>,
    _id: string,
    props: TypeScriptFileProps,
  ): Promise<TypeScriptFile> {
    // Handle delete phase
    if (this.phase === "delete") {
      // StaticTypeScriptFile will handle the deletion
      return this.destroy();
    }

    // Use provided system prompt or default
    const system = props.system || DEFAULT_TS_SYSTEM_PROMPT;

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

    // Extract and validate TypeScript code
    let { code, error } = await extractTypeScriptCode(text);

    // Re-prompt if there are validation errors
    if (error) {
      const errorSystem = `${system}\n\nERROR: ${error}\n\nPlease try again and ensure your response contains exactly one TypeScript code block inside \`\`\`ts fences.`;

      const { text: retryText } = await generateText({
        model: createModel(props),
        prompt: props.prompt,
        system: errorSystem,
        providerOptions: props.model?.options,
        ...(props.temperature === undefined
          ? {}
          : { temperature: props.temperature }),
      });

      const retryResult = await extractTypeScriptCode(retryText);

      if (retryResult.error) {
        throw new Error(
          `Failed to generate valid TypeScript code: ${retryResult.error}`,
        );
      }

      code = retryResult.code;
    }

    // Use StaticTypeScriptFile to create/update the file
    const file = await StaticTypeScriptFile("file", props.path, code);

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
 * Extracts TypeScript code from between ```ts fences
 * Validates that exactly one TypeScript code block exists
 *
 * @param text The text to extract TypeScript code from
 * @returns The extracted TypeScript code or error message
 */
async function extractTypeScriptCode(
  text: string,
): Promise<{ code: string; error?: string }> {
  const tsCodeRegex = /```ts\s*([\s\S]*?)```/g;
  const matches = Array.from(text.matchAll(tsCodeRegex));

  if (matches.length === 0) {
    return {
      code: "",
      error:
        "No TypeScript code block found in the response. Please include your code within ```ts fences.",
    };
  }

  if (matches.length > 1) {
    return {
      code: "",
      error:
        "Multiple TypeScript code blocks found in the response. Please provide exactly one code block within ```ts fences.",
    };
  }

  return { code: matches[0][1].trim() };
}
