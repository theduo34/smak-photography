import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { siteConfig } from "@/config/site";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchQuery(api.siteSettings.get, {});

  const jsonLd = settings
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: siteConfig.name,
        image: settings.hero.images[0]?.url,
        telephone: settings.phone,
        email: settings.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: settings.address,
          addressLocality: "Koforidua",
          addressRegion: "Eastern Region",
          addressCountry: "GH",
        },
        url: siteConfig.url,
        sameAs: settings.socials.map((social) => social.url),
        priceRange: "GH₵",
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
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
