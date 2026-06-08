"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EnquiryForm } from "@/features/enquiry/EnquiryForm";
import { WhatsAppButton } from "@/features/enquiry/WhatsAppButton";
import { CallButton } from "@/features/enquiry/CallButton";
import type { Id } from "@/convex/_generated/dataModel";

type EnquiryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source: "services" | "contact";
  packageId?: Id<"packages">;
  packageName?: string;
  phone: string;
  whatsapp: string;
};

export function EnquiryDialog({
  open,
  onOpenChange,
  source,
  packageId,
  packageName,
  phone,
  whatsapp,
}: EnquiryDialogProps) {
  const message = packageName
    ? `Hi! I'd like to enquire about the ${packageName} package.`
    : "Hi! I'd like to enquire about a photoshoot.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send an enquiry</DialogTitle>
          <DialogDescription>
            Tell us a little about what you have in mind, or reach us directly below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
          <WhatsAppButton phone={whatsapp} message={message} />
          <CallButton phone={phone} />
        </div>
        <EnquiryForm
          source={source}
          packageId={packageId}
          packageName={packageName}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
