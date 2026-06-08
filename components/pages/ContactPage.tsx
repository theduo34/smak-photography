import { SectionHeading } from "@/components/shared/SectionHeading";
import { EmptyState } from "@/components/shared/EmptyState";
import { ContactChannels } from "@/features/contact/ContactChannels";
import { ContactForm } from "@/features/contact/ContactForm";
import { MapEmbed } from "@/features/contact/MapEmbed";
import { BusinessHours } from "@/features/contact/BusinessHours";
import type { Doc } from "@/convex/_generated/dataModel";

type ContactPageProps = {
  settings: Doc<"siteSettings"> | null;
};

export function ContactPage({ settings }: ContactPageProps) {
  return (
    <div className="section-shell section-padding flex flex-col gap-12">
      <SectionHeading
        eyebrow="Contact"
        title="Let's plan your shoot"
        description="Reach out by WhatsApp, phone, or the form below — whichever's easiest. We're based in Koforidua and happy to travel across Ghana."
      />

      {settings ? (
        <>
          <ContactChannels
            phone={settings.phone}
            whatsapp={settings.whatsapp}
            email={settings.email}
            address={settings.address}
          />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ContactForm />
            <div className="flex flex-col gap-6">
              <MapEmbed mapsUrl={settings.mapsUrl} />
              <BusinessHours hours={settings.hours} />
            </div>
          </div>
        </>
      ) : (
        <EmptyState
          title="Contact details coming soon"
          description="We're setting up our contact information. In the meantime, send a message below and we'll get back to you."
          action={
            <div className="mt-2 w-full max-w-md">
              <ContactForm />
            </div>
          }
        />
      )}
    </div>
  );
}
