import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export const image = v.object({
  url: v.string(),
  // Set when the image was uploaded through the admin (vs. a seeded external URL).
  // Lets admin mutations clean up the underlying file when an image is replaced or removed.
  storageId: v.optional(v.id("_storage")),
  width: v.number(),
  height: v.number(),
  blurDataURL: v.string(),
  alt: v.string(),
});

const social = v.object({
  platform: v.string(),
  url: v.string(),
});

export default defineSchema({
  ...authTables,

  // Extends the auth library's default `users` table (name, image, email,
  // etc.) with the admin's own profile fields. See
  // https://labs.convex.dev/auth/setup/schema for the extension pattern.
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),

  siteSettings: defineTable({
    hero: v.object({
      images: v.array(image),
      headline: v.string(),
      subtext: v.string(),
    }),
    aboutSnippet: v.string(),
    aboutFull: v.string(),
    aboutImage: image,
    stats: v.array(v.object({ label: v.string(), value: v.string() })),
    phone: v.string(),
    whatsapp: v.string(),
    email: v.string(),
    address: v.string(),
    hours: v.string(),
    mapsUrl: v.string(),
    socials: v.array(social),
  }),

  albums: defineTable({
    title: v.string(),
    slug: v.string(),
    category: v.string(),
    description: v.string(),
    cover: image,
    photoCount: v.number(),
    shootDate: v.string(),
    published: v.boolean(),
    featured: v.boolean(),
    order: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["published", "order"])
    .index("by_category", ["category", "published", "order"])
    .index("by_featured", ["featured", "order"]),

  photos: defineTable({
    albumId: v.id("albums"),
    image,
    caption: v.optional(v.string()),
    order: v.number(),
  }).index("by_album", ["albumId", "order"]),

  packages: defineTable({
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
    order: v.number(),
  })
    .index("by_active", ["active", "order"])
    .index("by_category", ["category", "active", "order"]),

  enquiries: defineTable({
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    message: v.string(),
    packageId: v.optional(v.id("packages")),
    packageName: v.optional(v.string()),
    source: v.union(v.literal("services"), v.literal("contact")),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("booked"),
      v.literal("closed")
    ),
    // Internal admin follow-up notes, never shown to the enquirer.
    notes: v.optional(v.string()),
  }).index("by_status", ["status"]),
});
