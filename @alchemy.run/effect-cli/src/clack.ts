import * as Clack from "@clack/prompts";
import * as Effect from "effect/Effect";

const syncFn =
  <F extends (...p: any[]) => any>(f: F) =>
  (...p: Parameters<F>): Effect.Effect<ReturnType<F>> =>
    Effect.sync(() => f(...p));

const asyncFn =
  <F extends (...p: any[]) => any>(f: F) =>
  (...p: Parameters<F>): Effect.Effect<Awaited<ReturnType<F>>> =>
    Effect.promise(() => f(...p));

export const confirm = asyncFn(Clack.confirm);
export const tasks = asyncFn(Clack.tasks);

export const intro = syncFn(Clack.intro);
export const outro = syncFn(Clack.outro);
export const note = syncFn(Clack.note);
export const spinner = syncFn(Clack.spinner);

export const isCancel = Clack.isCancel;
