import { CalendarCheck, Clock, MessageCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Send your details",
    description:
      "Reach out by WhatsApp, phone, or the form with your date, location, and what you have in mind.",
  },
  {
    number: "02",
    icon: Clock,
    title: "We reply fast",
    description:
      "We get back to you within hours with availability, package options, and any questions.",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Lock in your date",
    description:
      "Confirm the details and we'll pencil you in — then start planning the shoot together.",
  },
];

export function ProcessSteps() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {steps.map((step) => (
        <div key={step.number} className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <step.icon className="size-5" strokeWidth={1.5} />
            </div>
            <span className="font-heading text-sm font-semibold text-muted-foreground">
              {step.number}
            </span>
          </div>
          <h3 className="font-heading text-lg font-semibold text-foreground">{step.title}</h3>
          <p className="text-sm text-muted-foreground">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
