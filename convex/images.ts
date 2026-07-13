import { v } from "convex/values";
import type { Infer } from "convex/values";
import type { MutationCtx } from "./_generated/server";
import { image } from "./schema";

// What the client sends after uploading a file via files.generateUploadUrl.
export const imageUpload = v.object({
  storageId: v.id("_storage"),
  width: v.number(),
  height: v.number(),
  blurDataURL: v.string(),
  alt: v.string(),
});

type ImageUpload = Infer<typeof imageUpload>;
type Image = Infer<typeof image>;

export async function resolveImage(ctx: MutationCtx, input: ImageUpload): Promise<Image> {
  const url = await ctx.storage.getUrl(input.storageId);
  if (url === null) {
    throw new Error("Uploaded file not found");
  }
  return {
    url,
    storageId: input.storageId,
    width: input.width,
    height: input.height,
    blurDataURL: input.blurDataURL,
    alt: input.alt,
  };
}

export async function deleteImageStorage(ctx: MutationCtx, current: Image | undefined) {
  if (current?.storageId) {
    await ctx.storage.delete(current.storageId);
  }
}
