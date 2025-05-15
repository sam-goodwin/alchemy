import { generateObject, type CoreMessage } from "ai";
import type { JsonSchema, Type, type } from "arktype";
import type { Context } from "../context.js";
import { Resource } from "../resource.js";
import type { Secret } from "../secret.js";
import { ark } from "./ark.js";
import { createModel, type ModelConfig } from "./client.js";

/**
 * Properties for creating or updating an AI Object
 */
export interface DataProps<T extends Type<any, any>> {
  /**
   * The ArkType schema to validate and structure the generated content
   */
  schema: T | JsonSchema;

  /**
   * Prompt for generating the content
   * Use alchemy template literals to include file context:
   * @example
   * prompt: await alchemy`
   *   Generate a description for:
   *   ${alchemy.file("src/data.ts")}
   * `
   */
  prompt?: string;

  /**
   * Message history for the conversation
   * If provided, this will be used instead of the prompt
   */
  messages?: CoreMessage[];

  /**
   * System prompt to guide the AI's behavior
   * @example
   * system: "You are a technical writer tasked with describing code"
   */
  system?: string;

  /**
   * Temperature for controlling randomness in generation.
   * Higher values (e.g., 0.8) make output more random,
   * lower values (e.g., 0.2) make it more deterministic.
   * @default 0.7
   */
  temperature?: number;

  /**
   * Base URL for the OpenAI API
   * @default 'https://api.openai.com/v1'
   */
  baseURL?: string;

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
   * Whether to freeze the generated object
   * @default false
   */
  freeze?: boolean;
}

/**
 * A resource that uses AI to generate structured content based on a schema
 */
export interface Data<T> extends Resource<"ai::Object"> {
  type: JsonSchema;

  /**
   * The generated content, typed according to the provided schema
   */
  object: T;

  /**
   * Updated message history with the AI's response appended
   */
  messages: CoreMessage[];

  /**
   * Time at which the content was generated
   */
  createdAt: number;
}

/**
 * Resource for generating structured content using the Vercel AI SDK.
 * Supports powerful context handling through the alchemy template literal tag.
 *
 * @example
 * // Generate a product description with specific fields
 * const productSchema = type({
 *   name: "string",
 *   description: "string",
 *   features: "string[]",
 *   price: "number"
 * });
 *
 * const product = await Data("new-product", {
 *   schema: productSchema,
 *   prompt: "Generate a product description for a new smartphone",
 *   system: "You are a product copywriter specializing in tech products",
 *   model: {
 *     id: "gpt-4o",
 *     provider: "openai",
 *     options: {
 *       temperature: 0.7
 *     }
 *   }
 * });
 *
 * console.log(product.object); // Typed as per schema
 *
 * @example
 * // Generate code documentation with context
 * const docSchema = type({
 *   summary: "string",
 *   parameters: {
 *     name: "string",
 *     type: "string",
 *     description: "string"
 *   }[],
 *   returns: "string"
 * });
 *
 * const docs = await Data("function-docs", {
 *   schema: docSchema,
 *   prompt: await alchemy`
 *     Generate documentation for this function:
 *     ${alchemy.file("src/utils/format.ts")}
 *   `,
 *   system: "You are a technical documentation writer",
 *   temperature: 0.2
 * });
 *
 * @example
 * // Using message history for iterative generation
 * const feedbackSchema = type({
 *   rating: "number",
 *   positives: "string[]",
 *   improvements: "string[]",
 *   summary: "string"
 * });
 *
 * const feedback = await Data("product-feedback", {
 *   schema: feedbackSchema,
 *   messages: [
 *     { role: "user", content: "I'd like feedback on my product design" },
 *     { role: "assistant", content: "I'd be happy to provide feedback. What's your product?" },
 *     { role: "user", content: "It's a new smart home device that..." }
 *   ],
 *   system: "You are a product design expert providing structured feedback",
 *   temperature: 0.3
 * });
 */
export const Data = Resource("ai::Object", async function <
  const T extends Type<any, any>,
>(this: Context<Data<any>>, _id: string, props: DataProps<T>): Promise<
  Data<type.infer<T>>
> {
  if (this.phase === "delete") {
    return this.destroy();
  }

  // Validate that either prompt or messages is provided
  if (!props.prompt && !props.messages) {
    throw new Error("Either prompt or messages must be provided");
  }

  if (this.phase === "update" && props.freeze) {
    return this(this.output);
  }

  // Create messages array if only prompt is provided
  const messages = props.messages || [{ role: "user", content: props.prompt! }];

  // Generate structured output using generateObject
  const { object } = await generateObject({
    model: createModel(props),
    // Convert ArkType schema to Zod schema for generateObject
    // This is needed because generateObject expects a Zod schema
    schema: ark.schema<type.infer<T>>(props.schema),
    providerOptions: props.model?.options,
    system:
      props.system ||
      "You are an AI assistant tasked with generating structured content.",
    messages,
    ...(props.temperature === undefined
      ? {}
      : // some models error if you provide it (rather than ignoring it)
        { temperature: props.temperature }),
  });

  // Create updated message history with the structured response
  const responseText = JSON.stringify(object);
  const updatedMessages = [
    ...messages,
    {
      role: "assistant" as const,
      content: responseText,
    },
  ];

  // Return the resource with typed content and updated messages
  return this({
    type: props.schema,
    object: object,
    messages: updatedMessages,
    createdAt: Date.now(),
  });
});
