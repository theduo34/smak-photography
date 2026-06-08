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
      className={cn(buttonVariants({ variant: "outline", size }), className)}
    >
      <Phone data-icon="inline-start" />
      Call {phone}
    </a>
  );
}
