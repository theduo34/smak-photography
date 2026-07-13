import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { requireAuth } from "./authz";

const statusValidator = v.union(
  v.literal("new"),
  v.literal("contacted"),
  v.literal("booked"),
  v.literal("closed")
);

export const listAll = query({
  args: {
    status: v.optional(statusValidator),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    if (args.status) {
      return await ctx.db
        .query("enquiries")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .paginate(args.paginationOpts);
    }

    return await ctx.db.query("enquiries").order("desc").paginate(args.paginationOpts);
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("enquiries"),
    status: statusValidator,
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
    return null;
  },
});

export const remove = mutation({
  args: { id: v.id("enquiries") },
  handler: async (ctx, args) => {
    await requireAuth(ctx);
    await ctx.db.delete(args.id);
    return null;
  },
});

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
