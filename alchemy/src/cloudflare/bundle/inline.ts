import crypto from "node:crypto";
import type {
  WorkerBundle,
  WorkerBundleBaseProps,
  WorkerBundleChunk,
  WorkerBundleProvider,
} from "./shared.ts";

interface InlineBundleProps extends WorkerBundleBaseProps {
  content: string;
}

export class InlineBundleProvider implements WorkerBundleProvider {
  constructor(private props: InlineBundleProps) {}

  async create(): Promise<WorkerBundle> {
    return {
      entrypoint: "worker.js",
      files: [
        new File([this.props.content], "worker.js", {
          type:
            this.props.format === "cjs"
              ? "application/javascript"
              : "application/javascript+module",
        }),
      ],
      hash: crypto
        .createHash("sha256")
        .update(this.props.content)
        .digest("hex"),
    };
  }

  async watch(): Promise<ReadableStream<WorkerBundleChunk>> {
    return new ReadableStream<WorkerBundleChunk>({
      start: async (controller) => {
        controller.enqueue({ type: "end", result: await this.create() });
        controller.close();
      },
    });
  }
}
