import { AlertTriangle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

async function getCounts() {
  try {
    const [inquiries, newInquiries, blogPosts, testimonials, pricingPackages] =
      await Promise.all([
        prisma.contactInquiry.count(),
        prisma.contactInquiry.count({ where: { status: "NEW" } }),
        prisma.blogPost.count(),
        prisma.testimonial.count(),
        prisma.pricingPackage.count(),
      ]);
    return {
      ok: true as const,
      inquiries,
      newInquiries,
      blogPosts,
      testimonials,
      pricingPackages,
    };
  } catch {
    return { ok: false as const };
  }
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Overview of inquiries and site content."
      />

      {!counts.ok ? (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-6 text-amber-800">
          <AlertTriangle size={20} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">Database not connected</p>
            <p className="mt-1 text-sm">
              Set a valid <code>DATABASE_URL</code> in your environment and run{" "}
              <code>npx prisma migrate dev</code> to enable the admin panel and lead capture
              forms.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="New Inquiries" value={counts.newInquiries} highlight />
          <StatCard label="Total Inquiries" value={counts.inquiries} />
          <StatCard label="Blog Posts" value={counts.blogPosts} />
          <StatCard label="Testimonials" value={counts.testimonials} />
          <StatCard label="Pricing Packages" value={counts.pricingPackages} />
        </div>
      )}
    </>
  );
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        highlight
          ? "rounded-2xl border border-gold-500/30 bg-gold-500/10 p-6"
          : "rounded-2xl border border-black/5 bg-white p-6"
      }
    >
      <p className="text-3xl font-bold text-navy-950">{value}</p>
      <p className="mt-1 text-sm text-navy-900/60">{label}</p>
    </div>
  );
}
