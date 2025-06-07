import alchemy from "alchemy";
import { Project, Function, Organization } from "alchemy/supabase";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX ?? "";
const app = await alchemy("supabase-example", {
  stage: BRANCH_PREFIX || undefined,
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
});

const organization = await Organization(`supabase-org${BRANCH_PREFIX}`, {
  name: `supabase-drizzle-org${BRANCH_PREFIX}`,
});

export const project = await Project(`supabase-project${BRANCH_PREFIX}`, {
  organizationId: organization.id,
  name: `supabase-drizzle-example${BRANCH_PREFIX}`,
  region: "us-east-1",
  dbPass: process.env.DB_PASSWORD || "secure-password-123",
});

export const apiFunction = await Function(`api-handler${BRANCH_PREFIX}`, {
  project: project.id,
  main: "./src/api.ts",
  bundle: {
    format: "esm",
    target: "esnext",
    minify: false,
  },
});

console.log(`Project URL: https://${project.id}.supabase.co`);
console.log(
  `Function URL: https://${project.id}.supabase.co/functions/v1/${apiFunction.slug}`,
);

await app.finalize();
