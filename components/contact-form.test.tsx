import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ContactState } from "@/lib/contact-schema";
import { ContactForm } from "./contact-form";

const { submitEnquiry } = vi.hoisted(() => ({ submitEnquiry: vi.fn() }));
vi.mock("@/app/actions/contact", () => ({ submitEnquiry }));

const CONSENT = "I consent to Dakshyam Consulting processing this enquiry, per the";

/** Resolves the action to a fixed next-state, as the real one would. */
const respond = (state: ContactState) => submitEnquiry.mockResolvedValue(state);

const setup = () => render(<ContactForm consentText={CONSENT} />);

async function submit() {
  await userEvent.click(screen.getByRole("button", { name: "Send message" }));
}

describe("ContactForm", () => {
  beforeEach(() => respond({ status: "idle" }));

  it("renders every field the schema requires", () => {
    setup();
    for (const label of ["Name", "Phone number", "Email", "Subject", "Your project"]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("uses input types that summon the right mobile keyboard", () => {
    setup();
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Phone number")).toHaveAttribute("type", "tel");
    expect(screen.getByLabelText("Name")).toHaveAttribute("autocomplete", "name");
  });

  it("offers every published subject and preselects the first", () => {
    setup();
    const select = screen.getByLabelText("Subject") as HTMLSelectElement;
    expect(select.options.length).toBeGreaterThan(1);
    expect(select.value).toBe("Subsidy enquiry");
  });

  it("renders the consent text with links to both policies", () => {
    setup();
    expect(screen.getByText(new RegExp(CONSENT.slice(0, 30)))).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy",
    );
    expect(screen.getByRole("link", { name: "Terms of Service" })).toHaveAttribute(
      "href",
      "/terms",
    );
  });

  it("keeps a honeypot that is hidden from people and from assistive tech", () => {
    const { container } = setup();
    const honeypot = container.querySelector("#company")!;
    const wrapper = honeypot.closest("div")!;
    expect(wrapper).toHaveAttribute("hidden");
    expect(wrapper).toHaveAttribute("aria-hidden", "true");
    expect(honeypot).toHaveAttribute("tabindex", "-1");
  });

  it("submits to the action", async () => {
    setup();
    await submit();
    expect(submitEnquiry).toHaveBeenCalled();
  });

  it("shows per-field errors and wires them to their inputs", async () => {
    respond({
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: { name: "Please enter your name.", email: "Please enter a valid email." },
    });
    setup();
    await submit();

    expect(await screen.findByRole("alert")).toHaveTextContent(/correct the highlighted/i);

    const name = screen.getByLabelText("Name");
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAttribute("aria-describedby", "name-error");
    expect(screen.getByText("Please enter your name.")).toHaveAttribute("id", "name-error");
  });

  it("marks only the fields that failed", async () => {
    respond({ status: "error", fieldErrors: { email: "Bad email." } });
    setup();
    await submit();

    await screen.findByText("Bad email.");
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Name")).toHaveAttribute("aria-invalid", "false");
    expect(screen.getByLabelText("Name")).not.toHaveAttribute("aria-describedby");
  });

  it("tints a failed field's border with the alert colour", async () => {
    respond({ status: "error", fieldErrors: { name: "Required." } });
    setup();
    await submit();

    await screen.findByText("Required.");
    expect(screen.getByLabelText("Name")).toHaveClass("border-alert");
    expect(screen.getByLabelText("Email")).toHaveClass("border-stone");
  });

  it("omits the alert banner when the error carries no summary message", async () => {
    respond({ status: "error", fieldErrors: { name: "Required." } });
    setup();
    await submit();

    await screen.findByText("Required.");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("replaces the form with an acknowledgement on success", async () => {
    respond({ status: "success", message: "Thanks — your enquiry has reached us." });
    setup();
    await submit();

    expect(
      await screen.findByRole("heading", { name: "Message sent" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Thanks — your enquiry has reached us.")).toBeInTheDocument();
    expect(screen.queryByLabelText("Name")).not.toBeInTheDocument();
  });

  it("does not block submission with client-side validation", () => {
    // `noValidate` is deliberate: the server action is the single source of
    // truth, so the browser must not pre-empt it with its own messages.
    const { container } = setup();
    expect(container.querySelector("form")).toHaveAttribute("noValidate");
  });
});
