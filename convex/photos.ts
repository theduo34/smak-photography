import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAuth } from "./authz";
import { deleteImageStorage, imageUpload, resolveImage } from "./images";

export const MAX_PHOTOS_PER_ALBUM = 12;

export const listByAlbum = query({
  args: { albumId: v.id("albums") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("photos")
      .withIndex("by_album", (q) => q.eq("albumId", args.albumId))
      .order("asc")
      .take(200);
  },
});

export const create = mutation({
  args: {
    albumId: v.id("albums"),
    image: imageUpload,
    caption: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    const album = await ctx.db.get(args.albumId);
    if (!album) throw new Error("Album not found");

    const existing = await ctx.db
      .query("photos")
      .withIndex("by_album", (q) => q.eq("albumId", args.albumId))
      .take(200);

    if (existing.length >= MAX_PHOTOS_PER_ALBUM) {
      throw new Error(`Albums can have at most ${MAX_PHOTOS_PER_ALBUM} photos`);
    }

    const image = await resolveImage(ctx, args.image);
    const id = await ctx.db.insert("photos", {
      albumId: args.albumId,
      image,
      caption: args.caption,
      order: existing.length,
    });

    await ctx.db.patch(args.albumId, { photoCount: existing.length + 1 });
    return id;
  },
});

export const update = mutation({
  args: {
    id: v.id("photos"),
    caption: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
    return null;
  },
});

export const reorder = mutation({
  args: { ids: v.array(v.id("photos")) },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    for (let i = 0; i < args.ids.length; i++) {
      await ctx.db.patch(args.ids[i], { order: i });
    }
    return null;
  },
});

export const remove = mutation({
  args: { id: v.id("photos") },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    const photo = await ctx.db.get(args.id);
    if (!photo) return null;

    await deleteImageStorage(ctx, photo.image);
    await ctx.db.delete(args.id);

    const album = await ctx.db.get(photo.albumId);
    if (album) {
      await ctx.db.patch(photo.albumId, { photoCount: Math.max(0, album.photoCount - 1) });
    }
    return null;
  },
});
