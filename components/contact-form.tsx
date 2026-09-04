"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Check } from "lucide-react";
import { submitEnquiry } from "@/app/actions/contact";
import { SUBJECTS, type ContactState } from "@/lib/contact-schema";
import { Button, cx } from "./ui";

const INITIAL: ContactState = { status: "idle" };

/** 4px radius on inputs is the one place the system drops the pill. */
const FIELD =
  "w-full rounded-input border bg-taupe px-3.5 py-2.5 text-body-sm text-ink outline-none transition-colors placeholder:text-ash focus:border-sandstone-deep";

const LABEL = "text-body-sm font-medium text-ink";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="self-start">
      {pending ? "Sending…" : "Send message"}
    </Button>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-body-sm text-alert">
      {message}
    </p>
  );
}

export function ContactForm({ consentText }: { consentText: string }) {
  const [state, action] = useActionState(submitEnquiry, INITIAL);
  const errors = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-card bg-taupe p-6 sm:p-8">
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-ink text-eggshell">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <h2 className="display-type text-heading-xs text-ink">Message sent</h2>
        <p className="text-body-sm text-smoke">{state.message}</p>
      </div>
    );
  }

  const border = (field: string) => (errors[field] ? "border-alert" : "border-stone");

  return (
    <form action={action} noValidate className="flex flex-col gap-6">
      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="rounded-input border-l-2 border-alert bg-taupe px-4 py-3 text-body-sm text-graphite"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={LABEL}>
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cx(FIELD, border("name"))}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={LABEL}>
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="+91 00000 00000"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cx(FIELD, border("phone"))}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={LABEL}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cx(FIELD, border("email"))}
        />
        <FieldError id="email-error" message={errors.email} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className={LABEL}>
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue={SUBJECTS[0]}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={cx(FIELD, border("subject"))}
        >
          {SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <FieldError id="subject-error" message={errors.subject} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={LABEL}>
          Your project
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="What are you building, where, and roughly what will it cost to set up?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cx(FIELD, border("message"), "resize-y")}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div hidden aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 size-4 shrink-0 rounded-[3px] border-stone accent-ink"
          />
          <label htmlFor="consent" className="text-micro leading-relaxed text-smoke">
            {consentText}{" "}
            <Link href="/privacy" className="text-sandstone-deep underline decoration-sandstone-line underline-offset-2">
              Privacy Policy
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="text-sandstone-deep underline decoration-sandstone-line underline-offset-2">
              Terms of Service
            </Link>
          </label>
        </div>
        <FieldError id="consent-error" message={errors.consent} />
      </div>

      <SubmitButton />
    </form>
  );
}
