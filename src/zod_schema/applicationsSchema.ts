import { z } from "zod";

export const applicationsSchema = z.object({
    jobId: z.number().int().nonnegative(),
    linkedinUrl: z.url("Invalid linkedin url").trim()
        .min(1, "Linkedin url is required")
        .max(255, "Linkedin url must not exceed 255 characters"),
    coverLetter: z.string("Cover letter is invalid").trim()
        .min(1, "Cover letter is required")
        .max(255, "Cover letter must not exceed 255 characters"),
});

export type JobApplicationData = z.infer<typeof applicationsSchema>;