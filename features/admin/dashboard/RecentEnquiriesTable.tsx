import Link from "next/link";
import { Inbox } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { EmptyState } from "@/components/shared/EmptyState";
import type { Doc } from "@/convex/_generated/dataModel";
import { cn, initials, timeAgo } from "@/lib/utils";

const STATUS_CLASSES: Record<Doc<"enquiries">["status"], string> = {
  new: "bg-primary/10 text-primary",
  contacted: "bg-phone/10 text-phone",
  booked: "bg-whatsapp/10 text-whatsapp",
  closed: "bg-muted text-muted-foreground",
};

export function RecentEnquiriesTable({
  enquiries,
  secret,
}: {
  enquiries: Doc<"enquiries">[];
  secret: string;
}) {
  if (enquiries.length === 0) {
    return <EmptyState icon={Inbox} title="No enquiries yet" description="New enquiries will show up here." />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden sm:table-cell">Source</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">When</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {enquiries.map((enquiry) => (
          <TableRow key={enquiry._id}>
            <TableCell>
              <Link
                href={`/admin/${secret}/enquiries`}
                className="group flex items-center gap-3"
              >
                <Avatar size="sm" className="lg:size-9">
                  <AvatarFallback className="font-medium">
                    {initials(enquiry.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate font-medium text-foreground group-hover:underline">
                    {enquiry.name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground lg:text-sm">
                    {enquiry.phone}
                  </span>
                </div>
              </Link>
            </TableCell>
            <TableCell className="hidden text-muted-foreground capitalize sm:table-cell">
              {enquiry.source}
            </TableCell>
            <TableCell>
              <Badge className={cn("capitalize", STATUS_CLASSES[enquiry.status])}>
                {enquiry.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right text-xs text-muted-foreground lg:text-sm">
              {timeAgo(enquiry._creationTime)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
