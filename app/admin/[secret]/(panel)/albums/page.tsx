import { AlbumsPage } from "@/components/pages/admin/AlbumsPage";

export default async function Page({ params }: { params: Promise<{ secret: string }> }) {
  const { secret } = await params;
  return <AlbumsPage secret={secret} />;
}
