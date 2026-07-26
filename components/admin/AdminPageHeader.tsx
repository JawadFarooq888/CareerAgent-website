export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-navy-950">{title}</h1>
        {description && <p className="mt-1 text-sm text-navy-900/60">{description}</p>}
      </div>
      {action}
    </div>
  );
}
