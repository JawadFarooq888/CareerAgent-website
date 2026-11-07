import { cn } from "@/lib/utils";

const inputClasses =
  "w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-ink-900 outline-none placeholder:text-ink-900/40 focus:border-brand-500 focus:ring-2 focus:ring-brand-400/40";

export function TextField({
  label,
  name,
  type = "text",
  required,
  placeholder,
  defaultValue,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink-900">
        {label} {required && <span className="text-brand-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={inputClasses}
      />
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  required,
  placeholder,
  defaultValue,
  rows = 5,
  className,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  rows?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink-900">
        {label} {required && <span className="text-brand-600">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        rows={rows}
        className={cn(inputClasses, "resize-none")}
      />
    </div>
  );
}

export function HoneypotField() {
  return (
    <input
      type="text"
      name="company"
      tabIndex={-1}
      autoComplete="off"
      className="hidden"
      aria-hidden="true"
    />
  );
}
