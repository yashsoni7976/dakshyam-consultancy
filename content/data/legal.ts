import type { LegalDocument } from "@/lib/content/types";
import { site } from "./site";

/**
 * Legal pages.
 *
 * These are structured (heading + paragraphs + bullets) rather than raw HTML
 * so they render consistently and stay diffable in review.
 *
 * TODO(legal): have a qualified advocate review all four documents before
 * launch. The DPDP Act 2023 obligations below are real statutory duties — the
 * named Data Protection Officer and grievance timeline must be accurate.
 */

const LAST_UPDATED = "2026-08-31";

export const legalDisclaimer: LegalDocument = {
  slug: "legal",
  title: "Legal Disclaimer",
  subtitle: "Important information regarding our services and affiliations.",
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: "General information only",
      paragraphs: [
        `The information provided by ${site.name} on this website is for general informational purposes only. All information is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the site.`,
      ],
    },
    {
      heading: "No government affiliation",
      paragraphs: [
        `${site.name} is a private consultancy service provider specialising in MSME and startup consultation. We are NOT associated with, affiliated to, endorsed by, or in collaboration with any Government or Non-Government agency, institution, organisation or department of the Government of Rajasthan or the Government of India.`,
      ],
    },
    {
      heading: "Professional advice disclaimer",
      paragraphs: [
        "This site does not contain legal, financial or tax advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice. Before acting on any information here, we encourage you to consult the appropriate professionals.",
      ],
    },
    {
      heading: "Scheme information accuracy",
      paragraphs: [
        "Subsidy quantums, eligibility criteria and timelines are set by the issuing government department and change without notice. The scheme guideline documents linked on this site are mirrors of officially published PDFs and are provided for convenience. Always verify against the department's current notification before making an investment decision.",
      ],
    },
    {
      heading: "External links disclaimer",
      paragraphs: [
        "The site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored or checked for accuracy by us. We do not warrant, endorse or assume responsibility for the accuracy or reliability of any information offered by third-party websites.",
      ],
    },
    {
      heading: "Payment caution",
      paragraphs: [
        `For all service payments, users are strictly advised to ensure transactions are made directly to our official company account. ${site.name} is not responsible for any payments made to individual accounts or to third-party intermediaries claiming to represent us.`,
      ],
    },
  ],
};

