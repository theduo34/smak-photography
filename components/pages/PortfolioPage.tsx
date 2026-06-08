import { SectionHeading } from "@/components/shared/SectionHeading";
import { CategoryFilter } from "@/features/portfolio/CategoryFilter";
import { AlbumGrid } from "@/features/portfolio/AlbumGrid";
import type { AlbumCardData } from "@/features/portfolio/AlbumCard";
import { siteConfig } from "@/config/site";

type PortfolioPageProps = {
  albums: AlbumCardData[];
  category?: string;
};

export function PortfolioPage({ albums, category }: PortfolioPageProps) {
  return (
    <div className="section-shell section-padding flex flex-col gap-10">
      <SectionHeading
        eyebrow="Portfolio"
        title="Our work"
        description="Browse recent shoots across weddings, portraits, events, studio sessions, and commercial projects around Koforidua."
      />
      <CategoryFilter categories={siteConfig.categories} active={category} />
      <AlbumGrid albums={albums} />
    </div>
  );
}
