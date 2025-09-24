import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

export const Route = createFileRoute("/api/users")({
  server: {
    middleware: [],
    handlers: {
      GET: async ({ request }) => {
        console.info("GET /api/users @", request.url);
        console.info("Fetching users... @", request.url);
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = (await res.json()) as {
          id: number;
          name: string;
          email: string;
        }[];

        const list = data.slice(0, 10);

        return json(
          list.map((u) => ({ id: u.id, name: u.name, email: u.email })),
        );
      },
    },
  },
});
