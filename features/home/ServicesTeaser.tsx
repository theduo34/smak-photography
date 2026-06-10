"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PackageCard, type PackageCardData } from "@/features/pricing/PackageCard";
import { EnquiryDialog } from "@/features/enquiry/EnquiryDialog";

type ServicesTeaserProps = {
  packages: PackageCardData[];
  phone: string;
  whatsapp: string;
};

export function ServicesTeaser({ packages, phone, whatsapp }: ServicesTeaserProps) {
  const [selected, setSelected] = useState<PackageCardData | null>(null);
  const [open, setOpen] = useState(false);

  if (packages.length === 0) {
    return null;
  }

  function handleEnquire(pkg: PackageCardData) {
    setSelected(pkg);
    setOpen(true);
  }

  return (
    <section className="relative border-y border-border bg-muted/40">
      <div className="section-shell section-padding flex flex-col gap-10">
        <SectionHeading
          eyebrow="Services"
          title="Popular packages"
          description="A few favourites to start from. Every package can be tailored to fit your day, with clear pricing in GHS."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg._id} data={pkg} onEnquire={handleEnquire} />
          ))}
        </div>

        <Link href="/services" className="link-arrow self-center">
          View all packages
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <EnquiryDialog
        open={open}
        onOpenChange={setOpen}
        source="services"
        packageId={selected?._id}
        packageName={selected?.name}
        phone={phone}
        whatsapp={whatsapp}
      />
    </section>
  );
}
