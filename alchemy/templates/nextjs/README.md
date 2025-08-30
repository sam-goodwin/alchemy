# Welcome to Next.js on Cloudflare!

[![Deployed with Alchemy](https://alchemy.run/alchemy-badge.svg)](https://alchemy.run)

A modern, production-ready template for building full-stack React applications using Next.js on Cloudflare Workers.

## Features

- 🚀 Server-side rendering with React Server Components
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization via OpenNext
- 🔄 Server Actions and API routes
- 🔒 TypeScript by default
- 🌐 Cloudflare Workers runtime
- 📖 [Next.js docs](https://nextjs.org/docs)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:3000`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

## Preview

Preview the production build locally:

```bash
npm run preview
```

## Destroy

Clean up all Cloudflare resources:

```bash
npm run destroy
```

## Project Structure

- `src/app/` - Next.js App Router pages and components
- `public/` - Static assets
- `alchemy.run.ts` - Infrastructure configuration
- `next.config.ts` - Next.js configuration
- `open-next.config.ts` - OpenNext configuration for Cloudflare

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Alchemy Documentation](https://alchemy.run)
- [OpenNext for Cloudflare](https://opennext.js.org/cloudflare)

---

Built with ❤️ using Next.js and Alchemy.