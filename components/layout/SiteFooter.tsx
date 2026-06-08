import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/components/shared/SocialLinks";

type SiteFooterProps = {
  phone?: string;
  whatsapp?: string;
  address?: string;
};

export function SiteFooter({ phone, whatsapp, address }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="section-shell grid gap-10 py-16 sm:py-20 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo/logo-1-removebg-preview.png"
              alt={siteConfig.name}
              width={36}
              height={36}
              className="size-9 object-contain dark:invert"
            />
            <span className="font-heading text-base font-semibold tracking-tight text-foreground">
              {siteConfig.name}
            </span>
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">{siteConfig.tagline}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-foreground">Explore</h3>
          <nav className="flex flex-col gap-2">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-foreground">Get in touch</h3>
          <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
            {phone && <li>{phone}</li>}
            {whatsapp && <li>WhatsApp: {whatsapp}</li>}
            {address && <li>{address}</li>}
          </ul>
          <SocialLinks socials={siteConfig.socials} className="mt-1" />
        </div>
      </div>

      <div className="border-t border-border">
        <div className="section-shell flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Koforidua, Ghana</p>
        </div>
      </div>
    </footer>
  );
}
