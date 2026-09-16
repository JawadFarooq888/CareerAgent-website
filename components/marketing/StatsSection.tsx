import { cn } from "@/lib/utils";

const stats = [
  { value: "250+", label: "Clients supported" },
  { value: "3.2x", label: "Average interview rate increase" },
  { value: "18 days", label: "Average time to first interview" },
  { value: "4.9/5", label: "Average client rating" },
];

export function StatsSection() {
  return (
    <section className="border-y border-black/5 bg-white py-14">
      <div className="container-page grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "px-4 text-center",
              index !== 0 && "sm:border-l sm:border-black/5"
            )}
          >
            <p className="text-3xl font-bold text-navy-950 sm:text-4xl">{stat.value}</p>
            <p className="mt-1.5 text-sm text-navy-900/60">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
