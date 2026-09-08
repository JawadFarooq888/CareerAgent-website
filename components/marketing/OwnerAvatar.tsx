import { cn } from "@/lib/utils";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function OwnerAvatar({
  name,
  size = 96,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("rounded-full", className)}
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #c9a227 0%, #172c4d 100%)",
      }}
    >
      <div
        className="flex h-full w-full items-center justify-center rounded-full font-bold text-white"
        style={{ fontSize: size * 0.32 }}
      >
        {getInitials(name)}
      </div>
    </div>
  );
}
