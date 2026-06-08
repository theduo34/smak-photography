import { Hero } from "@/features/home/Hero";
import { FeaturedAlbums, type FeaturedAlbum } from "@/features/home/FeaturedAlbums";
import { ServicesTeaser, type ServiceHighlight } from "@/features/home/ServicesTeaser";
import { AboutSnippet } from "@/features/home/AboutSnippet";
import { BookingCTA } from "@/features/home/BookingCTA";
import type { Doc } from "@/convex/_generated/dataModel";

type HomePageProps = {
  hero: Doc<"siteSettings">["hero"];
  featuredAlbums: FeaturedAlbum[];
  services: ServiceHighlight[];
  aboutSnippet: string;
  contact: {
    phone: string;
    whatsapp: string;
  };
};

export function HomePage({
  hero,
  featuredAlbums,
  services,
  aboutSnippet,
  contact,
}: HomePageProps) {
  return (
    <>
      <Hero
        image={hero.image}
        headline={hero.headline}
        subtext={hero.subtext}
        whatsapp={contact.whatsapp}
      />
      <FeaturedAlbums albums={featuredAlbums} />
      <ServicesTeaser services={services} />
      <AboutSnippet snippet={aboutSnippet} />
      <BookingCTA whatsapp={contact.whatsapp} phone={contact.phone} />
    </>
  );
}
