import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { requireAuth } from "./authz";
import { deleteImageStorage, imageUpload, resolveImage } from "./images";

// The `order` field is assigned as an ever-increasing insertion counter (see
// `create` below), so a descending sort on it is equivalent to "newest
// first" without needing a second index keyed on _creationTime.
export const listFeatured = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    // Bounded, but deliberately not capped to the homepage's display count —
    // the caller picks a random subset from this pool.
    return await ctx.db
      .query("albums")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .order("desc")
      .take(args.limit ?? 24);
  },
});

export const listPublished = query({
  args: {
    category: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    if (args.category) {
      return await ctx.db
        .query("albums")
        .withIndex("by_category", (q) =>
          q.eq("category", args.category!).eq("published", true)
        )
        .order("desc")
        .paginate(args.paginationOpts);
    }

    return await ctx.db
      .query("albums")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("desc")
      .paginate(args.paginationOpts);
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

export const listAll = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    // No filter here, so the default index (sorted by _creationTime) is
    // used directly — newest first.
    return await ctx.db.query("albums").order("desc").paginate(args.paginationOpts);
  },
});

export const getById = query({
  args: { id: v.id("albums") },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    category: v.string(),
    description: v.string(),
    cover: imageUpload,
    shootDate: v.string(),
    published: v.boolean(),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    // The admin never types a slug directly (it's derived from the title),
    // so collisions — two albums with the same or similar title — are
    // expected and resolved automatically here rather than as a form error.
    let slug = args.slug;
    let suffix = 2;
    while (
      await ctx.db
        .query("albums")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .unique()
    ) {
      slug = `${args.slug}-${suffix}`;
      suffix += 1;
    }

    const cover = await resolveImage(ctx, args.cover);

    return await ctx.db.insert("albums", {
      title: args.title,
      slug,
      category: args.category,
      description: args.description,
      cover,
      photoCount: 0,
      shootDate: args.shootDate,
      published: args.published,
      featured: args.featured,
      // A timestamp sorts the same way an insertion counter would, without
      // needing a full-table scan just to compute the next value.
      order: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("albums"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
    cover: v.optional(imageUpload),
    shootDate: v.optional(v.string()),
    published: v.optional(v.boolean()),
    featured: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    const { id, cover, ...rest } = args;

    const album = await ctx.db.get(id);
    if (!album) throw new Error("Album not found");

    if (rest.slug && rest.slug !== album.slug) {
      const existing = await ctx.db
        .query("albums")
        .withIndex("by_slug", (q) => q.eq("slug", rest.slug!))
        .unique();
      if (existing) throw new Error("An album with this slug already exists");
    }

    const patch: Record<string, unknown> = { ...rest };
    if (cover) {
      await deleteImageStorage(ctx, album.cover);
      patch.cover = await resolveImage(ctx, cover);
    }

    await ctx.db.patch(id, patch);
    return null;
  },
});

export const remove = mutation({
  args: { id: v.id("albums") },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    const album = await ctx.db.get(args.id);
    if (!album) return null;

    const photos = await ctx.db
      .query("photos")
      .withIndex("by_album", (q) => q.eq("albumId", args.id))
      .take(200);
    for (const photo of photos) {
      await deleteImageStorage(ctx, photo.image);
      await ctx.db.delete(photo._id);
    }

    await deleteImageStorage(ctx, album.cover);
    await ctx.db.delete(args.id);
    return null;
  },
});
