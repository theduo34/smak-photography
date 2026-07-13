"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadButton } from "@/features/admin/shared/ImageUploadField";
import type { UploadedImage } from "@/lib/upload";

type HeroImage = Doc<"siteSettings">["hero"]["images"][number] | UploadedImage;

function heroImageSrc(image: HeroImage): string {
  if ("url" in image) return image.url;
  return image.previewUrl ?? "";
}

function stripPreview(image: HeroImage) {
  if ("previewUrl" in image) {
    const { previewUrl, ...rest } = image;
    void previewUrl;
    return rest;
  }
  return image;
}

export function HeroSettingsForm({ settings }: { settings: Doc<"siteSettings"> }) {
  const update = useMutation(api.siteSettings.update);
  const [images, setImages] = useState<HeroImage[]>(settings.hero.images);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const headline = String(data.get("headline") ?? "").trim();
    const subtext = String(data.get("subtext") ?? "").trim();

    if (!headline || !subtext || images.length === 0) {
      toast.error("Add a headline, subtext, and at least one hero image.");
      return;
    }

    setSubmitting(true);
    try {
      const cleanImages = images.map(stripPreview);
      await update({ hero: { headline, subtext, images: cleanImages } });
      toast.success("Hero section updated");
    } catch {
      toast.error("Could not update hero section");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="headline">Headline</Label>
        <Textarea
          id="headline"
          name="headline"
          rows={2}
          defaultValue={settings.hero.headline}
          required
          className="admin-textarea"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="subtext">Subtext</Label>
        <Textarea
          id="subtext"
          name="subtext"
          rows={3}
          defaultValue={settings.hero.subtext}
          required
          className="admin-textarea"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Hero images</Label>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((image, index) => (
            <div key={index} className="group relative aspect-square overflow-hidden rounded-md bg-muted">
              <Image
                src={heroImageSrc(image)}
                alt={image.alt}
                fill
                className="object-cover"
                unoptimized={!("url" in image)}
              />
              <button
                type="button"
                className="image-overlay flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
              >
                <X className="size-5 text-primary-foreground" />
              </button>
            </div>
          ))}
        </div>
        <ImageUploadButton
          alt="Hero image"
          onUploaded={(upload) => setImages((prev) => [...prev, upload])}
        >
          Add hero image
        </ImageUploadButton>
      </div>

      <Button type="submit" disabled={submitting} className="admin-field self-start px-6">
        {submitting && <Loader2 className="size-4 animate-spin" />}
        Save hero section
      </Button>
    </form>
  );
}
