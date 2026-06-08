import { v } from "convex/values";
import { query } from "./_generated/server";

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
