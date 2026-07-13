import { AlbumFormPage } from "@/components/pages/admin/AlbumFormPage";

export default async function Page({ params }: { params: Promise<{ secret: string }> }) {
  const { secret } = await params;
  return <AlbumFormPage secret={secret} />;
}
