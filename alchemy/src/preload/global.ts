import { AsyncLocalStorage } from "node:async_hooks";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

export type ModuleContext = {
  url: string;
  filename?: string;
  dirname?: string;
  packageRoot?: string;
  parentUrl?: string;
};
export const ModuleContext = new AsyncLocalStorage<ModuleContext>();

const getModuleContext = () => ModuleContext.getStore();

declare global {
  var __als_enter: typeof enter;
  var __als_exit: () => void;
  var __als_mkCtx: typeof mkCtx;
  var __als_get: () => ModuleContext | undefined;
}

Object.assign(globalThis, {
  __als_enter: enter,
  __als_exit: exit,
  __als_mkCtx: mkCtx,
  __als_get: getModuleContext,
});

export function enter(ctx: ModuleContext) {
  ModuleContext.enterWith(ctx);
}
export function exit() {
  /* ALS unwinds at async boundary */
}
export function mkCtx(
  url: string,
  parentUrl?: string,
  packageRoot?: string,
): ModuleContext {
  const ctx: ModuleContext = { url, parentUrl, packageRoot };
  if (url?.startsWith("file://")) {
    const filename = fileURLToPath(url);
    ctx.filename = filename;
    ctx.dirname = path.dirname(filename);
  }
  return ctx;
}
