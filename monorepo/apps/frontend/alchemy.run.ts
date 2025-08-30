import alchemy from "alchemy";
import { Vite } from "alchemy/cloudflare";
import { backend } from "backend/alchemy";

const app = await alchemy("frontend");

export const frontend = await Vite("website", {
  bindings: {
    backend,
  },
});

console.log({
  url: frontend.url,
});

// only finalize this app if this is the main module
// (i.e. don't finalize if this is a dependency)
if (import.meta.main) {
  await app.finalize();
}
