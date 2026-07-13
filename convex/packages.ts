import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { requireAuth } from "./authz";

export const listAll = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    // No filter here, so the default index (sorted by _creationTime) is
    // used directly — newest first.
    return await ctx.db.query("packages").order("desc").paginate(args.paginationOpts);
  },
});

export const getById = query({
  args: { id: v.id("packages") },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    price: v.number(),
    currency: v.string(),
    priceType: v.union(v.literal("fixed"), v.literal("from"), v.literal("custom")),
    duration: v.string(),
    description: v.string(),
    features: v.array(v.string()),
    popular: v.boolean(),
    active: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    // A timestamp sorts the same way an insertion counter would (new
    // packages still sort last on the public pricing page), without a
    // full-table scan just to compute the next value.
    return await ctx.db.insert("packages", { ...args, order: Date.now() });
  },
});

export const update = mutation({
  args: {
    id: v.id("packages"),
    name: v.optional(v.string()),
    category: v.optional(v.string()),
    price: v.optional(v.number()),
    currency: v.optional(v.string()),
    priceType: v.optional(v.union(v.literal("fixed"), v.literal("from"), v.literal("custom"))),
    duration: v.optional(v.string()),
    description: v.optional(v.string()),
    features: v.optional(v.array(v.string())),
    popular: v.optional(v.boolean()),
    active: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    const { id, ...rest } = args;
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Package not found");
    await ctx.db.patch(id, rest);
    return null;
  },
});

export const remove = mutation({
  args: { id: v.id("packages") },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    await ctx.db.delete(args.id);
    return null;
  },
});

export const listActive = query({
  args: {
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    if (args.category) {
      return await ctx.db
        .query("packages")
        .withIndex("by_category", (q) =>
          q.eq("category", args.category!).eq("active", true)
        )
        .order("asc")
        .take(limit);
    }

    return await ctx.db
      .query("packages")
      .withIndex("by_active", (q) => q.eq("active", true))
      .order("asc")
      .take(limit);
  },
});
