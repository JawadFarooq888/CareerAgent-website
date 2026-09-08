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
    <section className="bg-navy-950 py-16 sm:py-20">
      <div className="container-page text-center">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-400">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
        {avatarName && (
          <OwnerAvatar
            name={avatarName}
            size={88}
            className="mx-auto mt-6 ring-4 ring-white/10"
          />
        )}
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
