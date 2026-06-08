import { Hero } from "@/features/home/Hero";
import { FeaturedAlbums, type FeaturedAlbum } from "@/features/home/FeaturedAlbums";
import { ServicesTeaser } from "@/features/home/ServicesTeaser";
import { AboutSnippet } from "@/features/home/AboutSnippet";
import { BookingCTA } from "@/features/home/BookingCTA";
import type { PackageCardData } from "@/features/pricing/PackageCard";
import type { Doc } from "@/convex/_generated/dataModel";

type HomePageProps = {
  hero: Doc<"siteSettings">["hero"];
  featuredAlbums: FeaturedAlbum[];
  popularPackages: PackageCardData[];
  aboutSnippet: string;
  contact: {
    phone: string;
    whatsapp: string;
  };
};

export function HomePage({
  hero,
  featuredAlbums,
  popularPackages,
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
      <ServicesTeaser packages={popularPackages} phone={contact.phone} whatsapp={contact.whatsapp} />
      <AboutSnippet snippet={aboutSnippet} />
      <BookingCTA whatsapp={contact.whatsapp} phone={contact.phone} />
    </>
  );
}
