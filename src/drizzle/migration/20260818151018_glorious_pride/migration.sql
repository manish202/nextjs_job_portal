CREATE TABLE `resumes` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`applicant_id` int NOT NULL,
	`linkedin_url` text NOT NULL,
	`cover_letter` text NOT NULL,
	`created_at` datetime NOT NULL DEFAULT (now()),
	`updated_at` datetime NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` datetime,
	CONSTRAINT `resumes_applicant_id_applicants_id_fkey` FOREIGN KEY (`applicant_id`) REFERENCES `applicants`(`id`)
);
--> statement-breakpoint
ALTER TABLE `jobs` ADD `deleted_at` datetime;