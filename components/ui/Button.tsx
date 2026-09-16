import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gold-500 text-navy-950 shadow-sm hover:bg-gold-400 hover:shadow-md hover:shadow-gold-500/20 focus-visible:outline-gold-500",
  secondary:
    "bg-navy-900 text-white shadow-sm hover:bg-navy-800 hover:shadow-md focus-visible:outline-navy-900",
  outline:
    "border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white focus-visible:outline-navy-900",
  ghost: "text-navy-900 hover:bg-navy-900/5",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0";

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsLink extends CommonProps {
  href: string;
  external?: boolean;
}

interface ButtonAsButton
  extends CommonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: undefined;
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  if ("href" in props && props.href) {
    const { href, external } = props;
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
