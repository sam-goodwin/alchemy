import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateText } from "ai";
import * as diffLib from "diff";
import fs from "node:fs/promises";
import path from "node:path";
import type { Context } from "../context";
import { Resource } from "../resource";
import type { Secret } from "../secret";

/**
 * Base properties for a Document
 */
interface BaseDocumentProps {
  /**
   * Path to the markdown document
   */
  path: string;

  /**
   * Base URL for the OpenAI API
   * @default 'https://api.openai.com/v1'
   */
  baseURL?: string;
}

/**
 * Properties for creating a document with static content
 */
interface StaticDocumentProps extends BaseDocumentProps {
  /**
   * Static content of the document
   */
  content: string;

  /**
   * Prompt for generating content
   * @internal This is marked as never to ensure content and prompt are mutually exclusive
   */
  prompt?: never;

  /**
   * OpenAI API key
   * @internal This is marked as never since it's not needed for static content
   */
  apiKey?: never;

  /**
   * Model configuration
   * @internal This is marked as never since it's not needed for static content
   */
  model?: never;

  /**
   * Context files
   * @internal This is marked as never since it's not needed for static content
   */
  context?: never;
}

/**
 * Properties for creating a document with AI-generated content
 */
interface GeneratedDocumentProps extends BaseDocumentProps {
  /**
   * Static content of the document
   * @internal This is marked as never to ensure content and prompt are mutually exclusive
   */
  content?: never;

  /**
   * Prompt for generating content
   * Can be either a single string or an array of strings that will be joined with newlines
   */
  prompt: string | string[];

  /**
   * Optional context files to include in the prompt
   * Key is the relative path to the file
   * Value can be either the content string or another Document resource
   */
  context?: {
    [relativePath: string]:
      | string
      | Document
      | {
          path: string;
          content: string;
        };
  };

  /**
   * OpenAI API key to use for generating content
   * If not provided, will use OPENAI_API_KEY environment variable
   */
  apiKey?: Secret;

  /**
   * Model configuration
   */
  model?: {
    /**
     * Model ID to use
     * @default 'gpt-4o'
     */
    id?: string;

    /**
     * Model provider name
     * @default 'openai'
     */
    provider?: string;

    /**
     * Model-specific options
     */
    options?: Record<string, unknown>;
  };
}

/**
 * Properties for creating or updating a Document
 * Must provide either static content or a prompt for AI generation
 */
export type DocumentProps = StaticDocumentProps | GeneratedDocumentProps;

/**
 * A markdown document that can be created, updated, and deleted
 */
export interface Document
  extends Omit<DocumentProps, "content" | "prompt" | "context">,
    Resource<"docs::Document"> {
  /**
   * Content of the document
   */
  content: string;

  /**
   * Time at which the document was created
   */
  createdAt: number;

  /**
   * Time at which the document was last updated
   */
  updatedAt: number;
}

/**
 * Resource for managing markdown documents using the Vercel AI SDK
 */
export const Document = Resource(
  "docs::Document",
  async function (
    this: Context<Document, DocumentProps>,
    id: string,
    props: DocumentProps,
  ): Promise<Document> {
    // Ensure directory exists
    await fs.mkdir(path.dirname(props.path), { recursive: true });

    if (this.phase === "delete") {
      try {
        await fs.unlink(props.path);
      } catch (error: any) {
        // Ignore if file doesn't exist
        if (error.code !== "ENOENT") {
          throw error;
        }
      }
      return this.destroy();
    }

    let content: string;

    // Generate content if prompt is provided
    if ("prompt" in props) {
      // Get API key from props or environment
      const apiKey = props.apiKey?.unencrypted || process.env.OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error("OpenAI API key is required for content generation");
      }

      // Initialize OpenAI compatible provider
      const provider = createOpenAICompatible({
        name: props.model?.provider || "openai",
        apiKey,
        baseURL: props.baseURL || "https://api.openai.com/v1",
      });

      // Build the full prompt with context if provided
      let fullPrompt = Array.isArray(props.prompt)
        ? props.prompt.join("\n")
        : props.prompt!;

      // If this is an update, include the current document content and diff with previous prompt
      if (
        this.phase === "update" &&
        this.output &&
        "prompt" in this.props &&
        !("content" in this.props)
      ) {
        try {
          // Read the current document content
          const currentContent = await fs.readFile(props.path, "utf-8");

          // Get the previous prompt from GeneratedDocumentProps
          const previousPrompt = Array.isArray(this.props.prompt)
            ? this.props.prompt.join("\n")
            : this.props.prompt;

          // Generate standard unified diff
          const promptDiff = diffLib.createTwoFilesPatch(
            "previous-prompt",
            "current-prompt",
            previousPrompt,
            fullPrompt,
          );

          // Add current content and prompt diff to context
          fullPrompt = `${fullPrompt}\n\nCurrent document content:\n${currentContent}\n\nPrompt changes:\n${promptDiff}`;
        } catch (error) {
          console.warn(
            "Failed to include current document content or diff in prompt:",
            error,
          );
        }
      }
      console.log("Prompt:");
      console.log(fullPrompt);

      if (props.context) {
        const contextFiles = await Promise.all(
          Object.entries(props.context).map(async ([filePath, content]) => {
            // If content is a Document, use its content
            const fileContent =
              typeof content === "string" ? content : content.content;
            return `// ${filePath}\n${fileContent}`;
          }),
        );
        fullPrompt = `${fullPrompt}\n\nContext:\n\n${contextFiles.join("\n\n")}`;
      }

      const { text } = await generateText({
        model: provider(props.model?.id || "gpt-4o"),
        prompt: fullPrompt,
        ...(props.model?.options || {}),
      });

      content = text;
    } else {
      // Use static content
      content = props.content;
    }

    // Write content to file
    await fs.writeFile(props.path, content);

    // Get file stats for timestamps
    const stats = await fs.stat(props.path);

    // Return the resource
    return this({
      path: props.path,
      baseURL: props.baseURL,
      content,
      createdAt: stats.birthtimeMs,
      updatedAt: stats.mtimeMs,
    });
  },
);
