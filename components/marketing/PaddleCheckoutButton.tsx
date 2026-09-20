"use client";

import { useEffect, useRef, useState } from "react";
import type { Paddle } from "@paddle/paddle-js";
import { initializePaddle } from "@paddle/paddle-js";
import { paddleConfig } from "@/lib/paddle-config";
import { cn } from "@/lib/utils";
import {
  buttonBaseClasses,
  buttonVariantClasses,
  buttonSizeClasses,
  type ButtonVariant,
  type ButtonSize,
} from "@/components/ui/Button";

export function PaddleCheckoutButton({
  priceId,
  children,
  className,
  variant = "primary",
  size = "md",
}: {
  priceId: string;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  const paddleRef = useRef<Paddle | undefined>(undefined);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    initializePaddle({
      environment: paddleConfig.environment,
      token: paddleConfig.clientToken,
    }).then((paddle) => {
      if (cancelled) return;
      paddleRef.current = paddle;
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <button
      type="button"
      disabled={!ready}
      onClick={() => {
        paddleRef.current?.Checkout.open({
          items: [{ priceId, quantity: 1 }],
        });
      }}
      className={cn(
        buttonBaseClasses,
        buttonVariantClasses[variant],
        buttonSizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
}
