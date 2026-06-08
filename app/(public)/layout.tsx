import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchQuery(api.siteSettings.get, {});

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col pt-16">{children}</main>
      <SiteFooter
        phone={settings?.phone}
        whatsapp={settings?.whatsapp}
        address={settings?.address}
      />
    </>
  );
}
