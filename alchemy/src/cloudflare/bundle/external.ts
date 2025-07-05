// https://developers.cloudflare.com/workers/runtime-apis/nodejs/#supported-nodejs-apis
export const nodejs_compat = [
  "node:async_hooks",
  "node:assert",
  "node:buffer",
  "node:console",
  "node:crypto",
  "node:debug",
  "node:diagnostics_channel",
  "node:dns",
  "node:events",
  "node:inspector",
  "node:net",
  "node:path",
  "node:perf_hooks", // partially supported
  "node:process",
  "node:querystring",
  "node:stream",
  "node:string_decoder",
  "node:timers",
  "node:tls", // partially supported
  "node:url",
  "node:util",
  "node:zlib",
  // "node:*",
];

export const external = [
  ...nodejs_compat,
  ...nodejs_compat.map((p) => p.split(":")[1]),
  "cloudflare:workers",
  "cloudflare:workflows",
  "cloudflare:*",
];

export const external_als = [
  //
  "node:async_hooks",
  "async_hooks",
  "cloudflare:*",
];
