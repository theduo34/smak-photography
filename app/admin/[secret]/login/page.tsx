import { LoginPage } from "@/components/pages/admin/LoginPage";

export default async function Page({ params }: { params: Promise<{ secret: string }> }) {
  const { secret } = await params;
  return <LoginPage secret={secret} />;
}
