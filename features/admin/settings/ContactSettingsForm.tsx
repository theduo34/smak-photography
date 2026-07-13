"use client";

import { useState, type FormEvent } from "react";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactSettingsForm({ settings }: { settings: Doc<"siteSettings"> }) {
  const update = useMutation(api.siteSettings.update);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields = {
      phone: String(data.get("phone") ?? "").trim(),
      whatsapp: String(data.get("whatsapp") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      address: String(data.get("address") ?? "").trim(),
      hours: String(data.get("hours") ?? "").trim(),
      mapsUrl: String(data.get("mapsUrl") ?? "").trim(),
    };

    if (Object.values(fields).some((value) => !value)) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      await update(fields);
      toast.success("Contact details updated");
    } catch {
      toast.error("Could not update contact details");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" defaultValue={settings.phone} required className="admin-field" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input
            id="whatsapp"
            name="whatsapp"
            defaultValue={settings.whatsapp}
            required
            className="admin-field"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={settings.email}
          required
          className="admin-field"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" defaultValue={settings.address} required className="admin-field" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="hours">Hours</Label>
        <Textarea
          id="hours"
          name="hours"
          rows={2}
          defaultValue={settings.hours}
          required
          className="admin-textarea"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="mapsUrl">Google Maps embed URL</Label>
        <Input id="mapsUrl" name="mapsUrl" defaultValue={settings.mapsUrl} required className="admin-field" />
      </div>
      <Button type="submit" disabled={submitting} className="admin-field self-start px-6">
        {submitting && <Loader2 className="size-4 animate-spin" />}
        Save contact details
      </Button>
    </form>
  );
}
