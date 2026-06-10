import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn, telLink } from "@/lib/utils";

type CallButtonProps = {
  phone: string;
  className?: string;
  size?: "default" | "lg";
};

export function CallButton({ phone, className, size = "default" }: CallButtonProps) {
  return (
    <a
      href={telLink(phone)}
      className={cn(
        buttonVariants({ variant: "outline", size }),
        "border-whatsapp/40 hover:border-whatsapp hover:bg-whatsapp/10 dark:border-whatsapp/40 dark:hover:border-whatsapp dark:hover:bg-whatsapp/10",
        className
      )}
    >
      <Phone data-icon="inline-start" className="text-whatsapp" />
      Call {phone}
    </a>
  );
}
