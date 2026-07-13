"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { Loader2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Stat = Doc<"siteSettings">["stats"][number];

export function StatsSettingsForm({ settings }: { settings: Doc<"siteSettings"> }) {
  const update = useMutation(api.siteSettings.update);
  const [stats, setStats] = useState<Stat[]>(settings.stats);
  const [submitting, setSubmitting] = useState(false);

  async function handleSave() {
    const clean = stats.filter((s) => s.label.trim() && s.value.trim());
    setSubmitting(true);
    try {
      await update({ stats: clean });
      toast.success("Stats updated");
    } catch {
      toast.error("Could not update stats");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex max-w-2xl flex-col gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={stat.value}
            placeholder="500+"
            className="admin-field w-32"
            onChange={(event) =>
              setStats((prev) => prev.map((s, i) => (i === index ? { ...s, value: event.target.value } : s)))
            }
          />
          <Input
            value={stat.label}
            placeholder="Happy clients"
            className="admin-field"
            onChange={(event) =>
              setStats((prev) => prev.map((s, i) => (i === index ? { ...s, label: event.target.value } : s)))
            }
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-11 shrink-0"
            onClick={() => setStats((prev) => prev.filter((_, i) => i !== index))}
          >
            <X className="size-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="self-start"
        onClick={() => setStats((prev) => [...prev, { label: "", value: "" }])}
      >
        <Plus className="size-4" />
        Add stat
      </Button>
      <Button
        type="button"
        disabled={submitting}
        className="admin-field self-start px-6"
        onClick={handleSave}
      >
        {submitting && <Loader2 className="size-4 animate-spin" />}
        Save stats
      </Button>
    </div>
  );
}
