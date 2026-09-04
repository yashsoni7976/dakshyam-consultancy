import { z } from "zod";

/**
 * Shared contract for the contact form.
 *
 * Kept out of the Server Action module because a `"use server"` file may only
 * export async functions — exporting a constant or a type from there turns it
 * into a server reference and breaks at runtime. Both the action and the
 * client form import from here.
 */

export const SUBJECTS = [
  "Subsidy enquiry",
  "Project finance",
  "Company registration",
  "Compliance or GST",
  "Something else",
] as const;

export const EnquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{7,19}$/, "Please enter a valid phone number."),
  subject: z.enum(SUBJECTS, { message: "Please choose a subject." }),
  message: z
    .string()
    .trim()
    .min(20, "Please give us at least a sentence or two about your project.")
    .max(3000),
  // Consent is a legal requirement under the DPDP Act 2023, not a nicety.
  consent: z.literal("on", { message: "We need your consent to process this enquiry." }),
  // Honeypot: a real person never fills a hidden field. Deliberately NOT
  // constrained to empty — a validation error would tell a bot it had been
  // caught. The action accepts a filled honeypot and discards it silently.
  company: z.string().optional(),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<string, string>>;
};
