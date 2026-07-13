import { PackagesPage } from "@/components/pages/admin/PackagesPage";

export default async function Page({ params }: { params: Promise<{ secret: string }> }) {
  const { secret } = await params;
  return <PackagesPage secret={secret} />;
}
