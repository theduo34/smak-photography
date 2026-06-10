import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  imageClassName?: string;
  textClassName?: string;
  showText?: boolean;
};

export function Logo({ imageClassName, textClassName, showText = true }: LogoProps) {
  return (
    <>
      <Image
        src="/images/logo/logo-1-removebg-preview.png"
        alt={siteConfig.name}
        width={96}
        height={96}
        priority
        className={cn("size-12 object-contain dark:invert", imageClassName)}
      />
      {showText && (
        <span
          className={cn(
            "font-heading text-base font-semibold tracking-tight text-foreground",
            textClassName
          )}
        >
          {siteConfig.name}
        </span>
      )}
    </>
  );
}
