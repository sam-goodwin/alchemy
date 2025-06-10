import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { AsyncQueue } from "../util/async-queue.ts";
import { getContentType } from "../util/content-type.ts";
import type { CloudflareApi } from "./api.ts";
import type { Assets } from "./assets.ts";
import type { AssetsConfig, WorkerProps } from "./worker.ts";

export interface AssetUploadResult {
  completionToken: string;
  assetConfig?: AssetsConfig;
}

/**
 * Interface for a file's metadata to be uploaded
 */
interface FileMetadata {
  hash: string;
  size: number;
}

/**
 * Response from the assets upload session API
 */
interface UploadSessionResponse {
  result: {
    jwt: string;
    buckets: string[][];
  };
  success: boolean;
  errors: any[];
  messages: any[];
}

/**
 * Response from the file upload API
 */
interface UploadResponse {
  result: {
    jwt: string;
    buckets?: string[][];
  };
  success: boolean;
  errors: any[];
  messages: any[];
}

/**
 * Uploads assets to Cloudflare and returns a completion token
 *
 * @param api CloudflareApi instance
 * @param workerName Name of the worker
 * @param assets Assets resource containing files to upload
 * @param assetConfig Configuration for the assets
 * @returns Completion token for the assets upload
 */
export async function uploadAssets(
  api: CloudflareApi,
  workerName: string,
  assets: Assets,
  assetConfig?: WorkerProps["assets"],
): Promise<AssetUploadResult> {
  // Process the assets configuration once at the beginning
  const processedConfig = createAssetConfig(assetConfig);

  const { manifest, filePathsByHash } = await prepareAssetManifest(assets);

  // Start the upload session
  const uploadSessionResponse = await api.post(
    `/accounts/${api.accountId}/workers/scripts/${workerName}/assets-upload-session`,
    JSON.stringify({ manifest }),
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  if (!uploadSessionResponse.ok) {
    throw new Error(
      `Failed to start assets upload session: ${uploadSessionResponse.status} ${uploadSessionResponse.statusText} - ${await uploadSessionResponse.text()}`,
    );
  }

  const sessionData =
    (await uploadSessionResponse.json()) as UploadSessionResponse;

  // If there are no buckets, assets are already uploaded or empty
  if (!sessionData.result.buckets || sessionData.result.buckets.length === 0) {
    return {
      completionToken: sessionData.result.jwt,
      assetConfig: processedConfig,
    };
  }

  // Upload the files in batches as specified by the API
  let completionToken = sessionData.result.jwt;
  const buckets = sessionData.result.buckets;

  const queue = new AsyncQueue(3);
  await Promise.all(
    buckets.map((bucket) =>
      queue.add(async () => {
        const jwt = await uploadBucket(
          api,
          sessionData.result.jwt,
          bucket,
          filePathsByHash,
        );
        if (jwt) {
          completionToken = jwt;
        }
      }),
    ),
  );

  // Return the final completion token with asset configuration
  return {
    completionToken,
    assetConfig: processedConfig,
  };
}

/**
 * Creates asset configuration object from provided config or defaults
 */
export function createAssetConfig(config?: AssetsConfig): AssetsConfig {
  const assetConfig: AssetsConfig = {
    html_handling: "auto-trailing-slash",
  };

  if (config) {
    if (config._headers !== undefined) {
      assetConfig._headers = config._headers;
    }

    if (config._redirects !== undefined) {
      assetConfig._redirects = config._redirects;
    }

    if (config.html_handling !== undefined) {
      assetConfig.html_handling = config.html_handling;
    }

    if (config.not_found_handling !== undefined) {
      assetConfig.not_found_handling = config.not_found_handling;
    }

    if (config.run_worker_first !== undefined) {
      assetConfig.run_worker_first = config.run_worker_first;
    }

    if (config.serve_directly !== undefined) {
      assetConfig.serve_directly = config.serve_directly;
    }
  }

  return assetConfig;
}

/**
 * Prepares the asset manifest for the assets upload session
 *
 * @param assets Assets resource containing files to upload
 * @returns Asset manifest and file paths by hash
 */
export async function prepareAssetManifest(assets: Assets) {
  const manifest: Record<string, FileMetadata> = {};
  const filePathsByHash = new Map<string, string>();
  await Promise.all(
    assets.files.map(async (file) => {
      const { hash, size } = await calculateFileMetadata(file.filePath);
      const key = file.path.startsWith("/") ? file.path : `/${file.path}`;
      manifest[key] = { hash, size };
      filePathsByHash.set(hash, file.filePath);
    }),
  );
  return { manifest, filePathsByHash };
}

async function uploadBucket(
  api: CloudflareApi,
  jwt: string,
  bucket: string[],
  files: Map<string, string>,
) {
  const formData = new FormData();
  await Promise.all(
    bucket.map(async (fileHash) => {
      const filePath = files.get(fileHash);
      if (!filePath) {
        throw new Error(`Could not find file with hash ${fileHash}`);
      }
      const fileContent = await fs.readFile(filePath);
      const blob = new Blob([fileContent.toString("base64")], {
        type: getContentType(filePath) ?? "application/null",
      });
      formData.append(fileHash, blob, fileHash);
    }),
  );
  const uploadResponse = await api.post(
    `/accounts/${api.accountId}/workers/assets/upload?base64=true`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
      },
    },
  );

  if (!uploadResponse.ok) {
    throw new Error(
      `Failed to upload asset files: ${uploadResponse.status} ${uploadResponse.statusText}`,
    );
  }

  const uploadData = (await uploadResponse.json()) as UploadResponse;
  if (!uploadData.success) {
    const error = uploadData.errors[0];
    const message = error.message;
    const code = error.code;
    throw new Error(`Failed to upload asset files: ${message} (Code: ${code})`);
  }

  return uploadData.result.jwt;
}

/**
 * Calculate the SHA-256 hash and size of a file
 *
 * @param filePath Path to the file
 * @returns Hash (first 32 chars of SHA-256) and size of the file
 */
export async function calculateFileMetadata(
  filePath: string,
): Promise<{ hash: string; size: number }> {
  const contents = await fs.readFile(filePath);

  const hash = crypto.createHash("sha256");
  hash.update(contents);

  const extension = path.extname(filePath).substring(1);
  hash.update(extension);

  if (contents.length > 26214400) {
    throw new Error(
      `File "${filePath}" is too large to upload as an asset to Cloudflare (the file is ${(contents.length / 1024 / 1024).toFixed(2)} MB; the maximum size is 25MB).`,
    );
  }

  return {
    hash: hash.digest("hex").slice(0, 32),
    size: contents.length,
  };
}
