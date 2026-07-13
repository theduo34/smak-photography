import { PackageFormPage } from "@/components/pages/admin/PackageFormPage";

export default async function Page({ params }: { params: Promise<{ secret: string }> }) {
  const { secret } = await params;
  return <PackageFormPage secret={secret} />;
}
