import { z } from "zod";
import { MARITIAL_STATUS, GENDER, EDUCATION } from "@/drizzle/table_schema/applicantsTableSchema";

export const applicantSchema = z.object({
    biography: z
        .string()
        .trim()
        .min(2, "Biography minimum 2 characters required")
        .max(5000, "Biography must not exceed 5000 characters")
        .optional()
        .nullable(),
    dateOfBirth: z
        .date()
        .optional()
        .nullable()
        .refine((date) => !date || date < new Date(), { message: "Birth date must be in the past", }),
    nationality: z
        .string()
        .trim()
        .min(2, "Nationality minimum 2 characters required")
        .max(100, "Nationality must not exceed 100 characters")
        .optional()
        .nullable(),
    maritialStatus: z.enum(MARITIAL_STATUS).optional(),
    gender: z.enum(GENDER).optional(),
    education: z.enum(EDUCATION).optional(),
    experience: z
        .string()
        .trim()
        .min(2, "Experience minimum 2 characters required")
        .max(5000, "Experience must not exceed 5000 characters")
        .optional()
        .nullable(),
    websiteUrl: z
        .string()
        .trim()
        .url("Please enter a valid website URL")
        .min(1, "Website URL is required")
        .max(255, "Website URL must not exceed 255 characters")
        .optional()
        .nullable(),
    location: z
        .string()
        .trim()
        .min(1, "Location is required")
        .max(255, "Location must not exceed 255 characters")
        .optional()
        .nullable(),
});

export type UserDetails = z.infer<typeof applicantSchema>;