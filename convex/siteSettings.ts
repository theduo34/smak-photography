import { v } from "convex/values";
import type { Infer } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import { requireAuth } from "./authz";
import { deleteImageStorage, imageUpload, resolveImage } from "./images";
import { image } from "./schema";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("siteSettings").first();
  },
});

const heroImageInput = v.union(image, imageUpload);

async function resolveHeroImage(ctx: MutationCtx, item: Infer<typeof heroImageInput>) {
  if ("url" in item) return item;
  return await resolveImage(ctx, item);
}

export const update = mutation({
  args: {
    hero: v.optional(
      v.object({
        images: v.array(heroImageInput),
        headline: v.string(),
        subtext: v.string(),
      })
    ),
    aboutSnippet: v.optional(v.string()),
    aboutFull: v.optional(v.string()),
    aboutImage: v.optional(imageUpload),
    stats: v.optional(v.array(v.object({ label: v.string(), value: v.string() }))),
    phone: v.optional(v.string()),
    whatsapp: v.optional(v.string()),
    email: v.optional(v.string()),
    address: v.optional(v.string()),
    hours: v.optional(v.string()),
    mapsUrl: v.optional(v.string()),
    socials: v.optional(v.array(v.object({ platform: v.string(), url: v.string() }))),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    const { hero, aboutImage, ...rest } = args;
    const existing = await ctx.db.query("siteSettings").first();
    if (!existing) throw new Error("Site settings have not been seeded yet");

    const patch: Record<string, unknown> = { ...rest };

    if (hero) {
      const images = await Promise.all(
        hero.images.map((item) => resolveHeroImage(ctx, item))
      );
      const keptStorageIds = new Set(images.map((img) => img.storageId).filter(Boolean));
      for (const old of existing.hero.images) {
        if (old.storageId && !keptStorageIds.has(old.storageId)) {
          await deleteImageStorage(ctx, old);
        }
      }
      patch.hero = { headline: hero.headline, subtext: hero.subtext, images };
    }

    if (aboutImage) {
      await deleteImageStorage(ctx, existing.aboutImage);
      patch.aboutImage = await resolveImage(ctx, aboutImage);
    }

    await ctx.db.patch(existing._id, patch);
    return null;
  },
});
