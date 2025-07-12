CREATE TABLE `resources` (
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
	PRIMARY KEY(`scope`, `id`),
	FOREIGN KEY (`scope`) REFERENCES `scopes`(`chain`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `scopes` (
	`chain` text PRIMARY KEY NOT NULL,
	`parent` text
);
