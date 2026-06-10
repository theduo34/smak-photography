import Image from "next/image";
import { Aperture, Heart, Users } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EmptyState } from "@/components/shared/EmptyState";
import { WhatsAppButton } from "@/features/enquiry/WhatsAppButton";
import { CallButton } from "@/features/enquiry/CallButton";
import type { Doc } from "@/convex/_generated/dataModel";

type AboutPageProps = {
  aboutFull: string | null;
  aboutImage: Doc<"siteSettings">["aboutImage"] | null;
  stats: Doc<"siteSettings">["stats"];
  whatsapp: string;
  phone: string;
};

const values = [
  {
    icon: Heart,
    title: "Genuine moments",
    description:
      "We work quietly and naturally so the people in front of the camera stay themselves.",
  },
  {
    icon: Aperture,
    title: "Crafted with care",
    description:
      "Every shoot is planned, shot, and edited with the same attention, large or small.",
  },
  {
    icon: Users,
    title: "Personal service",
    description:
      "You work directly with the studio from first enquiry to final gallery delivery.",
  },
];

export function AboutPage({ aboutFull, aboutImage, stats, whatsapp, phone }: AboutPageProps) {
  if (!aboutFull || !aboutImage) {
    return (
      <div className="section-shell section-padding">
        <EmptyState
          title="Our story is on its way"
          description="We're putting together the studio's story. Check back soon, or get in touch to learn more about us directly."
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <header className="relative -mt-16 flex min-h-[45vh] items-end overflow-hidden sm:min-h-[55vh]">
        <Image
          src={aboutImage.url}
          alt={aboutImage.alt}
          fill
          priority
          placeholder="blur"
          blurDataURL={aboutImage.blurDataURL}
          sizes="100vw"
          className="object-cover"
        />
        <div className="image-overlay" aria-hidden />
        <div className="section-shell relative z-10 flex flex-col gap-3 pt-32 pb-12 text-background sm:pb-16">
          <span className="text-sm font-medium tracking-wide text-background/80 uppercase">
            About us
          </span>
          <h1 className="font-heading max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            The studio behind the stories
          </h1>
        </div>
      </header>

      {stats.length > 0 && (
        <div className="section-shell -mt-10 sm:-mt-12">
          <div className="relative z-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 bg-card p-6 text-center sm:p-8"
              >
                <span className="font-heading text-3xl font-semibold text-primary sm:text-4xl">
                  {stat.value}
                </span>
                <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase sm:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <section className="section-shell section-padding">
        <div className="mx-auto flex max-w-2xl flex-col gap-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {aboutFull
            .split("\n\n")
            .filter(Boolean)
            .map((paragraph, index) => (
              <p key={index} className={index === 0 ? "text-foreground" : undefined}>
                {paragraph}
              </p>
            ))}
        </div>
      </section>

      <section className="section-shell pb-16 sm:pb-24">
        <SectionHeading
          eyebrow="Why Smak"
          title="What you can expect"
          align="center"
          className="mx-auto max-w-2xl"
        />
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="flex flex-col items-center gap-3 text-center">
              <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <value.icon className="size-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">{value.title}</h3>
              <p className="max-w-xs text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-card">
        <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
          <div className="dot-grid absolute inset-0 opacity-20" />
        </div>
        <div className="section-shell relative flex flex-col items-center gap-6 py-16 text-center sm:py-24">
          <h2 className="font-heading max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Want to work with us?
          </h2>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            Tell us about your shoot and we will get back to you within hours. WhatsApp is the
            fastest way to reach us, or call us directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {whatsapp && (
              <WhatsAppButton
                phone={whatsapp}
                message="Hi! I'd like to know more about Smak Photography."
                size="lg"
              />
            )}
            {phone && <CallButton phone={phone} size="lg" />}
          </div>
        </div>
      </section>
    </div>
  );
}
