"use client";

import { motion } from "motion/react";
import { WhatsAppButton } from "@/features/enquiry/WhatsAppButton";
import { CallButton } from "@/features/enquiry/CallButton";

type BookingCTAProps = {
  whatsapp: string;
  phone: string;
};

export function BookingCTA({ whatsapp, phone }: BookingCTAProps) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="section-shell section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col items-start gap-6 sm:items-center sm:text-center"
        >
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Ready to book your shoot?
          </h2>
          <p className="max-w-xl text-base text-primary-foreground/80 sm:text-lg">
            Tell us about your day and we will get back to you within hours.
            WhatsApp is the fastest way to reach us, or call us directly.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:justify-center">
            <WhatsAppButton
              phone={whatsapp}
              message="Hi! I'd like to book a photoshoot with Smak Photography."
              size="lg"
            />
            <CallButton phone={phone} size="lg" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
