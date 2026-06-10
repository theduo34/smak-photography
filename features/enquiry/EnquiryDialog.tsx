"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EnquiryForm } from "@/features/enquiry/EnquiryForm";
import { WhatsAppButton } from "@/features/enquiry/WhatsAppButton";
import { CallButton } from "@/features/enquiry/CallButton";
import { useMediaQuery } from "@/hooks/use-media-query";
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
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const message = packageName
    ? `Hi! I'd like to enquire about the ${packageName} package.`
    : "Hi! I'd like to enquire about a photoshoot.";

  const quickActions = (
    <div className="grid grid-cols-2 gap-2">
      <WhatsAppButton
        phone={whatsapp}
        message={message}
        className="h-auto w-full justify-center py-2 text-center whitespace-normal"
      />
      <CallButton
        phone={phone}
        className="h-auto w-full justify-center py-2 text-center whitespace-normal"
      />
    </div>
  );

  const form = (
    <EnquiryForm
      source={source}
      packageId={packageId}
      packageName={packageName}
      onSuccess={() => onOpenChange(false)}
    />
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send an enquiry</DialogTitle>
            <DialogDescription>
              Tell us a little about what you have in mind, or reach us directly below.
            </DialogDescription>
          </DialogHeader>
          {quickActions}
          {form}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>Send an enquiry</SheetTitle>
          <SheetDescription>
            Tell us a little about what you have in mind, or reach us directly below.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4 pb-4">
          {quickActions}
          {form}
        </div>
      </SheetContent>
    </Sheet>
  );
}
