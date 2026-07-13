"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { Loader2, Plus, X } from "lucide-react";
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

type PackageFormProps = {
  secret: string;
  initial?: Doc<"packages">;
};

const fieldClass = "admin-field";

export function PackageForm({ secret, initial }: PackageFormProps) {
  const router = useRouter();
  const create = useMutation(api.packages.create);
  const update = useMutation(api.packages.update);
  const [submitting, setSubmitting] = useState(false);
  const [priceType, setPriceType] = useState(initial?.priceType ?? "fixed");
  const [category, setCategory] = useState(initial?.category ?? siteConfig.categories[0]);
  const [popular, setPopular] = useState(initial?.popular ?? false);
  const [active, setActive] = useState(initial?.active ?? true);
  const [features, setFeatures] = useState<string[]>(initial?.features ?? [""]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const duration = String(data.get("duration") ?? "").trim();
    const description = String(data.get("description") ?? "").trim();
    const price = Number(data.get("price") ?? 0);
    const currency = String(data.get("currency") ?? "GHS").trim();
    const cleanFeatures = features.map((f) => f.trim()).filter(Boolean);

    if (!name || !duration || !description || cleanFeatures.length === 0) {
      toast.error("Please fill in all fields and add at least one feature.");
      return;
    }

    setSubmitting(true);
    try {
      if (initial) {
        await update({
          id: initial._id,
          name,
          category,
          price,
          currency,
          priceType,
          duration,
          description,
          features: cleanFeatures,
          popular,
          active,
        });
        toast.success("Package updated");
      } else {
        await create({
          name,
          category,
          price,
          currency,
          priceType,
          duration,
          description,
          features: cleanFeatures,
          popular,
          active,
        });
        toast.success("Package created");
      }
      router.push(`/admin/${secret}/packages`);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Package details</CardTitle>
          <CardDescription>The name, category, and pricing shown on the pricing page.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={initial?.name} required className={fieldClass} />
            </div>
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
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="priceType">Price type</Label>
              <Select value={priceType} onValueChange={(v) => setPriceType(v as typeof priceType)}>
                <SelectTrigger
                  id="priceType"
                  className={cn("w-full data-[size=default]:h-11", fieldClass)}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed</SelectItem>
                  <SelectItem value="from">Starting from</SelectItem>
                  <SelectItem value="custom">Custom quote</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min={0}
                step="0.01"
                defaultValue={initial?.price ?? 0}
                disabled={priceType === "custom"}
                required
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                name="currency"
                defaultValue={initial?.currency ?? "GHS"}
                required
                className={fieldClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              name="duration"
              placeholder="e.g. Up to 6 hours"
              defaultValue={initial?.duration}
              required
              className={fieldClass}
            />
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
          <CardTitle>Features</CardTitle>
          <CardDescription>The bullet points shown on the package card.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={feature}
                placeholder="e.g. 2 photographers"
                onChange={(event) =>
                  setFeatures((prev) => prev.map((f, i) => (i === index ? event.target.value : f)))
                }
                className={fieldClass}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-11 shrink-0"
                onClick={() => setFeatures((prev) => prev.filter((_, i) => i !== index))}
                disabled={features.length === 1}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="self-start"
            onClick={() => setFeatures((prev) => [...prev, ""])}
          >
            <Plus className="size-4" />
            Add feature
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visibility</CardTitle>
          <CardDescription>Control how this package appears on the pricing page.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4 rounded-md border border-border p-4">
            <div>
              <Label htmlFor="popular">Mark as popular</Label>
              <p className="text-sm text-muted-foreground">Highlights this package with a &quot;Popular&quot; badge.</p>
            </div>
            <Switch id="popular" checked={popular} onCheckedChange={setPopular} />
          </div>
          <div className="flex items-center justify-between gap-4 rounded-md border border-border p-4">
            <div>
              <Label htmlFor="active">Active</Label>
              <p className="text-sm text-muted-foreground">Visible on the public pricing page.</p>
            </div>
            <Switch id="active" checked={active} onCheckedChange={setActive} />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={submitting} className={cn(fieldClass, "px-6")}>
          {submitting && <Loader2 className="size-4 animate-spin" />}
          {initial ? "Save changes" : "Create package"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className={cn(fieldClass, "px-6")}
          onClick={() => router.push(`/admin/${secret}/packages`)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
