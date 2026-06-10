import { MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn, waLink } from "@/lib/utils";

type WhatsAppButtonProps = {
  phone: string;
  message?: string;
  className?: string;
  size?: "default" | "lg";
};

export function WhatsAppButton({
  phone,
  message,
  className,
  size = "default",
}: WhatsAppButtonProps) {
  const href = waLink(phone, message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({ variant: "default", size }),
        "bg-whatsapp text-primary-foreground hover:bg-whatsapp/85",
        className
      )}
    >
      <MessageCircle data-icon="inline-start" />
      Chat on WhatsApp
    </a>
  );
}
