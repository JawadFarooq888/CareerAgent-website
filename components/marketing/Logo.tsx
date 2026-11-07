import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="#0f766e" />
      <path
        d="M21.5 10.2A8 8 0 1 0 21.5 21.8"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M16.5 16h7m0 0-3-3m3 3-3 3" stroke="#99f6e4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-lg font-bold tracking-tight text-ink-950 sm:text-xl">
        Career<span className="text-brand-600">Agent</span>
        <span className="sr-only"> — {siteConfig.tagline}</span>
      </span>
    </span>
  );
}
