import { generateObject, generateText } from "ai";
import type { JsonSchema, Type, type } from "arktype";
import type { Context } from "../context.js";
import { StaticJsonFile } from "../fs/static-json-file.js";
import { Resource } from "../resource.js";
import type { Secret } from "../secret.js";
import { ark } from "./ark.js";
import { type ModelConfig, createModel } from "./client.js";

/**
 * Properties for creating or updating a JSONFile
 */
export interface JSONFileProps<
  T extends Type<any, any> | undefined = undefined,
> {
  /**
   * Path to the JSON file
   */
  path: string;

  /**
   * Optional ArkType schema to validate and structure the generated JSON
   * When provided, the resource will use generateObject with schema validation
   * When not provided, it will extract JSON from between ```json fences
   */
  schema?: T;

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
   *   Generate a JSON configuration for:
   *   ${alchemy.file("src/config.ts")}
   * `
   */
  prompt: string;

  /**
   * System prompt for the model
   * This is used to provide instructions to the model about how to format the response
   * @default Depends on whether schema is provided
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
   * Whether to pretty-print the JSON with indentation
   * @default true
   */
  pretty?: boolean;

  /**
   * Number of spaces to use for indentation when pretty-printing
   * @default 2
   */
  indent?: number;
}

/**
 * A JSON file that can be created, updated, and deleted
 */
export interface JSONFile<T = any>
  extends Omit<JSONFileProps, "schema">,
    Resource<"ai::JSONFile"> {
  /**
   * Content of the JSON file as a string
   */
  content: string;

  /**
   * Parsed JSON object
   */
  json: T;

  /**
   * Schema used to validate the JSON (if provided)
   */
  schema?: JsonSchema;

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
 * Default system prompt for JSON file generation without schema
 */
const DEFAULT_JSON_SYSTEM_PROMPT =
  "You are a JSON generator. Create valid JSON based on the user's requirements. Your response MUST include only JSON inside ```json fences. Do not include any other text, explanations, or multiple code blocks.";

/**
 * Resource for generating JSON files using AI models.
 * Can operate in two modes:
 * 1. With schema: Uses generateObject with type validation
 * 2. Without schema: Extracts JSON from between ```json fences
 *
 * @example
 * // Generate a configuration file with freeform JSON
 * const config = await JSONFile("app-config", {
 *   path: "./config/app.json",
 *   prompt: await alchemy`
 *     Generate a configuration for a web application with:
 *     - Server settings (port, host, timeout)
 *     - Database connection details (redact any passwords)
 *     - Logging configuration
 *     - Feature flags
 *   `,
 *   model: {
 *     id: "gpt-4o",
 *     provider: "openai"
 *   }
 * });
 *
 * @example
 * // Generate JSON with schema validation
 * import { type } from "arktype";
 *
 * const userSchema = type({
 *   users: [{
 *     id: "string",
 *     name: "string",
 *     email: "string",
 *     role: "'admin' | 'user' | 'guest'",
 *     permissions: "string[]",
 *     active: "boolean"
 *   }]
 * });
 *
 * const userData = await JSONFile("user-data", {
 *   path: "./data/users.json",
 *   schema: userSchema,
 *   prompt: "Generate sample user data for an application with various roles and permissions",
 *   temperature: 0.2
 * });
 *
 * // Type-safe access to the generated data
 * console.log(userData.json.users[0].role); // Typed as 'admin' | 'user' | 'guest'
 *
 * @example
 * // Generate API mock data with custom system prompt
 * const apiMock = await JSONFile("api-mock", {
 *   path: "./mocks/products-api.json",
 *   prompt: await alchemy`
 *     Create mock data for a product catalog API response with:
 *     - 10 products with different categories
 *     - Each product should have id, name, price, category, inventory, and image_url
 *     - Include pagination metadata (total, page, limit)
 *   `,
 *   system: "You are an API design expert. Create realistic mock JSON data that follows REST API best practices. Your response must be valid JSON inside ```json fences.",
 *   model: {
 *     id: "claude-3-opus-20240229",
 *     provider: "anthropic"
 *   },
 *   pretty: true,
 *   indent: 4
 * });
 */
export const JSONFile = Resource("ai::JSONFile", async function <
  const T extends Type<any, any> | undefined = undefined,
>(this: Context<JSONFile<T extends Type<any, any> ? type.infer<T> : any>>, _id: string, props: JSONFileProps<T>): Promise<
  JSONFile<T extends Type<any, any> ? type.infer<T> : any>
> {
  // Handle deletion phase
  if (this.phase === "delete") {
    return this.destroy();
  }

  let jsonContent: string;
  let jsonObject: any;

  // Check if schema is provided
  if (props.schema) {
    // Use schema-based generation
    const { object } = await generateObject({
      model: createModel(props),
      schema: ark.schema<type.infer<typeof props.schema>>(props.schema),
      providerOptions: props.model?.options,
      system:
        props.system ||
        "Generate a valid JSON object based on the provided requirements.",
      prompt: props.prompt,
      ...(props.temperature === undefined
        ? {}
        : { temperature: props.temperature }),
    });

    jsonObject = object;

    // Use StaticJsonFile to create the file
    const file = await StaticJsonFile("file", props.path, jsonObject);
    jsonContent = file.content;
  } else {
    // Use fence-based extraction
    // Use provided system prompt or default
    const system = props.system || DEFAULT_JSON_SYSTEM_PROMPT;

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

    // Extract and validate JSON content
    let { content, error } = await extractJSONContent(text);

    // Re-prompt if there are validation errors
    if (error) {
      const errorSystem = `${system}\n\nERROR: ${error}\n\nPlease try again and ensure your response contains exactly one valid JSON block inside \`\`\`json fences.`;

      const { text: retryText } = await generateText({
        model: createModel(props),
        prompt: props.prompt,
        system: errorSystem,
        providerOptions: props.model?.options,
        ...(props.temperature === undefined
          ? {}
          : { temperature: props.temperature }),
      });

      const retryResult = await extractJSONContent(retryText);

      if (retryResult.error) {
        throw new Error(`Failed to generate valid JSON: ${retryResult.error}`);
      }

      content = retryResult.content;
    }

    // Parse JSON to get the object representation
    jsonObject = JSON.parse(content);

    // Use StaticJsonFile to create the file
    const file = await StaticJsonFile("file", props.path, jsonObject);
    jsonContent = file.content;
  }

  // Return the resource
  return this({
    ...props,
    schema: props.schema,
    content: jsonContent,
    json: jsonObject,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
});

/**
 * Extracts JSON content from between ```json fences
 * Validates that exactly one JSON code block exists
 *
 * @param text The text to extract JSON from
 * @returns The extracted JSON or error message
 */
async function extractJSONContent(
  text: string,
): Promise<{ content: string; error?: string }> {
  const jsonCodeRegex = /```json\s*([\s\S]*?)```/g;
  const matches = Array.from(text.matchAll(jsonCodeRegex));

  if (matches.length === 0) {
    return {
      content: "",
      error:
        "No JSON code block found in the response. Please include your JSON within ```json fences.",
    };
  }

  if (matches.length > 1) {
    return {
      content: "",
      error:
        "Multiple JSON code blocks found in the response. Please provide exactly one JSON block within ```json fences.",
    };
  }

  const content = matches[0][1].trim();

  // Validate JSON can be parsed
  try {
    JSON.parse(content);
    return { content };
  } catch (e) {
    return {
      content: "",
      error: `Invalid JSON: ${(e as Error).message}. Please provide valid JSON syntax.`,
    };
  }
}
