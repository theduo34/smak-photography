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
      <div className={"relative bg-background"}>
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
        <div className="dot-grid absolute inset-0 opacity-60" />
      </div>
    <footer className="relative section-shell overflow-hidden pt-4 sm:pt-8">

      <div className="relative z-10 overflow-hidden rounded-3xl border border-border bg-card">

        <div className="relative grid gap-10 px-6 py-16 sm:px-10 md:grid-cols-[1.5fr_1fr_1fr]">
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
            <SocialLinks socials={siteConfig.socials} className="mt-1" />
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
          </div>
        </div>

        <div className="relative border-t border-border px-6 sm:px-10">
          <div className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
            <p>
              &copy; {year} {siteConfig.name}. All rights reserved.
            </p>
            <p>Koforidua, Ghana</p>
          </div>
        </div>

      </div>

      <p
        aria-hidden
        className="mt-2 h-[0.5em] overflow-hidden text-center font-heading text-[min(28vw,9rem)] leading-none font-semibold tracking-normal text-foreground/10 select-none sm:mt-4 sm:text-[min(7vw,6.5rem)] sm:tracking-widest"
      >
        <span className="sm:hidden">SMAK</span>
        <span className="hidden sm:inline">SMAK PHOTOGRAPHY</span>
      </p>
    </footer>
      </div>
  );
}
