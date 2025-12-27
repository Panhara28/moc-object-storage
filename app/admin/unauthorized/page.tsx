import Link from "next/link";
import Layout from "@/components/cmsfullform/layout";
import { Button } from "@/components/ui/button";

export default function AdminUnauthorizedPage() {
  return (
    <Layout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Access denied
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          You do not have permission to view this page.
        </p>
        <Button asChild variant="outline">
          <Link href="/admin/dashboard">Back to dashboard</Link>
        </Button>
      </div>
    </Layout>
  );
}
