import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { WhatsAppButton } from "@/features/enquiry/WhatsAppButton";
import { CallButton } from "@/features/enquiry/CallButton";

type ContactChannelsProps = {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
};

export function ContactChannels({ phone, whatsapp, email, address }: ContactChannelsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-3 rounded-lg border border-border p-6 transition-colors hover:border-primary/50">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MessageCircle className="size-5" strokeWidth={1.5} />
        </div>
        <h3 className="text-base font-medium text-foreground">Chat with us</h3>
        <p className="text-sm text-muted-foreground">
          The fastest way to reach the studio — usually a reply within the hour.
        </p>
        <WhatsAppButton
          phone={whatsapp}
          message="Hi! I'd like to enquire about a photoshoot."
          className="mt-1 self-start"
        />
      </div>
      <div className="flex flex-col gap-3 rounded-lg border border-border p-6 transition-colors hover:border-primary/50">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Phone className="size-5" strokeWidth={1.5} />
        </div>
        <h3 className="text-base font-medium text-foreground">Call the studio</h3>
        <p className="text-sm text-muted-foreground">
          Prefer to talk things through? Give us a call directly.
        </p>
        <CallButton phone={phone} className="mt-1 self-start" />
      </div>
      <div className="flex flex-col gap-3 rounded-lg border border-border p-6 transition-colors hover:border-primary/50">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Mail className="size-5" strokeWidth={1.5} />
        </div>
        <h3 className="text-base font-medium text-foreground">Email</h3>
        <a
          href={`mailto:${email}`}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {email}
        </a>
      </div>
      <div className="flex flex-col gap-3 rounded-lg border border-border p-6 transition-colors hover:border-primary/50">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MapPin className="size-5" strokeWidth={1.5} />
        </div>
        <h3 className="text-base font-medium text-foreground">Studio address</h3>
        <p className="text-sm text-muted-foreground">{address}</p>
      </div>
    </div>
  );
}
