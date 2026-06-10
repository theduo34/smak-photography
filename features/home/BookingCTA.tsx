"use client";

import { motion } from "motion/react";
import { Camera, Clock, MapPin } from "lucide-react";
import { WhatsAppButton } from "@/features/enquiry/WhatsAppButton";
import { CallButton } from "@/features/enquiry/CallButton";

type BookingCTAProps = {
  whatsapp: string;
  phone: string;
};

export function BookingCTA({ whatsapp, phone }: BookingCTAProps) {
  return (
    <section className="relative overflow-hidden bg-primary">
      <Camera
        aria-hidden
        strokeWidth={0.75}
        className="pointer-events-none absolute -bottom-12 -right-12 size-64 text-primary-foreground/10 sm:size-80 lg:size-96"
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative flex flex-col items-center gap-6 px-6 py-20 text-center text-primary-foreground sm:py-28"
      >
        <h2 className="font-heading max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          Ready to book your shoot?
        </h2>
        <p className="max-w-xl text-base text-primary-foreground/80 sm:text-lg">
          Tell us about your day and we will get back to you within hours.
          WhatsApp is the fastest way to reach us, or call us directly.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <WhatsAppButton
            phone={whatsapp}
            message="Hi! I'd like to book a photoshoot with Smak Photography."
            size="lg"
            className="border border-primary-foreground/30"
          />
          <CallButton phone={phone} size="lg" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-sm text-primary-foreground/70">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" strokeWidth={1.5} />
            Replies within hours
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" strokeWidth={1.5} />
            Koforidua — travel across Ghana
          </span>
        </div>
      </motion.div>
    </section>
  );
}
