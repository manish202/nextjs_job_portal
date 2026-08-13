import { z } from "zod";

const email = z.string().email("Please enter a valid email address");
const password = z.string().min(8, "Password must be at least 8 characters");

const registrationSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters"),
    userName: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username cannot exceed 30 characters")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers and underscores"
        ),
    email,
    password,
    confirmPassword: z
        .string()
        .min(1, "Please confirm your password"),
    role: z.enum(["applicant", "employer"], {
        message: "Please select a role",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const loginSchema = z.object({email,password});

export {registrationSchema,loginSchema};