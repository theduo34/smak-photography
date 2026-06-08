import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    message: v.string(),
    packageId: v.optional(v.id("packages")),
    packageName: v.optional(v.string()),
    source: v.union(v.literal("services"), v.literal("contact")),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("enquiries", { ...args, status: "new" });
    return null;
  },
});
