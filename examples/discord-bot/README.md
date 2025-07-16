# Discord Bot Example

This example demonstrates how to build a Discord bot with slash commands using Alchemy and Cloudflare Workers.

## Features

- HTTP-based interactions (no WebSocket connection needed)
- Slash commands with options
- Ed25519 signature verification
- Deployed to Cloudflare Workers for global low-latency responses

## Setup

1. **Create a Discord Application**

   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Click "New Application" and give it a name
   - Go to the "Bot" section
   - Click "Reset Token" and save it
   - Note down the Application ID and Public Key from "General Information"

2. **Configure Environment**

   Copy `.env.example` to `.env` and fill in your Discord credentials:

   ```sh
   cp .env.example .env
   ```

3. **Install Dependencies**

   ```sh
   bun install
   ```

4. **Deploy**

   ```sh
   bun run deploy
   ```

5. **Add Bot to Server**

   After deployment, the script will output a bot invite URL. Click it to add the bot to your Discord server.

## Commands

The bot includes three example commands:

- `/ping` - Simple ping/pong response
- `/hello [name]` - Greets the specified person
- `/echo [message] [uppercase?]` - Echoes your message, optionally in uppercase

## Architecture

- **Cloudflare Worker**: Handles incoming Discord interactions via HTTP webhooks
- **Discord Application**: Manages bot configuration and slash commands
- **Ed25519 Verification**: Ensures requests are legitimately from Discord

## Development

To add new commands:

1. Add the command definition in `alchemy.run.ts`
2. Add the command handler in `src/bot.ts`
3. Redeploy with `bun run deploy`

## Resources

- [Discord Developer Documentation](https://discord.com/developers/docs)
- [Discord Interactions](https://discord.com/developers/docs/interactions/receiving-and-responding)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)