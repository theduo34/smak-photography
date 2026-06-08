import { Aperture } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EmptyState } from "@/components/shared/EmptyState";

type AboutPageProps = {
  aboutFull: string | null;
};

export function AboutPage({ aboutFull }: AboutPageProps) {
  return (
    <div className="section-shell section-padding flex flex-col gap-10">
      <SectionHeading eyebrow="About" title="Our story" />

      {aboutFull ? (
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div
            className="media-placeholder aspect-[4/5] overflow-hidden rounded-lg lg:order-last lg:sticky lg:top-24"
            aria-hidden
          >
            <Aperture className="size-16" strokeWidth={1} />
          </div>
          <div className="mx-auto flex max-w-md flex-col gap-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {aboutFull
              .split("\n\n")
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index} className={index === 0 ? "text-foreground" : undefined}>
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      ) : (
        <EmptyState
          title="Our story is on its way"
          description="We're putting together the studio's story. Check back soon, or get in touch to learn more about us directly."
        />
      )}
    </div>
  );
}
