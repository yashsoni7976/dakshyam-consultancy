import type { Scheme } from "@/lib/content/types";

/**
 * Government subsidy schemes.
 *
 * This is factual public-policy information sourced from the official scheme
 * guidelines mirrored in `public/documents/schemes/`. Figures change when the
 * issuing department revises a policy — treat the linked PDF as authoritative
 * and re-verify each entry against it before a release.
 */
export const schemes: Scheme[] = [
  {
    slug: "aif",
    code: "AIF",
    name: "Agriculture Infrastructure Fund",
    government: "central",
    summary:
      "Central Government scheme for new and existing farmers, agri-entrepreneurs, startups and agri-tech businesses building post-harvest infrastructure.",
    keyAdvantage: "3% interest subvention on loans up to ₹2 crore, for up to 7 years.",
    benefits: [
      "Interest subvention of 3% per annum up to a loan limit of ₹2 crore.",
      "Subvention available for up to 7 years.",
      "100% reimbursement of CGTMSE fees, requiring no collateral.",
      "Maximum 9% rate of interest on loans.",
    ],
    eligibility: [
      "Individual, Proprietorship, Partnership, Company, FPO and SHG.",
    ],
    eligibleProjects: [
      "Post-harvest management projects such as warehouses, agro processing, poly houses and viable farming assets.",
    ],
    sectors: ["Agriculture", "Farmers", "Post-Harvest", "Warehouse", "Agro"],
    documents: [
      { label: "AIF Guidelines", href: "/documents/schemes/aif-guidelines.pdf", sizeBytes: 384513 },
    ],
    displayOrder: 10,
    featured: false,
  },
  {
    slug: "brupy",
    code: "BRUPY",
    name: "Bhimrao Ambedkar Rajasthan Dalit Adivasi Udhyam Protsahan Yojana",
    government: "state",
    summary:
      "Rajasthan Government subsidy scheme promoting entrepreneurship among Scheduled Caste (SC) and Scheduled Tribe (ST) entrepreneurs.",
    keyAdvantage: "Up to 25% capital subsidy plus interest subvention for SC/ST entrepreneurs.",
    benefits: [
      "Capital subsidy of 25% of project cost, up to ₹25 lakhs.",
      "Interest subvention of 6% to 9% per annum on loans up to ₹10 crore.",
      "Subvention available for up to 5 years.",
    ],
    eligibility: [
      "For Rajasthan domicile SC / ST entrepreneurs.",
      "Individual, Proprietorship, Partnership or Company where 51% or more ownership is held by SC/ST individuals.",
    ],
    eligibleProjects: ["All sectors of manufacturing, service and trading."],
    sectors: ["SC/ST", "Manufacturing", "Service", "Trading", "Rajasthan Domicile"],
    documents: [
      { label: "BRUPY Guidelines", href: "/documents/schemes/brupy-guidelines.pdf", sizeBytes: 1342446 },
    ],
    displayOrder: 20,
    featured: true,
  },
  {
    slug: "mnsupy",
    code: "MNSUPY",
    name: "Mukhyamantri Nari Shakti Udyam Protsahan Yojana",
    government: "state",
    summary:
      "Rajasthan Government subsidy scheme promoting entrepreneurship among women-led enterprises.",
    keyAdvantage: "25% capital subsidy up to ₹25 lakhs for women entrepreneurs.",
    benefits: [
      "Capital subsidy of 25% of project cost (maximum ₹25 lakhs).",
      "Total project loan up to ₹1 crore.",
      "Loans up to ₹10 lakhs for traders, with subsidy up to ₹2.50 lakhs.",
    ],
    eligibility: [
      "For Rajasthan domicile women entrepreneurs.",
      "Individual, Proprietorship, Partnership or Company with 100% ownership by women.",
    ],
    eligibleProjects: ["All sectors of manufacturing and service."],
    sectors: ["Women", "Manufacturing", "Service", "Rajasthan Domicile"],
    documents: [
      { label: "MNSUPY Guidelines", href: "/documents/schemes/mnsupy-guidelines.pdf", sizeBytes: 6385049 },
    ],
    displayOrder: 30,
    featured: false,
  },
  {
    slug: "msme-policy-2024",
    code: "MSME Policy 2024",
    name: "Rajasthan MSME Policy 2024",
    government: "state",
    summary:
      "Rajasthan Government assistance for new and existing MSMEs pursuing digitalisation, quality certification and market access.",
    keyAdvantage: "Up to 75% reimbursement on digitalisation and e-commerce costs.",
    benefits: [
      "50% reimbursement on the cost of quality certifications and Intellectual Property Rights (maximum ₹3 lakhs).",
      "Financial assistance for participation in national and international fairs and exhibitions.",
      "75% reimbursement on the cost of new software or equipment for business process digitisation (maximum ₹50,000).",
      "75% reimbursement on total fees charged by e-commerce platforms (maximum ₹50,000).",
    ],
    eligibility: ["New and existing MSMEs in Rajasthan."],
    eligibleProjects: [
      "Digitalisation, quality certification, IPR and e-commerce participation.",
    ],
    sectors: ["MSME", "Digitalization", "Quality", "IPR", "E-commerce", "Branding"],
    documents: [
      { label: "Rajasthan MSME Policy 2024", href: "/documents/schemes/msme-policy-2024.pdf", sizeBytes: 1961766 },
    ],
    displayOrder: 40,
    featured: true,
  },
  {
    slug: "mysy",
    code: "MYSY",
    name: "Mukhyamantri Yuva Swarozgar Yojana",
    government: "state",
    summary:
      "Rajasthan Government subsidy scheme promoting entrepreneurship among young entrepreneurs.",
    keyAdvantage: "100% interest subvention on loans up to ₹10 lakhs, plus 10% capital subsidy.",
    benefits: [
      "Interest subvention of 100% of the interest charged by the bank, for loans up to ₹10 lakhs.",
      "10% capital subsidy.",
      "Reimbursement of 100% of CGTMSE fees.",
      "Interest subvention for 5 years.",
    ],
    eligibility: [
      "Age between 18 and 45 years.",
      "Educational qualification of minimum 8th class.",
      "For Rajasthan domicile entrepreneurs.",
      "Individual, Proprietorship, Partnership or Company where 51% or more ownership is held by young entrepreneurs.",
    ],
    eligibleProjects: ["Trading, manufacturing and service sectors."],
    sectors: ["Youth", "Trading", "Manufacturing", "Service", "Rajasthan Domicile"],
    documents: [
      { label: "MYSY Guidelines", href: "/documents/schemes/mysy-guidelines.pdf", sizeBytes: 117435 },
    ],
    displayOrder: 50,
    featured: false,
  },
  {
    slug: "pmegp",
    code: "PMEGP",
    name: "Prime Minister Employment Generation Programme",
    government: "central",
    summary:
      "Central Government subsidy scheme promoting entrepreneurship among new entrepreneurs.",
    keyAdvantage: "Up to 35% subsidy on project cost for new manufacturing and service units.",
    benefits: [
      "Capital subsidy of 15% to 35% of project cost.",
      "Maximum subsidy up to ₹17.50 lakhs.",
    ],
    eligibility: [
      "Minimum 8th pass.",
      "Individual or Proprietorship enterprises.",
      "Own contribution of 5% to 10% of project cost.",
    ],
    eligibleProjects: [
      "Maximum project cost ₹50 lakhs for the manufacturing sector.",
      "Maximum project cost ₹20 lakhs for the service sector.",
    ],
    sectors: ["New Entrepreneurs", "Manufacturing", "Service", "Micro Enterprises"],
    documents: [
      { label: "PMEGP Scheme", href: "/documents/schemes/pmegp-guidelines.pdf", sizeBytes: 995359 },
    ],
    displayOrder: 60,
    featured: true,
  },
  {
    slug: "pmfme",
    code: "PMFME",
    name: "PM Formalisation of Micro Food Processing Enterprises",
    government: "central",
    summary:
      "Central Government subsidy scheme promoting agro and food processing for new and existing micro enterprises.",
    keyAdvantage: "35% credit-linked subsidy for micro food processing units with ODOP focus.",
    benefits: [
      "Capital subsidy of 35% of project cost, covering machinery and building cost.",
      "Maximum subsidy up to ₹10.00 lakhs.",
    ],
    eligibility: [
      "Individual, Proprietorship, Partnership and Company.",
      "Own contribution of 10% to 40% of project cost.",
    ],
    eligibleProjects: [
      "Agro and food manufacturing, processing or packaging.",
      "Maximum project cost ₹20 lakhs for the service sector.",
    ],
    sectors: ["Food Processing", "Agro", "Micro Enterprises", "ODOP"],
    documents: [
      { label: "PMFME Guidelines", href: "/documents/schemes/pmfme-guidelines.pdf", sizeBytes: 2489589 },
    ],
    displayOrder: 70,
    featured: true,
  },
  {
    slug: "odop",
    code: "ODOP",
    name: "One District One Product (Rajasthan)",
    government: "state",
    summary:
      "A Rajasthan state initiative to identify, promote and brand unique products from each district, boosting local entrepreneurship and exports.",
    keyAdvantage: "Dedicated financial, marketing and procurement support for district-identified products.",
    benefits: [
      "Special financial assistance for project setups related to district-specific products.",
      "Marketing and branding support at national and international level.",
      "Technical training and skill development for district clusters.",
      "Preferential treatment in government procurement for ODOP units.",
    ],
    eligibility: [
      "New and existing units manufacturing or processing the identified district product.",
      "Rajasthan domicile entrepreneurs, MSMEs and co-operative clusters.",
    ],
    eligibleProjects: [
      "District-specific products such as Blue Pottery (Jaipur), Woodwork (Jodhpur), Bikaneri Bhujia (Bikaner) and Kota Stone (Kota).",
    ],
    sectors: ["ODOP", "Cluster", "Branding", "MSME", "Rajasthan Domicile"],
    documents: [
      { label: "ODOP Policy Guidelines", href: "/documents/schemes/odop-policy-guidelines.pdf", sizeBytes: 284374 },
    ],
    displayOrder: 80,
    featured: false,
  },
  {
    slug: "raj-trade-policy",
    code: "Raj Trade Policy",
    name: "Rajasthan Trade Promotion Policy 2025–29",
    government: "state",
    summary:
      "Rajasthan Government scheme promoting retail, wholesale and e-commerce trade across the state.",
    keyAdvantage: "Up to 6% interest subvention on trade loans, for 5 years.",
    benefits: [
      "Interest subvention of 6% for loans up to ₹1 crore.",
      "Interest subvention of 4% for loans between ₹1 crore and ₹2 crore.",
      "Reimbursement of 50% of CGTMSE fees.",
      "Reimbursement of 50% of insurance charges.",
      "Interest subvention for 5 years.",
    ],
    eligibility: [
      "New retail and wholesale trading businesses.",
      "Individual, Proprietorship, Partnership and Company.",
    ],
    eligibleProjects: ["Working capital loan up to 80% of the total loan."],
    sectors: ["Retail", "Wholesale", "E-commerce", "Trading"],
    documents: [
      {
        label: "Rajasthan Trade Promotion Policy 2025–29",
        href: "/documents/schemes/raj-trade-policy-2025-29.pdf",
        sizeBytes: 791481,
      },
    ],
    displayOrder: 90,
    featured: false,
  },
  {
    slug: "rips-2024",
    code: "RIPS 2024",
    name: "Rajasthan Investment Promotion Scheme 2024",
    government: "state",
    summary:
      "Rajasthan Government scheme promoting the manufacturing and service sectors for new and existing enterprises.",
    keyAdvantage:
      "Large-scale investment incentives including electricity duty and stamp duty waivers.",
    benefits: [
      "50% capital subsidy up to ₹1.50 crore for agro and food processing.",
      "3% to 6% interest subvention on loans up to ₹10 crore, for 7 years.",
      "100% stamp duty benefit on land purchase or lease.",
      "100% conversion charges benefit for land conversion.",
      "100% exemption on electricity duty charges for 7 years.",
      "100% mandi tax/fee reimbursement for 7 years.",
      "75% SGST subsidy for 10 years.",
    ],
    eligibility: ["Manufacturing and service sector, new and existing enterprises."],
    eligibleProjects: ["Warehouse, solar, hotel and resort schemes also available."],
    sectors: ["Investment", "Manufacturing", "Service", "Solar", "Tourism", "Warehouse", "Agro", "Food Processing"],
    documents: [
      { label: "RIPS 2024 Guidelines", href: "/documents/schemes/rips-2024-guidelines.pdf", sizeBytes: 7735697 },
    ],
    displayOrder: 100,
    featured: true,
  },
  {
    slug: "vyupy",
    code: "VYUPY",
    name: "Vishwakarma Yuva Udyam Protsahan Yojana",
    government: "state",
    summary:
      "Rajasthan Government subsidy scheme promoting entrepreneurship among young entrepreneurs.",
    keyAdvantage: "25% capital subsidy up to ₹5 lakhs plus interest subvention.",
    benefits: [
      "Interest subvention of 7% to 8% of the interest charged by the bank.",
      "25% capital subsidy (maximum ₹5 lakhs).",
      "Interest subvention for 5 years.",
    ],
    eligibility: [
      "Age between 18 and 45 years.",
      "Individual, Proprietorship, Partnership or Company where 51% or more ownership is held by young entrepreneurs.",
    ],
    eligibleProjects: ["New and existing manufacturing and service sectors."],
    sectors: ["Youth", "Manufacturing", "Service"],
    documents: [
      { label: "VYUPY Guidelines", href: "/documents/schemes/vyupy-guidelines.pdf", sizeBytes: 2137020 },
    ],
    displayOrder: 110,
    featured: false,
  },
];
