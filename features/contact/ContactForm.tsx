import { EnquiryForm } from "@/features/enquiry/EnquiryForm";

export function ContactForm() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border p-6">
      <div>
        <h3 className="text-lg font-medium text-foreground">Send a message</h3>
        <p className="text-sm text-muted-foreground">
          Tell us about your shoot and we'll get back to you with availability and pricing.
        </p>
      </div>
      <EnquiryForm source="contact" />
    </div>
  );
}
