import { DashboardPage } from "@/components/pages/admin/DashboardPage";

export default async function Page({ params }: { params: Promise<{ secret: string }> }) {
  const { secret } = await params;
  return <DashboardPage secret={secret} />;
}
