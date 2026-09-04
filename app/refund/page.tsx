import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/legal-document";

export function generateMetadata(): Promise<Metadata> {
  return legalMetadata("refund");
}

export default function Page() {
  return <LegalPage slug="refund" />;
}
