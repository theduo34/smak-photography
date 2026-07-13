import { query } from "./_generated/server";
import { requireAuth } from "./authz";

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    await requireAuth(ctx);

    const enquiries = await ctx.db.query("enquiries").order("desc").take(500);
    const albums = await ctx.db.query("albums").take(500);
    const packages = await ctx.db.query("packages").take(500);

    const statusCounts = { new: 0, contacted: 0, booked: 0, closed: 0 };
    for (const enquiry of enquiries) {
      statusCounts[enquiry.status] += 1;
    }

    return {
      totalEnquiries: enquiries.length,
      statusCounts,
      totalAlbums: albums.length,
      publishedAlbums: albums.filter((album) => album.published).length,
      totalPackages: packages.length,
      activePackages: packages.filter((pkg) => pkg.active).length,
      recentEnquiries: enquiries.slice(0, 6),
    };
  },
});
