const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "Smak Photography",
  tagline: "Photography studio in Koforidua, Ghana",
  description:
    "Smak Photography is a photography studio in Koforidua, Ghana, offering weddings, portraits, events, and more. Reach us by phone or WhatsApp to book a shoot.",
  url: siteUrl,
  navItems: [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  categories: ["Weddings", "Portraits", "Events", "Studio", "Commercial"],
  socials: [
    { platform: "Instagram", url: "https://instagram.com/smakphotography" },
    { platform: "Facebook", url: "https://facebook.com/smakphotography" },
    { platform: "TikTok", url: "https://tiktok.com/@smakphotography" },
  ],
};
