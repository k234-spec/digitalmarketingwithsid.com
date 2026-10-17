import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name (minimum 2 characters)")
    .max(80, "Name must be less than 80 characters"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid work email address")
    .max(100, "Email must be less than 100 characters"),
  company: z
    .string()
    .trim()
    .min(2, "Company name is required")
    .max(100, "Company name must be less than 100 characters"),
  website: z
    .string()
    .trim()
    .url("Please enter a valid website URL starting with https://")
    .or(z.literal(""))
    .optional(),
  service: z
    .string()
    .min(1, "Please select a service of interest"),
  budget: z
    .string()
    .optional(),
  projectGoals: z
    .string()
    .trim()
    .min(10, "Please describe your project objectives and key goals (minimum 10 characters)")
    .max(2000, "Project goals description must be less than 2000 characters"),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must consent to being contacted regarding this inquiry",
    }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
