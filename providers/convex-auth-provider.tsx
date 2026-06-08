"use client";

import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import type { ReactNode } from "react";
import { convexClient } from "@/lib/convex";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexAuthNextjsProvider client={convexClient}>{children}</ConvexAuthNextjsProvider>;
}
