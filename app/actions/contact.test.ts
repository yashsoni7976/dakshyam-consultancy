import { beforeEach, describe, expect, it, vi } from "vitest";
import { SUBJECTS } from "@/lib/contact-schema";
import { submitEnquiry } from "./contact";

const idle = { status: "idle" } as const;

function form(overrides: Record<string, string> = {}) {
  const data = new FormData();
  const base: Record<string, string> = {
    name: "Anita Sharma",
    email: "anita@example.com",
    phone: "+91 98765 43210",
    subject: SUBJECTS[0],
    message: "We are setting up a spice grinding unit near Bikaner this year.",
    consent: "on",
    ...overrides,
  };
  for (const [key, value] of Object.entries(base)) {
    if (value !== undefined) data.set(key, value);
  }
  return data;
}

describe("submitEnquiry", () => {
  beforeEach(() => {
    vi.spyOn(console, "info").mockImplementation(() => {});
  });

  it("accepts a valid enquiry", async () => {
    const result = await submitEnquiry(idle, form());
    expect(result.status).toBe("success");
    expect(result.message).toMatch(/one working day/i);
    expect(result.fieldErrors).toBeUndefined();
  });

  it("logs the enquiry without leaking the message body", async () => {
    await submitEnquiry(idle, form());
    const [, payload] = vi.mocked(console.info).mock.calls[0];
    expect(payload).toMatchObject({ subject: SUBJECTS[0], email: "anita@example.com" });
    expect(JSON.stringify(payload)).not.toMatch(/spice grinding/);
  });

  it("returns per-field errors rather than a single blanket message", async () => {
    const result = await submitEnquiry(idle, form({ name: "A", email: "nope" }));
    expect(result.status).toBe("error");
    expect(result.message).toMatch(/correct the highlighted fields/i);
    expect(result.fieldErrors?.name).toMatch(/enter your name/i);
    expect(result.fieldErrors?.email).toMatch(/valid email/i);
  });

  it("keeps only the first error per field", async () => {
    const result = await submitEnquiry(idle, form({ name: "" }));
    expect(Object.keys(result.fieldErrors ?? {})).toContain("name");
    expect(typeof result.fieldErrors?.name).toBe("string");
  });

  it("blocks a submission with no consent", async () => {
    const data = form();
    data.delete("consent");
    const result = await submitEnquiry(idle, data);
    expect(result.status).toBe("error");
    expect(result.fieldErrors?.consent).toMatch(/consent/i);
  });

  it("answers a filled honeypot with success and never logs it", async () => {
    // A bot must get the same response a person gets — an error would tell it
    // the trap exists.
    const result = await submitEnquiry(idle, form({ company: "spam-bot" }));
    expect(result.status).toBe("success");
    expect(console.info).not.toHaveBeenCalled();
  });

  it("ignores the previous state it is handed", async () => {
    const result = await submitEnquiry({ status: "error", message: "old" }, form());
    expect(result.status).toBe("success");
  });
});
