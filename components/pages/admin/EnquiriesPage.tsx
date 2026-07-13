import { Card, CardContent } from "@/components/ui/card";
import { EnquiriesTable } from "@/features/admin/enquiries/EnquiriesTable";

export function EnquiriesPage() {
  return (
    <div className="flex flex-col gap-6">
      <p className="admin-subheading">Track and follow up on enquiries from the site.</p>
      <Card>
        <CardContent>
          <EnquiriesTable />
        </CardContent>
      </Card>
    </div>
  );
}
