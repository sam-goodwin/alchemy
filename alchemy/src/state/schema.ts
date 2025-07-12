import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import type {
  Resource as AlchemyResource,
  ResourceProps,
} from "../resource.ts";

export const resources = sqliteTable(
  "resources",
  {
    id: text("id").notNull(),
    scope: text("scope", { mode: "json" }).$type<string[]>().notNull(),
    status: text("status", {
      enum: [
        "creating",
        "created",
        "updating",
        "updated",
        "deleting",
        "deleted",
      ],
    }).notNull(),
    kind: text("kind").notNull(),
    fqn: text("fqn").notNull(),
    seq: integer("seq").notNull(),
    data: text("data", { mode: "json" }).notNull().$type<Record<string, any>>(),
    props: text("props", { mode: "json" }).$type<ResourceProps>(),
    oldProps: text("oldProps", { mode: "json" }).$type<ResourceProps>(),
    output: text("output", { mode: "json" }).notNull().$type<AlchemyResource>(),
  },
  (t) => [primaryKey({ columns: [t.scope, t.id] })],
);
export type Resource = typeof resources.$inferSelect;
