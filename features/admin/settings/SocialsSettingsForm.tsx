"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { Loader2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Social = Doc<"siteSettings">["socials"][number];

export function SocialsSettingsForm({ settings }: { settings: Doc<"siteSettings"> }) {
  const update = useMutation(api.siteSettings.update);
  const [socials, setSocials] = useState<Social[]>(settings.socials);
  const [submitting, setSubmitting] = useState(false);

  async function handleSave() {
    const clean = socials.filter((s) => s.platform.trim() && s.url.trim());
    setSubmitting(true);
    try {
      await update({ socials: clean });
      toast.success("Social links updated");
    } catch {
      toast.error("Could not update social links");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex max-w-2xl flex-col gap-4">
      {socials.map((social, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={social.platform}
            placeholder="Platform"
            className="admin-field w-40"
            onChange={(event) =>
              setSocials((prev) =>
                prev.map((s, i) => (i === index ? { ...s, platform: event.target.value } : s))
              )
            }
          />
          <Input
            value={social.url}
            placeholder="https://..."
            className="admin-field"
            onChange={(event) =>
              setSocials((prev) => prev.map((s, i) => (i === index ? { ...s, url: event.target.value } : s)))
            }
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-11 shrink-0"
            onClick={() => setSocials((prev) => prev.filter((_, i) => i !== index))}
          >
            <X className="size-4" />
          </Button>
        </div>
      ))}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setSocials((prev) => [...prev, { platform: "", url: "" }])}
        >
          <Plus className="size-4" />
          Add social link
        </Button>
        <Label className="sr-only">Social links</Label>
      </div>
      <Button
        type="button"
        disabled={submitting}
        className="admin-field self-start px-6"
        onClick={handleSave}
      >
        {submitting && <Loader2 className="size-4 animate-spin" />}
        Save social links
      </Button>
    </div>
  );
}
