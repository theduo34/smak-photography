"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Aperture,
  Briefcase,
  Heart,
  PartyPopper,
  Camera,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, LucideIcon> = {
  Weddings: Heart,
  Portraits: Camera,
  Events: PartyPopper,
  Studio: Aperture,
  Commercial: Briefcase,
};

export type ServiceHighlight = {
  name: string;
  description: string;
};

type ServicesTeaserProps = {
  services: ServiceHighlight[];
};

export function ServicesTeaser({ services }: ServicesTeaserProps) {
  return (
    <section className="border-y border-border bg-muted/40">
      <div className="section-shell section-padding flex flex-col gap-10">
        <SectionHeading
          eyebrow="Services"
          title="Packages for every occasion"
          description="From intimate portrait sessions to full wedding-day coverage, every package is built around clear pricing and a relaxed shoot."
          align="center"
          className="mx-auto"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service, index) => {
            const Icon = categoryIcons[service.name] ?? Camera;
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
                className="flex flex-col gap-3 rounded-lg border border-border bg-card p-6"
              >
                <Icon className="size-6 text-foreground" strokeWidth={1.5} />
                <h3 className="text-base font-medium text-foreground">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </motion.div>
            );
          })}
        </div>

        <Link
          href="/services"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mx-auto")}
        >
          View packages and pricing
        </Link>
      </div>
    </section>
  );
}
