"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { motion } from "motion/react";
import { Aperture, Camera, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { siteConfig } from "@/config/site";

export function LoginForm({ secret }: { secret: string }) {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    if (!email || !password) return;

    setSubmitting(true);
    try {
      await signIn("password", { email, password, flow: "signIn" });
      router.replace(`/admin/${secret}`);
    } catch {
      toast.error("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-svh w-full">
      <ThemeToggle className="absolute top-4 right-4 z-20" />

      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">
        <div aria-hidden className="dot-grid absolute inset-0 opacity-20" />
        <Camera
          aria-hidden
          strokeWidth={0.75}
          className="pointer-events-none absolute -right-16 -bottom-16 size-96 text-primary-foreground/10"
        />

        <Link href="/" className="relative z-10 flex items-center gap-2">
          <Logo imageClassName="size-10 invert dark:invert-0" textClassName="text-primary-foreground" />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative z-10 flex max-w-md flex-col gap-4"
        >
          <Aperture className="size-10 text-primary-foreground/60" strokeWidth={1} />
          <p className="font-heading text-3xl leading-snug text-balance">
            Capturing Koforidua&apos;s stories, one frame at a time.
          </p>
          <p className="text-sm text-primary-foreground/70">Studio admin dashboard</p>
        </motion.div>

        <p className="relative z-10 text-xs text-primary-foreground/60">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-8 px-4 py-16 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex w-full max-w-sm flex-col gap-8"
        >
          <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
            <Logo showText={false} imageClassName="size-12 lg:hidden" />
            <div className="flex flex-col gap-1.5">
              <h1 className="font-heading text-2xl font-semibold text-foreground">Welcome back</h1>
              <p className="text-sm text-muted-foreground">Sign in to manage Smak Photography</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@smakphotography.com"
                  required
                  className="h-12 rounded-md pl-10 text-base"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  className="h-12 rounded-md pr-10 pl-10 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute top-1/2 right-3.5 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="mt-2 h-12 w-full rounded-md text-base"
            >
              {submitting && <Loader2 className="size-4 animate-spin" />}
              Sign in
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground lg:text-left">
            Restricted access. Contact the studio owner if you need an account.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
