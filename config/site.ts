const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "Smak Photography",
  tagline: "Photography studio in Koforidua, Ghana",
  location: "Koforidua, Ghana",
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
    { platform: "TikTok", url: "https://tiktok.com/@smakphotography" },
    { platform: "Snapchat", url: "https://snapchat.com/add/smakphotography" },
    { platform: "YouTube", url: "https://youtube.com/@smakphotography" },
  ],
};

export const categoryAccents: Record<
  string,
  { eyebrow: string; bar: string; border: string; hoverBorder: string; button: string }
> = {
  Weddings: {
    eyebrow: "text-category-weddings",
    bar: "bg-category-weddings",
    border: "border-category-weddings",
    hoverBorder: "hover:border-category-weddings/50",
    button: "bg-category-weddings text-primary-foreground hover:bg-category-weddings/85",
  },
  Portraits: {
    eyebrow: "text-category-portraits",
    bar: "bg-category-portraits",
    border: "border-category-portraits",
    hoverBorder: "hover:border-category-portraits/50",
    button: "bg-category-portraits text-primary-foreground hover:bg-category-portraits/85",
  },
  Events: {
    eyebrow: "text-category-events",
    bar: "bg-category-events",
    border: "border-category-events",
    hoverBorder: "hover:border-category-events/50",
    button: "bg-category-events text-primary-foreground hover:bg-category-events/85",
  },
  Studio: {
    eyebrow: "text-category-studio",
    bar: "bg-category-studio",
    border: "border-category-studio",
    hoverBorder: "hover:border-category-studio/50",
    button: "bg-category-studio text-primary-foreground hover:bg-category-studio/85",
  },
  Commercial: {
    eyebrow: "text-category-commercial",
    bar: "bg-category-commercial",
    border: "border-category-commercial",
    hoverBorder: "hover:border-category-commercial/50",
    button: "bg-category-commercial text-primary-foreground hover:bg-category-commercial/85",
  },
};
