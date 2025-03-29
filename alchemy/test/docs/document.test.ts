import { describe, expect } from "bun:test";
import fs from "node:fs/promises";
import path from "node:path";
import { alchemy } from "../../src/alchemy";
import { destroy } from "../../src/destroy";
import { Document } from "../../src/docs/document";
// must import this or else alchemy.test won't exist
import type { Scope } from "../../src/scope";
import "../../src/test/bun";
import { BRANCH_PREFIX } from "../util";

const test = alchemy.test(import.meta);

describe("Document Resource", () => {
  const testId = `${BRANCH_PREFIX}-test-document`;
  const testPath = path.join(".out", "docs", `${testId}.md`);

  test("create, update, and delete document with static content", async (scope) => {
    let document: Document | undefined;
    try {
      // Create a test document with static content
      document = await Document(testId, {
        path: testPath,
        content: "# Test Document\n\nThis is a test document.",
      });

      expect(document.path).toBe(testPath);
      expect(document.content).toBe(
        "# Test Document\n\nThis is a test document.",
      );
      expect(document.createdAt).toBeTruthy();
      expect(document.updatedAt).toBeTruthy();

      // Verify file was created
      const content = await fs.readFile(testPath, "utf-8");
      expect(content).toBe("# Test Document\n\nThis is a test document.");

      // Update the document with new static content
      document = await Document(testId, {
        path: testPath,
        content: "# Updated Document\n\nThis document has been updated.",
      });

      expect(document.content).toBe(
        "# Updated Document\n\nThis document has been updated.",
      );

      // Verify file was updated
      const updatedContent = await fs.readFile(testPath, "utf-8");
      expect(updatedContent).toBe(
        "# Updated Document\n\nThis document has been updated.",
      );
    } finally {
      // Clean up
      await destroy(scope);

      // Verify file was deleted
      try {
        await fs.access(testPath);
        throw new Error("Document file still exists");
      } catch (error: any) {
        expect(error.code).toBe("ENOENT");
      }
    }
  });

  test("create document with AI-generated content", async (scope) => {
    let document: Document | undefined;
    try {
      // Create a test document with AI-generated content using string prompt
      document = await Document(testId, {
        path: testPath,
        prompt:
          "Write a short markdown document about the importance of testing.",
        apiKey: alchemy.secret(process.env.OPENAI_API_KEY),
        model: {
          id: "gpt-4o",
          provider: "openai",
          options: {
            temperature: 0.7,
            maxTokens: 500,
          },
        },
      });

      expect(document.path).toBe(testPath);
      expect(document.content).toBeTruthy();
      expect(document.content).toContain("testing");
      expect(document.createdAt).toBeTruthy();
      expect(document.updatedAt).toBeTruthy();

      // Verify file was created
      const content = await fs.readFile(testPath, "utf-8");
      expect(content).toBe(document.content);

      // Update with a prompt array
      document = await Document(testId, {
        path: testPath,
        prompt: [
          "Write a short markdown document about TypeScript type safety.",
          "Include examples of how type safety prevents common errors.",
          "Explain the benefits of using TypeScript in large projects.",
        ],
        baseURL: "https://api.openai.com/v1",
        model: {
          id: "gpt-4o",
          options: {
            temperature: 0.5,
          },
        },
      });

      expect(document.content).toBeTruthy();
      expect(document.content).toContain("TypeScript");
      expect(document.content).toContain("type safety");

      // Verify file was updated
      const updatedContent = await fs.readFile(testPath, "utf-8");
      expect(updatedContent).toBe(document.content);
    } finally {
      // Clean up
      await destroy(scope);

      // Verify file was deleted
      try {
        await fs.access(testPath);
        throw new Error("Document file still exists");
      } catch (error: any) {
        expect(error.code).toBe("ENOENT");
      }
    }
  });

  test("create document with AI-generated content and context", async (scope) => {
    let document: Document | undefined;
    try {
      // Create a test document with AI-generated content and context
      document = await Document(testId, {
        path: testPath,
        prompt:
          "Write a short markdown document summarizing these files and their relationships.",
        context: {
          "src/config.ts":
            "export const config = { port: 3000, host: 'localhost' };",
          "src/server.ts":
            "import { config } from './config';\n\nconst server = createServer(config);",
        },
        apiKey: alchemy.secret(process.env.OPENAI_API_KEY),
        model: {
          id: "gpt-4o",
          provider: "openai",
          options: {
            temperature: 0.7,
            maxTokens: 500,
          },
        },
      });

      expect(document.path).toBe(testPath);
      expect(document.content).toBeTruthy();
      // The content should reference both files
      expect(document.content).toContain("config");
      expect(document.content).toContain("server");
      expect(document.createdAt).toBeTruthy();
      expect(document.updatedAt).toBeTruthy();

      // Verify file was created
      const content = await fs.readFile(testPath, "utf-8");
      expect(content).toBe(document.content);

      // Update with different context
      document = await Document(testId, {
        path: testPath,
        prompt: "Write a short markdown document explaining this component.",
        context: {
          "src/components/Button.tsx":
            "export const Button = ({ children, onClick }) => {\n  return <button onClick={onClick}>{children}</button>;\n};",
        },
        model: {
          id: "gpt-4o",
          options: {
            temperature: 0.5,
          },
        },
      });

      expect(document.content).toBeTruthy();
      expect(document.content).toContain("Button");
      expect(document.content).toContain("component");

      // Verify file was updated
      const updatedContent = await fs.readFile(testPath, "utf-8");
      expect(updatedContent).toBe(document.content);
    } finally {
      // Clean up
      await destroy(scope);

      // Verify file was deleted
      try {
        await fs.access(testPath);
        throw new Error("Document file still exists");
      } catch (error: any) {
        expect(error.code).toBe("ENOENT");
      }
    }
  });

  test("create document with Document resources as context", async (scope) => {
    let configDoc: Document | undefined;
    let serverDoc: Document | undefined;
    let document: Document | undefined;

    try {
      // Create source documents first
      configDoc = await Document("config", {
        path: path.join(".out", "docs", "config.md"),
        content: "export const config = { port: 3000, host: 'localhost' };",
      });

      serverDoc = await Document("server", {
        path: path.join(".out", "docs", "server.md"),
        content:
          "import { config } from './config';\n\nconst server = createServer(config);",
      });

      // Create a document using other documents as context
      document = await Document(testId, {
        path: testPath,
        prompt:
          "Write a short markdown document summarizing these files and their relationships.",
        context: {
          "src/config.ts": configDoc,
          "src/server.ts": serverDoc,
        },
        apiKey: alchemy.secret(process.env.OPENAI_API_KEY),
        model: {
          id: "gpt-4o",
          provider: "openai",
          options: {
            temperature: 0.7,
            maxTokens: 500,
          },
        },
      });

      expect(document.path).toBe(testPath);
      expect(document.content).toBeTruthy();
      // The content should reference both files
      expect(document.content).toContain("config");
      expect(document.content).toContain("server");
      expect(document.createdAt).toBeTruthy();
      expect(document.updatedAt).toBeTruthy();

      // Verify file was created
      const content = await fs.readFile(testPath, "utf-8");
      expect(content).toBe(document.content);

      // Update with mixed string and Document context
      const buttonDoc = await Document("button", {
        path: path.join(".out", "docs", "button.md"),
        content:
          "export const Button = ({ children, onClick }) => {\n  return <button onClick={onClick}>{children}</button>;\n};",
      });

      document = await Document(testId, {
        path: testPath,
        prompt: "Write a short markdown document explaining these components.",
        context: {
          "src/components/Button.tsx": buttonDoc,
          "src/components/Link.tsx":
            "export const Link = ({ href, children }) => {\n  return <a href={href}>{children}</a>;\n};",
        },
        model: {
          id: "gpt-4o",
          options: {
            temperature: 0.5,
          },
        },
      });

      expect(document.content).toBeTruthy();
      expect(document.content).toContain("Button");
      expect(document.content).toContain("Link");
      expect(document.content).toContain("component");

      // Verify file was updated
      const updatedContent = await fs.readFile(testPath, "utf-8");
      expect(updatedContent).toBe(document.content);
    } finally {
      // Clean up
      await destroy(scope);

      // Verify all files were deleted
      for (const file of [testPath, configDoc?.path, serverDoc?.path]) {
        if (!file) continue;
        try {
          await fs.access(file);
          throw new Error(`Document file still exists: ${file}`);
        } catch (error: any) {
          expect(error.code).toBe("ENOENT");
        }
      }
    }
  });

  test("create document with array prompt and context", async (scope) => {
    let document: Document | undefined;
    try {
      // Create a test document with array prompt and context
      document = await Document(testId, {
        path: testPath,
        prompt: [
          "Write a short markdown document summarizing these files and their relationships.",
          "Focus on how the configuration is used by the server.",
          "Explain the dependency structure between the files.",
        ],
        context: {
          "src/config.ts":
            "export const config = { port: 3000, host: 'localhost' };",
          "src/server.ts":
            "import { config } from './config';\n\nconst server = createServer(config);",
        },
        apiKey: alchemy.secret(process.env.OPENAI_API_KEY),
        model: {
          id: "gpt-4o",
          provider: "openai",
          options: {
            temperature: 0.7,
            maxTokens: 500,
          },
        },
      });

      expect(document.path).toBe(testPath);
      expect(document.content).toBeTruthy();
      expect(document.content).toContain("config");
      expect(document.content).toContain("server");
      expect(document.createdAt).toBeTruthy();
      expect(document.updatedAt).toBeTruthy();

      // Verify file was created
      const content = await fs.readFile(testPath, "utf-8");
      expect(content).toBe(document.content);
    } finally {
      // Clean up
      await destroy(scope);

      // Verify file was deleted
      try {
        await fs.access(testPath);
        throw new Error("Document file still exists");
      } catch (error: any) {
        expect(error.code).toBe("ENOENT");
      }
    }
  });

  // never called, only for type safety
  async function testTypeSafety(scope: Scope) {
    try {
      // These should fail at compile time
      // @ts-expect-error Cannot provide both content and prompt
      await Document(testId, {
        path: testPath,
        content: "Static content",
        prompt: "Generate content",
      });

      // @ts-expect-error Cannot provide apiKey with static content
      await Document(testId, {
        path: testPath,
        content: "Static content",
        apiKey: alchemy.secret("test"),
      });

      // @ts-expect-error Cannot provide model with static content
      await Document(testId, {
        path: testPath,
        content: "Static content",
        model: { id: "test" },
      });

      // @ts-expect-error Cannot provide context with static content
      await Document(testId, {
        path: testPath,
        content: "Static content",
        context: { "test.ts": "test" },
      });

      // Valid static content
      await Document(testId, {
        path: testPath,
        content: "Static content",
        baseURL: "https://api.example.com", // baseURL is allowed
      });

      // Valid AI-generated content with string context
      await Document(testId, {
        path: testPath,
        prompt: "Generate content",
        context: {
          "test.ts": "const test = true;",
        },
        apiKey: alchemy.secret("test"),
        model: {
          id: "test-model",
          provider: "test-provider",
          options: { test: true },
        },
      });

      // Valid AI-generated content with Document context
      const sourceDoc = await Document("source", {
        path: "source.md",
        content: "const test = true;",
      });

      await Document(testId, {
        path: testPath,
        prompt: "Generate content",
        context: {
          "test.ts": sourceDoc,
        },
        apiKey: alchemy.secret("test"),
        model: {
          id: "test-model",
          provider: "test-provider",
          options: { test: true },
        },
      });
    } finally {
      await destroy(scope);
    }
  }
});
