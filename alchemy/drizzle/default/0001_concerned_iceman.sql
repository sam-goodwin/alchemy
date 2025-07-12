DROP TABLE `scopes`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_resources` (
	`id` text NOT NULL,
	`scope` text NOT NULL,
	`status` text NOT NULL,
	`kind` text NOT NULL,
	`fqn` text NOT NULL,
	`seq` integer NOT NULL,
	`data` text NOT NULL,
	`props` text,
	`oldProps` text,
	`output` text NOT NULL,
	PRIMARY KEY(`scope`, `id`)
);
--> statement-breakpoint
INSERT INTO `__new_resources`("id", "scope", "status", "kind", "fqn", "seq", "data", "props", "oldProps", "output") SELECT "id", "scope", "status", "kind", "fqn", "seq", "data", "props", "oldProps", "output" FROM `resources`;--> statement-breakpoint
DROP TABLE `resources`;--> statement-breakpoint
ALTER TABLE `__new_resources` RENAME TO `resources`;--> statement-breakpoint
PRAGMA foreign_keys=ON;