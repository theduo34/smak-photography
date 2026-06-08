"use client";

import { useState } from "react";
import { PackageOpen } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { PackageCard, type PackageCardData } from "@/features/pricing/PackageCard";
import { EnquiryDialog } from "@/features/enquiry/EnquiryDialog";
import { siteConfig } from "@/config/site";

type PackageGridProps = {
  packages: PackageCardData[];
  phone: string;
  whatsapp: string;
};

export function PackageGrid({ packages, phone, whatsapp }: PackageGridProps) {
  const [selected, setSelected] = useState<PackageCardData | null>(null);
  const [open, setOpen] = useState(false);

  if (packages.length === 0) {
    return (
      <EmptyState
        icon={PackageOpen}
        title="Packages coming soon"
        description="We're putting our service packages together. Reach out directly and we'll prepare a custom quote for you."
      />
    );
  }

  function handleEnquire(pkg: PackageCardData) {
    setSelected(pkg);
    setOpen(true);
  }

  const groups = siteConfig.categories
    .map((category) => ({
      category,
      items: packages.filter((pkg) => pkg.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <div className="flex flex-col gap-16">
        {groups.map(({ category, items }) => (
          <div key={category} className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{category}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((pkg) => (
                <PackageCard key={pkg._id} data={pkg} onEnquire={handleEnquire} />
              ))}
            </div>
          </div>
        ))}
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
    </>
  );
}
