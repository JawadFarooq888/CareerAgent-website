import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  REVIEWED: "bg-amber-100 text-amber-700",
  CONTACTED: "bg-purple-100 text-purple-700",
  CLOSED: "bg-zinc-100 text-zinc-600",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        statusStyles[status] ?? "bg-zinc-100 text-zinc-600"
      )}
    >
      {status}
    </span>
  );
}
