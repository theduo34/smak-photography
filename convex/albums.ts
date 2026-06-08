import { v } from "convex/values";
import { query } from "./_generated/server";

export const listFeatured = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("albums")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .order("asc")
      .take(args.limit ?? 6);
  },
});

export const listPublished = query({
  args: {
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    if (args.category) {
      return await ctx.db
        .query("albums")
        .withIndex("by_category", (q) =>
          q.eq("category", args.category!).eq("published", true)
        )
        .order("asc")
        .take(limit);
    }

    return await ctx.db
      .query("albums")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("asc")
      .take(limit);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("albums")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const listPublishedSlugs = query({
  args: {},
  handler: async (ctx) => {
    const albums = await ctx.db
      .query("albums")
      .withIndex("by_published", (q) => q.eq("published", true))
      .take(200);
    return albums.map((album) => album.slug);
  },
});
