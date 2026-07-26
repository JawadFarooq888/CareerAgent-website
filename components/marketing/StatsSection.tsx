const stats = [
  { value: "250+", label: "Clients supported" },
  { value: "3.2x", label: "Average interview rate increase" },
  { value: "18 days", label: "Average time to first interview" },
  { value: "4.9/5", label: "Average client rating" },
];

export function StatsSection() {
  return (
    <section className="border-y border-black/5 bg-white py-14">
      <div className="container-page grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-navy-950 sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-sm text-navy-900/60">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
