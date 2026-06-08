import { SectionHeading } from "@/components/shared/SectionHeading";
import { PackageGrid } from "@/features/pricing/PackageGrid";
import type { PackageCardData } from "@/features/pricing/PackageCard";

type ServicesPageProps = {
  packages: PackageCardData[];
  phone: string;
  whatsapp: string;
};

export function ServicesPage({ packages, phone, whatsapp }: ServicesPageProps) {
  return (
    <div className="section-shell section-padding flex flex-col gap-10">
      <SectionHeading
        eyebrow="Services & pricing"
        title="Packages built around your moment"
        description="Every package can be tailored to fit your day. Get in touch and we'll help you find the right coverage, in GHS, with no surprises."
      />
      <PackageGrid packages={packages} phone={phone} whatsapp={whatsapp} />
    </div>
  );
}
