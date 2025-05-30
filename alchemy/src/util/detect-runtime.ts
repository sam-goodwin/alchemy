// @ts-nocheck

// copied from https://github.com/QuiiBz/detect-runtime

declare global {
  // https://vercel.com/docs/concepts/functions/edge-functions/edge-runtime#check-if-you're-running-on-the-edge-runtime
  var EdgeRuntime: string;

  // https://docs.netlify.com/edge-functions/api/#netlify-global-object
  var Netlify: object;

  var Bun: any;

  var Deno: any;

  var __lagon__: any;

  var fastly: any;
}

// Follows the list of Runtime Keys from the WinterCG proposal:
// https://runtime-keys.proposal.wintercg.org/
export type Runtime =
  | "edge-routine"
  | "workerd"
  | "deno"
  | "lagon"
  | "react-native"
  | "netlify"
  | "electron"
  | "node"
  | "bun"
  | "edge-light"
  | "fastly"
  | "unknown";

/**
 * Detect the current JavaScript runtime following
 * the WinterCG Runtime Keys proposal:
 *
 * - `edge-routine` Alibaba Cloud Edge Routine
 * - `workerd` Cloudflare Workers
 * - `deno` Deno and Deno Deploy
 * - `lagon` Lagon
 * - `react-native` React Native
 * - `netlify` Netlify Edge Functions
 * - `electron` Electron
 * - `node` Node.js
 * - `bun` Bun
 * - `edge-light` Vercel Edge Functions
 * - `fastly` Fastly Compute@Edge
 *
 * @see https://runtime-keys.proposal.wintercg.org/
 * @returns {Runtime}
 */
export function detectRuntime(): Runtime {
  if (typeof Netlify === "object") {
    return "netlify";
  }

  if (typeof EdgeRuntime === "string") {
    return "edge-light";
  }

  // https://developers.cloudflare.com/workers/runtime-apis/web-standards/#navigatoruseragent
  if (globalThis.navigator?.userAgent === "Cloudflare-Workers") {
    return "workerd";
  }

  if (globalThis.Deno) {
    return "deno";
  }

  if (globalThis.__lagon__) {
    return "lagon";
  }

  if (globalThis.Bun) {
    return "bun";
  }

  if (globalThis.fastly) {
    return "fastly";
  }

  // https://nodejs.org/api/process.html#processrelease
  if (globalThis.process?.release?.name === "node") {
    return "node";
  }

  // TODO: Find a way to detect edge-routine
  // it seems like it's currently in beta:
  // https://www.alibabacloud.com/help/en/dynamic-route-for-cdn/latest/er-overview

  // TODO: Find a way to detect react-native

  // TODO: Find a way to detect electron

  return "unknown";
}
