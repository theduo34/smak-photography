"use client";

import { useState, type FormEvent } from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type EnquiryFormProps = {
  source: "services" | "contact";
  packageId?: Id<"packages">;
  packageName?: string;
  onSuccess?: () => void;
};

export function EnquiryForm({ source, packageId, packageName, onSuccess }: EnquiryFormProps) {
  const createEnquiry = useMutation(api.enquiries.create);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !phone || !message) return;

    setSubmitting(true);
    try {
      await createEnquiry({
        name,
        phone,
        email: email || undefined,
        message,
        packageId,
        packageName,
        source,
      });
      toast.success("Thanks! We'll be in touch shortly.");
      form.reset();
      onSuccess?.();
    } catch {
      toast.error("Something went wrong. Please try again or reach us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {packageName && (
        <p className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
          Enquiring about <span className="font-medium text-foreground">{packageName}</span>
        </p>
      )}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="enquiry-name">Name</Label>
        <Input id="enquiry-name" name="name" placeholder="Your name" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="enquiry-phone">Phone</Label>
        <Input id="enquiry-phone" name="phone" type="tel" placeholder="024 123 4567" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="enquiry-email">Email (optional)</Label>
        <Input id="enquiry-email" name="email" type="email" placeholder="you@example.com" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="enquiry-message">Message</Label>
        <Textarea
          id="enquiry-message"
          name="message"
          placeholder="Tell us about your shoot..."
          required
          rows={4}
        />
      </div>
      <Button type="submit" disabled={submitting} size={"lg"}>
        {submitting ? "Sending..." : "Send enquiry"}
      </Button>
    </form>
  );
}
