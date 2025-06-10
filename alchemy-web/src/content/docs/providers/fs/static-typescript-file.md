---
title: StaticTypeScriptFile
description: Learn how to create and manage static TypeScript (.ts, .tsx) files with proper formatting using Alchemy's FS provider.
---


Creates formatted TypeScript files using [Prettier](https://prettier.io/) for consistent code style.

## Minimal Example

Creates a TypeScript file with automatic formatting.

```ts
import { StaticTypeScriptFile } from "alchemy/fs";

const file = await StaticTypeScriptFile("types.ts", `
  interface User {
    id: string;
    name: string;
    email: string;
  }
`);
```

## Create File with Custom Path

Creates a TypeScript file at a specific path.

```ts
import { StaticTypeScriptFile } from "alchemy/fs";

const component = await StaticTypeScriptFile("components/Button.tsx", `
  interface ButtonProps {
    text: string;
    onClick: () => void;
  }

  export function Button({ text, onClick }: ButtonProps) {
    return <button onClick={onClick}>{text}</button>;
  }
`);
```

## Create React Component

Creates a TypeScript React component with proper formatting.

```ts
import { StaticTypeScriptFile } from "alchemy/fs";

const component = await StaticTypeScriptFile("UserProfile.tsx", `
  interface Props {
    user: {
      name: string;
      avatar: string;
    };
  }

  export function UserProfile({ user }: Props) {
    return (
      <div className="profile">
        <img src={user.avatar} alt={user.name} />
        <h2>{user.name}</h2>
      </div>
    );
  }
`);
```
