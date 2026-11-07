import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-600">
          {eyebrow}
        </p>
      )}
      <h2
        className="text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-4 text-base leading-relaxed text-ink-900/70 sm:text-lg"
        >
          {description}
        </p>
      )}
    </div>
  );
}
