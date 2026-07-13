import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminSecretLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ secret: string }>;
}) {
  const { secret } = await params;
  if (!process.env.ADMIN_PATH_SECRET || secret !== process.env.ADMIN_PATH_SECRET) {
    notFound();
  }

  return children;
}
