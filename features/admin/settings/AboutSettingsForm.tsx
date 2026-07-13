"use client";

import { useState, type FormEvent } from "react";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/features/admin/shared/ImageUploadField";
import type { UploadedImage } from "@/lib/upload";

export function AboutSettingsForm({ settings }: { settings: Doc<"siteSettings"> }) {
  const update = useMutation(api.siteSettings.update);
  const [submitting, setSubmitting] = useState(false);
  const [aboutImage, setAboutImage] = useState<UploadedImage | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const aboutSnippet = String(data.get("aboutSnippet") ?? "").trim();
    const aboutFull = String(data.get("aboutFull") ?? "").trim();

    if (!aboutSnippet || !aboutFull) {
      toast.error("Please fill in both fields.");
      return;
    }

    setSubmitting(true);
    try {
      await update({
        aboutSnippet,
        aboutFull,
        ...(aboutImage
          ? { aboutImage: { storageId: aboutImage.storageId, width: aboutImage.width, height: aboutImage.height, blurDataURL: aboutImage.blurDataURL, alt: aboutImage.alt } }
          : {}),
      });
      toast.success("About section updated");
    } catch {
      toast.error("Could not update about section");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
      <ImageUploadField
        label="About image"
        currentUrl={settings.aboutImage.url}
        alt="About Smak Photography"
        onUploaded={setAboutImage}
      />
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="aboutSnippet">Short snippet</Label>
        <Textarea
          id="aboutSnippet"
          name="aboutSnippet"
          rows={2}
          defaultValue={settings.aboutSnippet}
          required
          className="admin-textarea"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="aboutFull">Full story</Label>
        <Textarea
          id="aboutFull"
          name="aboutFull"
          rows={8}
          defaultValue={settings.aboutFull}
          required
          className="admin-textarea"
        />
      </div>
      <Button type="submit" disabled={submitting} className="admin-field self-start px-6">
        {submitting && <Loader2 className="size-4 animate-spin" />}
        Save about section
      </Button>
    </form>
  );
}
