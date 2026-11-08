import { AdminSidebar } from "@/components/admin/AdminSidebar";

// Admin pages read live data from the database. Without this they are
// prerendered at build time, so new inquiries would not show until a redeploy.
export const dynamic = "force-dynamic";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-mist-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