export const privacyPolicy: LegalDocument = {
  slug: "privacy",
  title: "Privacy Policy",
  subtitle: "How we collect, use and protect your personal data.",
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: "1. Information we collect",
      paragraphs: [
        "Under the Digital Personal Data Protection (DPDP) Act 2023, we collect only the personal data necessary to provide our services. This includes:",
      ],
      bullets: [
        "Identity data: name, business name, Udyam registration number.",
        "Contact data: email address, phone number, business address.",
        "Technical data: IP address, browser type and device information, for security monitoring.",
        "Subsidy documents: financial statements and project reports provided voluntarily for analysis.",
      ],
    },
    {
      heading: "2. Purpose and legal basis for processing",
      paragraphs: ["We process your data on the basis of your explicit consent. The purposes are:"],
      bullets: [
        "Facilitating government subsidy applications.",
        "Business consultancy and feasibility analysis.",
        "Sending updates and service notifications you have requested.",
        "Ensuring network and information security.",
      ],
    },
    {
      heading: "3. Data security",
      paragraphs: [
        "We apply appropriate technical and organisational measures to protect your data:",
      ],
      bullets: [
        "Encryption: data is encrypted in transit (TLS) and at rest.",
        "Access control: role-based access to client documents.",
        "Monitoring: security logging and retention of access records.",
      ],
      // TODO(legal): only claim a specific certification (e.g. ISO 27001) once
      // the business actually holds it and can produce the certificate.
    },
    {
      heading: "4. Data retention",
      paragraphs: [
        "We retain personal data only for as long as the stated purpose requires, or as long as a statutory retention obligation applies. Documents supplied for a subsidy application are retained for the duration of the application and any subsequent audit window, then erased.",
      ],
    },
    {
      heading: "5. Your rights under the DPDP Act 2023",
      paragraphs: ["As a Data Principal, you have the following rights:"],
      bullets: [
        "Right to access: request a summary of the personal data we process about you.",
        "Right to correction and erasure: request that we update or delete your data.",
        "Right to withdraw consent: you may withdraw consent at any time.",
        "Right to nominate: nominate an individual to exercise your rights in the event of death or incapacity.",
      ],
    },
    {
      heading: "6. Grievance redressal",
      paragraphs: [
        `To exercise any of the rights above, or to raise a complaint about how your data is processed, contact our Data Protection Officer at ${site.email}.`, // TODO(legal): dedicated DPO address
        "We resolve grievances within 30 days of receipt.",
      ],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  slug: "terms",
  title: "Terms & Conditions",
  subtitle: "Please read these terms carefully before using our services.",
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: "1. Agreement to terms",
      paragraphs: [
        `By accessing this website you agree to be bound by these terms of service and all applicable laws and regulations, and you accept responsibility for compliance with any applicable local laws.`,
      ],
    },
    {
      heading: "2. Use licence",
      paragraphs: [
        `Permission is granted to temporarily download one copy of the materials on ${site.name}'s website for personal, non-commercial transitory viewing only. Under this licence you may not:`,
      ],
      bullets: [
        "Modify or copy the materials.",
        "Use the materials for any commercial purpose.",
        "Attempt to decompile or reverse engineer any software contained on the website.",
        "Remove any copyright or other proprietary notation from the materials.",
      ],
    },
    {
      heading: "3. Scope of consultancy",
      paragraphs: [
        `${site.name} provides consultancy services relating to government subsidies and business finance. We do not guarantee the approval of any subsidy or loan; the final decision rests with the respective government department or financial institution.`,
      ],
    },
    {
      heading: "4. Client obligations",
      paragraphs: [
        "You agree to provide accurate, complete and timely information and documentation. We are not liable for an application rejected because of information you supplied that was inaccurate or incomplete, or for delays caused by documents provided late.",
      ],
    },
    {
      heading: "5. Limitation of liability",
      paragraphs: [
        `In no event shall ${site.name} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or arising from business interruption) resulting from the use of, or inability to use, the materials on this website.`,
      ],
    },
    {
      heading: "6. Governing law",
      paragraphs: [
        "These terms are governed by the laws of India, and the courts at Bikaner, Rajasthan shall have exclusive jurisdiction.", // TODO(legal): confirm jurisdiction
      ],
    },
  ],
};

export const refundPolicy: LegalDocument = {
  slug: "refund",
  title: "Refund Policy",
  subtitle: "Our commitment to transparency in financial transactions.",
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: "1. Service fees",
      paragraphs: [
        "Consultancy fees paid for initial analysis, project report preparation and documentation are generally non-refundable once work has commenced, because these fees cover professional time already invested by our team.",
      ],
    },
    {
      heading: "2. Eligibility for a refund",
      paragraphs: ["A refund may be considered in the following circumstances:"],
      bullets: [
        "A duplicate payment made in error.",
        "Cancellation requested within 24 hours of payment, provided no professional work has started.",
        "Failure on our part to deliver the committed documentation within the mutually agreed timeline, excluding delays caused by government portals or other external factors.",
      ],
    },
    {
      heading: "3. Non-refundable situations",
      paragraphs: ["Fees will not be refunded where:"],
      bullets: [
        "The subsidy application is rejected by the government department due to eligibility issues or incorrect information provided by the client.",
        "The client discontinues the business or project after the consultancy process has started.",
        "The client fails to provide the required documents within the stipulated time.",
      ],
    },
    {
      heading: "4. How to request a refund",
      paragraphs: [
        `Write to ${site.email} with your invoice reference and the reason for the request. We acknowledge within 3 working days and process approved refunds to the original payment method within 14 working days.`,
      ],
    },
  ],
};

export const legalDocuments: LegalDocument[] = [
  termsAndConditions,
  privacyPolicy,
  refundPolicy,
  legalDisclaimer,
];
