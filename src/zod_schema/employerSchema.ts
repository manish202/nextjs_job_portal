import { z } from "zod";

export const employerSchema = z.object({
    company_name: z
        .string()
        .max(200, "Company name must not exceed 200 characters")
        .optional()
        .or(z.literal("")),
    description: z
        .string()
        .max(2000, "Description must not exceed 2000 characters")
        .optional()
        .or(z.literal("")),
    organizationType: z.enum(["development","business","design"], {
        message: "Please select a organization type",
    }),
    teamSize: z.enum(["1-5","6-20","21-50"], {
        message: "Please select a team size",
    }),
    yearOfEstablishment: z
        .number()
        .int()
        .min(1800, "Please enter a valid year")
        .max(new Date().getFullYear(), "Year cannot be in the future")
        .optional()
        .or(z.nan()),
    location: z
        .string()
        .max(255, "Location must not exceed 255 characters")
        .optional()
        .or(z.literal("")),
    websiteUrl: z
        .string()
        .url("Please enter a valid website URL")
        .optional()
        .or(z.literal("")),
    // avatarUrl: z
    //     .string()
    //     .url("Please enter a valid avatar URL")
    //     .optional()
    //     .or(z.literal("")),
    // bannerImageUrl: z
    //     .string()
    //     .url("Please enter a valid banner image URL")
    //     .optional()
    //     .or(z.literal("")),
});