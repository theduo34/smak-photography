"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploadField } from "@/features/admin/shared/ImageUploadField";
import type { UploadedImage } from "@/lib/upload";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const fieldClass = "admin-field";

export function AlbumForm({ secret, initial }: { secret: string; initial?: Doc<"albums"> }) {
  const router = useRouter();
  const create = useMutation(api.albums.create);
  const update = useMutation(api.albums.update);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState(initial?.category ?? siteConfig.categories[0]);
  const [published, setPublished] = useState(initial?.published ?? false);
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [cover, setCover] = useState<UploadedImage | null>(null);

  // The admin never edits the slug directly — it's derived from the title
  // for new albums. Existing albums keep their original slug forever (even
  // if the title is later edited) so published URLs never break.
  const previewSlug = slugify(title) || "album";
  const displaySlug = initial ? initial.slug : previewSlug;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const description = String(data.get("description") ?? "").trim();
    const shootDate = String(data.get("shootDate") ?? "").trim();

    if (!title.trim() || !description || !shootDate) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!initial && !cover) {
      toast.error("Please upload a cover image.");
      return;
    }

    setSubmitting(true);
    try {
      if (initial) {
        await update({
          id: initial._id,
          title,
          category,
          description,
          shootDate,
          published,
          featured,
          ...(cover ? { cover } : {}),
        });
        toast.success("Album updated");
      } else {
        await create({
          title,
          slug: previewSlug,
          category,
          description,
          shootDate,
          published,
          featured,
          cover: cover!,
        });
        toast.success("Album created");
      }
      // Both flows land back on the list — there's nothing else to do on
      // this page once the album itself is saved.
      router.push(`/admin/${secret}/albums`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Cover & details</CardTitle>
          <CardDescription>The title, cover photo, and category shown across the site.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <ImageUploadField
            label="Cover image"
            currentUrl={initial?.cover.url}
            alt={title || "Album cover"}
            onUploaded={setCover}
          />

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              className={fieldClass}
            />
            <p className="text-xs text-muted-foreground">/portfolio/{displaySlug}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={(value) => value && setCategory(value)}>
                <SelectTrigger
                  id="category"
                  className={cn("w-full data-[size=default]:h-11", fieldClass)}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {siteConfig.categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="shootDate">Shoot date</Label>
              <Input
                id="shootDate"
                name="shootDate"
                type="date"
                defaultValue={initial?.shootDate}
                required
                className={fieldClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={initial?.description}
              required
              className="admin-textarea"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visibility</CardTitle>
          <CardDescription>Control where this album appears on the public site.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4 rounded-md border border-border p-4">
            <div>
              <Label htmlFor="published">Published</Label>
              <p className="text-sm text-muted-foreground">Visible on the public portfolio.</p>
            </div>
            <Switch id="published" checked={published} onCheckedChange={setPublished} />
          </div>
          <div className="flex items-center justify-between gap-4 rounded-md border border-border p-4">
            <div>
              <Label htmlFor="featured">Featured on homepage</Label>
              <p className="text-sm text-muted-foreground">
                Eligible for the homepage&apos;s featured rotation.
              </p>
            </div>
            <Switch id="featured" checked={featured} onCheckedChange={setFeatured} />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={submitting} className={cn(fieldClass, "px-6")}>
          {submitting && <Loader2 className="size-4 animate-spin" />}
          {initial ? "Save changes" : "Create album"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className={cn(fieldClass, "px-6")}
          onClick={() => router.push(`/admin/${secret}/albums`)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
