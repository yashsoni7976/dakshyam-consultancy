import {
  BadgeCheck,
  Banknote,
  Building2,
  Calculator,
  ClipboardCheck,
  FileText,
  Globe,
  Hotel,
  Landmark,
  Receipt,
  Rocket,
  Scale,
  ShieldCheck,
  Sun,
  Utensils,
  Wheat,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps the `icon` string in the content layer to a component.
 *
 * Content stores a name rather than a component so the data stays
 * serialisable — it has to survive a round trip through a CMS or a database.
 * Adding an icon means adding it here and to the import above; an unknown name
 * renders nothing rather than crashing the page.
 */
const ICONS: Record<string, LucideIcon> = {
  "badge-check": BadgeCheck,
  banknote: Banknote,
  "building-2": Building2,
  calculator: Calculator,
  "clipboard-check": ClipboardCheck,
  "file-text": FileText,
  globe: Globe,
  hotel: Hotel,
  landmark: Landmark,
  receipt: Receipt,
  rocket: Rocket,
  scale: Scale,
  "shield-check": ShieldCheck,
  sun: Sun,
  utensils: Utensils,
  wheat: Wheat,
};

export function Icon({
  name,
  className = "size-5",
}: {
  name: string;
  className?: string;
}) {
  const Component = ICONS[name];
  if (!Component) return null;
  return <Component className={className} aria-hidden="true" />;
}
