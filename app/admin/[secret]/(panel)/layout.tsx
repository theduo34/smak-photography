import { AdminPanelShell } from "@/features/admin/layout/AdminPanelShell";

export default async function PanelLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ secret: string }>;
}) {
  const { secret } = await params;
  return <AdminPanelShell secret={secret}>{children}</AdminPanelShell>;
}
