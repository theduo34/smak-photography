import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { PortfolioPage } from "@/components/pages/PortfolioPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse photo albums from weddings, portraits, events, and more by Smak Photography in Koforidua, Ghana.",
  alternates: { canonical: "/portfolio" },
};

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { category } = await searchParams;
  const activeCategory = siteConfig.categories.includes(category ?? "")
    ? category
    : undefined;

  const albums = await fetchQuery(
    api.albums.listPublished,
    activeCategory ? { category: activeCategory } : {}
  );

  return <PortfolioPage albums={albums} category={activeCategory} />;
}
