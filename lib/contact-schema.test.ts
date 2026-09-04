import { describe, expect, it } from "vitest";
import { EnquirySchema, SUBJECTS } from "./contact-schema";

const valid = {
  name: "Anita Sharma",
  email: "anita@example.com",
  phone: "+91 98765 43210",
  subject: SUBJECTS[0],
  message: "We are setting up a spice grinding unit near Bikaner this year.",
  consent: "on",
};

/** First error message for a field, or undefined if the field passed. */
function errorFor(input: Record<string, unknown>, field: string) {
  const result = EnquirySchema.safeParse(input);
  if (result.success) return undefined;
  return result.error.issues.find((issue) => issue.path[0] === field)?.message;
}

describe("EnquirySchema", () => {
  it("accepts a well-formed enquiry", () => {
    const result = EnquirySchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("trims surrounding whitespace off free-text fields", () => {
    const result = EnquirySchema.safeParse({ ...valid, name: "  Anita  " });
    expect(result.success && result.data.name).toBe("Anita");
  });

  it("rejects a one-character name", () => {
    expect(errorFor({ ...valid, name: "A" }, "name")).toMatch(/enter your name/i);
  });

  it("rejects a malformed email", () => {
    expect(errorFor({ ...valid, email: "anita@" }, "email")).toMatch(/valid email/i);
  });

  it.each(["12345", "abcdefghij", "+91-98", ""])("rejects the phone %o", (phone) => {
    expect(errorFor({ ...valid, phone }, "phone")).toMatch(/valid phone/i);
  });

  it.each(["+919876543210", "098765 43210", "+91 98765-43210"])(
    "accepts the phone %o",
    (phone) => {
      expect(errorFor({ ...valid, phone }, "phone")).toBeUndefined();
    },
  );

  it("rejects a subject outside the published list", () => {
    expect(errorFor({ ...valid, subject: "Partnership" }, "subject")).toMatch(
      /choose a subject/i,
    );
  });

  it("rejects a message shorter than a sentence", () => {
    expect(errorFor({ ...valid, message: "Need help" }, "message")).toMatch(
      /sentence or two/i,
    );
  });

  it("requires consent, because the DPDP Act does", () => {
    expect(errorFor({ ...valid, consent: undefined }, "consent")).toMatch(/consent/i);
    expect(errorFor({ ...valid, consent: "off" }, "consent")).toMatch(/consent/i);
  });

  it("treats the honeypot as optional and does not reject a filled one", () => {
    // The action decides what to do with a filled honeypot; the schema must
    // let it through so that decision is reachable.
    const result = EnquirySchema.safeParse({ ...valid, company: "spam-bot" });
    expect(result.success).toBe(true);
    expect(result.success && result.data.company).toBe("spam-bot");
  });
});
