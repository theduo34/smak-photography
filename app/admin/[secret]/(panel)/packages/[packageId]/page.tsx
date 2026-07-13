import { PackageFormPage } from "@/components/pages/admin/PackageFormPage";
import type { Id } from "@/convex/_generated/dataModel";

export default async function Page({
  params,
}: {
  params: Promise<{ secret: string; packageId: Id<"packages"> }>;
}) {
  const { secret, packageId } = await params;
  return <PackageFormPage secret={secret} packageId={packageId} />;
}
