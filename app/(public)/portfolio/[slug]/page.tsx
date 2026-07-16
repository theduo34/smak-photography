import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { AlbumPage } from "@/components/pages/AlbumPage";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const slugs = await fetchQuery(api.albums.listPublishedSlugs, {});
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("DEBUG generateStaticParams failed:", error);
    throw error;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const album = await fetchQuery(api.albums.getBySlug, { slug });

  if (!album) {
    return { title: "Album not found" };
  }

  return {
    title: album.title,
    description: album.description,
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: {
      title: album.title,
      description: album.description,
      images: [{ url: album.cover.url, width: album.cover.width, height: album.cover.height }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const album = await fetchQuery(api.albums.getBySlug, { slug });

  if (!album || !album.published) {
    notFound();
  }

  const photos = await fetchQuery(api.photos.listByAlbum, { albumId: album._id });

  return <AlbumPage album={album} photos={photos} />;
}
