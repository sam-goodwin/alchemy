---
title: Alchemy Profiles
date: 2025-09-24
author: Sam Goodwin
---

Alchemy Profiles are a new way to manage your Cloudflare credentials and accounts. 

Profiles also extend support for OAuth with Alchemy's own OAuth Client ID that supports all Cloudflare permission scopes (not just the limited subset supported by `wrangler`).

:::note
See the [Profiles](/concepts/profiles) docs for a full reference guide on how to use profiles.
:::

## What's the problem?

There are three different ways to authorize with Cloudflare:
1. OAuth (preferred)
2. API Token
3. Global API Key

### OAuth is preferred, but limited

Ideally, you'd only ever need to use OAuth because it doesn't rely on storing long-lived credentials. 

However, the OAuth Client ID used by `wrangler` only supports a limited subset of Cloudflare permission scopes, so you'd eventually run into API calls that just don't work (like creating an AI Gateway). To workaround this, developers would create an API Token or (worse) risk the farm by using a Global API Key. 

Many developers end up creating API tokens with all permissions because it's easier than dealing with the friction of narrowing down permissions to precisely what's needed. One of Alchemy's developers, Michael Kassabov, [reverse engineered a script](https://gist.github.com/Mkassabov/48e902ec26f6ce83ed3a85edaff9840b) to generate an API Token with all permissions 😅. 

Alchemy used to rely on `wrangler login` for OAuth, but now has its own OAuth Client ID that supports all Cloudflare permission scopes. You should no longer need to create API tokens for your Infrastructure-as-Code.

### Multiple accounts require extra steps

If you only have one Cloudflare account, then you're lucky - Alchemy can automatically resolve the Account ID for you.

If you have multiple accounts, then you need to manually set the Account ID as another `CLOUDFLARE_ACCOUNT_ID` environment variable or explicitly set the `accountId` when creating a Cloudflare Resource.


## Introducing Alchemy Profiles
