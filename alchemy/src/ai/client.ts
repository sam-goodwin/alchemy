import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import type { Secret } from "../secret.js";

/**
 * Model configuration for AI operations
 */
export interface ModelConfig {
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
  options?: Record<string, any>;
}

/**
 * Configuration for creating an OpenAI client
 */
export interface ClientConfig {
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
}

/**
 * Creates an OpenAI-compatible client with the given configuration
 */
export function createModel(config: ClientConfig) {
  if (config.model?.provider === "anthropic") {
    return anthropic(config.model?.id ?? "claude-3-7-sonnet-latest");
  }
  return openai(config.model?.id ?? "gpt-4o");
}

/**
 * Maximum time to retry in milliseconds (5 minutes)
 */
const MAX_RETRY_TIME = 5 * 60 * 1000;

/**
 * Initial delay between retries in milliseconds
 */
const INITIAL_RETRY_DELAY = 1000;

/**
 * Maximum number of retries
 */
const MAX_RETRIES = 10;

/**
 * Handles rate limiting with exponential backoff
 * @param fn Function to retry
 * @returns Result of the function
 * @throws Error if max retries or time is exceeded
 */
export async function withRateLimitRetry<T>(fn: () => Promise<T>): Promise<T> {
  let retryCount = 0;
  let _lastError: Error | null = null;
  const startTime = Date.now();

  while (true) {
    try {
      return await fn();
    } catch (error: any) {
      _lastError = error;

      console.log("retry error", error);

      // Check if we should retry
      const isRateLimit = error.statusCode === 429;
      const timeElapsed = Date.now() - startTime;
      const shouldRetry =
        isRateLimit && retryCount < MAX_RETRIES && timeElapsed < MAX_RETRY_TIME;

      if (!shouldRetry) {
        throw error;
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(
        INITIAL_RETRY_DELAY * 2 ** retryCount,
        MAX_RETRY_TIME - timeElapsed,
      );

      console.log(`Retrying in ${delay}ms`);

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
      retryCount++;
    }
  }
}
