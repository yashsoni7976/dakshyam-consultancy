"use server";

import { EnquirySchema, type ContactState } from "@/lib/contact-schema";

/**
 * Contact enquiry handling.
 *
 * There is no backend yet, so a validated submission is logged server-side and
 * acknowledged. The validation, the consent capture and the result shape are
 * the parts that matter now — when a destination exists (email, CRM, database)
 * only the marked block below changes.
 *
 * TODO(backend): deliver the enquiry. Also add rate limiting keyed on IP and a
 * bot check before this goes live — a public form with no throttle will be
 * found and abused.
 */
export async function submitEnquiry(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = EnquirySchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      fieldErrors[key] ??= issue.message;
    }
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors,
    };
  }

  // Silently accept and discard honeypot hits so bots get no signal.
  if (parsed.data.company) {
    return { status: "success", message: "Thanks — we have your enquiry." };
  }

  // --- TODO(backend): replace this block with real delivery ---------------
  console.info("[contact] enquiry received", {
    subject: parsed.data.subject,
    email: parsed.data.email,
    receivedAt: new Date().toISOString(),
  });
  // ------------------------------------------------------------------------

  return {
    status: "success",
    message:
      "Thanks — your enquiry has reached us. We reply within one working day, usually sooner on WhatsApp.",
  };
}
