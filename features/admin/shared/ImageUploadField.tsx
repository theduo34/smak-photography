"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { ImagePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { uploadImage, type UploadedImage } from "@/lib/upload";

type ImageUploadFieldProps = {
  label: string;
  currentUrl?: string;
  alt: string;
  onUploaded: (upload: UploadedImage) => void;
  aspectClassName?: string;
};

export function ImageUploadField({
  label,
  currentUrl,
  alt,
  onUploaded,
  aspectClassName = "aspect-[4/3]",
}: ImageUploadFieldProps) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(currentUrl);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    try {
      const upload = await uploadImage(file, alt, () => generateUploadUrl({}));
      onUploaded(upload);
    } catch {
      toast.error("Image upload failed. Please try again.");
      setPreview(currentUrl);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={cn(
          "media-placeholder group relative w-full max-w-xs overflow-hidden rounded-md border border-dashed border-border",
          aspectClassName
        )}
      >
        {preview ? (
          <Image src={preview} alt={alt} fill className="object-cover" unoptimized={preview.startsWith("blob:")} />
        ) : (
          <ImagePlus className="size-6" />
        )}
        <div className="image-overlay flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          {uploading ? (
            <Loader2 className="size-5 animate-spin text-primary-foreground" />
          ) : (
            <span className="text-sm font-medium text-primary-foreground">
              {preview ? "Replace image" : "Upload image"}
            </span>
          )}
        </div>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void handleFile(file);
          event.target.value = "";
        }}
      />
    </div>
  );
}

export function ImageUploadButton({
  alt,
  onUploaded,
  children,
  disabled = false,
  maxFiles,
}: {
  alt: string;
  onUploaded: (upload: UploadedImage) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  maxFiles?: number;
}) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    const previewUrl = URL.createObjectURL(file);
    try {
      const upload = await uploadImage(file, alt, () => generateUploadUrl({}));
      onUploaded({ ...upload, previewUrl });
    } catch {
      toast.error("Image upload failed. Please try again.");
      URL.revokeObjectURL(previewUrl);
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        disabled={uploading || disabled}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
        {children ?? "Add photo"}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []).slice(0, maxFiles);
          for (const file of files) void handleFile(file);
          event.target.value = "";
        }}
      />
    </>
  );
}
