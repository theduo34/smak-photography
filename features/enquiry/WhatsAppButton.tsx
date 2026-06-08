import { MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const href = `https://wa.me/${phone.replace(/[^0-9]/g, "")}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant: "default", size }), className)}
    >
      <MessageCircle data-icon="inline-start" />
      Chat on WhatsApp
    </a>
  );
}
