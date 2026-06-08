import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Smak Photography by phone, WhatsApp, or the contact form to book your shoot in Koforidua, Ghana.",
  alternates: { canonical: "/contact" },
};

export default async function Page() {
  const settings = await fetchQuery(api.siteSettings.get, {});

  return <ContactPage settings={settings} />;
}
