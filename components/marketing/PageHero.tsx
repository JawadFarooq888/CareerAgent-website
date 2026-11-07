import { OwnerAvatar } from "@/components/marketing/OwnerAvatar";

export function PageHero({
  eyebrow,
  title,
  description,
  avatarName,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  avatarName?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist-100 to-mist-50 py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          maskImage: "radial-gradient(70% 80% at 50% 0%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(70% 80% at 50% 0%, black 20%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(45% 60% at 50% 0%, rgba(20,160,147,0.22) 0%, rgba(20,160,147,0) 70%)",
        }}
      />
      <div className="container-page relative text-center">
        {eyebrow && (
          <p className="mx-auto mb-5 w-fit rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-600">
            {eyebrow}
          </p>
        )}
        <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-ink-950 sm:text-5xl">{title}</h1>
        {avatarName && (
          <OwnerAvatar
            name={avatarName}
            size={88}
            className="mx-auto mt-6 ring-4 ring-white"
          />
        )}
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-900/70 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
