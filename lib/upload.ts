import type { Id } from "@/convex/_generated/dataModel";

export type UploadedImage = {
  storageId: Id<"_storage">;
  width: number;
  height: number;
  blurDataURL: string;
  alt: string;
  // Local object URL for instant preview before the parent form is saved.
  previewUrl?: string;
};

function readImageMeta(file: File): Promise<{ width: number; height: number; blurDataURL: string }> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = Math.max(1, Math.round((height / width) * 16));
      const context = canvas.getContext("2d");
      context?.drawImage(img, 0, 0, canvas.width, canvas.height);
      const blurDataURL = canvas.toDataURL("image/jpeg", 0.4);
      URL.revokeObjectURL(objectUrl);
      resolve({ width, height, blurDataURL });
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not read image"));
    };
    img.src = objectUrl;
  });
}

export async function uploadImage(
  file: File,
  alt: string,
  generateUploadUrl: () => Promise<string>
): Promise<UploadedImage> {
  const [meta, uploadUrl] = await Promise.all([readImageMeta(file), generateUploadUrl()]);

  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!response.ok) {
    throw new Error("Image upload failed");
  }
  const { storageId } = (await response.json()) as { storageId: Id<"_storage"> };

  return { storageId, ...meta, alt };
}

// Strips the client-only preview field before sending an upload to a Convex mutation.
export function toImageUpload({ previewUrl, ...rest }: UploadedImage) {
  void previewUrl;
  return rest;
}
