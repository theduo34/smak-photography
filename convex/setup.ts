import { v } from "convex/values";
import { createAccount } from "@convex-dev/auth/server";
import { internalAction } from "./_generated/server";

// One-time bootstrap for an admin login. Not exposed as a public function —
// run from the Convex dashboard's Functions tab (or the CLI), never from the
// client, since the admin panel has no self-serve signup:
//   npx convex run setup:createInitialAdmin '{"email":"you@example.com","password":"...","firstName":"...","lastName":"..."}'
// The admin login page only supports signing in.
export const createInitialAdmin = internalAction({
  args: {
    email: v.string(),
    password: v.string(),
    firstName: v.string(),
    lastName: v.string(),
  },
  handler: async (ctx, args) => {
    await createAccount(ctx, {
      provider: "password",
      account: { id: args.email, secret: args.password },
      profile: {
        email: args.email,
        name: `${args.firstName} ${args.lastName}`,
        firstName: args.firstName,
        lastName: args.lastName,
      },
    });
    return null;
  },
});
