import { AlbumFormPage } from "@/components/pages/admin/AlbumFormPage";
import type { Id } from "@/convex/_generated/dataModel";

export default async function Page({
  params,
}: {
  params: Promise<{ secret: string; albumId: Id<"albums"> }>;
}) {
  const { secret, albumId } = await params;
  return <AlbumFormPage secret={secret} albumId={albumId} />;
}
