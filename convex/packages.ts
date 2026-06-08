import { v } from "convex/values";
import { query } from "./_generated/server";

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
