CREATE TABLE `applicants` (
	`id` int PRIMARY KEY,
	`biography` text,
	`date_of_birth` date,
	`nationality` varchar(100),
	`maritial_status` enum('single','married','divorced'),
	`gender` enum('male','female','other'),
	`education` enum('none','high school','undergraduate','masters','phd'),
	`experience` text,
	`website_url` varchar(255),
	`location` varchar(255),
	`created_at` datetime NOT NULL DEFAULT (now()),
	`updated_at` datetime NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` datetime
);
--> statement-breakpoint
CREATE TABLE `employers` (
	`id` int PRIMARY KEY,
	`description` text,
	`avatar_url` text,
	`banner_image_url` text,
	`organization_type` varchar(100),
	`team_size` varchar(50),
	`year_of_establishment` year,
	`website_url` varchar(255),
	`location` varchar(255),
	`created_at` datetime NOT NULL DEFAULT (now()),
	`updated_at` datetime NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` datetime
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`session_id` varchar(255),
	`user_id` int NOT NULL,
	`user_agent` text NOT NULL,
	`ip` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT (now()),
	`updated_at` datetime NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `session_id_unique` UNIQUE INDEX(`session_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`name` varchar(255) NOT NULL,
	`user_name` varchar(255) NOT NULL,
	`password` text NOT NULL,
	`email` varchar(255) NOT NULL,
	`role` enum('admin','applicant','employer') DEFAULT 'applicant',
	`phone_number` varchar(255),
	`created_at` datetime NOT NULL DEFAULT (now()),
	`updated_at` datetime NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` datetime,
	CONSTRAINT `email_unique` UNIQUE INDEX(`email`)
);
--> statement-breakpoint
ALTER TABLE `applicants` ADD CONSTRAINT `applicants_id_users_id_fkey` FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `employers` ADD CONSTRAINT `employers_id_users_id_fkey` FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_users_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;