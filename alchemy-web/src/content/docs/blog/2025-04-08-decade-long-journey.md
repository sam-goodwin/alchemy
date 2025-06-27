---
title: Why IaC needs to be un-bundled
date: 2025-04-08
excerpt: After a decade of wrestling with CloudFormation, CDK, Pulumi, and Terraform, I built my own minimal IaC library in pure TypeScript. Here's why I think it's time to "un-bundle" Infrastructure-as-Code and return to simplicity.
---

I built Alchemy after years of working with every other option—from CloudFormation and CDK to Pulumi, Terraform, and Kubernetes. IaC is non-negotiable in my opinion and one of my favorite technologies as a developer.

## The Tool Journey: From Bad to Worse

I started with CloudFormation since I worked at Amazon, and I really hated it. JSON just isn't expressive enough for me, and debugging broken stacks was always something I dreaded. I'm pretty sure the CFN website still squashes error messages into a 10-pixel-wide box 😅.

The CDK is an upgrade (yay for TypeScript!), but it's still limited by the CloudFormation service, which is slow to change and use.

Being developed by corporate giant Amazon, with the founder having moved on to new ideas, you just have to accept that things will move slowly and you have no say or control over that. It's how things work in big centralized companies.

One major technical wart with the CDK is its awful coupling to synchronous I/O, making it nearly impossible to do anything async. Every user inevitably runs into this, googles it, and is met with "fuck off" in the GitHub issues. Then we're forced to hack around it, which isn't pretty. Not allowing async is basically not allowing JavaScript. I doubt it'll ever be fixed.

They're also stuck on CommonJS. Taking a dependency on the CDK and using it anywhere other than locally will 10x the size of your app and destroy your developer experience. It's a tangled mess of complicated, legacy TypeScript code generating complicated, proprietary JSON files uploaded to the complicated, opaque, proprietary CloudFormation service 🫠

Why? How does this serve the user?

Later, I moved to Pulumi, which was a nice change of pace since it runs locally and is much faster. You can cancel a deployment by hitting Ctrl+C (hallelujah!), and it supports more than just AWS, which is great because everything should be managed sensibly in code.

However, Pulumi is largely a wrapper around Terraform. If you thought you were going to escape the layers, you were sorely mistaken. That JavaScript is just lipstick on the pig that is clunky "providers" implemented in Go, running in a separate process. You can't run Pulumi everywhere (like in the browser), and it even struggles to run in AWS Lambda if you're using ESM.

Pulumi Custom Resources are possible but feel like an afterthought and are a pain to implement. They have many sharp edges and gotchas, like the resource code having to be serialized and their coupling to CommonJS. If you import the wrong thing with ESM, it just breaks. I couldn't even use AWS SDK v3 in a simple custom resource because of how leaky these abstractions are.

If Pulumi bricks itself by getting into some weird state, good luck fixing it. Their state files are complicated and their providers are opaque, so you're stuck running `pulumi refresh` and praying, or surgically removing and restoring resources one by one. It's not transparent.

I've used Terraform when forced into it. It does exactly what it claims to do, but I don't love it because it's a custom DSL with a heavy toolchain. And for what? Calling a few CRUD APIs? Way overkill.

If it doesn't already exist in Terraform, just forget it. Every time I think about implementing a custom resource for Terraform, I can't bring myself to do it. Let me just write a function in my language, please!

Lately, I've been using SST because I've been doing a ton of web development. At first, I really liked SST for its local development experience. `sst dev` gives you live deploy, a TUI multiplexer, and a proxy from the cloud to your local code. This is great for building web apps in AWS.

But SST is a wrapper around Pulumi! (which is a wrapper around Terraform (which is a wrapper around the underlying SDK ( ... ( ... ( ... )))) ...

Layers. Layers. Layers. When will it ever end?

As my app grew, SST's bugs and opinions ate away at me. I got blocked by broken resources with race conditions that were impossible to work around (still are, by the way). I also wanted to deploy a nested app using another `sst.config.ts`, but it conflicted with their assumptions around generated `sst-env.d.ts` files.

Again, I was let down by the complexity and opinions of my chosen IaC framework. And for what? To help me call a few CRUD APIs and track my resources?

Honestly, it seems insane how far we've drifted from simplicity in this area. This became even more apparent as I started using Cursor more to write code.

## The AI Revelation

You see, I've found myself doing more frontend development than ever before, and I'm not a good frontend developer. So I relied on Cursor to write most of the code for me, and (as many others have experienced) it totally blew my mind 🤯

Cursor is just really, really good at TypeScript, React, and Tailwind. I've built a functioning and (if I don't say so myself) good-looking SPA. It's been a blast. As a "backend guy," I feel like my world has opened up.

But this got me thinking... you know what else Cursor is really great at? Perhaps even better at?

👉 Interacting with CRUD APIs.

While there's tons of frontend training data for LLMs, there's just as much (if not more) training data for CRUD lifecycle operations. They've also ingested all of Kubernetes, Terraform, Pulumi, SST, and the AWS CDK's training data. Modern LLMs know it very well.

Long story short, I discovered that Cursor can pretty much one-shot the implementation of resources. All the resources in Alchemy are entirely generated on-demand (5-minute time investment, tops). When I run into a bug, I just explain it to Cursor, who fixes it immediately.

Working this way may seem like more work at first glance, but in practice, I think it's not. I will never get blocked working this way. I will never have to wait for another person to prioritize my problem, merge a fix, and release the change. I will never be confused about what's actually happening under the covers.

This is a game changer for me. It means we don't need tools like Terraform to build layers of "provider" suites for us. We just need the engine, the bit that tracks state and decides what to create, update, or delete. The rest can be generated at near-zero cost.

## Why This Changes Everything

I suspect a lot of people will push back on this claim of "zero cost" because they haven't yet embraced the AI-generation workflow. Their instinct is right, but outdated.

Before LLMs, I would have agreed that this was infeasible, but I think we've finally crossed the threshold where LLMs can do this work trivially and respond in real-time to your requirements.

If this isn't obvious to you, then I suggest forcing yourself to practice with AI code generation. When it messes up, try blaming yourself instead of blaming and discarding the LLM. I think you're missing a skill.

This is why adoption curves are a thing. Do you want to be a laggard?

At the end of the day, you need to realize that agency is going to matter more and more as time progresses, and shackling yourself to a mega-provider who doesn't even know your name is a ticket to inefficiency.

I think we've mostly been hoodwinked into thinking that because managing infrastructure is complicated, we need complicated solutions. Now is the time for that pendulum to swing back in the other direction and "un-bundle" IaC.