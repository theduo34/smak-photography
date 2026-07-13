import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

// Unlike other admin queries, this deliberately does not throw when signed
// out — it only ever returns the caller's own profile (no data disclosure
// risk), and it's rendered from the sidebar on every admin page, so a throw
// here would take down the whole panel on any transient auth race.
export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;

    const user = await ctx.db.get(userId);
    if (user === null) return null;

    // Return only the fields the UI needs — never spread the raw user doc,
    // which also carries auth bookkeeping (verification timestamps, etc).
    return {
      firstName: user.firstName ?? null,
      lastName: user.lastName ?? null,
      email: user.email ?? null,
    };
  },
});
