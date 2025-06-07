# Alchemy

Alchemy is an Typescript-native Infrastructure-as-Code repository. Claude's job is to implement "Resource" providers for various cloud services by following a set up strict conventions and patterns.

Your job is to build and maintain resource providers following the following convention and structure:

## Provider Layout

```
alchemy/
  src/
    {provider}/
      README.md
      {resource}.ts
  test/
    {provider}/
      {resource}.test.ts
alchemy-web/
  guides/
    {provider}.md # guide on how to get started with the {provider}
  docs/
    providers/
      {provider}/
        index.md # overview of usage and link to all the resources for the provider
        {resource}.md # example-oriented reference docs for the resource
examples/
  {provider}-{qualifier?}/ # only add a qualifier if there are more than one example for this {provider}, e.g. {cloudflare}-{vitejs}
    package.json
    tsconfig.json
    alchemy.run.ts
    README.md #
    src/
      # source code
```

## Convention

> Each Resource ha one .ts file, one test suite and one documentation page

## README

Please provide a comprehensive document of all the Resources for this provider with relevant links to documentation. This is effectivel the design and internal documentation.

## Resource File

> [!NOTE]
> Follow rules and conventions laid out in thge [cursorrules](./.cursorrules).

```ts
// ./alchemy/src/{provider}/{resource}.ts
import { Context } from "../context.ts";

export interface {Resource}Props {
    // input props
}

export interface {Resource} extends Resource<"{provider}::{resource}"> {
    // output props
}

/**
 * {overview}
 *
 * @example
 * ## {Example Title}
 *
 * {concise description}
 *
 * {example snippet}
 *
 * @example
 * // .. repeated for all examples
 */
export const {Resource} = Resource(
  "{provider}::{resource}",
  async function (this: Context<>, id: string, props: {Resource}Props): Promise<{Resource}> {
    // Create, Update, Delete lifecycle
  }
);
```

> [!CAUTION]
> When designing input props, there is the common case of having a property that references another entity in the {provider} domain by Id, e.g. tableId, bucketArn, etc.
>
> In these cases, you should instead opt to represent this as `{resource}: string | {Resource}`, e.g. `table: string | Table`. This "lifts" the Resource into the alchemy abstraction without sacraficing support for referencing external entities by name.

## Test Suite

> [!NOTE]
> Follow rules and conventions laid out in thge [cursorrules](./.cursorrules).

```ts
// ./alchemy/test/{provider}/{resource}.test.ts
import { destroy } from "../src/destroy.ts"
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("{Provider}", () => {
  test("{test case}", async (scope) => {
    const resourceId = `${BRANCH_PREFIX}-{id}` // an ID that is: 1) deterministic (non-random), 2) unique across all tests and all test suites
    let resource: {Resource}
    try {
      // create
      resource = await {Resource}("{id}", {
        // {props}
      })

      expect(resource).toMatchObject({
        // {assertions}
      })

      // update
      resource = await {Resource}("{id}", {
        // {update props}
      })

      expect(resource).toMatchObject({
        // {updated assertions}
      })
    } finally {
      await destroy(scope);
      await assert{ResourceDoesNotExist}(resource)
    }
  })
});

async function assert{Resource}DoesNotExist(api: {Provider}Client, resource: {Resource}) {
    // {call api to check it does not exist, throw test error if it does}
}
```

## Provider Overivew Docs (index.md)

Each provider folder should have an `index.md` that indexes and summarizes the provider and links to each resource.

```md
# {Provider}

{overview of the provider}

{official links out to the provider website}

## Resources

- [{Resource}1](./{resource}1.md) - {brief description}
- [{Resource}2](./{resource}2.md) - {brief description}
- ..
- [{Resource}N](./{resource}n.md) - {brief description}

## Example Usage

\`\`\`ts
// {comprehensive end-to-end usage}
\`\`\`
```

## Example Project

An example project is effectiveley a whole NPM package that demon

```
examples/
  {provider}-{qualifier?}/
    package.json
    tsconfig.json # extends ../../tsconfig.base.json
    alchemy.run.ts
    README.md
    src/
      # code
tsconfig.json # is updated to reference examples/{provider}-{qualifer?}
```

## Guide

Each Provide has a getting started guide in ./alchemy-web/docs/guides/{provider}.md.

```md
---
order: { number to decide the position in the tree view }
title: { Provider }
description: { concise description of the tutorial }
---

# Getting Started {Provider}

{1 sentence overview of what this tutorial will set the user up with}

## Install

{any installation pre-requisties}

::: code-group

\`\`\`sh [bun]
bun ..
\`\`\`

\`\`\`sh [npm]
npm ...
\`\`\`

\`\`\`sh [pnpm]
pnpm ..
\`\`\`

\`\`\`sh [yarn]
yarn ..
\`\`\`

:::

## Credentials

{how to get credentials and store in .env}

## Create a {Provider} applicaiton

{code group with commands to run to init a new project}

## Create `alchemy.run.ts`

{one or more subsequent code snippets with explanations for using alchemy to provision this provider}

## Deploy

Run `alchemy.run.ts` script to deploy:

::: code-group

\`\`\`sh [bun]
bun ./alchemy.run
\`\`\`

\`\`\`sh [npm]
npx tsx ./alchemy.run
\`\`\`

\`\`\`sh [pnpm]
pnpm tsx ./alchemy.run
\`\`\`

\`\`\`sh [yarn]
yarn tsx ./alchemy.run
\`\`\`

:::

It should log out the ... {whatever information is relevant for interacting with the app deployed to this provider}
\`\`\`sh
{expected output}
\`\`\`

## Tear Down

That's it! You can now tear down the app (if you want to):

::: code-group

\`\`\`sh [bun]
bun ./alchemy.run --destroy
\`\`\`

\`\`\`sh [npm]
npx tsx ./alchemy.run --destroy
\`\`\`

\`\`\`sh [pnpm]
pnpm tsx ./alchemy.run --destroy
\`\`\`

\`\`\`sh [yarn]
yarn tsx ./alchemy.run --destroy
\`\`\`

:::
```

> [!NOTE]
> Claude, you should review all of the existing Cloudflare guides like [cloudflare-vitejs.md](./alchemy-web/docs/guides/cloudflare-vitejs.md) and follow the writing style and flow.

> [!TIP]
> If the Resource is mostly headless infrastructure like a database or some other service, you should use Cloudflare Workers as the runtime to "round off" the example package. E.g. for a Neon Provider, we would connect it into a Cloudlare Worker via Hyperdrive and provide a URL (via Worker) to hit that page. Ideally you'd also put ViteJS in front and hit that endpoint.

## Development Workflow

### Pre-Commit Requirements

> [!IMPORTANT]
> **Always run the linter before committing changes.**

Before committing any code changes, you MUST run the linter to ensure code quality and consistency:

```sh
bun check --fix
```

This command will:
- Check for TypeScript errors
- Apply automatic formatting fixes
- Ensure code follows project conventions

After running the linter:
1. Review any changes made by the auto-fix process
2. Commit all changes (including linter fixes) together
3. Ensure tests still pass if applicable

> [!NOTE]
> If you're using Claude Code, you can request Claude to run `bun check --fix` and commit the changes for you.
