import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CallButtonProps = {
  phone: string;
  className?: string;
  size?: "default" | "lg";
};

export function CallButton({ phone, className, size = "default" }: CallButtonProps) {
  return (
    <a
      href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
      className={cn(buttonVariants({ variant: "outline", size }), className)}
    >
      <Phone data-icon="inline-start" />
      Call {phone}
    </a>
  );
}
