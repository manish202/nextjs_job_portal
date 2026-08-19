CREATE TABLE `job_applications` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`job_id` int NOT NULL,
	`applicant_id` int NOT NULL,
	`resume_id` int NOT NULL,
	`status` enum('pending','reviewing','shortlisted','selected','rejected') DEFAULT 'pending',
	`created_at` datetime NOT NULL DEFAULT (now()),
	`updated_at` datetime NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` datetime,
	CONSTRAINT `job_applications_job_id_jobs_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`),
	CONSTRAINT `job_applications_applicant_id_applicants_id_fkey` FOREIGN KEY (`applicant_id`) REFERENCES `applicants`(`id`),
	CONSTRAINT `job_applications_resume_id_resumes_id_fkey` FOREIGN KEY (`resume_id`) REFERENCES `resumes`(`id`)
);
